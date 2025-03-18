
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { verifyPayment } from '@/services/paymentService';
import { useCart } from '@/hooks/useCart';
import { LoaderCircle } from 'lucide-react';

const PaymentCallback = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [status, setStatus] = useState<'success' | 'error' | 'processing'>('processing');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { clearCart } = useCart();

  useEffect(() => {
    const verifyPaymentStatus = async () => {
      try {
        // Get payment data from localStorage and URL parameters
        const paymentId = localStorage.getItem('pendingPaymentId');
        const paymentMethod = localStorage.getItem('paymentMethod');
        
        // Extract payment response parameters from URL
        const queryParams = new URLSearchParams(location.search);
        const paymentStatus = queryParams.get('status');
        
        // Check for Razorpay response in localStorage
        const razorpayResponse = localStorage.getItem('razorpayResponse');
        
        // Handle explicit failure from URL
        if (paymentStatus === 'failed') {
          setStatus('error');
          setIsVerifying(false);
          return;
        }
        
        let verificationData = {};
        let isSuccessful = false;
        
        if (razorpayResponse) {
          // If we have a Razorpay response, use that for verification
          verificationData = JSON.parse(razorpayResponse);
          isSuccessful = true;
        } else if (paymentMethod === 'qr') {
          // For QR payments
          isSuccessful = true;
          verificationData = { method: 'qr', status: 'success' };
        } else if (paymentMethod === 'cod') {
          // For COD
          isSuccessful = true;
          verificationData = { method: 'cod', status: 'pending' };
        } else {
          // Default fallback
          isSuccessful = paymentStatus !== 'failed';
          verificationData = { status: paymentStatus || 'unknown' };
        }
        
        if (isSuccessful) {
          // If we have a payment ID, verify with our backend
          if (paymentId) {
            await verifyPayment(paymentId, verificationData);
          }
          
          setStatus('success');
          localStorage.setItem('orderConfirmed', 'true');
          localStorage.removeItem('razorpayResponse');
          clearCart();
          
          toast({
            title: "Payment Successful!",
            description: "Your payment has been processed successfully.",
          });
          
          // Wait a moment before redirecting to order confirmation
          setTimeout(() => {
            navigate('/order-confirmation');
          }, 2000);
        } else {
          setStatus('error');
          
          toast({
            title: "Payment Failed",
            description: "Your payment could not be processed. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('error');
        toast({
          title: "Payment Verification Error",
          description: "We couldn't verify your payment. Please contact support.",
          variant: "destructive",
        });
      } finally {
        setIsVerifying(false);
      }
    };
    
    verifyPaymentStatus();
  }, [navigate, location.search, toast, clearCart]);
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-white/5 rounded-lg p-8 border border-white/10 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-white mb-6">Payment {status === 'processing' ? 'Processing' : status === 'success' ? 'Successful' : 'Failed'}</h1>
        
        {isVerifying ? (
          <div className="flex flex-col items-center justify-center py-8">
            <LoaderCircle size={48} className="text-[#F2A83B] animate-spin mb-4" />
            <p className="text-white/80">Verifying your payment...</p>
          </div>
        ) : status === 'success' ? (
          <div className="py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white/80 mb-6">Your payment has been successfully processed. Redirecting to your order confirmation...</p>
          </div>
        ) : (
          <div className="py-8">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-white/80 mb-6">Your payment could not be processed. Please try again or contact support.</p>
            <button 
              onClick={() => navigate('/checkout')}
              className="px-6 py-2 bg-[#F2A83B] text-black rounded-md font-medium hover:bg-[#F2A83B]/90 transition-colors"
            >
              Return to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback;
