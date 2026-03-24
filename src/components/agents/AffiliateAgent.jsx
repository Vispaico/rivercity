import React, { useEffect, useMemo, useState } from "react";
import { ExternalLink, Minus, Plus } from "lucide-react";

export const AffiliateWidget = {
  title: "Trusted partner",
  body: "breeze - Book your data eSIM in 3 simple steps | No stress. No contract. Easy, breezy data roaming.",
  url: "https://breezesim.com?sca_ref=10888013.jwCXVNxunZ",
  ctaLabel: "View offers",
  disclosure: "Affiliate links may earn us a commission at no extra cost to you.",
};

const parseEnabled = (rawValue, fallback = true) => {
  if (rawValue === undefined) return fallback;
  return !["false", "0", "off", "no", "disabled"].includes(String(rawValue).toLowerCase());
};

const loadScript = (id, src) => {
  if (!src) return Promise.resolve();

  const existing = document.getElementById(id);
  if (existing) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
};

export const AffiliateWidgetBox = ({ widget }) => {
  if (!widget) return null;

  return (
    <aside className="w-[min(340px,calc(100vw-2rem))] rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
      <div className="text-sm font-semibold text-gray-800 flex items-center gap-2">
        <span className="inline-flex h-6 items-center rounded-full bg-blue-50 px-2 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
          Shop
        </span>
        <span>{widget.title}</span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{widget.body}</p>
      <a
        href={widget.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mt-3 inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        {widget.ctaLabel}
        <ExternalLink size={14} />
      </a>
      <p className="mt-2 text-xs text-gray-400">{widget.disclosure || "Affiliate link"}</p>
    </aside>
  );
};

const AffiliateAgent = () => {
  const [widget, setWidget] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("idle");

  const enabled = useMemo(
    () => parseEnabled(import.meta.env.VITE_AFFILIATE_AGENT_ENABLED, true),
    []
  );

  const agentUrl = import.meta.env.VITE_AFFILIATE_AGENT_URL;
  const agentId = import.meta.env.VITE_AFFILIATE_AGENT_ID;

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    const applyWidget = (payload) => {
      if (cancelled) return;
      setWidget(payload || defaultWidget);
      setStatus("ready");
    };

    const loadExternal = async () => {
      if (!agentUrl) {
        applyWidget(AffiliateWidget);
        return;
      }

      setStatus("loading");

      try {
        await loadScript("affiliate-agent-script", agentUrl);

        const externalWidget =
          window.RivercityAffiliateAgent?.getWidget?.(agentId) ||
          window.__AFFILIATE_WIDGET__;

        applyWidget(externalWidget);
      } catch (error) {
        console.error("Affiliate agent failed to load", error);
        applyWidget(AffiliateWidget);
      }
    };

    loadExternal();

    return () => {
      cancelled = true;
    };
  }, [agentId, agentUrl, enabled]);

  if (!enabled) return null;

  const label = status === "loading" ? "Loading affiliate" : "eSims & Souvenirs";

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-40 flex flex-col items-start gap-3 md:bottom-6 md:left-6">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold text-gray-800 shadow-lg ring-1 ring-gray-200 transition hover:bg-white"
        aria-expanded={isOpen}
        aria-label={label}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
          {status === "loading" ? <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> : <span>✦</span>}
        </span>
        <span className="pr-1">{label}</span>
        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
      </button>

      {isOpen && (
        <div className="pointer-events-auto">
          <AffiliateWidgetBox widget={widget || AffiliateWidget} />
        </div>
      )}
    </div>
  );
};

export default AffiliateAgent;
