'use client';

import { Container, Section } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';

const allProducts = [
  { id: '1', name: 'Soft Sanctuary Candle', price: 899, comparePrice: 1200, image: '/images/sanctum-hero.png', imagePosition: '70% center', scent: 'Lavender & Sandalwood', slug: 'soft-sanctuary-candle' },
  { id: '2', name: 'Evening Ritual Candle', price: 899, image: '/images/sanctum-hero.png', imagePosition: '58% center', scent: 'Cedarwood & Amber', slug: 'evening-ritual-candle' },
  { id: '3', name: 'Quiet Moment Candle', price: 1299, image: '/images/sanctum-hero.png', imagePosition: '85% center', scent: 'Rose & Bergamot', slug: 'quiet-moment-candle' },
  { id: '4', name: 'Home Sanctuary Diffuser', price: 1499, image: '/images/sanctum-hero.png', imagePosition: '66% 70%', scent: 'Jasmine & Musk', slug: 'home-sanctuary-diffuser' },
  { id: '5', name: 'Zen Moment Candle', price: 799, image: '/images/sanctum-hero.png', imagePosition: '76% 24%', scent: 'Eucalyptus & Mint', slug: 'zen-moment-candle' },
  { id: '6', name: 'Warm Glow Candle', price: 1099, image: '/images/sanctum-hero.png', imagePosition: '100% center', scent: 'Vanilla & Honey', slug: 'warm-glow-candle' },
  { id: '7', name: 'Serenity Diffuser', price: 1399, image: '/images/sanctum-hero.png', imagePosition: '63% center', scent: 'Lavender & Chamomile', slug: 'serenity-diffuser' },
  { id: '8', name: 'Night Ritual Candle', price: 999, image: '/images/sanctum-hero.png', imagePosition: '86% 72%', scent: 'Chamomile & Lavender', slug: 'night-ritual-candle' },
];

type Sort = 'featured' | 'newest' | 'price-low' | 'price-high';

export default function ShopPage() {
  const [sortBy, setSortBy] = useState<Sort>('featured');
  const products = useMemo(() => {
    const sorted = [...allProducts];
    if (sortBy === 'price-low') sorted.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') sorted.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') sorted.reverse();
    return sorted;
  }, [sortBy]);

  return <Section className="min-h-screen bg-svnctm-white-warm">
    <Container>
      <div className="scroll-reveal mb-11 max-w-2xl">
        <p className="eyebrow">The collection</p>
        <h1 className="mt-3 text-heading-1 text-svnctm-charcoal">Explore Objects</h1>
        <p className="mt-3 text-body-base text-svnctm-charcoal/70">Design-led fragrance for your most lived-in spaces.</p>
      </div>
      <div className="scroll-reveal mb-8 flex flex-col gap-4 border-y border-svnctm-charcoal/10 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-svnctm-charcoal/70">Showing {products.length} objects</p>
        <label className="relative inline-flex items-center">
          <span className="sr-only">Sort objects</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value as Sort)} className="appearance-none rounded-full border border-svnctm-charcoal/20 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-svnctm-charcoal outline-none transition focus:border-svnctm-pink focus:ring-2 focus:ring-svnctm-pink/20">
            <option value="featured">Featured</option><option value="newest">Newest</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option>
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-svnctm-charcoal/65" aria-hidden="true" />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => <div key={product.id} className="scroll-reveal" style={{ animationDelay: `${Math.min(index * 50, 200)}ms` }}><ProductCard {...product} /></div>)}
      </div>
    </Container>
  </Section>;
}
