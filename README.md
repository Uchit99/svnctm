# SVNCTM — E-Commerce Platform

A production-ready, fully responsive e-commerce website for **SVNCTM**, a contemporary lifestyle brand creating thoughtfully designed objects that happen to smell incredible.

**Tagline:** Every Space, a Sanctum.

## Overview

This is a complete end-to-end e-commerce platform built with modern technologies:

- **Frontend:** Next.js 16 + React + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL + Prisma ORM
- **Payments:** Razorpay
- **Authentication:** NextAuth.js
- **UI Framework:** Custom component library with SVNCTM brand styling

## Project Structure

```
svnctm/
├── src/
│   ├── app/
│   │   ├── (pages)/           # Main pages (home, shop, about, etc.)
│   │   ├── api/               # Backend API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── products/          # Product detail pages
│   │   ├── layout.tsx         # Root layout with Header/Footer
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable React components
│   ├── lib/
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── brand.ts           # Brand constants and values
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── razorpay.ts        # Razorpay utilities
│   │   └── utils.ts           # Helper functions
│   └── app/globals.css        # Global styles
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── .env.example               # Environment variables template
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database
- Razorpay account (for payment processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd svnctm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/svnctm"

   # NextAuth
   NEXTAUTH_SECRET="generate-a-random-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # Razorpay
   RAZORPAY_KEY_ID="your_key_id"
   RAZORPAY_KEY_SECRET="your_key_secret"
   RAZORPAY_WEBHOOK_SECRET="your_webhook_secret"

   # Application
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

   This will:
   - Create the PostgreSQL database
   - Run migrations
   - Generate Prisma client
   - (Optionally) seed the database with sample data

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Environment Variables

Key environment variables to configure:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `RAZORPAY_KEY_ID` | Razorpay API Key ID | Yes |
| `RAZORPAY_KEY_SECRET` | Razorpay API Secret (never expose) | Yes |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay Webhook Secret | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL for client-side | Yes |

### Database Setup

The application uses PostgreSQL with Prisma ORM. The schema includes:

- **Users:** Customer and admin accounts
- **Products:** Product catalog with images and variants
- **Orders:** Complete order lifecycle management
- **Payments:** Payment records with Razorpay integration
- **Shipments:** Shipping and tracking information
- **Notifications:** Email, SMS, WhatsApp notifications
- **Coupons:** Discount code management
- **Reviews:** Product reviews and ratings
- **Wishlist:** Customer saved items

### Razorpay Integration

The application integrates with Razorpay for secure payment processing:

1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Generate API keys from your dashboard
3. Configure webhook URL: `https://yourdomain.com/api/webhooks/razorpay`
4. Set environment variables with your credentials

**Security Note:** Never expose `RAZORPAY_KEY_SECRET` in frontend code. All payment verification happens server-side.

## Features

### Customer Features

- ✅ **Product Browsing:** Browse products with filters and search
- ✅ **Product Details:** Comprehensive product information
- ✅ **Wishlist:** Save favorite products
- ✅ **Shopping Cart:** Add/remove items, quantity management
- ✅ **User Authentication:** Register, login, profile management
- ✅ **Checkout:** Multi-step checkout process
- ✅ **Razorpay Payment:** Secure payment processing
- ✅ **Order Tracking:** Real-time order status updates
- ✅ **Order History:** View past orders and details
- ✅ **Reviews:** Submit and read product reviews
- ✅ **Newsletter:** Email subscription
- ✅ **Responsive Design:** Mobile-optimized experience

### Admin Features

- 📊 **Dashboard:** Overview of key metrics
- 🛍️ **Product Management:** Add, edit, delete products
- 📦 **Order Management:** View, update, track orders
- 👥 **Customer Management:** View customer information
- 📊 **Inventory Management:** Track stock levels
- 🏷️ **Coupon Management:** Create and manage discounts
- 📤 **Shipment Management:** Update shipping information
- 📝 **Content Management:** Manage website content

### Payment Features

- 💳 **Multiple Payment Methods:** UPI, Cards, Net Banking, Wallets
- 🔒 **Secure Payment Processing:** Server-side verification
- 🔄 **Webhook Handling:** Real-time payment status updates
- 📋 **Order State Machine:** Reliable order status tracking
- 🔐 **PCI Compliance:** Razorpay handles payment security

### Notification Features

- 📧 **Email Notifications:** Order confirmations, shipping updates
- 📱 **SMS Support:** SMS notifications (requires API configuration)
- 💬 **WhatsApp Support:** WhatsApp notifications (requires API configuration)
- 🔔 **In-App Notifications:** Real-time notifications in dashboard

## Brand Design System

The application follows the SVNCTM brand guidelines:

