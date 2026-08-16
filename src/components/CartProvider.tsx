'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type CartItem = { id: string; name: string; price: number; quantity: number; sku: string; slug: string; scent?: string };
type CartContextValue = { items: CartItem[]; count: number; addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void; updateQuantity: (id: string, quantity: number) => void; removeItem: (id: string) => void; };
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('svnctm-cart-v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed.filter((item) => item?.id && item?.name && item?.slug));
      } catch { localStorage.removeItem('svnctm-cart-v2'); }
    }
    setIsHydrated(true);
  }, []);
  useEffect(() => { if (isHydrated) localStorage.setItem('svnctm-cart-v2', JSON.stringify(items)); }, [items, isHydrated]);
  const value = useMemo(() => ({ items, count: items.reduce((total, item) => total + item.quantity, 0), addItem: (item: Omit<CartItem, 'quantity'>, quantity = 1) => setItems(current => { const existing = current.find(entry => entry.id === item.id); return existing ? current.map(entry => entry.id === item.id ? { ...entry, quantity: entry.quantity + quantity } : entry) : [...current, { ...item, quantity }]; }), updateQuantity: (id: string, quantity: number) => setItems(current => quantity > 0 ? current.map(item => item.id === id ? { ...item, quantity } : item) : current.filter(item => item.id !== id)), removeItem: (id: string) => setItems(current => current.filter(item => item.id !== id)) }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() { const cart = useContext(CartContext); if (!cart) throw new Error('useCart must be used inside CartProvider'); return cart; }
