import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Container, Section } from '@/components/Layout';

const collections = [
  { number: '01', name: 'The Quiet Hour', copy: 'Soft florals and warm wood for the beginning and end of the day.', note: 'Lavender · Sandalwood · Amber', image: '/images/svnctm1.png' },
  { number: '02', name: 'The Sunday Table', copy: 'Fresh, generous scents that make an ordinary room feel open and alive.', note: 'Bergamot · Fig leaf · Cedar', image: '/images/svnctm2.png' },
  { number: '03', name: 'The Afterlight', copy: 'Smoky, grounded objects for evenings that ask you to stay a little longer.', note: 'Rose · Musk · Incense', image: '/images/svnctm4.png' },
];

export default function CollectionsPage() {
  return <>
    <Section noPadding className="relative overflow-hidden bg-svnctm-charcoal text-white"><Container className="grid min-h-[65svh] items-end gap-10 py-16 lg:grid-cols-2 lg:py-20"><div className="relative z-10 pb-5"><p className="eyebrow text-svnctm-pink-light">Collections</p><h1 className="mt-5 text-5xl leading-none tracking-[-.05em] sm:text-7xl">A scent for<br />the way you live.</h1><p className="mt-7 max-w-md text-lg leading-8 text-white/65">Three considered worlds, each designed around a different feeling of home.</p></div><div className="relative h-72 overflow-hidden rounded-[2rem] lg:h-[480px]"><Image src="/images/svnctm5.png" alt="SVNCTM candle in a garden setting" fill priority className="object-cover opacity-90" /></div></Container></Section>
    <Section className="bg-svnctm-white-warm py-24"><Container><div className="grid gap-5">{collections.map((collection, index) => <Link key={collection.number} href={`/shop?collection=${collection.number}`} className="group grid gap-5 overflow-hidden rounded-[1.75rem] border border-svnctm-charcoal/10 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-medium md:grid-cols-[150px_1fr_auto] md:items-center md:p-7"><div className="relative hidden aspect-square overflow-hidden rounded-2xl md:block"><Image src={collection.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" /></div><div><span className="text-xs font-semibold tracking-[.2em] text-svnctm-pink">{collection.number}</span><h2 className="mt-3 text-3xl tracking-tight text-svnctm-charcoal">{collection.name}</h2><p className="mt-3 max-w-xl leading-7 text-svnctm-charcoal/65">{collection.copy}</p><p className="mt-5 text-xs font-semibold uppercase tracking-[.14em] text-svnctm-charcoal/45">{collection.note}</p></div><span className={`flex h-14 w-14 items-center justify-center rounded-full transition-transform group-hover:rotate-45 ${index === 1 ? 'bg-svnctm-lavender' : 'bg-svnctm-pink-light'}`}><ArrowUpRight size={21} /></span></Link>)}</div></Container></Section>
    <Section className="bg-white py-20"><Container><div className="mx-auto max-w-2xl text-center"><Sparkles className="mx-auto text-svnctm-pink" size={20} /><h2 className="mt-4 text-4xl tracking-tight">Find your atmosphere.</h2><p className="mt-4 leading-7 text-svnctm-charcoal/65">Begin with a collection, then let your space tell you the rest.</p><Link href="/shop" className="mt-7 inline-flex rounded-full bg-svnctm-charcoal px-6 py-3 text-sm font-semibold text-white">Explore all objects</Link></div></Container></Section>
  </>;
}
