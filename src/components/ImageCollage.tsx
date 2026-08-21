import Image from 'next/image';
import { productCollageImages } from '@/lib/product-images';

const collageItems = [
  { image: productCollageImages[0], alt: 'SVNCTM candle on a textured stone tray', className: 'col-span-7 row-span-2 aspect-[4/5] sm:col-span-5' },
  { image: productCollageImages[1], alt: 'SVNCTM candle in an evening setting', className: 'col-span-5 row-span-1 aspect-[16/9] sm:col-span-7' },
  { image: productCollageImages[2], alt: 'SVNCTM candle beside a book on a desk', className: 'col-span-5 row-span-1 aspect-[16/10] sm:col-span-3' },
  { image: productCollageImages[3], alt: 'SVNCTM candle in a garden setting', className: 'col-span-7 row-span-2 aspect-[4/3] sm:col-span-4' },
  { image: productCollageImages[4], alt: 'SVNCTM candle in a quiet bathroom ritual', className: 'col-span-6 row-span-1 aspect-square sm:col-span-5' },
  { image: productCollageImages[5], alt: 'SVNCTM candle in a warm interior', className: 'col-span-6 row-span-1 aspect-square sm:col-span-5' },
];

export function ImageCollage() {
  return <div className="grid grid-cols-12 gap-3 sm:gap-4">{collageItems.map(({ image, alt, className }) => <div key={image} className={`group relative overflow-hidden rounded-[1.25rem] bg-svnctm-white-warm shadow-sm ${className}`}><Image src={image} alt={alt} fill unoptimized sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 24vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" /></div>)}</div>;
}
