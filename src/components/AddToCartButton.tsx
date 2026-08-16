'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';

export function AddToCartButton({ product, quantity }: { product: { id: string; name: string; price: number; sku: string; slug: string; scent?: string }; quantity: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  return <button onClick={() => { addItem(product, quantity); setAdded(true); setTimeout(() => setAdded(false), 1600); }} className="w-full rounded-brand bg-svnctm-pink px-8 py-4 text-lg font-medium text-white transition-all hover:opacity-90">{added ? 'Added to cart ✓' : 'Add to Cart'}</button>;
}
