'use client';

import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback, useState } from 'react';
import { createCheckoutSession } from '@/app/actions/stripe';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

interface EmbeddedCheckoutFormProps {
  packageId: string;
  amount: number;
  currency?: string;
  couponId?: string;
  orderType: 'new' | 'topup';
}

export default function EmbeddedCheckoutForm({
  packageId,
  amount,
  currency = 'USD',
  couponId,
  orderType,
}: EmbeddedCheckoutFormProps) {
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    try {
      const { clientSecret } = await createCheckoutSession({
        packageId,
        amount,
        currency,
        couponId,
        orderType,
      });

      if (!clientSecret) {
        throw new Error('No client secret returned');
      }

      return clientSecret;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to initialize checkout';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    }
  }, [packageId, amount, currency, couponId, orderType]);

  if (error) {
    return (
      <div className="w-full flex flex-col justify-center bg-white rounded-3xl px-6 py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
            className="px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="checkout" className="w-full">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
