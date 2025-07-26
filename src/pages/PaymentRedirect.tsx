
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';
import { LoaderCircle } from 'lucide-react';

const PaymentRedirect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'gpay' | 'cod'>('gpay');

  useEffect(() => {
    // Get payment method from localStorage
    const storedMethod = localStorage.getItem('paymentMethod') as 'gpay' | 'cod';
    if (storedMethod) {
      setPaymentMethod(storedMethod);
    }

    // Simulate payment verification
    const timer = setTimeout(() => {
      // Mark order as confirmed
      localStorage.setItem('orderConfirmed', 'true');
      // Clear cart
      clearCart();
      
      // Show success toast based on payment method
      if (paymentMethod === 'gpay') {
        toast({
          title: "Google Pay Payment Successful!",
          description: "Your payment has been processed through Google Pay. Redirecting to order confirmation.",
        });
      } else {
        toast({
          title: "Order Confirmed for Blue Dart Delivery!",
          description: "Your order has been confirmed for Cash on Delivery via Blue Dart. Redirecting to order confirmation.",
        });
      }
      
      // Redirect to order confirmation
      navigate('/order-confirmation');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate, toast, clearCart, paymentMethod]);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="glass-card-premium rounded-xl p-8 max-w-lg w-full text-center mx-4">
        <div className="mb-6">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
            paymentMethod === 'gpay' 
              ? 'bg-green-500/20 border border-green-500/30' 
              : 'bg-blue-500/20 border border-blue-500/30'
          }`}>
            <LoaderCircle size={32} 
              className={`animate-spin ${paymentMethod === 'gpay' ? 'text-green-500' : 'text-blue-500'}`} 
            />
          </div>
          
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            {paymentMethod === 'gpay' && '💳 Processing Google Pay Payment'}
            {paymentMethod === 'cod' && '📦 Confirming Blue Dart Delivery'}
          </h1>
          
          <p className="text-text-secondary">
            {paymentMethod === 'gpay' && 'Your secure payment is being processed...'}
            {paymentMethod === 'cod' && 'Setting up your cash on delivery order...'}
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2 text-sm text-text-muted">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              paymentMethod === 'gpay' ? 'bg-green-500' : 'bg-blue-500'
            }`}></div>
            <span>Secure processing</span>
          </div>
          
          <p className="text-xs text-text-muted">
            Please do not close this window or press the back button
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentRedirect;
