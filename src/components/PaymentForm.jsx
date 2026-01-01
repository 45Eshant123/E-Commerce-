import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, CreditCard, Smartphone, Building } from 'lucide-react';
import confetti from 'canvas-confetti';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key');

const PaymentFormContent = ({ amount, onSuccess, onError, isProcessing, setIsProcessing }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      console.error('Payment failed:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Something went wrong with your payment.",
        variant: "destructive",
      });
      onError?.(error);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      toast({
        title: "Payment Successful! 🎉",
        description: "Your payment has been processed successfully.",
      });
      onSuccess?.(paymentIntent);
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <PaymentElement
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['card', 'link', 'apple_pay', 'google_pay'],
          }}
        />
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          <span>Secure payment</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Smartphone className="w-4 h-4" />
            <span>Mobile</span>
          </div>
          <div className="flex items-center gap-1">
            <Building className="w-4 h-4" />
            <span>Bank</span>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </Button>

      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        Your payment information is encrypted and secure.
        We never store your card details.
      </p>
    </form>
  );
};

const PaymentForm = ({ amount, cartItems = [], onSuccess, onError }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMode, setPaymentMode] = useState('mock'); // 'stripe', 'mock', or 'mock-fail'
  const { toast } = useToast();

  useEffect(() => {
    if (paymentMode === 'stripe') {
      createPaymentIntent();
    }
  }, [amount, paymentMode]);

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'usd',
          metadata: {
            orderType: 'ecommerce_purchase'
          }
        }),
      });

      const data = await response.json();

      if (data.success) {
        setClientSecret(data.clientSecret);
      } else {
        throw new Error(data.message || 'Failed to initialize payment');
      }
    } catch (error) {
      console.error('Payment intent creation failed:', error);
      toast({
        title: "Payment Setup Failed",
        description: "Unable to initialize payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMockPayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await fetch('http://localhost:5000/api/payments/mock-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          success: true
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store mock order data in localStorage
        const mockOrder = {
          orderId: `ORD-${Date.now()}`,
          total: amount,
          date: new Date().toISOString(),
          items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          status: 'confirmed'
        };
        localStorage.setItem('lastOrder', JSON.stringify(mockOrder));
        console.log('Saved order to localStorage:', mockOrder);

        // Show confetti and success toast
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
        });
        toast({
          title: "✅ Payment Successful!",
          description: "Redirecting to your order confirmation...",
        });

        // Redirect after delay
        setTimeout(() => {
          onSuccess?.({
            id: data.paymentIntentId,
            status: 'succeeded',
            amount: data.amount * 100
          });
        }, 1500);
      } else {
        throw new Error(data.message || 'Mock payment failed');
      }
    } catch (error) {
      toast({
        title: "Mock Payment Failed",
        description: error.message || "Test payment simulation failed.",
        variant: "destructive",
      });
      onError?.(error);
    }

    setIsProcessing(false);
  };

  const handleMockPaymentFail = async () => {
    setIsProcessing(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await fetch('http://localhost:5000/api/payments/mock-payment-fail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
        }),
      });

      const data = await response.json();

      // Check if response is not ok (400 status for mock failure)
      if (!response.ok) {
        // Show failure toast
        toast({
          title: "❌ Payment Failed!",
          description: data.error || data.message || "Please try again or use another method.",
          variant: "destructive",
        });

        // Call onError callback immediately
        onError?.(new Error(data.error || data.message || 'Payment failed'));
      } else if (data.success) {
        // This shouldn't happen for fail endpoint, but handle it just in case
        toast({
          title: "Mock Payment Successful! 🎉",
          description: "This was a test payment. No real transaction occurred.",
        });
        onSuccess?.({
          id: data.paymentIntentId,
          status: 'succeeded',
          amount: data.amount * 100
        });
      } else {
        // Response OK but data.success is false
        toast({
          title: "❌ Payment Failed!",
          description: data.error || data.message || "Please try again or use another method.",
          variant: "destructive",
        });
        onError?.(new Error(data.error || data.message || 'Payment failed'));
      }
    } catch (error) {
      toast({
        title: "❌ Payment Failed!",
        description: error.message || "Failed to process payment",
        variant: "destructive",
      });

      // Call onError callback immediately
      onError?.(error);
    }

    setIsProcessing(false);
  };

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#3b82f6',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      spacingUnit: '2px',
      borderRadius: '6px',
    },
    rules: {
      '.Input': {
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      '.Input:focus': {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 1px #3b82f6',
      },
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="space-y-6">
      {/* Payment Mode Selector (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            Development Mode - Choose Payment Type
          </h3>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={paymentMode === 'stripe' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPaymentMode('stripe')}
            >
              Real Stripe Payment
            </Button>
            <Button
              variant={paymentMode === 'mock' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPaymentMode('mock')}
            >
              Mock Payment (Success)
            </Button>
            <Button
              variant={paymentMode === 'mock-fail' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPaymentMode('mock-fail')}
            >
              Mock Payment (Fail)
            </Button>
          </div>
        </div>
      )}

      {paymentMode === 'stripe' && clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentFormContent
            amount={amount}
            onSuccess={onSuccess}
            onError={onError}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
          />
        </Elements>
      ) : paymentMode === 'mock' ? (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
              ✅ Mock Payment Mode (Success)
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              This will simulate a successful payment and redirect to the order confirmation page with confetti!
            </p>
          </div>

          <Button
            onClick={handleMockPayment}
            size="lg"
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Mock Payment...
              </>
            ) : (
              `Test Pay $${amount.toFixed(2)}`
            )}
          </Button>
        </div>
      ) : paymentMode === 'mock-fail' ? (
        <div className="space-y-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
              ❌ Mock Payment Mode (Failure)
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300">
              This will simulate a failed payment and redirect to the payment failed page.
            </p>
          </div>

          <Button
            onClick={handleMockPaymentFail}
            size="lg"
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Mock Payment...
              </>
            ) : (
              `Test Pay $${amount.toFixed(2)}`
            )}
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Initializing payment...
          </span>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
