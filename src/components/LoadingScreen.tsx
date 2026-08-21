'use client';

import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="site-loader" role="status" aria-label="Loading SVNCTM">
      <div className="site-loader__orb site-loader__orb--one" />
      <div className="site-loader__orb site-loader__orb--two" />
      <div className="site-loader__content">
        <span className="site-loader__eyebrow">EVERY SPACE, A SANCTUM</span>
        <div className="site-loader__word" aria-hidden="true">SVNCTM</div>
        <span className="site-loader__slowly">slowly.</span>
        <div className="site-loader__line"><i /></div>
      </div>
    </div>
  );
}
