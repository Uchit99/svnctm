import { Container, Section } from '@/components/Layout';

export default function TermsPage() {
  return (
    <Section className="bg-svnctm-white-warm py-20">
      <Container>
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="font-heading text-heading-1 text-svnctm-charcoal">
            Terms & Conditions
          </h1>

          <div className="bg-white rounded-brand p-8 space-y-6">
            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Agreement to Terms
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Use License
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                Permission is granted to temporarily download one copy of the materials (information or software) on SVNCTM's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body-base text-svnctm-charcoal/80">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Disclaimer
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                The materials on SVNCTM's website are provided on an 'as is' basis. SVNCTM makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Limitations
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                In no event shall SVNCTM or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SVNCTM's website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Accuracy of Materials
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                The materials appearing on SVNCTM's website could include technical, typographical, or photographic errors. SVNCTM does not warrant that any of the materials on its website are accurate, complete, or current. SVNCTM may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Links
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                SVNCTM has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by SVNCTM of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Modifications
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                SVNCTM may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
                Governing Law
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80">
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts located in India.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
