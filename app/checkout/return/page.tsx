'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, redirect } from 'next/navigation';
import CheckoutSuccessful from '@/components/checkout/CheckoutSuccessful';
import { useVerifyPaymentMutation } from '@/store/modules/checkout/checkoutApi';
import Link from 'next/link';

function ReturnContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');

  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [verifyPayment, { isLoading }] = useVerifyPaymentMutation();

  // Redirect if no session ID or order ID
  if (!sessionId || !orderId) {
    redirect('/checkout');
  }

  // Handle payment verification
  const handleVerify = async () => {
    if (status !== null) return; // Already processed

    try {
      const result = await verifyPayment({ orderId }).unwrap();
      setStatus(result.success ? 'success' : 'error');
    } catch (error) {
      setStatus('error');
    }
  };

  // Auto-verify on mount (only once)
  if (status === null && !isLoading) {
    handleVerify();
  }

  if (isLoading || status === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto mb-4"></div>
          <p className="text-text-700">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md px-6">
          <h2 className="text-2xl font-bold text-text-950 mb-4">Payment Failed</h2>
          <p className="text-text-700 mb-6">
            We couldn&apos;t process your payment. Please try again or contact support if the problem persists.
          </p>
          <Link
            href="/checkout"
            className="inline-block px-6 py-3 bg-primary-700 text-white rounded-lg hover:bg-primary-800"
          >
            Back to Checkout
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section id="success" className="containerX py-20">
      <CheckoutSuccessful />
    </section>
  );
}

export default function Return() {
  return (
    <main className="font-inter bg-white min-h-screen">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
        </div>
      }>
        <ReturnContent />
      </Suspense>
    </main>
  );
}
