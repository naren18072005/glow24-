
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clearCart } = useCart();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'completed'>('pending');
  const [countdown, setCountdown] = useState(180); // 3 minutes in seconds
  const [order, setOrder] = useState<any>(null);
  
  useEffect(() => {
    // Get checkout info from localStorage
    const checkoutInfo = localStorage.getItem('checkoutInfo');
    if (!checkoutInfo) {
      navigate('/');
      return;
    }
    
    setOrder(JSON.parse(checkoutInfo));
    
    // Set timer for payment simulation
    let timer: NodeJS.Timeout;
    
    if (paymentStatus === 'pending') {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setPaymentStatus('completed');
            // Simulate successful payment
            toast({
              title: "Payment Successful!",
              description: "Your order has been placed successfully.",
            });
            localStorage.setItem('orderConfirmed', 'true');
            localStorage.setItem('paymentMethod', 'qr');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      clearInterval(timer);
    };
  }, [navigate, paymentStatus, toast]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handlePaymentConfirmation = () => {
    setPaymentStatus('completed');
    clearCart();
    localStorage.setItem('orderConfirmed', 'true');
    localStorage.setItem('paymentMethod', 'qr');
    navigate('/order-confirmation');
  };
  
  if (paymentStatus === 'completed') {
    navigate('/order-confirmation');
    return null;
  }
  
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-10">
        <button 
          onClick={() => navigate('/checkout')}
          className="flex items-center text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Checkout
        </button>
        
        <div className="max-w-xl mx-auto">
          <div className="bg-white/5 rounded-lg p-8 border border-white/10 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Complete Your Payment</h1>
            
            <div className="mb-6">
              <p className="text-white/80">
                Please scan the QR code with any UPI app to complete your payment
              </p>
              <p className="text-[#F2A83B] font-medium mt-2">
                Amount: ₹{order?.grandTotal.toFixed(2)}
              </p>
            </div>
            
            <div className="flex flex-col items-center mb-8">
              <div className="bg-white p-4 rounded-lg mb-4">
                <img 
                  src="/lovable-uploads/3072898f-0ccc-4826-9143-24cea560e44c.png" 
                  alt="QR Code" 
                  className="w-64 h-64 object-contain"
                />
              </div>
              
              <p className="text-white/60 text-sm">
                Scan to pay with any UPI app
              </p>
            </div>
            
            <div className="mb-8 flex flex-col items-center">
              {paymentStatus === 'pending' ? (
                <div className="flex items-center text-amber-400 mb-4">
                  <Clock size={20} className="mr-2" />
                  <p>Payment pending... {formatTime(countdown)}</p>
                </div>
              ) : (
                <div className="flex items-center text-green-500 mb-4">
                  <CheckCircle size={20} className="mr-2" />
                  <p>Payment completed!</p>
                </div>
              )}
              
              <button
                onClick={handlePaymentConfirmation}
                className="py-3 px-6 bg-[#F2A83B] text-black rounded-md font-medium hover:bg-[#F2A83B]/90 transition-colors"
              >
                I've Completed the Payment
              </button>
            </div>
            
            <div className="text-white/60 text-sm">
              <p>UPI ID: naren1872005@oksbi</p>
              <p className="mt-1">If you face any issues, please contact our support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
