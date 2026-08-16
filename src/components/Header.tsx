'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, Heart, User, ShoppingBag, X } from 'lucide-react';
import { Container } from '@/components/Layout';
import { useCart } from '@/components/CartProvider';

export function Header() {
  const { count } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const menuItems = [
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'Our Story', href: '/about' },
    { label: 'Journal', href: '/journal' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-svnctm-white-warm/95 backdrop-blur-sm border-b border-gray-200">
      <Container className="py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-heading text-2xl font-bold text-svnctm-charcoal">
            SVNCTM
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-svnctm-charcoal hover:text-svnctm-pink transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Search size={20} className="text-svnctm-charcoal" />
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
            >
              <Heart size={20} className="text-svnctm-charcoal" />
            </Link>

            {/* Account Icon */}
            <Link
              href="/auth/login"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
            >
              <User size={20} className="text-svnctm-charcoal" />
            </Link>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingBag size={20} className="text-svnctm-charcoal" />
              <span className="absolute top-1 right-1 bg-svnctm-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-svnctm-charcoal" />
              ) : (
                <Menu size={24} className="text-svnctm-charcoal" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 pb-4">
            <input
              type="text"
              placeholder="Search products, scents, rituals..."
              className="input-field w-full"
              autoFocus
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pt-4 border-t mt-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-svnctm-charcoal hover:bg-svnctm-pink-light transition-colors rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/wishlist"
              className="block px-4 py-2 text-svnctm-charcoal hover:bg-svnctm-pink-light transition-colors rounded md:hidden"
            >
              Wishlist
            </Link>
            <Link
              href="/auth/login"
              className="block px-4 py-2 text-svnctm-charcoal hover:bg-svnctm-pink-light transition-colors rounded md:hidden"
            >
              Account
            </Link>
          </nav>
        )}
      </Container>
    </header>
  );
}
