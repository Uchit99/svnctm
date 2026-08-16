'use client';

import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoading(true);
    // TODO: Implement registration logic
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Section className="bg-svnctm-white-warm min-h-screen flex items-center justify-center py-20">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-brand p-8">
          <h1 className="font-heading text-heading-2 text-svnctm-charcoal mb-2 text-center">
            Join SVNCTM
          </h1>
          <p className="text-center text-svnctm-charcoal/70 mb-8">
            Create your account and discover your sanctum
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                Full Name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-3 text-svnctm-charcoal/50" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-svnctm-charcoal/50" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-svnctm-charcoal/50" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-svnctm-charcoal/50" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded accent-svnctm-pink"
                required
              />
              <label className="text-sm text-svnctm-charcoal/70">
                I agree to the{' '}
                <Link href="/terms" className="text-svnctm-pink hover:underline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-svnctm-pink hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="primary" className="w-full mt-6">
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Link */}
          <div className="mt-6 text-center text-sm border-t pt-4">
            <p className="text-svnctm-charcoal/70">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-svnctm-pink font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
