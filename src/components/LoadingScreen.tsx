'use client';

import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="site-loader" role="status" aria-label="Loading SVNCTM">
      <div className="site-loader__orb site-loader__orb--one" />
      <div className="site-loader__orb site-loader__orb--two" />
      <div className="site-loader__grid" aria-hidden="true" />
      <div className="site-loader__noise" aria-hidden="true" />
      <span className="site-loader__corner site-loader__corner--top">OBJECTS FOR THE INNER ROOM</span>
      <span className="site-loader__corner site-loader__corner--bottom">INDIA · 2026 · 19°07&apos;N</span>
      <div className="site-loader__content">
        <span className="site-loader__eyebrow">SYSTEM / SVNCTM / 01</span>
        <div className="site-loader__word" aria-hidden="true">SVNCTM</div>
        <div className="site-loader__subline"><span className="site-loader__slowly">slowly.</span><span className="site-loader__status">ENTERING THE SANCTUM</span></div>
        <div className="site-loader__line"><i /></div>
        <div className="site-loader__meter" aria-hidden="true"><span>00</span><span>100</span></div>
      </div>
    </div>
  );
}
