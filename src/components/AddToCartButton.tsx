'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';

export function AddToCartButton({ product, quantity }: { product: { id: string; name: string; price: number; sku: string; slug: string; scent?: string }; quantity: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  return <button onClick={() => { addItem(product, quantity); setAdded(true); setTimeout(() => setAdded(false), 1600); }} className="w-full rounded-brand bg-svnctm-pink px-10 py-5 text-xl font-semibold text-white shadow-lg shadow-svnctm-pink/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-svnctm-pink/30 active:translate-y-0">{added ? 'Added to cart ✓' : 'Add to Cart'}</button>;
}
