'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  image: string;
  scent?: string;
  slug: string;
  isWishlisted?: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  comparePrice,
  image,
  scent,
  slug,
  isWishlisted = false,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [isLiked, setIsLiked] = useState(isWishlisted);
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    // TODO: Call API to update wishlist
  };
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, price, sku: slug.toUpperCase(), slug, scent });
  };

  const discountPercent = comparePrice
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;

  return (
    <Link href={`/products/${slug}`}>
      <div
        className="card-product group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-square bg-svnctm-white-warm overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover w-full h-full transition-transform duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-all duration-300"
          >
            <Heart
              size={20}
              className={`transition-all duration-300 ${
                isLiked
                  ? 'fill-svnctm-pink text-svnctm-pink'
                  : 'text-svnctm-charcoal'
              }`}
            />
          </button>

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-4 left-4 bg-svnctm-pink text-white px-3 py-1 rounded-full text-sm font-medium">
              -{discountPercent}%
            </div>
          )}

          {/* Quick Add Button */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={handleQuickAdd} className="w-full btn-primary">
              Quick Add
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-xs text-svnctm-charcoal/60 uppercase tracking-wide font-medium">
            {scent || 'Candle'}
          </p>
          <h3 className="text-heading-4 text-svnctm-charcoal mt-2 line-clamp-2">
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-lg font-semibold text-svnctm-charcoal">
              {formatPrice(price)}
            </span>
            {comparePrice && comparePrice > price && (
              <span className="text-sm text-svnctm-charcoal/50 line-through">
                {formatPrice(comparePrice)}
              </span>
            )}
          </div>

          {/* Rating (Optional) */}
          <div className="flex items-center gap-1 mt-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xs ${
                    i < 4 ? 'text-svnctm-pink' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-svnctm-charcoal/60">(0)</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
