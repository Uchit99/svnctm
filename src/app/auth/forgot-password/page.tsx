import Link from 'next/link';
import { Container, Section } from '@/components/Layout';

export default function ForgotPasswordPage() {
  return (
    <Section className="min-h-screen bg-svnctm-white-warm py-24">
      <Container className="max-w-xl text-center">
        <p className="eyebrow">Account support</p>
        <h1 className="mt-3 text-4xl tracking-tight">Password recovery is coming soon.</h1>
        <p className="mt-4 text-svnctm-charcoal/65">Please return to sign in or contact us for account help.</p>
        <Link href="/auth/login" className="mt-8 inline-flex rounded-full bg-svnctm-charcoal px-6 py-3 text-sm font-semibold text-white">Return to sign in</Link>
      </Container>
    </Section>
  );
}
