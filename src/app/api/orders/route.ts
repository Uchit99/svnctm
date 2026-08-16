import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateShippingCost, calculateTax, generateOrderNumber } from '@/lib/utils';

type CheckoutItem = { name: string; price: number; quantity: number; sku: string; slug: string; scent?: string };
type ShippingAddress = { fullName: string; email: string; phone: string; address: string; apartment?: string; city: string; state: string; postalCode: string; country: string };

export async function POST(request: Request) {
  try {
    const { items, shippingAddress } = await request.json() as { items?: CheckoutItem[]; shippingAddress?: ShippingAddress };
    if (!items?.length || !shippingAddress?.email || !shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.state || !shippingAddress.postalCode || !shippingAddress.phone) {
      return NextResponse.json({ success: false, error: 'Please complete your delivery details and cart.' }, { status: 400 });
    }
    if (items.some((item) => !item.name || item.price <= 0 || item.quantity < 1 || !item.sku || !item.slug)) {
      return NextResponse.json({ success: false, error: 'Your cart contains an invalid item.' }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { email: shippingAddress.email.toLowerCase() },
      update: { name: shippingAddress.fullName, phone: shippingAddress.phone },
      create: { email: shippingAddress.email.toLowerCase(), name: shippingAddress.fullName, phone: shippingAddress.phone },
    });
    const products = await Promise.all(items.map((item) => prisma.product.upsert({
      where: { sku: item.sku },
      update: {},
      create: { name: item.name, slug: item.slug, sku: item.sku, price: item.price, scent: item.scent, isActive: true },
    })));
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = calculateShippingCost(subtotal);
    const tax = calculateTax(subtotal, shippingCost);
    const orderNumber = generateOrderNumber();
    const order = await prisma.order.create({
      data: {
        orderNumber, userId: user.id, subtotal, shippingCost, tax, total: subtotal + shippingCost + tax,
        status: 'PENDING_PAYMENT', paymentStatus: 'PENDING', paymentMethod: 'Payment pending',
        shippingAddress: { create: { ...shippingAddress, userId: user.id } },
        items: { create: items.map((item, index) => ({ productId: products[index].id, name: item.name, sku: item.sku, price: item.price, quantity: item.quantity, total: item.price * item.quantity })) },
        notifications: { create: { userId: user.id, type: 'ORDER_CONFIRMATION', channel: 'WHATSAPP', title: 'Order confirmation', message: `Order ${orderNumber} was received. Shipping updates will be sent to ${shippingAddress.phone}.` } },
      },
    });
    return NextResponse.json({ success: true, data: { orderId: order.id, orderNumber: order.orderNumber } }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ success: false, error: 'We could not place your order. Please try again.' }, { status: 500 });
  }
}
