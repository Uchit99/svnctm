'use client';

import { Share2 } from 'lucide-react';
import { useState } from 'react';

export function ShareButton({ title }: { title: string }) {
  const [shared, setShared] = useState(false);

  const share = async () => {
    const shareData = { title, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      window.setTimeout(() => setShared(false), 1800);
    } catch (error) {
      if ((error as DOMException).name !== 'AbortError') console.error('Could not share product', error);
    }
  };

  return (
    <button type="button" onClick={share} className="share-button">
      <span className="inline-flex items-center justify-center gap-2">
        <Share2 size={18} aria-hidden="true" />
        <span>{shared ? 'Link copied' : 'Share'}</span>
      </span>
    </button>
  );
}
