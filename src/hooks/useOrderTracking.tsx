
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { trackOrder, TrackingData } from '@/services/api';
import { simulateTrackingData } from '@/utils/orderTrackingUtils';

export const useOrderTracking = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const { toast } = useToast();

  const getTrackingInfo = async (orderId: string) => {
    if (!orderId) {
      toast({
        title: "Missing Order ID",
        description: "Cannot track order without an Order ID",
        variant: "destructive",
      });
      return null;
    }

    setIsTracking(true);
    
    try {
      const data = await trackOrder(orderId);
      setTrackingData(data);
      return data;
    } catch (error) {
      console.error("Error tracking order:", error);
      const fallbackData = simulateTrackingData(orderId);
      setTrackingData(fallbackData);
      return fallbackData;
    } finally {
      setIsTracking(false);
    }
  };

  return {
    getTrackingInfo,
    trackingData,
    isTracking
  };
};
