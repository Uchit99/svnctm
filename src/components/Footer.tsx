import Link from 'next/link';
import { Container } from '@/components/Layout';
import { Camera, Mail, PinIcon } from 'lucide-react';
import { BRAND_COPY } from '@/lib/brand';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-svnctm-charcoal text-white">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_.8fr_.9fr_1.25fr] lg:gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-2">SVNCTM</h3>
            <p className="text-white/70 text-sm mb-4">{BRAND_COPY.tagline}</p>
            <p className="text-white/60 text-xs leading-relaxed">
              Thoughtfully designed objects for slower moments, softer spaces, and everyday rituals.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Shop</h4>
            <nav className="flex flex-col items-start gap-2.5">
              <Link href="/shop" className="text-white/70 hover:text-white transition-colors text-sm">
                All Products
              </Link>
              <Link href="/collections" className="text-white/70 hover:text-white transition-colors text-sm">
                Collections
              </Link>
            </nav>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Customer Care</h4>
            <nav className="flex flex-col items-start gap-2.5">
              <Link href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                Contact
              </Link>
              <Link href="/blog" className="text-white/70 hover:text-white transition-colors text-sm">
                Blog
              </Link>
              <Link href="/shipping-policy" className="text-white/70 hover:text-white transition-colors text-sm">
                Shipping
              </Link>
              <Link href="/returns" className="text-white/70 hover:text-white transition-colors text-sm">
                Returns & Refunds
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Create Your Ritual</h4>
            <p className="text-white/60 text-sm mb-4">
              Join us for stories, rituals, and quiet moments.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded bg-white/10 text-white placeholder-white/50 border border-white/20 focus:border-white/40 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-svnctm-pink hover:opacity-90 transition-opacity rounded"
              >
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-5 py-7 text-center lg:flex-row lg:text-left">
          <p className="text-white/60 text-sm">
            © {currentYear} SVNCTM. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/shipping-policy" className="text-white/60 hover:text-white transition-colors">
              Shipping Policy
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://instagram.com/svnctm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow SVNCTM on Instagram"
              className="rounded-full border border-white/20 p-2 text-white/70 transition-colors hover:border-svnctm-pink hover:bg-svnctm-pink hover:text-white"
            >
              <Camera size={18} aria-hidden="true" />
            </a>
            <a
              href="https://pinterest.com/svnctm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow SVNCTM on Pinterest"
              className="rounded-full border border-white/20 p-2 text-white/70 transition-colors hover:border-svnctm-pink hover:bg-svnctm-pink hover:text-white"
            >
              <PinIcon size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
