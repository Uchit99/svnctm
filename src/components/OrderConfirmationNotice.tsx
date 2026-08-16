'use client';

import { Check, X } from 'lucide-react';
import { useState } from 'react';

export function OrderConfirmationNotice({ orderNumber }: { orderNumber: string }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-svnctm-charcoal/50 p-4" role="presentation">
      <section role="dialog" aria-modal="true" aria-labelledby="order-confirmation-title" className="relative w-full max-w-md rounded-[1.5rem] bg-white p-7 text-center shadow-2xl">
        <button type="button" onClick={() => setIsOpen(false)} className="absolute right-4 top-4 rounded-full p-2 text-svnctm-charcoal/60 hover:bg-svnctm-white-warm hover:text-svnctm-charcoal" aria-label="Close confirmation">
          <X size={18} />
        </button>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-svnctm-pink-light text-svnctm-pink">
          <Check size={24} strokeWidth={3} aria-hidden="true" />
        </div>
        <p className="eyebrow mt-5">Order confirmed</p>
        <h2 id="order-confirmation-title" className="mt-2 text-2xl">Thank you for your order.</h2>
        <p className="mt-3 text-sm leading-6 text-svnctm-charcoal/70">Order {orderNumber} is confirmed. We’ll share delivery updates on WhatsApp using the number provided at checkout.</p>
        <button type="button" onClick={() => setIsOpen(false)} className="mt-6 rounded-full bg-svnctm-charcoal px-5 py-3 text-sm font-semibold text-white hover:bg-svnctm-pink">View order details</button>
      </section>
    </div>
  );
}
