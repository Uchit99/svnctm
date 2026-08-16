'use client';

import { Container, Section } from '@/components/Layout';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What are your products made from?',
      answer: 'All SVNCTM candles are made from premium soy wax with essential oils and cotton wicks. We use sustainably sourced materials to ensure quality and environmental responsibility.',
    },
    {
      question: 'How long does a candle burn?',
      answer: 'Burn time varies by product, but our standard candles typically burn for 40-50 hours. This can vary based on wick trimming and burning conditions.',
    },
    {
      question: 'What is your shipping policy?',
      answer: 'We offer free shipping on orders above ₹1000 within India. Standard delivery takes 3-5 business days. Orders are carefully packaged to ensure products arrive in perfect condition.',
    },
    {
      question: 'Can I return or exchange a product?',
      answer: 'Yes, we offer a 30-day return policy. If you\'re not satisfied with your purchase, please contact our customer care team with your order number.',
    },
    {
      question: 'Are your candles safe to use?',
      answer: 'Yes, all our candles are made with non-toxic materials and tested for safety. Always trim the wick to 1/4 inch before burning and never leave a candle unattended.',
    },
    {
      question: 'Do you offer gift wrapping?',
      answer: 'Yes! We offer beautiful gift wrapping for special occasions. Select the gift wrap option at checkout or contact us for custom requests.',
    },
  ];

  return (
    <>
      {/* Hero */}
      <Section className="bg-svnctm-white-warm py-20">
        <Container>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="font-heading text-heading-1 text-svnctm-charcoal">
              Frequently Asked Questions
            </h1>
            <p className="text-body-lg text-svnctm-charcoal/70">
              Find answers to common questions about SVNCTM products and services.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ List */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-svnctm-white-warm rounded-brand overflow-hidden hover:shadow-soft transition-shadow"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-svnctm-pink-light transition-colors"
                >
                  <h3 className="font-heading font-semibold text-svnctm-charcoal text-left">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    } text-svnctm-pink`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-white">
                    <p className="text-body-base text-svnctm-charcoal/80">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section bgColor="tertiary">
        <Container>
          <div className="text-center space-y-6">
            <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
              Still have questions?
            </h2>
            <p className="text-body-base text-svnctm-charcoal/70">
              Our customer care team is here to help. Reach out to us anytime.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-svnctm-pink text-white rounded-brand font-medium hover:opacity-90 transition-opacity"
            >
              Contact Us
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
