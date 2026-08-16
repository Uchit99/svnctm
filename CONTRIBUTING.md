# Contributing to SVNCTM

Guidelines for developers contributing to the SVNCTM e-commerce platform.

## Getting Started

1. Clone the repository
2. Follow [QUICKSTART.md](./QUICKSTART.md) to set up locally
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make changes following the style guide below
5. Commit with clear messages
6. Push and create a Pull Request

## Development Workflow

### Before Starting

- Read the full [README.md](./README.md) to understand the project
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for production considerations
- Review existing code in `src/` to understand conventions

### During Development

1. **Create descriptive branch names**
   ```bash
   git checkout -b feature/add-wishlist-page
   git checkout -b fix/payment-verification-bug
   git checkout -b docs/update-api-documentation
   ```

2. **Make atomic commits**
   ```bash
   git commit -m "Add wishlist page with product management"
   git commit -m "Fix Razorpay signature verification"
   ```

3. **Test locally before committing**
   ```bash
   npm run build  # Verify build succeeds
   npm run dev    # Test in browser
   ```

## Code Style & Conventions

### TypeScript

- Use strict types, avoid `any`
- Add JSDoc comments for functions
- Use interfaces for component props

```typescript
// Good
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
}

/**
 * Display a product card with image, price, and wishlist toggle
 * @param props - Product card properties
 * @returns JSX element
 */
export function ProductCard({ id, name, price, image }: ProductCardProps) {
  return <div>...</div>;
}

// Avoid
export function ProductCard(props: any) {
  return <div>...</div>;
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use descriptive naming

```typescript
// Good: Component name describes what it does
function ProductFilterSidebar() {
  const [category, setCategory] = useState('');
  // Component logic
}

// Avoid: Vague names
function Filter() {
  // Unclear what this filters
}
```

### Tailwind CSS

- Use semantic color names: `text-svnctm-pink`, `bg-svnctm-lavender`
- Follow mobile-first responsive design
- Group related classes together

```tsx
// Good: Mobile-first, semantic colors
<div className="px-4 md:px-6 lg:px-8 text-svnctm-charcoal hover:text-svnctm-pink transition-colors">
  Content
</div>

// Avoid: Random hex values
<div style={{ color: '#C54B8D', padding: '16px' }}>
  Content
</div>
```

### Database Changes

- Update `prisma/schema.prisma`
- Generate migration: `npx prisma migrate dev`
- Commit migration files with schema changes
- Document complex relationships

```prisma
// Good: Clear relationship with documentation
model Order {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  items     OrderItem[]  // Line items in this order
  payment   Payment?
  shipment  Shipment?
  
  @@index([userId])
  @@index([status])
}

