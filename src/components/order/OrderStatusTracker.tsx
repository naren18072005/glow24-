
import { useState, useEffect } from 'react';
import { CheckCircle, Package, Truck, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";
import OrderTrackingMap from './OrderTrackingMap';

interface OrderStatusTrackerProps {
  estimatedDeliveryDate: string;
  orderId?: string;
}

const OrderStatusTracker = ({ estimatedDeliveryDate, orderId }: OrderStatusTrackerProps) => {
  const [currentStage, setCurrentStage] = useState(1);
  const [progressValue, setProgressValue] = useState(25);
  const [showMap, setShowMap] = useState(false);
  
  // Simulated data - in a real app this would come from your backend
  const [deliveryData, setDeliveryData] = useState({
    currentLocation: { lat: 11.0168, lng: 76.9558 }, // Coimbatore coordinates
    distanceRemaining: '5.2 km',
    estimatedArrival: '30 minutes',
    driverName: 'Raj Kumar'
  });
  
  useEffect(() => {
    // In a real app, this would be replaced with actual API calls or websocket connections
    // to get real-time updates from your delivery tracking system
    
    // Simulate progress through the different stages
    const timer = setTimeout(() => {
      if (currentStage < 3) {
        setCurrentStage(prev => prev + 1);
        setProgressValue(prev => prev + 25);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentStage]);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-white mb-2">Delivery Status</h3>
      <div className="flex justify-between items-center mb-2">
        <p className="text-white/60 text-sm">Order #{orderId?.substring(0, 6)}</p>
        <button 
          onClick={() => setShowMap(!showMap)}
          className="text-sm text-[#F2A83B] hover:text-[#F2A83B]/80 transition-colors"
        >
          {showMap ? 'Hide Map' : 'Show Map'}
        </button>
      </div>
      
      <Progress 
        value={progressValue} 
        className="h-1.5 bg-white/10 mb-6" 
      />
      
      {showMap && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 overflow-hidden"
        >
          <OrderTrackingMap 
            location={deliveryData.currentLocation}
            driverName={deliveryData.driverName}
            distanceRemaining={deliveryData.distanceRemaining}
            estimatedArrival={deliveryData.estimatedArrival}
          />
        </motion.div>
      )}
      
      <div className="relative">
        <div className="absolute left-6 top-0 h-full w-0.5 bg-white/20"></div>
        
        <motion.div 
          className="relative flex mb-6"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
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
        </motion.div>
        
        <motion.div 
          className="relative flex mb-6"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className={`flex items-center justify-center w-12 h-12 rounded-full z-10 
            ${currentStage >= 2 
              ? "bg-green-500/20 border border-green-500" 
              : "bg-white/5 border border-white/20"}`}>
            <Package size={20} className={currentStage >= 2 ? "text-green-500" : "text-white/50"} />
          </div>
          <div className="ml-4">
            <h4 className={currentStage >= 2 ? "text-white font-medium" : "text-white/70 font-medium"}>Processing</h4>
            <p className="text-white/60 text-sm">Your order is being processed</p>
            {currentStage >= 2 && (
              <p className="text-white/40 text-xs mt-1">
                {new Date(Date.now() + 3600000).toLocaleString('en-IN')}
              </p>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          className="relative flex mb-6"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className={`flex items-center justify-center w-12 h-12 rounded-full z-10 
            ${currentStage >= 3 
              ? "bg-green-500/20 border border-green-500" 
              : "bg-white/5 border border-white/20"}`}>
            <Truck size={20} className={currentStage >= 3 ? "text-green-500" : "text-white/50"} />
          </div>
          <div className="ml-4">
            <h4 className={currentStage >= 3 ? "text-white font-medium" : "text-white/70 font-medium"}>Shipped</h4>
            <p className="text-white/60 text-sm">Your order is on its way to you</p>
            {currentStage >= 3 && (
              <div>
                <p className="text-white/40 text-xs mt-1">
                  {new Date(Date.now() + 7200000).toLocaleString('en-IN')}
                </p>
                {currentStage >= 3 && (
                  <div className="mt-2 flex items-center text-[#F2A83B] text-sm">
                    <MapPin size={14} className="mr-1" />
                    <span>Live tracking available</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          className="relative flex"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className={`flex items-center justify-center w-12 h-12 rounded-full z-10
            ${currentStage >= 4 
              ? "bg-green-500/20 border border-green-500" 
              : "bg-white/5 border border-white/20"}`}>
            <Clock size={20} className={currentStage >= 4 ? "text-green-500" : "text-white/50"} />
          </div>
          <div className="ml-4">
            <h4 className={currentStage >= 4 ? "text-white font-medium" : "text-white/70 font-medium"}>Delivered</h4>
            <p className="text-white/60 text-sm">Estimated by {estimatedDeliveryDate}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderStatusTracker;
