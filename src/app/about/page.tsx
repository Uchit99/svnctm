import { Container, Section } from '@/components/Layout';
import { BRAND_COPY, BRAND_VALUES } from '@/lib/brand';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="min-h-screen flex items-center justify-center bg-svnctm-white-warm" noPadding>
        <Container className="py-20">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="font-heading text-hero font-bold text-svnctm-charcoal">
              Every Space, a Sanctum.
            </h1>
            <p className="text-body-lg text-svnctm-charcoal/80">
              {BRAND_COPY.mission}
            </p>
          </div>
        </Container>
      </Section>

      {/* Story */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-heading-1 text-svnctm-charcoal">
                What is SVNCTM?
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80 leading-relaxed">
                SVNCTM is inspired by <em>Sanctum</em> — a sanctuary. A quiet space. A place that feels like home. A feeling.
              </p>
              <p className="text-heading-4 font-semibold text-svnctm-charcoal">
                {BRAND_COPY.concept}
              </p>
              <p className="text-body-base text-svnctm-charcoal/80 leading-relaxed">
                We believe in a philosophy: <em>{BRAND_COPY.philosophy}</em>
              </p>
              <p className="text-body-base text-svnctm-charcoal/80 leading-relaxed">
                Every product should look beautiful before it's even used. Every object should feel intentional. Every space should feel like home.
              </p>
            </div>
            <div className="w-full aspect-square bg-svnctm-lavender rounded-brand" />
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section bgColor="secondary">
        <Container>
          <h2 className="font-heading text-heading-1 text-svnctm-charcoal text-center mb-16">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {BRAND_VALUES.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-brand p-8 hover:shadow-soft transition-shadow"
              >
                <h3 className="font-heading text-heading-4 text-svnctm-pink mb-3">
                  {value.title}
                </h3>
                <p className="text-body-sm text-svnctm-charcoal/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team / Mission */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8 text-center">
            <h2 className="font-heading text-heading-1 text-svnctm-charcoal">
              Our Mission
            </h2>
            <p className="text-body-base text-svnctm-charcoal/80 leading-relaxed">
              {BRAND_COPY.mission}
            </p>
            <h2 className="font-heading text-heading-1 text-svnctm-charcoal pt-8">
              Our Vision
            </h2>
            <p className="text-body-base text-svnctm-charcoal/80 leading-relaxed">
              {BRAND_COPY.vision}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
