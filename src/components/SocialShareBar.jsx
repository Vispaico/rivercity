import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link2, Share2 } from 'lucide-react';

const buildLinks = ({ url, title, imageUrl }) => {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title || '');
  const media = encodeURIComponent(imageUrl || '');
  const desc = encodeURIComponent(title || '');

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    twitter: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${u}&media=${media}&description=${desc}`,
    whatsapp: `https://wa.me/?text=${t}%20${u}`,
  };
};

const SocialShareBar = ({ title, url, imageUrl }) => {
  const [copied, setCopied] = useState(false);

  const safeUrl = useMemo(() => {
    if (typeof url === 'string' && url.trim()) return url.trim();
    if (typeof window !== 'undefined') return window.location.href;
    return '';
  }, [url]);

  const links = useMemo(() => {
    if (!safeUrl) return null;
    return buildLinks({ url: safeUrl, title, imageUrl });
  }, [safeUrl, title, imageUrl]);

  if (!safeUrl || !links) return null;

  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(safeUrl);
      } else {
        const ta = document.createElement('textarea');
        ta.value = safeUrl;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (!canNativeShare) return;
    try {
      await navigator.share({ title: title || 'Rivercity', url: safeUrl });
    } catch {
      // user cancelled
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <Share2 className="h-4 w-4 text-blue-600" />
          Share this article
        </div>

        <div className="flex flex-wrap gap-2">
          {canNativeShare && (
            <Button type="button" size="sm" variant="secondary" onClick={handleNativeShare}>
              Share
            </Button>
          )}

          <Button asChild size="sm" variant="outline">
            <a href={links.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href={links.twitter} target="_blank" rel="noopener noreferrer">
              X / Twitter
            </a>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href={links.pinterest} target="_blank" rel="noopener noreferrer">
              Pinterest
            </a>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={handleCopy}>
            <Link2 className="mr-2 h-4 w-4" />
            {copied ? 'Copied' : 'Copy link'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialShareBar;
