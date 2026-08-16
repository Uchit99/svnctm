# SVNCTM Quick Start Guide

Get the SVNCTM e-commerce platform up and running locally in 5 minutes.

## Prerequisites

- Node.js 18+ ([download](https://nodejs.org))
- PostgreSQL 14+ ([download](https://www.postgresql.org/download))
- Git
- Code editor (VS Code recommended)

## Quick Setup

### 1. Clone & Install (2 min)

```bash
cd /path/to/project
npm install
```

### 2. Set Up Environment (1 min)env

```bash
cp .env.example .env.local
```

Edit `.env.local` with your settings:
```env
# Database - Use your PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/svnctm_dev"

# Auth
NEXTAUTH_SECRET="your-random-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Razorpay (get from https://razorpay.com)
RAZORPAY_KEY_ID="rzp_test_XXXXX"
RAZORPAY_KEY_SECRET="XXXXX"
RAZORPAY_WEBHOOK_SECRET="XXXXX"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Setup (1 min)

```bash
# Create PostgreSQL database
createdb svnctm_dev

# Run migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio to view/manage data
npx prisma studio
```

### 4. Start Development Server (1 min)

```bash
npm run dev
```

**Open:** [http://localhost:3000](http://localhost:3000)

## Explore the Site

**Customer Pages:**
- Homepage: [/](http://localhost:3000/)
- Shop: [/shop](http://localhost:3000/shop)
- Product: [/products/test-product](http://localhost:3000/products/test-product)
- Cart: [/cart](http://localhost:3000/cart)
- Checkout: [/checkout](http://localhost:3000/checkout)
- About: [/about](http://localhost:3000/about)
- FAQ: [/faq](http://localhost:3000/faq)
- Contact: [/contact](http://localhost:3000/contact)

**Admin Pages:**
- Dashboard: [/admin](http://localhost:3000/admin)

**Policy Pages:**
- Privacy: [/privacy](http://localhost:3000/privacy)
- Terms: [/terms](http://localhost:3000/terms)
- Shipping: [/shipping-policy](http://localhost:3000/shipping-policy)
- Returns: [/returns](http://localhost:3000/returns)

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Open database GUI
npx prisma studio

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Reset database (development only!)
npx prisma migrate reset
```

## Common Tasks

### Add a New Page

1. Create folder: `src/app/new-page/`
2. Create file: `src/app/new-page/page.tsx`
3. Use this template:

```tsx
import { Container, Section } from '@/components/Layout';

export default function NewPage() {
  return (
    <Section className="bg-svnctm-white-warm py-20">
      <Container>
        <h1 className="font-heading text-heading-1 text-svnctm-charcoal">
          Page Title
        </h1>
        <p className="text-body-base text-svnctm-charcoal/80 mt-4">
          Your content here
        </p>
      </Container>
    </Section>
  );
}
```

4. Update header links in `src/components/Header.tsx`

### Add an API Route

1. Create file: `src/app/api/route-name/route.ts`
2. Use this template:

```tsx
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Your logic here
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Your logic here
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
```

### Add a Reusable Component

1. Create file: `src/components/MyComponent.tsx`
2. Export the component
3. Import where needed: `import { MyComponent } from '@/components/MyComponent'`

## Brand Colors (Use These!)

```css
/* Primary */
--svnctm-pink: #C54B8D
--svnctm-pink-light: #F7D8E6

/* Secondary */
--svnctm-lavender: #CFC8FF
--svnctm-cream: #FFF8F4
--svnctm-white-warm: #F7F5F2

/* Neutral */
--svnctm-charcoal: #2E2E2E

/* Sky Blue (for accents) */
--svnctm-sky-light: #CFE6FF
```

In Tailwind: `text-svnctm-pink`, `bg-svnctm-lavender`, etc.

## Database Models

Key models to know:
- **User** - Customers & admins
- **Product** - Catalog with images & variants
- **Order** - Order lifecycle
- **Payment** - Razorpay transactions
- **Shipment** - Delivery tracking
- **Inventory** - Stock levels
- **Coupon** - Discount codes
- **Review** - Product reviews
- **Wishlist** - Saved products
- **Notification** - Email/SMS/WhatsApp
- **WebhookEvent** - Payment webhook logs

See `prisma/schema.prisma` for full details.

## Testing Payment Flow

1. Use Razorpay test credentials (from dashboard)
2. Fill checkout form
3. Click "Pay with Razorpay"
4. Use test card: 4111 1111 1111 1111
5. Any future date, any CVV
6. Check order created in Prisma Studio

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev
```

**Database connection error?**
```bash
# Check PostgreSQL is running
# Fix DATABASE_URL in .env.local
# Try: psql -U postgres -c "CREATE DATABASE svnctm_dev;"
npx prisma migrate dev
```

**Module not found?**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Changes not showing?**
```bash
# Hard refresh
Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
# Or clear .next build folder
rm -rf .next
npm run dev
```

## Environment Variables Explained

| Variable | What It Does | Example |
|----------|------------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@localhost/db` |
| `NEXTAUTH_SECRET` | Session encryption | Random 32+ character string |
| `NEXTAUTH_URL` | Auth callback URL | `http://localhost:3000` |
| `RAZORPAY_KEY_ID` | Payment gateway API key | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Payment gateway secret | (Keep private!) |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook verification | (Keep private!) |
| `NEXT_PUBLIC_APP_URL` | Public app URL | `http://localhost:3000` |

## Project Structure

```
svnctm/
├── src/
│   ├── app/              # Pages & API routes
│   ├── components/       # Reusable React components
│   ├── lib/             # Utilities & configs
│   └── app/globals.css  # Global styles
├── prisma/
│   └── schema.prisma    # Database schema
├── public/              # Static files
├── .env.example         # Example env vars
├── README.md            # Full documentation
├── DEPLOYMENT.md        # Production guide
└── package.json
```

## Next Steps

1. ✅ Run locally
2. ✅ Explore pages
3. ✅ Test payment flow with test credentials
4. ✅ Check Prisma Studio for database
5. 📖 Read [README.md](./README.md) for full docs
6. 🚀 Read [DEPLOYMENT.md](./DEPLOYMENT.md) to go live

## Support

- Full documentation: [README.md](./README.md)
- Deployment guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Issues? Check logs in terminal
- Questions? Contact: hello@svnctm.com

---

**Happy coding! 🎨✨**

SVNCTM — Every Space, a Sanctum.
