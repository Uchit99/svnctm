import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyRazorpaySignature } from '@/lib/razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, paymentId, signature } = body;

    // Verify Razorpay signature
    const isValid = verifyRazorpaySignature(orderId, paymentId, signature);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Find order by Razorpay order ID
    const order = await prisma.order.findFirst({
      where: { razorpayOrderId: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'PAYMENT_CONFIRMED',
        paymentStatus: 'COMPLETED',
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
      },
    });

    // Create payment record
    await prisma.payment.create({
      data: {
        orderId: order.id,
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
        amount: order.total,
        status: 'COMPLETED',
      },
    });

    // Reduce inventory
    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: order.id },
    });

    for (const item of orderItems) {
      await prisma.inventory.update({
        where: { productId: item.productId },
        data: {
          quantity: {
            decrement: item.quantity,
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        status: updatedOrder.status,
      },
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
