'use client';

import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement contact form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Thank you for your message. We\'ll get back to you soon!');
    }, 1000);
  };

  return (
    <>
      {/* Hero */}
      <Section className="bg-svnctm-white-warm py-20">
        <Container>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="font-heading text-heading-1 text-svnctm-charcoal">
              Get in Touch
            </h1>
            <p className="text-body-lg text-svnctm-charcoal/70">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Info Cards */}
            <div className="bg-svnctm-white-warm rounded-brand p-8 text-center">
              <Mail size={32} className="mx-auto text-svnctm-pink mb-4" />
              <h3 className="font-heading text-heading-3 text-svnctm-charcoal mb-2">
                Email
              </h3>
              <a
                href="mailto:hello@svnctm.com"
                className="text-svnctm-charcoal/70 hover:text-svnctm-pink transition-colors"
              >
                hello@svnctm.com
              </a>
            </div>

            <div className="bg-svnctm-white-warm rounded-brand p-8 text-center">
              <Phone size={32} className="mx-auto text-svnctm-pink mb-4" />
              <h3 className="font-heading text-heading-3 text-svnctm-charcoal mb-2">
                Phone
              </h3>
              <a
                href="tel:+919876543210"
                className="text-svnctm-charcoal/70 hover:text-svnctm-pink transition-colors"
              >
                +91 9876 543 210
              </a>
            </div>

            <div className="bg-svnctm-white-warm rounded-brand p-8 text-center">
              <MapPin size={32} className="mx-auto text-svnctm-pink mb-4" />
              <h3 className="font-heading text-heading-3 text-svnctm-charcoal mb-2">
                Address
              </h3>
              <p className="text-svnctm-charcoal/70">
                Mumbai, India
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-svnctm-charcoal mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field h-32 resize-none"
                    required
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Image */}
            <div className="bg-svnctm-lavender rounded-brand aspect-square flex items-center justify-center">
              <MessageCircle size={80} className="text-svnctm-charcoal/10" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Response Time */}
      <Section bgColor="secondary">
        <Container>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="font-heading text-heading-2 text-svnctm-charcoal">
              We'll be in touch
            </h2>
            <p className="text-body-base text-svnctm-charcoal/80">
              We typically respond to all inquiries within 24 hours. Thank you for reaching out to SVNCTM.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
