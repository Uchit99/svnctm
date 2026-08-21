const productImages = {
  hero: '/images/products/lodhi-garden-hero.png',
  stone: '/images/products/lodhi-garden-stone.png',
  desk: '/images/products/lodhi-garden-desk.png',
  marble: '/images/products/lodhi-garden-marble.png',
  evening: '/images/products/lodhi-garden-evening.png',
  garden: '/images/products/lodhi-garden-garden.png',
} as const;

export const productImageBySlug: Record<string, string> = {
  'soft-sanctuary-candle': productImages.stone,
  'evening-ritual-candle': productImages.evening,
  'quiet-moment-candle': productImages.desk,
  'home-sanctuary-diffuser': productImages.marble,
  'zen-moment-candle': productImages.garden,
  'warm-glow-candle': productImages.hero,
  'serenity-diffuser': productImages.marble,
  'night-ritual-candle': productImages.evening,
};

export const productGallery = Object.values(productImages);

export const productCollageImages = [
  productImages.stone,
  productImages.evening,
  productImages.desk,
  productImages.garden,
  productImages.marble,
  productImages.hero,
];
