
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';
import { LoaderCircle } from 'lucide-react';

const PaymentRedirect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clearCart } = useCart();

  useEffect(() => {
    // Simulate payment verification
    const timer = setTimeout(() => {
      // Mark order as confirmed
      localStorage.setItem('orderConfirmed', 'true');
      // Clear cart
      clearCart();
      
      // Show success toast
      toast({
        title: "Payment Successful!",
        description: "Your payment has been processed successfully. Redirecting to order confirmation.",
      });
      
      // Redirect to order confirmation
      navigate('/order-confirmation');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate, toast, clearCart]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-white/5 rounded-lg p-8 border border-white/10 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-white mb-6">
          Returning from Payment Gateway
        </h1>
        
        <div className="flex flex-col items-center justify-center py-8">
          <LoaderCircle size={48} className="text-green-500 animate-spin mb-4" />
          <p className="text-white/80">Verifying your payment...</p>
          <p className="text-white/60 text-sm mt-2">Please do not close this window</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentRedirect;
