import { Container, Section } from '@/components/Layout';

export default function ShippingPolicy() {
  return (
    <Section className="bg-svnctm-white-warm py-20">
      <Container>
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="font-heading text-heading-1 text-svnctm-charcoal">
            Shipping Policy
          </h1>

          <div className="bg-white rounded-brand p-8 space-y-6">
            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Shipping Methods
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                We offer standard shipping throughout India via trusted courier partners. All orders are carefully packaged to ensure your products arrive in perfect condition.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Shipping Costs
              </h2>
              <div className="space-y-3 text-body-base text-svnctm-charcoal/80">
                <div className="flex justify-between border-b pb-2">
                  <span>Orders below ₹1000</span>
                  <span>₹100</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Orders ₹1000 and above</span>
                  <span>Free</span>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Delivery Timeline
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                Standard delivery takes 3-5 business days from order confirmation. Delivery dates are estimates and may vary based on:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body-base text-svnctm-charcoal/80">
                <li>Your location</li>
                <li>Courier partner schedules</li>
                <li>Public holidays and weekends</li>
                <li>Unforeseen circumstances</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Order Tracking
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                Once your order is shipped, you'll receive an email with tracking information. You can track your package in real-time using your order number and tracking link.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Delivery Address Requirements
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                Please ensure your delivery address is:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body-base text-svnctm-charcoal/80">
                <li>Complete and accurate</li>
                <li>A verifiable address (PO boxes are not accepted)</li>
                <li>Reachable by courier personnel</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Undelivered Packages
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                If a package is undelivered due to an incorrect address or inability to locate the recipient, the package will be returned to our warehouse. We will contact you immediately, and you may choose to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body-base text-svnctm-charcoal/80">
                <li>Provide a corrected address</li>
                <li>Receive a refund</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Lost or Damaged Packages
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                If your package arrives damaged or is lost:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-body-base text-svnctm-charcoal/80">
                <li>Contact us within 24 hours of delivery/loss</li>
                <li>Provide photos and order details</li>
                <li>We will arrange a replacement or refund</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                International Shipping
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                We currently ship within India. International shipping options may be available in the future. Please contact us for inquiries.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Contact Us
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                For any shipping-related queries, please contact us at hello@svnctm.com or call +91 9876 543 210.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
