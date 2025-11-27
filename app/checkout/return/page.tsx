'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, redirect } from 'next/navigation';
import { getCheckoutSession } from '@/app/actions/stripe';
import CheckoutSuccessful from '@/components/checkout/CheckoutSuccessful';
import { useCheckout } from '@/hook';
import { useAppSelector } from '@/store/hooks';
import { toast } from 'react-toastify';

function ReturnContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const packageId = searchParams.get('package_id');
  const orderType = searchParams.get('order_type');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const { verifyPayment } = useCheckout();
  const authData = useAppSelector((state) => state.auth.auth);
  const token = authData?.token || '';

  useEffect(() => {
    if (!sessionId) {
      redirect('/checkout');
      return;
    }

    async function handleReturn() {
      try {
        if (!sessionId) return;
        
        const session = await getCheckoutSession(sessionId);

        if (session.status === 'open') {
          redirect('/checkout');
          return;
        }

        if (session.status === 'complete' && session.paymentStatus === 'paid') {
          setCustomerEmail(session.customerEmail || '');
          
          // Verify payment with your backend
          if (session.metadata?.package_id && token) {
            const orderId = session.metadata.package_id;
            await verifyPayment(orderId, token);
          }
          
          setStatus('success');
          toast.success('Payment successful! Your eSIM is being activated.');
        } else {
          setStatus('error');
          toast.error('Payment was not completed. Please try again.');
        }
      } catch (error: any) {
        console.error('Error processing return:', error);
        setStatus('error');
        toast.error('An error occurred while processing your payment.');
      }
    }

    handleReturn();
  }, [sessionId, token, verifyPayment]);

  if (status === 'loading') {
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
          <a
            href="/checkout"
            className="inline-block px-6 py-3 bg-primary-700 text-white rounded-lg hover:bg-primary-800"
          >
            Back to Checkout
          </a>
        </div>
      </div>
    );
  }

  return (
    <section id="success" className="containerX py-20">
      <CheckoutSuccessful />
      {customerEmail && (
        <p className="text-center text-text-700 mt-6">
          A confirmation email has been sent to <strong>{customerEmail}</strong>
        </p>
      )}
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
