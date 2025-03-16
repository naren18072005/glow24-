
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';
import { useOrders } from '@/hooks/useOrders';
import PaymentHeader from '@/components/payment/PaymentHeader';
import QRCodeDisplay from '@/components/payment/QRCodeDisplay';
import PaymentStatus from '@/components/payment/PaymentStatus';
import PaymentFooter from '@/components/payment/PaymentFooter';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clearCart } = useCart();
  const { updateOrderStatus } = useOrders();
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
            
            // Update order status in database
            if (order?.orderId) {
              updateOrderStatus(order.orderId, 'paid');
            }
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      clearInterval(timer);
    };
  }, [navigate, paymentStatus, toast, updateOrderStatus, order]);
  
  const handlePaymentConfirmation = async () => {
    setPaymentStatus('completed');
    clearCart();
    localStorage.setItem('orderConfirmed', 'true');
    localStorage.setItem('paymentMethod', 'qr');
    
    // Update order status in database
    if (order?.orderId) {
      await updateOrderStatus(order.orderId, 'paid');
    }
    
    navigate('/order-confirmation');
  };
  
  if (paymentStatus === 'completed') {
    navigate('/order-confirmation');
    return null;
  }
  
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-xl mx-auto">
          <div className="bg-white/5 rounded-lg p-8 border border-white/10 text-center">
            <PaymentHeader />
            <QRCodeDisplay amount={order?.grandTotal} />
            <PaymentStatus 
              status={paymentStatus} 
              countdown={countdown} 
              onConfirmPayment={handlePaymentConfirmation} 
            />
            <PaymentFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
