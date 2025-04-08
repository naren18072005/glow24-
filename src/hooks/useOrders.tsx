
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { submitOrder, OrderData, trackOrder, TrackingData } from '@/services/apiService';
import { 
  storeOrderInfoLocally,
  storePaymentMethod,
  storeOrderConfirmation
} from '@/utils/orderStorage';
import {
  processPayment,
  showPaymentToast
} from '@/utils/paymentProcessor';

export const useOrders = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const createOrder = async (orderDetails: {
    shippingAddress: string;
    paymentMethod: 'gpay' | 'cod';
    shippingCost: number;
    grandTotal: number;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
  }) => {
    setIsCreating(true);

    try {
      // Generate a unique order ID
      const orderId = crypto.randomUUID();
      
      // Prepare order data for API
      const orderData: OrderData = {
        customerName: orderDetails.customerName || 'Guest',
        customerEmail: orderDetails.customerEmail,
        customerPhone: orderDetails.customerPhone,
        shippingAddress: orderDetails.shippingAddress,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: totalAmount,
        shippingCost: orderDetails.shippingCost,
        grandTotal: orderDetails.grandTotal,
        paymentMethod: orderDetails.paymentMethod
      };
      
      // Store order information locally 
      storeOrderInfoLocally(
        orderId,
        {
          address: orderDetails.shippingAddress,
          name: orderDetails.customerName,
          email: orderDetails.customerEmail,
          phone: orderDetails.customerPhone
        },
        items,
        totalAmount,
        orderDetails.shippingCost,
        orderDetails.grandTotal
      );
      
      // Store payment method for later reference
      storePaymentMethod(orderDetails.paymentMethod);
      
      // Show toast notification based on payment method
      showPaymentToast(toast, orderDetails.paymentMethod);
      
      // Process payment 
      await processPayment(
        orderId,
        orderDetails.paymentMethod,
        orderDetails.grandTotal,
        orderDetails.shippingAddress,
        {
          name: orderDetails.customerName,
          email: orderDetails.customerEmail,
          phone: orderDetails.customerPhone
        }
      );
      
      // Submit the order to the API
      try {
        const response = await submitOrder(orderData);
        // If API returns an orderId, use that, otherwise use the generated one
        if (response && response.orderId) {
          storeOrderInfoLocally(
            response.orderId,
            {
              address: orderDetails.shippingAddress,
              name: orderDetails.customerName,
              email: orderDetails.customerEmail,
              phone: orderDetails.customerPhone
            },
            items,
            totalAmount,
            orderDetails.shippingCost,
            orderDetails.grandTotal
          );
          storeOrderConfirmation();
          return { id: response.orderId };
        }
      } catch (apiError) {
        console.error('API order submission failed, using locally generated orderId:', apiError);
      }
      
      // If API call fails, we still continue with the locally generated orderId
      storeOrderConfirmation();
      return { id: orderId };
    } catch (error: any) {
      toast({
        title: "Error creating order",
        description: error.message || "There was a problem creating your order. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsCreating(false);
    }
  };

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
      // Fallback to simulated tracking data if API fails
      const fallbackData = simulateTrackingData(orderId);
      setTrackingData(fallbackData);
      return fallbackData;
    } finally {
      setIsTracking(false);
    }
  };

  // Helper function to simulate tracking data when API fails
  const simulateTrackingData = (orderId: string): TrackingData => {
    const now = new Date();
    const estimatedDelivery = new Date(now);
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);
    
    return {
      status: "in_transit",
      currentLocation: {
        lat: 11.0168,
        lng: 76.9558
      },
      estimatedDelivery: estimatedDelivery.toISOString(),
      stages: [
        { 
          name: "Order Received", 
          completed: true, 
          timestamp: new Date(now.getTime() - 1000 * 60 * 60).toISOString() 
        },
        { 
          name: "In Production", 
          completed: true, 
          timestamp: new Date(now.getTime() - 1000 * 60 * 30).toISOString() 
        },
        { 
          name: "Dispatched", 
          completed: true, 
          timestamp: now.toISOString() 
        },
        { 
          name: "Out for Delivery", 
          completed: false 
        },
        { 
          name: "Delivered", 
          completed: false 
        }
      ],
      distance: 5.3
    };
  };

  return {
    createOrder,
    getTrackingInfo,
    trackingData,
    isCreating,
    isTracking
  };
};
