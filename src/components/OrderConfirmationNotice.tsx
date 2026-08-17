'use client';

import { Check, X } from 'lucide-react';
import { useState } from 'react';

const confirmationMessages = [
  { title: 'WELL, THAT ESCALATED QUICKLY. 👀', body: 'Your SVNCTM order is confirmed!\n\nWe’ll drop your order & shipping details on WhatsApp shortly.\n\nSee you on the other side. 🕯️' },
  { title: 'It’s happening. 🕯️', body: 'Your candle is officially yours.\n\nWe’ll send your order & shipping details over WhatsApp shortly — so keep an eye out.\n\nUntil then, stay lit.' },
  { title: 'OKAYYY, IT’S OFFICIAL. 🫶', body: 'Your order is confirmed & your candle is officially coming home.\n\nOrder + shipping deets will hit your WhatsApp shortly.\n\nYou’ve got taste. Just saying. 👀' },
  { title: 'GUESS WHO’S COMING HOME? 👀', body: 'Your SVNCTM candle.\n\nOrder confirmed — shipping + order deets coming to your WhatsApp shortly.\n\nDon’t miss us too much. 🫶' },
  { title: 'POV: YOU JUST BOUGHT A REALLY GOOD CANDLE. 😌', body: 'Order = confirmed. ✅\nShipping + order deets will hit your WhatsApp shortly.\n\nYour room is about to have lore.' },
];

export function OrderConfirmationNotice({ orderNumber, messageIndex }: { orderNumber: string; messageIndex: number }) {
  const [isOpen, setIsOpen] = useState(true);
  const message = confirmationMessages[messageIndex % confirmationMessages.length];

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
        <p className="eyebrow mt-5">Order confirmed · {orderNumber}</p>
        <h2 id="order-confirmation-title" className="mt-2 text-2xl leading-tight">{message.title}</h2>
        <p className="mt-4 whitespace-pre-line text-sm leading-6 text-svnctm-charcoal/70">{message.body}</p>
        <button type="button" onClick={() => setIsOpen(false)} className="mt-6 rounded-full bg-svnctm-charcoal px-5 py-3 text-sm font-semibold text-white hover:bg-svnctm-pink">View order details</button>
      </section>
    </div>
  );
}
