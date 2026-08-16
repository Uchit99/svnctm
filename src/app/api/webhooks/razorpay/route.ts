import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyWebhookSignature } from '@/lib/razorpay';

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('x-razorpay-signature');
    const body = await request.text();

    if (!signature) {
      return NextResponse.json(
        { success: false, error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(body, signature);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid webhook signature' },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);

    // Store webhook event
    await prisma.webhookEvent.create({
      data: {
        eventType: event.event,
        provider: 'razorpay',
        payload: JSON.stringify(event),
      },
    });

    // Handle different event types
    switch (event.event) {
      case 'payment.authorized':
        await handlePaymentAuthorized(event.payload.payment);
        break;

      case 'payment.failed':
        await handlePaymentFailed(event.payload.payment);
        break;

      case 'payment.captured':
        await handlePaymentCaptured(event.payload.payment);
        break;

      case 'refund.created':
        await handleRefund(event.payload.refund);
        break;

      default:
        console.log('Unhandled event type:', event.event);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

async function handlePaymentAuthorized(payment: any) {
  console.log('Payment authorized:', payment.id);
  // Handle payment authorized event
}

async function handlePaymentFailed(payment: any) {
  console.log('Payment failed:', payment.id);

  // Find order by Razorpay payment ID or order ID
  const order = await prisma.order.findFirst({
    where: {
      OR: [
        { razorpayPaymentId: payment.id },
        { razorpayOrderId: payment.order_id },
      ],
    },
  });

  if (order) {
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: 'FAILED',
        status: 'PAYMENT_FAILED',
      },
    });

    // Create payment record
    await prisma.payment.create({
      data: {
        orderId: order.id,
        razorpayPaymentId: payment.id,
        razorpayOrderId: payment.order_id,
        amount: order.total,
        status: 'FAILED',
        failureReason: payment.failure_reason,
        failureDescription: payment.description,
      },
    });
  }
}

async function handlePaymentCaptured(payment: any) {
  console.log('Payment captured:', payment.id);
  // Handle payment captured event
}

async function handleRefund(refund: any) {
  console.log('Refund created:', refund.id);

  // Find order by payment ID
  const payment = await prisma.payment.findFirst({
    where: { razorpayPaymentId: refund.payment_id },
  });

  if (payment) {
    const order = await prisma.order.findUnique({
      where: { id: payment.orderId },
    });

    if (order) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'REFUNDED',
        },
      });
    }
  }
}
