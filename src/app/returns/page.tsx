import { Container, Section } from '@/components/Layout';

export default function ReturnsPage() {
  return (
    <Section className="bg-svnctm-white-warm py-20">
      <Container>
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="font-heading text-heading-1 text-svnctm-charcoal">
            Returns & Refunds Policy
          </h1>

          <div className="bg-white rounded-brand p-8 space-y-6">
            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Return Window
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                You have 30 days from the date of delivery to initiate a return. After 30 days, we are unable to accept returns or provide refunds.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Eligibility for Returns
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                Your item is eligible for return if:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body-base text-svnctm-charcoal/80">
                <li>The product is unused and in original condition</li>
                <li>The original packaging is intact</li>
                <li>The product is not damaged due to mishandling</li>
                <li>There are no signs of use or wear</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Non-Returnable Items
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                The following items cannot be returned:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body-base text-svnctm-charcoal/80">
                <li>Items that have been used or burnt</li>
                <li>Damaged products due to customer mishandling</li>
                <li>Items without original packaging</li>
                <li>Custom or personalized items</li>
                <li>Gift cards</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                How to Initiate a Return
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-body-base text-svnctm-charcoal/80">
                <li>Contact us at hello@svnctm.com with your order number</li>
                <li>Provide details and photos of the item</li>
                <li>Receive return authorization and shipping label</li>
                <li>Ship the item back to us</li>
                <li>Once received and inspected, we'll process your refund</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Return Shipping
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                Return shipping costs are the responsibility of the customer. However, if the return is due to our error or a defective product, we will cover the return shipping costs.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Refund Processing
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                Once we receive your return:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-body-base text-svnctm-charcoal/80">
                <li>We'll inspect the item (5-7 business days)</li>
                <li>If approved, we'll process your refund</li>
                <li>Refunds will be credited to your original payment method</li>
                <li>Processing time: 5-10 business days after approval</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Refund Amount
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                The refund amount will include the product price. Shipping charges (both original and return) are typically non-refundable unless the return is due to our error or a defective product.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Exchanges
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                We don't offer direct exchanges. However, you can return an item and place a new order for a different product. If you qualify for a refund, you can use it toward your new purchase.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Defective Products
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                If you receive a defective product, please contact us immediately with photos and details. We will arrange a replacement or refund at no additional cost to you.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Contact Us
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                For returns or refund inquiries, please contact us at hello@svnctm.com or call +91 9876 543 210.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
