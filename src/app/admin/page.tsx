'use client';

import { Container, Section } from '@/components/Layout';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  color: 'pink' | 'purple' | 'green';
}

function MetricCard({ label, value, change, color }: MetricCardProps) {
  const colorClasses = {
    pink: 'text-svnctm-pink',
    purple: 'text-svnctm-lavender',
    green: 'text-green-600',
  };

  return (
    <div className="bg-white rounded-brand p-6">
      <p className="text-sm text-svnctm-charcoal/70 uppercase tracking-wide font-medium">
        {label}
      </p>
      <p className={`text-heading-2 font-bold mt-2 ${colorClasses[color]}`}>
        {value}
      </p>
      {change && (
        <p className="text-xs text-svnctm-charcoal/60 mt-2">
          {change}
        </p>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <>
      {/* Header */}
      <div className="bg-svnctm-charcoal text-white py-8">
        <Container>
          <h1 className="font-heading text-heading-1">Admin Dashboard</h1>
          <p className="text-white/70 mt-2">Welcome back! Here's your store overview.</p>
        </Container>
      </div>

      {/* Metrics */}
      <Section className="bg-svnctm-white-warm">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <MetricCard label="Total Sales" value="₹45,320" change="+12% from last month" color="pink" />
            <MetricCard label="Today's Sales" value="₹2,840" change="+5% from yesterday" color="pink" />
            <MetricCard label="Total Orders" value="156" change="12 pending" color="purple" />
            <MetricCard label="Products" value="24" change="3 low stock" color="green" />
          </div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-brand p-6 hover:shadow-soft transition-shadow">
              <h3 className="font-heading text-heading-3 text-svnctm-charcoal mb-4">
                📦 Order Management
              </h3>
              <p className="text-svnctm-charcoal/70 text-sm mb-4">
                View, update, and track customer orders
              </p>
              <a
                href="/admin/orders"
                className="inline-block px-4 py-2 bg-svnctm-pink text-white rounded-brand text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Manage Orders
              </a>
            </div>

            <div className="bg-white rounded-brand p-6 hover:shadow-soft transition-shadow">
              <h3 className="font-heading text-heading-3 text-svnctm-charcoal mb-4">
                🛍️ Product Management
              </h3>
              <p className="text-svnctm-charcoal/70 text-sm mb-4">
                Add, edit, and manage your product catalog
              </p>
              <a
                href="/admin/products"
                className="inline-block px-4 py-2 bg-svnctm-pink text-white rounded-brand text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Manage Products
              </a>
            </div>

            <div className="bg-white rounded-brand p-6 hover:shadow-soft transition-shadow">
              <h3 className="font-heading text-heading-3 text-svnctm-charcoal mb-4">
                👥 Customer Management
              </h3>
              <p className="text-svnctm-charcoal/70 text-sm mb-4">
                View and manage customer information
              </p>
              <a
                href="/admin/customers"
                className="inline-block px-4 py-2 bg-svnctm-pink text-white rounded-brand text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Manage Customers
              </a>
            </div>

            <div className="bg-white rounded-brand p-6 hover:shadow-soft transition-shadow">
              <h3 className="font-heading text-heading-3 text-svnctm-charcoal mb-4">
                📊 Inventory
              </h3>
              <p className="text-svnctm-charcoal/70 text-sm mb-4">
                Track and manage stock levels
              </p>
              <a
                href="/admin/inventory"
                className="inline-block px-4 py-2 bg-svnctm-pink text-white rounded-brand text-sm font-medium hover:opacity-90 transition-opacity"
              >
                View Inventory
              </a>
            </div>

            <div className="bg-white rounded-brand p-6 hover:shadow-soft transition-shadow">
              <h3 className="font-heading text-heading-3 text-svnctm-charcoal mb-4">
                🏷️ Coupons
              </h3>
              <p className="text-svnctm-charcoal/70 text-sm mb-4">
                Create and manage discount codes
              </p>
              <a
                href="/admin/coupons"
                className="inline-block px-4 py-2 bg-svnctm-pink text-white rounded-brand text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Manage Coupons
              </a>
            </div>

            <div className="bg-white rounded-brand p-6 hover:shadow-soft transition-shadow">
              <h3 className="font-heading text-heading-3 text-svnctm-charcoal mb-4">
                ⚙️ Settings
              </h3>
              <p className="text-svnctm-charcoal/70 text-sm mb-4">
                Configure store settings and preferences
              </p>
              <a
                href="/admin/settings"
                className="inline-block px-4 py-2 bg-svnctm-pink text-white rounded-brand text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Settings
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Recent Orders Table */}
      <Section className="bg-white">
        <Container>
          <h2 className="font-heading text-heading-2 text-svnctm-charcoal mb-6">
            Recent Orders
          </h2>

          <div className="bg-svnctm-white-warm rounded-brand overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-svnctm-charcoal">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-svnctm-charcoal">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-svnctm-charcoal">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-svnctm-charcoal">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-svnctm-charcoal">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b hover:bg-svnctm-pink-light/20 transition-colors">
                    <td className="px-6 py-3 text-sm text-svnctm-charcoal">
                      SV{Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </td>
                    <td className="px-6 py-3 text-sm text-svnctm-charcoal">
                      Customer {i}
                    </td>
                    <td className="px-6 py-3 text-sm font-semibold text-svnctm-charcoal">
                      ₹{(899 * i).toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          i % 2 === 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {i % 2 === 0 ? 'Delivered' : 'Processing'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-svnctm-charcoal/70">
                      2024-01-{i.toString().padStart(2, '0')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>
    </>
  );
}

