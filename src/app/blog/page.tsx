import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3 } from 'lucide-react';
import { Container, Section } from '@/components/Layout';

const posts = [
  {
    category: 'Scent notes',
    title: 'How to choose a scent for every room',
    excerpt: 'A simple guide to matching fragrance with the way you want each space to feel.',
    read: '5 min read',
  },
  {
    category: 'Ritual',
    title: 'A slower start to your evening',
    excerpt: 'Small cues that help the day soften into a more restorative night at home.',
    read: '4 min read',
  },
  {
    category: 'At home',
    title: 'The beauty of a considered shelf',
    excerpt: 'A few meaningful objects can make a room feel finished without feeling styled.',
    read: '3 min read',
  },
];

export default function BlogPage() {
  return (
    <>
      <Section className="bg-svnctm-white-warm pb-16 pt-24 lg:pt-32">
        <Container>
          <p className="eyebrow">Blog</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-end">
            <div>
              <h1 className="text-5xl leading-none tracking-[-.05em] sm:text-7xl">Ideas for a<br />slower home.</h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-svnctm-charcoal/65">Stories about scent, thoughtful spaces, and everyday rituals worth lingering over.</p>
            </div>
            <div className="relative h-64 overflow-hidden rounded-[1.75rem]">
              <Image src="/images/svnctm5.png" alt="SVNCTM candle in a botanical setting" fill priority className="object-cover" />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white py-20">
        <Container>
          <article className="grid overflow-hidden rounded-[2rem] bg-svnctm-charcoal text-white lg:grid-cols-2">
            <div className="relative min-h-72">
              <Image src="/images/svnctm4.png" alt="Lit SVNCTM candle in a dark, calm home" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-14">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-svnctm-pink-light">Featured post</p>
              <h2 className="mt-5 text-4xl leading-tight tracking-tight text-white">The art of creating a room to exhale in.</h2>
              <p className="mt-5 leading-7 text-white/65">You do not need more things to make a space feel like home. Start with the details that help you slow down.</p>
              <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">Read the post <ArrowRight size={16} /></Link>
            </div>
          </article>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <article key={post.title} className="group border-t border-svnctm-charcoal/15 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-svnctm-pink">{post.category}</p>
                <h2 className="mt-5 text-2xl leading-tight tracking-tight text-svnctm-charcoal group-hover:text-svnctm-pink">{post.title}</h2>
                <p className="mt-4 leading-7 text-svnctm-charcoal/65">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-xs text-svnctm-charcoal/50">
                  <span className="flex items-center gap-1"><Clock3 size={14} /> {post.read}</span>
                  <Link href="/about" className="font-semibold text-svnctm-charcoal">Read <ArrowRight className="inline" size={14} /></Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
