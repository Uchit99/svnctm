import { Container, Section } from '@/components/Layout';

export default function PrivacyPolicy() {
  return (
    <Section className="bg-svnctm-white-warm py-20">
      <Container>
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="font-heading text-heading-1 text-svnctm-charcoal">
            Privacy Policy
          </h1>

          <div className="bg-white rounded-brand p-8 space-y-6">
            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Introduction
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                At SVNCTM, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect your information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Information We Collect
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                We collect information you provide directly, such as:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body-base text-svnctm-charcoal/80">
                <li>Contact information (name, email, phone)</li>
                <li>Shipping and billing addresses</li>
                <li>Payment information (processed securely through Razorpay)</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                How We Use Your Information
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                We use your information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body-base text-svnctm-charcoal/80">
                <li>Process and fulfill orders</li>
                <li>Send order confirmations and updates</li>
                <li>Respond to inquiries and provide customer support</li>
                <li>Improve our products and services</li>
                <li>Send marketing communications (only with your consent)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Data Security
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                We implement appropriate security measures to protect your personal data. Payment information is handled securely through Razorpay, and we do not store raw payment data on our servers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Your Rights
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                You have the right to access, correct, or delete your personal information. Please contact us to exercise these rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Contact Us
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                If you have any questions about this Privacy Policy, please contact us at hello@svnctm.com
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
