'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return <div>
    <div className="relative mb-4 aspect-square overflow-hidden rounded-brand bg-svnctm-white-warm">
      <Image src={activeImage} alt={productName} fill priority unoptimized className="object-cover transition-opacity duration-300" />
    </div>
    <div className="grid grid-cols-3 gap-3">
      {images.slice(0, 3).map((image, index) => <button key={image} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show ${productName} view ${index + 1}`} aria-pressed={activeIndex === index} className={`relative aspect-square overflow-hidden rounded-brand bg-svnctm-white-warm transition-all ${activeIndex === index ? 'ring-2 ring-svnctm-pink ring-offset-2' : 'hover:ring-2 hover:ring-svnctm-pink/60'}`}><Image src={image} alt="" fill unoptimized className="object-cover" /></button>)}
    </div>
  </div>;
}
