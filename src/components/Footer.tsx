import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/Layout';

const footerGroups = [
  { title: 'Shop', links: [['Candles', '/shop'], ['Rituals', '/collections'], ['Gifting', '/shop']] },
  { title: 'Studio', links: [['About', '/about'], ['Journal', '/journal'], ['Press', '/contact']] },
  { title: 'Care', links: [['Shipping', '/shipping-policy'], ['Returns', '/returns'], ['FAQ', '/contact']] },
  { title: 'Speak', links: [['hello@svnctm.co', 'mailto:hello@svnctm.co'], ['Instagram', 'https://instagram.com/svnctm'], ['Pinterest', 'https://pinterest.com/svnctm']] },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  return <footer className="overflow-hidden bg-[#070707] pb-7 pt-4 text-[#fff8f4]"><Container>
    <div className="flex items-center justify-between border-b border-white/20 py-5"><Link href="/" className="text-xl font-semibold tracking-[.3em] text-svnctm-pink">SVNCTM</Link><Link href="/shop" className="inline-flex w-fit items-center gap-2 rounded-full bg-svnctm-pink px-5 py-2 text-xs font-semibold text-white transition-transform hover:scale-105">Collect <ArrowUpRight size={14} /></Link></div>
    <div className="grid gap-10 py-11 lg:grid-cols-[.8fr_1.2fr]"><p className="max-w-sm text-3xl font-medium leading-tight tracking-tight text-white/90 sm:text-4xl">Make a little more space for the things that make you feel at home.</p><form className="self-start border-b border-white/70 pb-3 lg:mt-3"><label htmlFor="footer-email" className="sr-only">Your email address</label><div className="flex items-center gap-4"><input id="footer-email" type="email" placeholder="your@email.com" className="min-w-0 flex-1 bg-transparent text-lg text-white outline-none placeholder:text-[#cfe6ff]/80" /><button type="submit" className="whitespace-nowrap text-xs font-semibold uppercase tracking-[.24em] text-svnctm-pink hover:text-white">Subscribe →</button></div></form></div>
    <div className="relative -mx-1 select-none py-5 sm:py-8"><div aria-hidden="true" className="footer-wordmark">SVNCTM</div><p className="absolute right-[5%] top-[16%] text-[9px] font-semibold uppercase tracking-[.38em] text-svnctm-pink">Est. · A Sanctum</p></div>
    <div className="grid grid-cols-2 gap-10 border-b border-white/20 py-10 sm:grid-cols-4">{footerGroups.map((group) => <div key={group.title}><h2 className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-[#cfe6ff]">{group.title}</h2><nav className="flex flex-col items-start gap-2 text-xs font-semibold uppercase tracking-[.18em] text-white/90">{group.links.map(([label, href]) => <Link key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} className="hover:text-svnctm-pink">{label}</Link>)}</nav></div>)}</div>
    <div className="flex flex-col gap-4 pt-6 text-[10px] font-semibold uppercase tracking-[.22em] text-white/75 lg:flex-row lg:items-center lg:justify-between"><span className="text-lg tracking-[.28em] text-svnctm-pink">SVNCTM</span><span>© SVNCTM {currentYear} — Every Space, a Sanctum.</span></div>
  </Container></footer>;
}
