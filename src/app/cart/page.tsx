'use client';

import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/components/CartProvider';
import { productAssetPath, productImageBySlug } from '@/lib/product-images';

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal > 1000 ? 0 : 100;
  const tax = Math.round((subtotal + shippingCost) * 0.18 * 100) / 100;
  const total = subtotal + shippingCost + tax;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  if (cartItems.length === 0) {
    return (
      <Section className="bg-svnctm-white-warm min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center space-y-6">
            <h1 className="font-heading text-heading-2 text-svnctm-charcoal">
              Your sanctum is still waiting.
            </h1>
            <p className="text-body-base text-svnctm-charcoal/70">
              Discover objects that speak to you.
            </p>
            <Button variant="primary">
              <Link href="/shop">Explore Objects</Link>
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="bg-svnctm-white-warm min-h-screen py-20">
      <Container>
        <h1 className="font-heading text-heading-1 text-svnctm-charcoal mb-12">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-brand overflow-hidden">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 p-6 border-b last:border-b-0 hover:bg-svnctm-white-warm transition-colors"
                >
                  {/* Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-brand bg-svnctm-white-warm">
                    <Image
                      src={productImageBySlug[item.slug] ?? productAssetPath('/images/products/lodhi-garden-hero.png')}
                      alt={item.name}
                      fill
                      unoptimized
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-svnctm-charcoal mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-svnctm-charcoal/70 mb-3">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 w-fit border border-gray-300 rounded-brand">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-svnctm-pink-light transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-svnctm-pink-light transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="text-right">
                    <p className="font-semibold text-svnctm-charcoal mb-4">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-svnctm-charcoal/50 hover:text-svnctm-pink transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Button variant="ghost">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-brand p-6 sticky top-24 space-y-4">
              <h2 className="font-heading font-semibold text-lg text-svnctm-charcoal mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-svnctm-charcoal/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-svnctm-charcoal/70">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-svnctm-pink font-medium">Free</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-svnctm-charcoal/70">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-semibold text-svnctm-charcoal">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="text-xs text-center text-svnctm-charcoal/60 py-4">
                {shippingCost === 0 ? (
                  <p>You qualify for free shipping!</p>
                ) : (
                  <p>Add ₹{1000 - subtotal} more for free shipping.</p>
                )}
              </div>

              <Button variant="primary" className="w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              {/* Message */}
              <p className="text-xs text-center text-svnctm-charcoal/60 italic">
                &ldquo;A little more atmosphere is waiting.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