### Colors
- **Signature Pink:** #C54B8D
- **Soft Blush:** #F7D8E6
- **Dusty Lavender:** #CFC8FF
- **Cream:** #FFF8F4
- **Warm White:** #F7F5F2
- **Charcoal:** #2E2E2E
- **Black:** #000000

### Typography
- **Headings:** Neue Montreal (or system fonts as fallback)
- **Body:** Avenir (or system fonts as fallback)

### Brand Philosophy
- Calm and contemporary
- Soft and artistic
- Playful and intimate
- Intentional and curated
- Design-first approach

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server

# Database
npx prisma migrate  # Run database migrations
npx prisma studio   # Open Prisma Studio GUI
npx prisma seed     # Seed database

# Code Quality
npm run lint        # Run ESLint
npm run lint:fix    # Fix linting errors
npm run type-check  # Check TypeScript types
```

## API Endpoints

### Products
- `GET /api/products` - List products (with filtering and pagination)
- `GET /api/products/[id]` - Get product details

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/[id]` - Get order details
- `PATCH /api/orders/[id]` - Update order status

### Payments
- `POST /api/payments/verify` - Verify payment signature
- `POST /api/webhooks/razorpay` - Razorpay webhook handler

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/session` - Get current session

## Pages

### Public Pages
- `/` - Homepage
- `/shop` - Product listing
- `/products/[slug]` - Product details
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/order-confirmation` - Order confirmation
- `/about` - About/Brand story
- `/faq` - Frequently asked questions
- `/contact` - Contact form
- `/auth/login` - Login
- `/auth/register` - Registration
- `/privacy` - Privacy policy
- `/terms` - Terms & conditions
- `/shipping-policy` - Shipping information
- `/returns` - Returns & refunds

### Admin Pages
- `/admin/dashboard` - Analytics dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/customers` - Customer management
- `/admin/inventory` - Inventory tracking
- `/admin/coupons` - Coupon management

## Database Schema Highlights

Key models:
- **User:** Customer and admin users with authentication
- **Product:** Complete product information with images and variants
- **Order:** Order lifecycle with status tracking
- **Payment:** Razorpay payment records with verification
- **Shipment:** Shipping and tracking information
- **Notification:** Multi-channel notification records
- **WebhookEvent:** Webhook event logging for audit trail

## Deployment

### Prerequisites for Production

1. PostgreSQL database (managed service like AWS RDS, Heroku PostgreSQL, etc.)
2. Razorpay production account
3. Email service (Resend, SendGrid, etc.) for transactional emails
4. Image hosting (AWS S3, Cloudinary, etc.) for product images
5. Hosting platform (Vercel, Railway, Heroku, etc.)

### Deployment Steps

1. **Configure environment variables** on your hosting platform
2. **Run database migrations** on production database
3. **Build the application:** `npm run build`
4. **Start the server:** `npm start`
5. **Configure Razorpay webhook** to point to production domain
6. **Set up SSL/HTTPS** (required for payment processing)

### Recommended Hosting Platforms
- **Vercel:** Optimized for Next.js, simple deployment
- **Railway:** Full-stack hosting with PostgreSQL
- **Heroku:** Popular PaaS option
- **AWS:** Maximum flexibility and scalability

## Security Considerations

1. **Never expose secrets:** Keep API keys and secrets in environment variables
2. **HTTPS only:** Always use HTTPS in production
3. **Payment verification:** Always verify payments server-side
4. **Input validation:** Validate all user inputs
5. **CSRF protection:** Implement CSRF tokens for state-changing requests
6. **Rate limiting:** Implement rate limiting on sensitive endpoints
7. **Database:** Use strong passwords and restrict database access
8. **Headers:** Implement security headers (CSP, X-Frame-Options, etc.)

## Performance Optimization

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Database query optimization with Prisma
- Caching strategies for frequently accessed data
- CDN for static assets
- Server-side rendering where appropriate
- API response caching

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
# Verify DATABASE_URL is correct
# Run migrations: npx prisma migrate dev
```

### Payment Not Working
- Verify Razorpay credentials are correct
- Check webhook URL is accessible from Razorpay
- Check logs for signature verification errors
- Ensure HTTPS is enabled in production

### Image Issues
- Ensure images are in public/ folder or external CDN
- Check image paths are correct
- Verify image dimensions for optimal display

## Support & Maintenance

- Review logs regularly for errors
- Monitor database performance
- Keep dependencies updated: `npm update`
- Regular database backups (especially for production)
- Monitor Razorpay transaction logs
- Review customer notifications for delivery issues

## License

This project is proprietary and confidential to SVNCTM.

## Contact

For technical support or inquiries:
- Email: hello@svnctm.com
- Phone: +91 9876 543 210

---

**SVNCTM**
Every Space, a Sanctum.

