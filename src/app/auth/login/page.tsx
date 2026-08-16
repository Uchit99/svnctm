'use client';

import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement login logic
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Section className="bg-svnctm-white-warm min-h-screen flex items-center justify-center py-20">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-brand p-8">
          <h1 className="font-heading text-heading-2 text-svnctm-charcoal mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-center text-svnctm-charcoal/70 mb-8">
            Sign in to your SVNCTM account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Submit Button */}
            <Button type="submit" variant="primary" className="w-full mt-6">
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3 text-center text-sm">
            <Link href="/auth/forgot-password" className="text-svnctm-pink hover:underline block">
              Forgot your password?
            </Link>

            <div className="border-t pt-4">
              <p className="text-svnctm-charcoal/70 mb-2">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-svnctm-pink font-medium hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
