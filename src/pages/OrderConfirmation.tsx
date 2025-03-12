
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Package, Truck, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState<any>(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'cod'>('qr');
  
  useEffect(() => {
    // Check if order is confirmed
    const isConfirmed = localStorage.getItem('orderConfirmed');
    if (!isConfirmed) {
      navigate('/');
      return;
    }
    
    // Get checkout info
    const checkoutInfo = localStorage.getItem('checkoutInfo');
    if (checkoutInfo) {
      setOrder(JSON.parse(checkoutInfo));
    }
    
    // Generate random order number
    const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString();
    setOrderNumber(randomOrderNumber);
    
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
  }, [navigate, toast]);
  
  // Estimate delivery date (5-7 days from now)
  const getEstimatedDelivery = () => {
    const today = new Date();
    const minDelivery = new Date(today);
    minDelivery.setDate(today.getDate() + 5);
    
    const maxDelivery = new Date(today);
    maxDelivery.setDate(today.getDate() + 7);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    };
    
    return `${formatDate(minDelivery)} - ${formatDate(maxDelivery)}`;
  };
  
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </button>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 rounded-lg p-8 border border-white/10">
            <div className="flex items-center justify-center mb-6">
              <CheckCircle size={48} className="text-green-500 mr-4" />
              <div>
                <h1 className="text-3xl font-bold text-white">Order Confirmed!</h1>
                <p className="text-white/70">Thank you for shopping with Glow24 Organics</p>
              </div>
            </div>
            
            <div className="border border-white/10 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-white/70">Order Number:</span>
                <span className="text-white font-medium">{orderNumber}</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span className="text-white/70">Payment Method:</span>
                <span className="text-white font-medium">
                  {paymentMethod === 'qr' ? 'Online Payment (UPI)' : 'Cash on Delivery'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-white/70">Estimated Delivery:</span>
                <span className="text-white font-medium">{getEstimatedDelivery()}</span>
              </div>
            </div>
            
            {order && (
              <>
                <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {order.items?.map((item: any) => (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex items-start">
                        <span className="bg-white/20 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">
                          {item.quantity}
                        </span>
                        <span className="text-white">{item.name}</span>
                      </div>
                      <span className="text-white font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/70">Subtotal</span>
                    <span className="text-white">₹{order.totalAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-white/70">Shipping</span>
                    <span className="text-white">
                      {order.shippingCost === 0 ? 'Free' : `₹${order.shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="border-t border-white/10 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-white/70 font-medium">Total</span>
                      <span className="text-[#F2A83B] font-bold">
                        ₹{order.grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-white mb-4">Delivery Status</h3>
              
              <div className="relative">
                <div className="absolute left-6 top-0 h-full w-0.5 bg-white/20"></div>
                
                <div className="relative flex mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 border border-green-500 z-10">
                    <CheckCircle size={20} className="text-green-500" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-medium">Order Confirmed</h4>
                    <p className="text-white/60 text-sm">Your order has been placed successfully</p>
                    <p className="text-white/40 text-xs mt-1">
                      {new Date().toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
                
                <div className="relative flex mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/20 z-10">
                    <Package size={20} className="text-white/50" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white/70 font-medium">Processing</h4>
                    <p className="text-white/60 text-sm">Your order is being processed</p>
                  </div>
                </div>
                
                <div className="relative flex mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/20 z-10">
                    <Truck size={20} className="text-white/50" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white/70 font-medium">Shipped</h4>
                    <p className="text-white/60 text-sm">Your order is on its way to you</p>
                  </div>
                </div>
                
                <div className="relative flex">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/20 z-10">
                    <Clock size={20} className="text-white/50" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white/70 font-medium">Delivered</h4>
                    <p className="text-white/60 text-sm">Estimated by {getEstimatedDelivery()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/')}
                className="py-3 px-8 bg-[#F2A83B] text-black rounded-md font-medium hover:bg-[#F2A83B]/90 transition-colors"
              >
                Continue Shopping
              </button>
              
              <p className="mt-4 text-white/60 text-sm">
                Have questions about your order? Contact our customer support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
