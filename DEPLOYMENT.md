# SVNCTM E-Commerce — Deployment Guide

Complete step-by-step guide to deploy the SVNCTM e-commerce platform to production.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Payment Gateway Configuration](#payment-gateway-configuration)
5. [Email Service Setup](#email-service-setup)
6. [Image & File Storage](#image--file-storage)
7. [Deployment to Vercel](#deployment-to-vercel)
8. [Deployment to Other Platforms](#deployment-to-other-platforms)
9. [Post-Deployment Configuration](#post-deployment-configuration)
10. [Monitoring & Maintenance](#monitoring--maintenance)

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations executed
- [ ] SSL/HTTPS certificate obtained
- [ ] Domain name configured
- [ ] Razorpay production account created
- [ ] Email service provider configured
- [ ] Image storage configured (AWS S3/Cloudinary)
- [ ] Security headers configured
- [ ] Monitoring tools set up
- [ ] Backup strategy in place
- [ ] Performance optimization complete
- [ ] SEO metadata configured
- [ ] Analytics configured

## Environment Setup

### Required Environment Variables

Create `.env.production` with the following variables:

```env
# Database (Production PostgreSQL)
DATABASE_URL="postgresql://user:password@db.provider.com:5432/svnctm_prod"

# Next.js & NextAuth
NODE_ENV="production"
NEXTAUTH_SECRET="generate-a-secure-random-secret"
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"

# Razorpay (Production Credentials)
RAZORPAY_KEY_ID="rzp_live_XXXXXXXXXXX"
RAZORPAY_KEY_SECRET="XXXXXXXXXXXXX"
RAZORPAY_WEBHOOK_SECRET="XXXXXXXXXXXXX"

# Email Service
EMAIL_PROVIDER="resend" # or "sendgrid", "mailgun", etc.
RESEND_API_KEY="re_XXXXXXXXXXX"
SENDGRID_API_KEY="SG.XXXXXXXXXXX" # if using SendGrid
EMAIL_FROM="noreply@svnctm.com"

# Image/File Storage
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="XXXXXXXXXXX"
CLOUDINARY_API_SECRET="XXXXXXXXXXX"
# OR for AWS S3:
AWS_ACCESS_KEY_ID="XXXXXXXXXXX"
AWS_SECRET_ACCESS_KEY="XXXXXXXXXXX"
AWS_S3_BUCKET="svnctm-images-prod"
AWS_REGION="ap-south-1"

# Analytics (Optional)
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXXX"
SENTRY_DSN="https://XXXXXXXXXXX@sentry.io/XXXX"

# Admin Settings
ADMIN_EMAIL="admin@svnctm.com"
```

### Environment Variable Management Best Practices

1. **Never commit .env files** to version control
2. **Use .env.example** as a template for developers
3. **Secure secrets** using your hosting platform's secret manager
4. **Rotate secrets regularly** (especially API keys)
5. **Use different keys** for development, staging, and production
6. **Log secret access** for audit trails
7. **Implement secret versioning** for easy rollback

## Database Setup

### PostgreSQL Production Database

#### Option 1: Managed Database Service (Recommended)

**AWS RDS**
1. Create PostgreSQL instance on AWS RDS
2. Choose production configuration (Multi-AZ for HA)
3. Set strong master password
4. Configure security groups to allow application access only
5. Enable automated backups (daily, 7-day retention)
6. Enable encryption at rest
7. Get connection string: `postgresql://user:password@endpoint:5432/svnctm`

**Heroku PostgreSQL**
1. Add PostgreSQL addon: `heroku addons:create heroku-postgresql:standard-0`
2. Get connection string: `heroku config:get DATABASE_URL`
3. Heroku automatically handles backups

**Railway**
1. Create PostgreSQL database from Railway dashboard
2. Get connection string from environment variables
3. Railway provides automatic daily backups

#### Option 2: Self-Hosted PostgreSQL

1. Install PostgreSQL on server
2. Configure `/etc/postgresql/postgresql.conf`:
   - `ssl = on` (enable SSL)
   - `max_connections = 200`
   - `shared_buffers = 256MB` (adjust for your server)
3. Create database and user:
   ```sql
   CREATE DATABASE svnctm_prod;
   CREATE USER svnctm_user WITH PASSWORD 'strong-password';
   ALTER ROLE svnctm_user SET client_encoding TO 'utf8';
   ALTER ROLE svnctm_user SET default_transaction_isolation TO 'read committed';
   ALTER ROLE svnctm_user SET default_transaction_deferrable TO on;
   ALTER ROLE svnctm_user SET default_transaction_level TO 'read committed';
   GRANT ALL PRIVILEGES ON DATABASE svnctm_prod TO svnctm_user;
   ```
4. Configure backups with pg_dump
5. Set up WAL archiving for point-in-time recovery

### Running Migrations

1. Connect to production database:
   ```bash
   DATABASE_URL="postgresql://..." npx prisma migrate deploy
   ```
2. Verify migrations succeeded
3. Keep migration history in version control
4. Test migrations in staging first

### Database Optimization

1. **Create indexes** for frequently queried columns:
   ```sql
   CREATE INDEX idx_orders_user_id ON "Order"(user_id);
   CREATE INDEX idx_orders_status ON "Order"(status);
   CREATE INDEX idx_products_category ON "Product"(category);
   CREATE INDEX idx_payment_razorpay_id ON "Payment"(razorpay_order_id);
   ```

2. **Set up connection pooling** (use PgBouncer):
   ```ini
   [svnctm_prod]
   host = db.example.com
   port = 5432
   database = svnctm_prod
   user = svnctm_user
   ```

3. **Monitor performance**:
   - Use `pg_stat_statements` to identify slow queries
   - Set up query execution time alerts
   - Monitor connection count

## Payment Gateway Configuration

### Razorpay Production Setup

1. **Upgrade to Razorpay Production Account**
   - Complete KYC verification
   - Submit business documents
   - Wait for approval (1-2 business days)

2. **Get Production Credentials**
   - Navigate to Settings → API Keys in Razorpay dashboard
   - Copy Live Key ID and Live Secret
   - Note: Live keys start with `rzp_live_`

3. **Configure Webhook**
   - Go to Settings → Webhooks in Razorpay dashboard
   - Webhook URL: `https://yourdomain.com/api/webhooks/razorpay`
   - Enable events:
     - `payment.authorized`
     - `payment.failed`
     - `payment.captured`
     - `refund.created`
   - Copy Webhook Secret
   - Test webhook delivery in dashboard

4. **Enable Webhooks in Application**
   ```typescript
   // Verify webhook signature (already implemented)
   // Ensure RAZORPAY_WEBHOOK_SECRET is set in production
   ```

5. **Set Payment Methods**
   - Log in to Razorpay dashboard
   - Configure payment methods to display (UPI, Cards, Net Banking, etc.)
   - Set payment limits and timeouts

6. **Test Production Payments**
   - Use Razorpay test credentials first
   - Switch to live credentials only after confirming test flow
   - Process a test payment to verify end-to-end

### Payment Security Checklist

- [ ] HTTPS enforced (payment verification requires HTTPS)
- [ ] RAZORPAY_KEY_SECRET never exposed in frontend
- [ ] Webhook signature verification implemented
- [ ] Order status validation before payment
- [ ] Inventory deduction on payment confirmation only
- [ ] Refund processing logic tested
- [ ] Payment timeout handling implemented
- [ ] Failed payment recovery flow working

## Email Service Setup

### Option 1: Resend (Recommended for Next.js)

1. **Sign up** at https://resend.com
2. **Create API key** in dashboard
3. **Verify sender domain**:
   ```bash
   # Add TXT and CNAME records to your domain DNS
   ```
4. **Install package**:
   ```bash
   npm install resend
   ```
5. **Configure in .env.production**:
   ```env
   EMAIL_PROVIDER="resend"
   RESEND_API_KEY="re_XXXXXXXXXXX"
   EMAIL_FROM="noreply@svnctm.com"
   ```

### Option 2: SendGrid

1. **Sign up** at https://sendgrid.com
2. **Create API key** (Settings → API Keys)
3. **Verify sender email** (Sender Authentication)
4. **Configure in .env.production**:
   ```env
   EMAIL_PROVIDER="sendgrid"
   SENDGRID_API_KEY="SG.XXXXXXXXXXX"
   EMAIL_FROM="noreply@svnctm.com"
   ```

### Email Templates

Create transactional email templates:

1. **Welcome Email** - Sent on registration
2. **Order Confirmation** - Sent after payment confirmation
3. **Payment Confirmation** - Payment receipt
4. **Order Processing** - Order is being prepared
5. **Order Packed** - Ready for shipment
6. **Order Shipped** - Tracking information included
7. **Out for Delivery** - Delivery today
8. **Order Delivered** - With return instructions
9. **Refund Initiated** - Refund details
10. **Refund Completed** - Confirmation

## Image & File Storage

### Option 1: AWS S3 (Scalable)

1. **Create AWS S3 bucket**:
   ```bash
   aws s3 mb s3://svnctm-images-prod --region ap-south-1
   ```

2. **Configure bucket**:
   - Enable versioning
   - Set public ACL for product images
   - Enable CloudFront CDN
   - Set lifecycle policy (delete old versions after 30 days)

3. **Create IAM user** for application:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:PutObject",
           "s3:GetObject",
           "s3:DeleteObject"
         ],
         "Resource": "arn:aws:s3:::svnctm-images-prod/*"
       }
     ]
   }
   ```

4. **Configure environment variables**:
   ```env
   AWS_ACCESS_KEY_ID="XXXXXXXXXXX"
   AWS_SECRET_ACCESS_KEY="XXXXXXXXXXX"
   AWS_S3_BUCKET="svnctm-images-prod"
   AWS_REGION="ap-south-1"
   ```

5. **Set up CloudFront distribution** for CDN
   - Faster image delivery globally
   - Reduced S3 costs

### Option 2: Cloudinary (Easy Setup)

1. **Sign up** at https://cloudinary.com
2. **Get Cloud Name** from dashboard
3. **Create upload preset** for product images
4. **Configure environment variables**:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="XXXXXXXXXXX"
   CLOUDINARY_API_SECRET="XXXXXXXXXXX"
   ```
5. **Enable auto optimization** and responsive images

### Image Optimization Configuration

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['yourdomain.com', 'd1234567.cloudfront.net', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
    sizes: [320, 640, 960, 1280, 1920],
    loader: 'cloudinary', // or 'akamai' for S3
  },
};
```

## Deployment to Vercel

### Prerequisites

- GitHub account with repository
- Vercel account
- Production environment variables ready

### Step-by-Step Deployment

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Connect to Vercel**
   - Log in to https://vercel.com
   - Click "New Project"
   - Select GitHub repository
   - Select `main` branch

3. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all production variables from `.env.production`
   - Ensure sensitive keys are added as "Encrypted"

4. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Node.js Version: `18.x` (latest LTS)

5. **Deploy**
   - Click Deploy
   - Vercel will automatically build and deploy
   - Domain assignment available in Settings

6. **Configure Custom Domain**
   - Go to Project Settings → Domains
   - Add custom domain (e.g., svnctm.com)
   - Update DNS records at domain registrar
   - Verify domain ownership

7. **Set Up Automatic Deployments**
   - Deployments automatically trigger on git push to main
   - Preview deployments for PRs available

### Post-Deployment Checks on Vercel

```bash
# Verify deployment
curl -I https://svnctm.com/

# Check environment variables loaded
# (Should see X-Powered-By: Next.js header)

# Test API routes
curl https://svnctm.com/api/products

# Verify SSL certificate
openssl s_client -connect svnctm.com:443
```

## Deployment to Other Platforms

### Railway Deployment

1. **Create Railway project**:
   - Link GitHub repository
   - Select Node.js environment

2. **Configure environment variables** in dashboard

3. **Configure build command**:
   - Build Command: `npm run build`
   - Start Command: `npm start`

4. **Provision PostgreSQL database**:
   - Add PostgreSQL service
   - Copy connection string to `DATABASE_URL`

5. **Deploy**:
   - Push to GitHub or manually deploy
   - Railway automatically builds and deploys

### Heroku Deployment

1. **Create Procfile**:
   ```
   web: npm start
   ```

2. **Create Heroku app**:
   ```bash
   heroku create svnctm-app
   ```

3. **Add PostgreSQL**:
   ```bash
   heroku addons:create heroku-postgresql:standard-0
   ```

4. **Set environment variables**:
   ```bash
   heroku config:set RAZORPAY_KEY_ID=rzp_live_XXXXXXX
   # ... set all variables
   ```

5. **Deploy**:
   ```bash
   git push heroku main
   ```

### AWS EC2 Deployment

1. **Launch EC2 instance** (Ubuntu 22.04 LTS)
   - t3.medium minimum (2GB RAM, 2 vCPU)
   - Open ports: 80, 443, 22

2. **Install dependencies**:
   ```bash
   sudo apt update && sudo apt upgrade
   sudo apt install nodejs npm postgresql-client nginx certbot python3-certbot-nginx
   ```

3. **Clone repository and install**:
   ```bash
   git clone <repo-url> /app
   cd /app
   npm install
   npm run build
   ```

4. **Configure .env.production**:
   ```bash
   sudo nano .env.production
   # Add all environment variables
   chmod 600 .env.production
   ```

5. **Set up systemd service**:
   ```bash
   sudo nano /etc/systemd/system/svnctm.service
   # [Unit]
   # Description=SVNCTM E-Commerce
   # After=network.target
   #
   # [Service]
   # User=ubuntu
   # WorkingDirectory=/app
   # ExecStart=/usr/bin/npm start
   # Restart=always
   #
   # [Install]
   # WantedBy=multi-user.target
   
   sudo systemctl enable svnctm
   sudo systemctl start svnctm
   ```

6. **Configure Nginx as reverse proxy**:
   ```nginx
   server {
     listen 80;
     server_name svnctm.com www.svnctm.com;
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

7. **Set up SSL with Certbot**:
   ```bash
   sudo certbot --nginx -d svnctm.com -d www.svnctm.com
   ```

8. **Configure firewall**:
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

## Post-Deployment Configuration

### SSL/HTTPS Configuration

- ✅ Obtain SSL certificate (Let's Encrypt free option available)
- ✅ Redirect HTTP to HTTPS
- ✅ Set HSTS header
- ✅ Configure HTTP/2 support
- ✅ Use strong cipher suites

### Security Headers

Add to `next.config.js`:

```typescript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
    ];
  },
};
```

### Content Security Policy

```typescript
// next.config.js
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' cdn.razorpay.com; style-src 'self' 'unsafe-inline'",
}
```

### Database Backups

1. **Automated backups** (configure in your database provider)
   - Daily backups, 7-day retention minimum
   - Weekly backups, 30-day retention
   - Monthly backups, 1-year retention

2. **Manual backup**:
   ```bash
   pg_dump postgresql://user:pass@host:5432/svnctm_prod > backup.sql
   ```

3. **Backup verification**:
   - Regularly test restore procedures
   - Document restoration process
   - Monitor backup success notifications

### Application Monitoring

1. **Set up error tracking** (Sentry):
   ```bash
   npm install @sentry/nextjs
   ```
   - Configure in `_app.tsx` and `_error.tsx`
   - Set performance monitoring threshold

2. **Implement logging**:
   - Use structured logging library
   - Log all API requests and errors
   - Monitor log files for anomalies

3. **Set up uptime monitoring**:
   - Use UptimeRobot or similar service
   - Monitor critical endpoints
   - Configure alerts for downtime

4. **Monitor database performance**:
   - Track slow query logs
   - Monitor connection pool usage
   - Alert on high memory/CPU usage

### Domain & DNS Configuration

1. **Point domain to hosting platform**
   - Update A records to point to server/CDN
   - Add CNAME records if required
   - Set up email records (MX, SPF, DKIM)

2. **Verify domain ownership**:
   - TXT record verification for SSL
   - DKIM for email authentication

3. **Configure email**:
   ```dns
   MX 10 mail.yourdomain.com
   SPF v=spf1 include:sendgrid.net ~all
   DKIM key from SendGrid/Resend dashboard
   ```

## Monitoring & Maintenance

### Weekly Tasks

- [ ] Review error logs and Sentry alerts
- [ ] Check database backup success
- [ ] Monitor application performance metrics
- [ ] Review failed payment transactions

### Monthly Tasks

- [ ] Update dependencies: `npm update`
- [ ] Audit security vulnerabilities: `npm audit`
- [ ] Review database performance
- [ ] Test disaster recovery procedures
- [ ] Review customer support tickets

### Quarterly Tasks

- [ ] Security penetration testing
- [ ] Database optimization review
- [ ] Capacity planning review
- [ ] Dependency major version updates
- [ ] Performance optimization

### Annual Tasks

- [ ] Security audit
- [ ] Complete infrastructure review
- [ ] Business continuity plan update
- [ ] Compliance verification (GDPR, data protection)

## Troubleshooting

### Common Issues

**Database Connection Timeout**
- Verify DATABASE_URL is correct
- Check database credentials
- Verify network/firewall rules
- Test connection locally first

**Payment Processing Fails**
- Verify Razorpay credentials
- Check webhook URL accessibility
- Review payment logs in Razorpay dashboard
- Ensure HTTPS is enabled

**Emails Not Sending**
- Verify email provider API key
- Check sender domain verification
- Review email logs
- Test with simple test email first

**Performance Issues**
- Monitor database query performance
- Check for N+1 query problems
- Implement caching strategies
- Use CDN for static assets
- Monitor server resource usage

---

## Support

For deployment issues:
1. Check logs (application, database, payment gateway)
2. Review error tracking service (Sentry)
3. Contact hosting platform support
4. Review detailed README.md

**Emergency Contact:** hello@svnctm.com
