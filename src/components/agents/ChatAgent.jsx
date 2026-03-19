import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Minimize2, Maximize2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const fallbackGreeting = {
  id: "welcome",
  text: "Hey there! I’m Rivercity’s chat agent. Ask about rentals, delivery, or routes and I’ll point you in the right direction.",
  sender: "bot",
};

const ChatAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([fallbackGreeting]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("idle");

  const containerRef = useRef(null);
  const mountDisposer = useRef(null);

  const enabled = useMemo(
    () => parseEnabled(import.meta.env.VITE_CHAT_AGENT_ENABLED, true),
    []
  );

  const agentUrl = import.meta.env.VITE_CHAT_AGENT_URL;
  const agentId = import.meta.env.VITE_CHAT_AGENT_ID;

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    const bootstrap = async () => {
      if (!agentUrl) {
        setStatus("fallback");
        return;
      }

      setStatus("loading");

      try {
        await loadScript("chat-agent-script", agentUrl);

        const sdk = window.RivercityChatAgent || window.ChatAgent;
        if (sdk?.mount) {
          if (!cancelled) setStatus("remote-ready");
        } else {
          setStatus("fallback");
        }
      } catch (error) {
        console.error("Chat agent failed to load", error);
        setStatus("fallback");
      }
    };

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, [agentUrl, enabled]);

  useEffect(() => {
    if (status !== "remote-ready" || !isOpen || !containerRef.current) return;

    const sdk = window.RivercityChatAgent || window.ChatAgent;
    if (!sdk?.mount) return;

    const cleanup = sdk.mount({
      container: containerRef.current,
      agentId,
    });

    mountDisposer.current = cleanup;

    return () => {
      if (typeof cleanup === "function") {
        cleanup();
      } else if (cleanup?.unmount) {
        cleanup.unmount();
      }

      if (containerRef.current) containerRef.current.innerHTML = "";
      mountDisposer.current = null;
    };
  }, [agentId, isOpen, status]);

  useEffect(() => {
    if (!isOpen && mountDisposer.current) {
      const cleanup = mountDisposer.current;
      if (typeof cleanup === "function") cleanup();
      else if (cleanup?.unmount) cleanup.unmount();
      if (containerRef.current) containerRef.current.innerHTML = "";
      mountDisposer.current = null;
    }
  }, [isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = { id: Date.now(), text: inputValue.trim(), sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thanks! Our hosted agent goes live soon. You’ll get answers and booking links here once it’s online.",
          sender: "bot",
        },
      ]);
    }, 600);
  };

  if (!enabled) return null;

  const isFallback = status !== "remote-ready";

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-32">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto w-[min(420px,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl ring-1 ring-black/5"
            style={{ maxHeight: "min(75vh, 640px)" }}
          >
            <header className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <MessageSquare size={18} />
                </span>
                <div>
                  <div className="text-sm font-semibold">Rivercity Chat Agent</div>
                  <div className="text-[11px] uppercase tracking-wide text-blue-100">
                    {status === "remote-ready" ? "Live" : "Preview"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/15"
                  onClick={() => setIsMinimized((prev) => !prev)}
                  aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/15"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X size={18} />
                </Button>
              </div>
            </header>

            {!isMinimized && (
              <div className="flex h-[420px] flex-col bg-white">
                <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-2 text-xs text-gray-500">
                  {status === "loading" && <Loader2 className="h-3.5 w-3.5 animate-spin" />} {" "}
                  {status === "remote-ready" ? "Connected to hosted agent" : "Using on-page preview until hosting is live"}
                </div>

                <div className="flex-1">
                  {isFallback ? (
                    <>
                      <ScrollArea className="h-[320px] space-y-3 px-4 py-4">
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15 }}
                            className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                                msg.sender === "bot"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-blue-600 text-white shadow-sm"
                              }`}
                            >
                              {msg.text}
                            </div>
                          </motion.div>
                        ))}
                      </ScrollArea>

                      <form
                        onSubmit={handleSendMessage}
                        className="flex items-center gap-2 border-t border-gray-100 bg-gray-50 px-4 py-3"
                      >
                        <Input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Ask about rentals, delivery, or visas"
                          className="flex-1"
                        />
                        <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700">
                          <Send size={16} />
                        </Button>
                      </form>
                    </>
                  ) : (
                    <div className="h-full w-full bg-white" ref={containerRef} />
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="pointer-events-auto inline-flex items-center gap-3 rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-xl ring-1 ring-blue-500/40 transition hover:bg-blue-700"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        aria-expanded={isOpen}
        aria-label="Open chat agent"
      >
        <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
          <MessageSquare size={20} />
          <span className="absolute inset-0 rounded-full border border-white/25" />
        </span>
        <span className="hidden sm:inline">Chat with us</span>
        <span className="inline sm:hidden">Chat</span>
      </motion.button>
    </div>
  );
};

export default ChatAgent;
