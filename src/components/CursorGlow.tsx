'use client';

import { useEffect, useRef } from 'react';

const TRAIL_LENGTH = 5;

export function CursorGlow() {
  const trailRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;

    const points = Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }));
    let target = { x: -100, y: -100 };
    let frame = 0;

    const render = () => {
      points.forEach((point, index) => {
        const lead = index === 0 ? target : points[index - 1];
        point.x += (lead.x - point.x) * (index === 0 ? 0.32 : 0.24);
        point.y += (lead.y - point.y) * (index === 0 ? 0.32 : 0.24);
        const dot = trailRef.current[index];
        if (dot) {
          dot.style.left = `${point.x}px`;
          dot.style.top = `${point.y}px`;
        }
      });
      frame = requestAnimationFrame(render);
    };
    const onPointerMove = (event: PointerEvent) => { target = { x: event.clientX, y: event.clientY }; };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    frame = requestAnimationFrame(render);
    return () => { window.removeEventListener('pointermove', onPointerMove); cancelAnimationFrame(frame); };
  }, []);

  return <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden="true">
    {Array.from({ length: TRAIL_LENGTH }, (_, index) => <div key={index} ref={(node) => { if (node) trailRef.current[index] = node; }} className="cursor-trail" style={{ opacity: (TRAIL_LENGTH - index) / (TRAIL_LENGTH * 2.6) }} />)}
  </div>;
}
