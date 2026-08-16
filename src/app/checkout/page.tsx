'use client';

import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_SITE === 'true';

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [formData, setFormData] = useState({
    // Shipping Info
    fullName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'IN',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Mock order data
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const tax = Math.round((subtotal + shipping) * 0.18 * 100) / 100;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isStaticPreview) {
      setError('Checkout is unavailable in this static preview. Please visit the live store when it is deployed to a server-capable host.');
      return;
    }
    setIsProcessing(true);
    setError('');
    try {
      const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: cartItems, shippingAddress: formData }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'Unable to place order');
      router.push(`/order-confirmation?orderId=${encodeURIComponent(result.data.orderId)}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to place order');
      setIsProcessing(false);
    }
  };

  return (
    <Section className="bg-svnctm-white-warm min-h-screen py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {/* Progress Indicator */}
            <div className="mb-12 flex gap-4">
              <div
                className={`flex-1 text-center py-4 rounded-brand border-2 transition-all ${
                  step === 'shipping'
                    ? 'border-svnctm-pink bg-svnctm-pink-light'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <p className="font-medium text-svnctm-charcoal">1. Shipping</p>
              </div>
              <div
                className={`flex-1 text-center py-4 rounded-brand border-2 transition-all ${
                  step === 'payment'
                    ? 'border-svnctm-pink bg-svnctm-pink-light'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <p className="font-medium text-svnctm-charcoal">2. Payment</p>
              </div>
            </div>

            {/* Shipping Form */}
            {step === 'shipping' && (
              <div className="bg-white rounded-brand p-8 space-y-6">
                <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                  Shipping Address
                </h2>

                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>

                  {/* Apartment */}
                  <div>
                    <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                      Apartment, Suite, etc. (Optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>

                  {/* City, State, Postal */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="IN">India</option>
                    </select>
                  </div>

                  <Button type="submit" variant="primary" className="w-full mt-6">
                    Continue to Payment
                  </Button>
                </form>
              </div>
            )}

            {/* Payment Form */}
            {step === 'payment' && (
              <div className="bg-white rounded-brand p-8 space-y-6">
                <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                  Payment Method
                </h2>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="bg-svnctm-pink-light rounded-brand p-4 text-center">
                    <p className="text-svnctm-charcoal font-medium mb-2">
                      Secure Payment via Razorpay
                    </p>
                    <p className="text-sm text-svnctm-charcoal/70">
                      Your payment information is safely processed by Razorpay. We never store your card details.
                    </p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <p className="text-svnctm-charcoal font-medium">Available Payment Methods:</p>
                    <ul className="space-y-2 text-svnctm-charcoal/70">
                      <li>✓ UPI (Google Pay, PhonePe, Paytm, etc.)</li>
                      <li>✓ Credit/Debit Cards</li>
                      <li>✓ Net Banking</li>
                      <li>✓ Digital Wallets</li>
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <Button type="submit" variant="primary" className="w-full">
                      {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
                    </Button>
                  </div>

                  {error && <p role="alert" className="rounded-brand bg-red-50 p-3 text-center text-sm text-red-700">{error}</p>}

                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="w-full text-center text-svnctm-charcoal/70 hover:text-svnctm-charcoal text-sm"
                  >
                    Back to Shipping
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-brand p-6 sticky top-24 space-y-6">
              <h2 className="font-heading font-semibold text-lg text-svnctm-charcoal">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 border-b pb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-svnctm-charcoal/70">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-svnctm-charcoal font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-svnctm-charcoal/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-svnctm-charcoal/70">
                  <span>Shipping</span>
                  <span className="text-svnctm-pink font-medium">Free</span>
                </div>
                <div className="flex justify-between text-svnctm-charcoal/70">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                <div className="border-t pt-2 flex justify-between font-semibold text-svnctm-charcoal">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="text-xs text-svnctm-charcoal/60 text-center">
                <p>
                  By proceeding, you agree to our{' '}
                  <Link href="/terms" className="text-svnctm-pink hover:underline">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
