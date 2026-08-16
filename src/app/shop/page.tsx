'use client';

import { Container, Section } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

interface Filter {
  category: string[];
  priceRange: [number, number];
  scent: string[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  image: string;
  scent?: string;
  slug: string;
  category: string;
}

export default function ShopPage() {
  // Mock products - would come from database in production
  const allProducts: Product[] = [
    {
      id: '1',
      name: 'Soft Sanctuary Candle',
      price: 899,
      comparePrice: 1200,
      image: '/placeholder-product.jpg',
      scent: 'Lavender & Sandalwood',
      slug: 'soft-sanctuary-candle',
      category: 'candles',
    },
    {
      id: '2',
      name: 'Evening Ritual Candle',
      price: 899,
      image: '/placeholder-product.jpg',
      scent: 'Cedarwood & Amber',
      slug: 'evening-ritual-candle',
      category: 'candles',
    },
    {
      id: '3',
      name: 'Quiet Moment Candle',
      price: 1299,
      image: '/placeholder-product.jpg',
      scent: 'Rose & Bergamot',
      slug: 'quiet-moment-candle',
      category: 'candles',
    },
    {
      id: '4',
      name: 'Home Sanctuary Diffuser',
      price: 1499,
      image: '/placeholder-product.jpg',
      scent: 'Jasmine & Musk',
      slug: 'home-sanctuary-diffuser',
      category: 'diffusers',
    },
    {
      id: '5',
      name: 'Zen Moment Candle',
      price: 799,
      image: '/placeholder-product.jpg',
      scent: 'Eucalyptus & Mint',
      slug: 'zen-moment-candle',
      category: 'candles',
    },
    {
      id: '6',
      name: 'Warm Glow Candle',
      price: 1099,
      image: '/placeholder-product.jpg',
      scent: 'Vanilla & Honey',
      slug: 'warm-glow-candle',
      category: 'candles',
    },
    {
      id: '7',
      name: 'Serenity Diffuser',
      price: 1399,
      image: '/placeholder-product.jpg',
      scent: 'Lavender & Chamomile',
      slug: 'serenity-diffuser',
      category: 'diffusers',
    },
    {
      id: '8',
      name: 'Night Ritual Candle',
      price: 999,
      image: '/placeholder-product.jpg',
      scent: 'Chamomile & Lavender',
      slug: 'night-ritual-candle',
      category: 'candles',
    },
  ];

  const [filters, setFilters] = useState<Filter>({
    category: [],
    priceRange: [0, 2000],
    scent: [],
  });

  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-low' | 'price-high'>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = allProducts;

    // Apply category filter
    if (filters.category.length > 0) {
      products = products.filter((p) => filters.category.includes(p.category));
    }

    // Apply price filter
    products = products.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Apply scent filter
    if (filters.scent.length > 0) {
      products = products.filter((p) =>
        filters.scent.some((scent) => p.scent?.includes(scent))
      );
    }

    // Apply sorting
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.reverse();
        break;
      default:
        break;
    }

    return sorted;
  }, [filters, sortBy]);

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category],
    }));
  };

  return (
    <Section className="bg-svnctm-white-warm min-h-screen">
      <Container>
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-heading text-heading-1 text-svnctm-charcoal mb-2">
            Explore Objects
          </h1>
          <p className="text-body-base text-svnctm-charcoal/70">
            Discover our curated collection of thoughtfully designed products.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-brand p-6 sticky top-24">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-between mb-6 lg:mb-0"
              >
                <h3 className="font-heading font-semibold text-lg text-svnctm-charcoal">
                  Filters
                </h3>
                <ChevronDown
                  size={20}
                  className={`lg:hidden transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isFilterOpen && (
                <div className="space-y-6 pt-6 border-t lg:border-t-0 lg:pt-0">
                  {/* Category Filter */}
                  <div>
                    <h4 className="font-semibold text-svnctm-charcoal mb-3">Category</h4>
                    <div className="space-y-2">
                      {['Candles', 'Diffusers', 'Wax Melts'].map((category) => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.category.includes(category.toLowerCase())}
                            onChange={() => handleCategoryChange(category.toLowerCase())}
                            className="w-4 h-4 rounded accent-svnctm-pink"
                          />
                          <span className="text-sm text-svnctm-charcoal/70">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <h4 className="font-semibold text-svnctm-charcoal mb-3">Price</h4>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min={0}
                        max={2000}
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [prev.priceRange[0], parseInt(e.target.value)],
                          }))
                        }
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-svnctm-charcoal/70">
                        <span>₹{filters.priceRange[0]}</span>
                        <span>₹{filters.priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Reset Filters */}
                  <button
                    onClick={() =>
                      setFilters({ category: [], priceRange: [0, 2000], scent: [] })
                    }
                    className="w-full py-2 text-sm text-svnctm-pink border border-svnctm-pink rounded-brand hover:bg-svnctm-pink-light transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="mb-8 flex items-center justify-between bg-white rounded-brand p-4">
              <p className="text-sm text-svnctm-charcoal/70">
                Showing {filteredProducts.length} products
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-brand focus:outline-none focus:ring-2 focus:ring-svnctm-pink"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-heading-3 text-svnctm-charcoal mb-4">
                  Nothing here yet.
                </h3>
                <p className="text-body-base text-svnctm-charcoal/70">
                  Perhaps your sanctum is waiting for something else.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
