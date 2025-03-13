
import { CheckCircle, Package, Truck, Clock } from 'lucide-react';

interface OrderStatusTrackerProps {
  estimatedDeliveryDate: string;
}

const OrderStatusTracker = ({ estimatedDeliveryDate }: OrderStatusTrackerProps) => {
  return (
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
            <p className="text-white/60 text-sm">Estimated by {estimatedDeliveryDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusTracker;
