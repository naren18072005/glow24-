
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';
import OrderHeader from '@/components/order/OrderHeader';
import OrderStatusHeader from '@/components/order/OrderStatusHeader';
import OrderSummaryInfo from '@/components/order/OrderSummaryInfo';
import OrderItemsList from '@/components/order/OrderItemsList';
import OrderStatusTracker from '@/components/order/OrderStatusTracker';
import OrderFooter from '@/components/order/OrderFooter';
import { getEstimatedDelivery } from '@/utils/dateUtils';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<any>(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'cod'>('qr');
  const estimatedDelivery = getEstimatedDelivery();
  
  useEffect(() => {
    // Check if order is confirmed
    const isConfirmed = localStorage.getItem('orderConfirmed');
    if (!isConfirmed) {
      navigate('/');
      return;
    }
    
    // Make sure cart is cleared
    clearCart();
    
    // Get checkout info
    const checkoutInfo = localStorage.getItem('checkoutInfo');
    if (checkoutInfo) {
      const parsedOrder = JSON.parse(checkoutInfo);
      setOrder(parsedOrder);
      
      // Store order ID if available
      if (parsedOrder.orderId) {
        setOrderId(parsedOrder.orderId);
        // Extract last 6 characters of the order ID to use as order number
        const idStr = parsedOrder.orderId.toString();
        setOrderNumber(idStr.substring(idStr.length - 6));
      } else {
        const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString();
        setOrderNumber(randomOrderNumber);
      }
    }
    
    // Get payment method
    const method = localStorage.getItem('paymentMethod') as 'qr' | 'cod';
    if (method) {
      setPaymentMethod(method);
    }
    
    // Show toast notification
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for shopping with Glow24 Organics.",
    });
    
    return () => {
      // Clear localStorage when component unmounts
      localStorage.removeItem('orderConfirmed');
      localStorage.removeItem('checkoutInfo');
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartTotal');
      localStorage.removeItem('paymentMethod');
    };
  }, [navigate, toast, clearCart]);
  
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-10">
        <OrderHeader />
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 rounded-lg p-8 border border-white/10">
            <OrderStatusHeader />
            
            <OrderSummaryInfo 
              orderNumber={orderNumber}
              paymentMethod={paymentMethod}
              estimatedDelivery={estimatedDelivery}
            />
            
            {order && (
              <OrderItemsList 
                items={order.items}
                totalAmount={order.totalAmount}
                shippingCost={order.shippingCost}
                grandTotal={order.grandTotal}
              />
            )}
            
            <OrderStatusTracker estimatedDeliveryDate={estimatedDelivery} orderId={orderId} />
            
            <OrderFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
