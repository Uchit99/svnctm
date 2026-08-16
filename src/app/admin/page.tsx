import Link from 'next/link';
import { Box, PackageCheck, Settings, ShoppingBag, Users } from 'lucide-react';
import { Container, Section } from '@/components/Layout';
import { requireAdmin } from '@/lib/admin';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';

const managementAreas = [
  { href: '/admin/orders', title: 'Orders', description: 'Review payment, fulfilment, and delivery status.', icon: ShoppingBag },
  { href: '/admin/products', title: 'Products', description: 'Maintain product details, prices, and catalogue visibility.', icon: Box },
  { href: '/admin/customers', title: 'Customers', description: 'Review customer details and order history.', icon: Users },
  { href: '/admin/inventory', title: 'Inventory', description: 'Track stock levels and low-stock thresholds.', icon: PackageCheck },
  { href: '/admin/settings', title: 'Store settings', description: 'Manage customer-facing details and notification settings.', icon: Settings },
];

export default async function AdminDashboard() {
  await requireAdmin();
  const [sales, orderCount, productCount, pendingOrders, recentOrders] = await Promise.all([
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: 'COMPLETED' } }),
    prisma.order.count(),
    prisma.product.count(),
    prisma.order.count({ where: { status: { in: ['PENDING_PAYMENT', 'PAYMENT_CONFIRMED', 'PROCESSING'] } } }),
    prisma.order.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { shippingAddress: true } }),
  ]);

  const metrics = [
    { label: 'Completed sales', value: formatPrice(sales._sum.total ?? 0), detail: 'All paid orders' },
    { label: 'Total orders', value: orderCount, detail: `${pendingOrders} need attention` },
    { label: 'Products', value: productCount, detail: 'Catalogue records' },
  ];

  return <><section className="bg-svnctm-charcoal py-10 text-white"><Container><p className="eyebrow text-svnctm-pink-light">Private workspace</p><h1 className="mt-3 text-4xl text-white">Store administration</h1><p className="mt-3 text-sm text-white/70">Manage the operational side of SVNCTM from one protected place.</p></Container></section><Section className="bg-svnctm-white-warm py-14"><Container><div className="grid gap-5 md:grid-cols-3">{metrics.map((metric) => <div key={metric.label} className="rounded-brand bg-white p-6 shadow-soft"><p className="text-xs font-semibold uppercase tracking-[.14em] text-svnctm-charcoal/55">{metric.label}</p><p className="mt-3 text-3xl font-semibold text-svnctm-pink">{metric.value}</p><p className="mt-2 text-sm text-svnctm-charcoal/65">{metric.detail}</p></div>)}</div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{managementAreas.map(({ href, title, description, icon: Icon }) => <Link key={href} href={href} className="group rounded-brand border border-svnctm-charcoal/10 bg-white p-6 transition hover:-translate-y-1 hover:border-svnctm-pink hover:shadow-soft"><Icon size={22} className="text-svnctm-pink" /><h2 className="mt-5 text-xl">{title}</h2><p className="mt-2 text-sm leading-6 text-svnctm-charcoal/65">{description}</p><span className="mt-5 inline-block text-sm font-semibold text-svnctm-pink">Open workspace →</span></Link>)}</div></Container></Section><Section className="bg-white py-14"><Container><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Latest activity</p><h2 className="mt-3 text-3xl">Recent orders</h2></div><Link href="/admin/orders" className="text-sm font-semibold text-svnctm-pink hover:underline">View all orders</Link></div><div className="mt-7 overflow-hidden rounded-brand border border-svnctm-charcoal/10"><table className="w-full min-w-[580px] text-left text-sm"><thead className="bg-svnctm-white-warm text-xs uppercase tracking-[.12em] text-svnctm-charcoal/55"><tr><th className="px-5 py-4">Order</th><th className="px-5 py-4">Customer</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Total</th></tr></thead><tbody>{recentOrders.length ? recentOrders.map((order) => <tr key={order.id} className="border-t border-svnctm-charcoal/10"><td className="px-5 py-4 font-medium text-svnctm-charcoal">{order.orderNumber}</td><td className="px-5 py-4 text-svnctm-charcoal/70">{order.shippingAddress?.fullName ?? '—'}</td><td className="px-5 py-4"><span className="rounded-full bg-svnctm-pink-light px-3 py-1 text-xs font-semibold text-[#622B51]">{order.status.replaceAll('_', ' ').toLowerCase()}</span></td><td className="px-5 py-4 text-right font-semibold">{formatPrice(order.total)}</td></tr>) : <tr><td colSpan={4} className="px-5 py-12 text-center text-svnctm-charcoal/60">Orders will appear here once customers check out.</td></tr>}</tbody></table></div></Container></Section></>;
}
