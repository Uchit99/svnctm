import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import { Heart, Truck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { productCatalog } from '@/lib/catalog';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { AddToCartButton } from '@/components/AddToCartButton';
import { ShareButton } from '@/components/ShareButton';
import { productGallery, productImageBySlug } from '@/lib/product-images';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return productCatalog.map(({ slug }) => ({ slug }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const selectedProduct = productCatalog.find((item) => item.slug === slug);
  if (!selectedProduct) notFound();
  const product = {
    ...selectedProduct,
    rating: 4.5,
    reviewCount: 12,
    weight: '250g',
    dimensions: '8cm H × 7cm Ø',
    materials: 'Soy Wax, Essential Oils, Cotton Wick',
    ingredients: 'Lavender Essential Oil (30%), Sandalwood Essential Oil (20%), Soy Wax (50%)',
    careInstructions: 'Trim wick to 1/4 inch before each burn. Allow wax to melt completely on first use.',
    images: [productImageBySlug[slug], ...productGallery.filter((image) => image !== productImageBySlug[slug])],
    inStock: true,
  };

  return (
    <>
      {/* Product Detail Section */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="relative overflow-hidden bg-svnctm-white-warm rounded-brand aspect-square mb-4">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.images.slice(1, 4).map((image, index) => (
                  <div
                    key={image}
                    className="relative overflow-hidden bg-svnctm-white-warm rounded-brand aspect-square cursor-pointer hover:ring-2 hover:ring-svnctm-pink transition-all"
                  >
                    <Image src={image} alt={`${product.name} view ${index + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <p className="text-xs text-svnctm-charcoal/60 uppercase tracking-wide font-medium mb-2">
                  {product.scent}
                </p>
                <h1 className="font-heading text-heading-1 text-svnctm-charcoal mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-svnctm-pink">★</span>
                    ))}
                  </div>
                  <span className="text-sm text-svnctm-charcoal/70">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-semibold text-svnctm-charcoal">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-lg text-svnctm-charcoal/50 line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>
                {product.comparePrice && (
                  <p className="text-sm text-svnctm-pink font-medium">
                    Save {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-body-base text-svnctm-charcoal/80 leading-relaxed">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 border border-gray-300 rounded-brand">
                    <button className="px-4 py-2">−</button>
                    <span className="px-4 py-2 font-medium">1</span>
                    <button className="px-4 py-2">+</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <AddToCartButton product={product} quantity={1} />
                  <Button variant="secondary" size="lg">
                    <Heart size={20} />
                  </Button>
                </div>

                <ShareButton title={product.name} />
              </div>

              {/* Delivery Info */}
              <div className="bg-svnctm-pink-light rounded-brand p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Truck size={20} className="text-svnctm-pink flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-svnctm-charcoal">Free shipping above ₹1000</p>
                    <p className="text-sm text-svnctm-charcoal/70">Order now, arrives in 3-5 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Product Sections */}
      <Section className="bg-svnctm-white-warm">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* The Atmosphere */}
            <div>
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal mb-4">
                The Atmosphere
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80 leading-relaxed">
                Soft lavender opens into warm sandalwood, creating an atmosphere of calm and introspection. This is the scent of a quiet room at dusk, when the day is finally yours. It settles into the space like a gentle embrace, inviting you to slow down and breathe.
              </p>
            </div>

            {/* The Ritual */}
            <div>
              <h2 className="font-heading text-heading-2 text-svnctm-charcoal mb-4">
                The Ritual
              </h2>
              <p className="text-body-base text-svnctm-charcoal/80 leading-relaxed">
                Light this candle as part of your evening routine. Let it burn for at least two hours on first use to ensure an even melt pool. Place it on a side table or shelf where you can see the soft glow while you read, reflect, or simply exist. This is not a background scent. This is a space you create for yourself.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Details Tab */}
      <Section className="bg-white">
        <Container>
          <h2 className="font-heading text-heading-2 text-svnctm-charcoal mb-8">Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-heading-4 text-svnctm-charcoal mb-2">Dimensions</h3>
                <p className="text-body-base text-svnctm-charcoal/70">{product.dimensions}</p>
              </div>

              <div>
                <h3 className="font-heading text-heading-4 text-svnctm-charcoal mb-2">Weight</h3>
                <p className="text-body-base text-svnctm-charcoal/70">{product.weight}</p>
              </div>

              <div>
                <h3 className="font-heading text-heading-4 text-svnctm-charcoal mb-2">Burn Time</h3>
                <p className="text-body-base text-svnctm-charcoal/70">{product.burnTime}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-heading-4 text-svnctm-charcoal mb-2">Materials</h3>
                <p className="text-body-base text-svnctm-charcoal/70">{product.materials}</p>
              </div>

              <div>
                <h3 className="font-heading text-heading-4 text-svnctm-charcoal mb-2">Fragrance Composition</h3>
                <p className="text-body-base text-svnctm-charcoal/70">{product.ingredients}</p>
              </div>

              <div>
                <h3 className="font-heading text-heading-4 text-svnctm-charcoal mb-2">Care Instructions</h3>
                <p className="text-body-base text-svnctm-charcoal/70">{product.careInstructions}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Reviews Section */}
      <Section className="bg-svnctm-white-warm">
        <Container>
          <h2 className="font-heading text-heading-2 text-svnctm-charcoal mb-8">Reviews</h2>

          <div className="bg-white rounded-brand p-8 text-center">
            <p className="text-svnctm-charcoal/70">No reviews yet. Be the first to review this product.</p>
            <Button variant="primary" className="mt-6">
              Write a Review
            </Button>
          </div>
        </Container>
      </Section>

      {/* Related Products */}
      <Section className="bg-white">
        <Container>
          <h2 className="font-heading text-heading-2 text-svnctm-charcoal mb-8">You May Also Like</h2>
          <p className="text-svnctm-charcoal/70">Related products would appear here.</p>
        </Container>
      </Section>
    </>
  );
}
