export interface CatalogProduct {
  id: string; name: string; price: number; comparePrice?: number; scent: string; slug: string; category: string; sku: string; description: string; burnTime: string;
}

export const productCatalog: CatalogProduct[] = [
  { id: '1', name: 'Soft Sanctuary Candle', price: 899, comparePrice: 1200, scent: 'Lavender & Sandalwood', slug: 'soft-sanctuary-candle', category: 'candles', sku: 'SSC-001', description: 'A calm, handcrafted candle that pairs soft lavender with the warm depth of sandalwood.', burnTime: '40–50 hours' },
  { id: '2', name: 'Evening Ritual Candle', price: 899, scent: 'Cedarwood & Amber', slug: 'evening-ritual-candle', category: 'candles', sku: 'ERC-001', description: 'An after-dark blend of resinous cedarwood and glowing amber.', burnTime: '40–50 hours' },
  { id: '3', name: 'Quiet Moment Candle', price: 1299, scent: 'Rose & Bergamot', slug: 'quiet-moment-candle', category: 'candles', sku: 'QMC-001', description: 'A bright rose opening softened by the citrus lift of bergamot.', burnTime: '55–60 hours' },
  { id: '4', name: 'Home Sanctuary Diffuser', price: 1499, scent: 'Jasmine & Musk', slug: 'home-sanctuary-diffuser', category: 'diffusers', sku: 'HSD-001', description: 'A delicate, long-lasting diffuser for rooms that invite you to linger.', burnTime: '8–10 weeks' },
  { id: '5', name: 'Zen Moment Candle', price: 799, scent: 'Eucalyptus & Mint', slug: 'zen-moment-candle', category: 'candles', sku: 'ZMC-001', description: 'Clean eucalyptus and cool mint for a lucid, restorative pause.', burnTime: '35–40 hours' },
  { id: '6', name: 'Warm Glow Candle', price: 1099, scent: 'Vanilla & Honey', slug: 'warm-glow-candle', category: 'candles', sku: 'WGC-001', description: 'A comforting, golden blend that makes the room feel immediately lived in.', burnTime: '50–55 hours' },
  { id: '7', name: 'Serenity Diffuser', price: 1399, scent: 'Lavender & Chamomile', slug: 'serenity-diffuser', category: 'diffusers', sku: 'SED-001', description: 'A gentle floral diffuser for bedrooms, baths, and quiet corners.', burnTime: '8–10 weeks' },
  { id: '8', name: 'Night Ritual Candle', price: 999, scent: 'Chamomile & Lavender', slug: 'night-ritual-candle', category: 'candles', sku: 'NRC-001', description: 'A soothing evening composition for winding down with intention.', burnTime: '45–50 hours' },
];