// Avoid: No documentation or indexes
model Order {
  id     String
  userId String
  user   User @relation(fields: [userId], references: [id])
  // Missing indexes = slow queries
}
```

### API Routes

- Use consistent response format
- Validate input data
- Return appropriate HTTP status codes
- Handle errors gracefully

```typescript
// Good: Consistent response, validation, error handling
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Your logic here
    return NextResponse.json(
      { success: true, data: { id: '123' } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Avoid: Inconsistent response, no validation
export async function POST(request: NextRequest) {
  const data = await request.json();
  // Process without validation
  return NextResponse.json({ id: '123' });
}
```

## File Organization

### Pages

```
src/app/
├── page.tsx                    # Root page
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (shop)/
│   ├── shop/page.tsx
│   └── products/[slug]/page.tsx
└── admin/
    ├── page.tsx               # Dashboard
    ├── products/page.tsx
    └── orders/page.tsx
```

### Components

```
src/components/
├── Button.tsx                 # Reusable UI elements
├── Card.tsx
├── Header.tsx                 # Layout components
├── Footer.tsx
└── Product/
    ├── ProductCard.tsx        # Feature-specific components
    └── ProductGrid.tsx
```

### Utilities

```
src/lib/
├── auth.ts                    # Authentication
├── brand.ts                   # Brand constants
├── razorpay.ts               # Payment utilities
├── prisma.ts                 # Database client
└── utils.ts                  # Generic utilities
```

## Testing

### Local Testing Checklist

Before submitting a PR:

- [ ] All pages load without errors
- [ ] Forms validate correctly
- [ ] Navigation links work
- [ ] Responsive design on mobile/tablet
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] Build succeeds: `npm run build`

### Payment Testing

If modifying payment flow:

- [ ] Test with Razorpay test credentials
- [ ] Test successful payment
- [ ] Test failed payment
- [ ] Test webhook handling
- [ ] Check database records created

## Git Workflow

### Commit Messages

Use clear, descriptive commit messages:

```bash
# Good
git commit -m "Add product wishlist feature with toggle button"
git commit -m "Fix database query N+1 problem in orders API"
git commit -m "Update brand color palette in Tailwind config"

# Avoid
git commit -m "update code"
git commit -m "fixes"
git commit -m "WIP"
```

### Pull Request Template

When creating a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Performance improvement

## Changes Made
- Added X component
- Fixed bug in Y
- Updated Z documentation

## Testing
- [ ] Tested locally
- [ ] All existing tests pass
- [ ] Added new tests if applicable

## Screenshots (if applicable)
Link to screenshots or GIFs

## Breaking Changes
None / Describe any breaking changes
```

## Common Development Tasks

### Add a New Page

1. Create directory: `src/app/my-new-page/`
2. Create `page.tsx`
3. Update Header navigation links
4. Test on mobile and desktop
5. Add link to README if public page

### Add an API Endpoint

1. Create `src/app/api/endpoint-name/route.ts`
2. Implement GET/POST/PATCH/DELETE handlers
3. Add proper error handling
4. Document endpoint in README
5. Test with curl or Postman

### Modify Database Schema

1. Update `prisma/schema.prisma`
2. Run: `npx prisma migrate dev`
3. Name migration descriptively
4. Test with Prisma Studio: `npx prisma studio`
5. Commit migration files

### Update Styling

1. Update Tailwind classes (not inline styles)
2. Add custom colors to `tailwind.config.ts` if needed
3. Use SVNCTM brand colors from `lib/brand.ts`
4. Test on all breakpoints (mobile, tablet, desktop)

## Code Review Checklist

When reviewing code, check:

- [ ] TypeScript compiles without errors
- [ ] Code follows style guide
- [ ] No console.log statements (except errors)
- [ ] No hardcoded values (use constants)
- [ ] Error handling implemented
- [ ] Performance considerations addressed
- [ ] Tests included (if applicable)
- [ ] Documentation updated

## Common Issues & Solutions

### Build Fails After Changes

```bash
# Clear build cache and node_modules
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Database Migration Issues

```bash
# Reset database (development only!)
npx prisma migrate reset

# Or, roll back to previous migration
npx prisma migrate resolve --rolled-back "migration_name"
```

### Changes Not Reflecting

```bash
# Hard refresh browser
Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

# Or restart dev server
npm run dev
```

### TypeScript Errors

```bash
# Check for TS errors
npx tsc --noEmit

# Generate Prisma types
npx prisma generate
```

## Performance Guidelines

- Use `next/image` for all product images
- Implement pagination for large lists
- Add database indexes for frequently queried fields
- Use Prisma select to only fetch needed fields
- Implement caching where appropriate
- Lazy load components below the fold

## Security Guidelines

- Never commit `.env.local` or secrets
- Validate all user input on backend
- Verify payments server-side only
- Use HTTPS in production
- Implement CSRF protection for forms
- Sanitize user-generated content
- Use parameterized queries (Prisma handles this)
- Check user permissions before database operations

## Documentation

- Update README.md for feature changes
- Document API endpoints in code comments
- Add JSDoc comments to complex functions
- Update DEPLOYMENT.md for operational changes
- Keep QUICKSTART.md current

## Questions or Issues?

1. Check existing [README.md](./README.md) and [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Look for similar code in the repository
3. Review Prisma and Next.js documentation
4. Contact: hello@svnctm.com

---

**Thank you for contributing to SVNCTM!**

SVNCTM — Every Space, a Sanctum. 🎨✨
