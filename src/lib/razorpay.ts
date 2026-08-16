import crypto from 'crypto';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.warn('Razorpay credentials are not configured');
}

export const razorpayConfig = {
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
  webhook_secret: RAZORPAY_WEBHOOK_SECRET,
};

export const verifyRazorpaySignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  if (!RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay key secret not configured');
  }

  const data = orderId + '|' + paymentId;
  const generated_signature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(data)
    .digest('hex');

  return generated_signature === signature;
};

export const verifyWebhookSignature = (
  body: string,
  signature: string
): boolean => {
  if (!RAZORPAY_WEBHOOK_SECRET) {
    throw new Error('Razorpay webhook secret not configured');
  }

  const generated_signature = crypto
    .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

  return generated_signature === signature;
};

export const createRazorpayOrderPayload = (
  amount: number,
  orderId: string,
  customerEmail: string,
  customerPhone: string
) => {
  return {
    amount: Math.round(amount * 100), // Convert to paise
    currency: 'INR',
    receipt: orderId,
    payment_capture: 1,
    customer_notify: 1,
    email: customerEmail,
    contact: customerPhone,
  };
};
