import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Container, Section } from '@/components/Layout';

export default function WishlistPage() {
  return (
    <Section className="min-h-screen bg-svnctm-white-warm py-24">
      <Container className="max-w-xl text-center">
        <Heart className="mx-auto text-svnctm-pink" size={38} />
        <p className="eyebrow mt-6">Your favourites</p>
        <h1 className="mt-3 text-4xl tracking-tight">Save what speaks to you.</h1>
        <p className="mt-4 text-svnctm-charcoal/65">Your saved objects will appear here when account-based favourites are enabled.</p>
        <Link href="/shop" className="mt-8 inline-flex rounded-full bg-svnctm-charcoal px-6 py-3 text-sm font-semibold text-white">Explore the collection</Link>
      </Container>
    </Section>
  );
}
