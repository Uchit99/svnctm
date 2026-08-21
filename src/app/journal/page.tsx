import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3 } from 'lucide-react';
import { Container, Section } from '@/components/Layout';
import { productAssetPath } from '@/lib/product-images';

const stories = [
  { category: 'Ritual', title: 'The art of making space for yourself.', excerpt: 'A home does not need to be perfect to feel restorative. It just needs a few small signals that tell you to exhale.', read: '4 min read' },
  { category: 'At home', title: 'A shelf with a point of view.', excerpt: 'The objects you keep close can make an ordinary corner feel quietly personal.', read: '3 min read' },
  { category: 'Scent notes', title: 'Why slower fragrance lasts.', excerpt: 'A considered scent has room to unfold and become part of the atmosphere.', read: '5 min read' },
];

export default function JournalPage() {
  return <>
    <Section className="bg-svnctm-white-warm pb-16 pt-24 lg:pt-32"><Container><p className="eyebrow">Journal</p><div className="mt-5 grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-end"><div><h1 className="text-5xl leading-none tracking-[-.05em] sm:text-7xl">Notes on<br />living slowly.</h1><p className="mt-7 max-w-xl text-lg leading-8 text-svnctm-charcoal/65">Thoughts on fragrance, considered spaces, and finding a little more room in the everyday.</p></div><div className="relative h-64 overflow-hidden rounded-[1.75rem]"><Image src={productAssetPath('/images/products/lodhi-garden-desk.png')} alt="SVNCTM candle on a wooden table" fill priority unoptimized className="object-cover" /></div></div></Container></Section>
    <Section className="bg-white py-20"><Container><article className="grid overflow-hidden rounded-[2rem] bg-svnctm-charcoal text-white lg:grid-cols-2"><div className="relative min-h-72"><Image src={productAssetPath('/images/products/lodhi-garden-evening.png')} alt="SVNCTM candle for an evening ritual" fill unoptimized className="object-cover" /></div><div className="flex flex-col justify-center p-8 lg:p-14"><p className="text-xs font-semibold uppercase tracking-[.18em] text-svnctm-pink-light">Featured story</p><h2 className="mt-5 text-4xl leading-tight tracking-tight text-white">The art of making space for yourself.</h2><p className="mt-5 leading-7 text-white/65">A home does not need to be perfect to feel restorative. It just needs a few small signals that tell you to exhale.</p><Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">Read the story <ArrowRight size={16} /></Link></div></article><div className="mt-16 grid gap-6 md:grid-cols-3">{stories.map((story) => <article key={story.title} className="group border-t border-svnctm-charcoal/15 pt-5"><p className="text-xs font-semibold uppercase tracking-[.16em] text-svnctm-pink">{story.category}</p><h2 className="mt-5 text-2xl leading-tight tracking-tight text-svnctm-charcoal group-hover:text-svnctm-pink">{story.title}</h2><p className="mt-4 leading-7 text-svnctm-charcoal/65">{story.excerpt}</p><div className="mt-6 flex items-center justify-between text-xs text-svnctm-charcoal/50"><span className="flex items-center gap-1"><Clock3 size={14} /> {story.read}</span><Link href="/about" className="font-semibold text-svnctm-charcoal">Read <ArrowRight className="inline" size={14} /></Link></div></article>)}</div></Container></Section>
  </>;
}
