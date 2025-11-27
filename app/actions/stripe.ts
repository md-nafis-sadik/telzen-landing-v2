'use server';

import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';

interface CreateCheckoutSessionParams {
  packageId: string;
  amount: number;
  currency?: string;
  couponId?: string;
  orderType: 'new' | 'topup';
}

export async function createCheckoutSession(params: CreateCheckoutSessionParams) {
  try {
    const origin = (await headers()).get('origin') || 'http://localhost:3000';
    const { packageId, amount, currency = 'USD', couponId, orderType } = params;

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `eSIM Package - ${packageId}`,
              description: `${orderType === 'new' ? 'New' : 'Top-up'} eSIM package`,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}&package_id=${packageId}&order_type=${orderType}`,
      metadata: {
        package_id: packageId,
        order_type: orderType,
        coupon_id: couponId || '',
      },
    });

    return { clientSecret: session.client_secret, sessionId: session.id };
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    throw new Error(error.message || 'Failed to create checkout session');
  }
}

export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent'],
    });

    return {
      status: session.status,
      customerEmail: session.customer_details?.email,
      paymentStatus: session.payment_status,
      metadata: session.metadata,
    };
  } catch (error: any) {
    console.error('Error retrieving checkout session:', error);
    throw new Error(error.message || 'Failed to retrieve checkout session');
  }
}
