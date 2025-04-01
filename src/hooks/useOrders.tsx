
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { 
  createOrderInDatabase,
  createOrderItems,
  createPaymentTransaction,
  updateOrderStatus
} from '@/utils/orderDatabase';
import { 
  storeOrderInfoLocally,
  storePaymentMethod,
  storePaymentId
} from '@/utils/orderStorage';
import {
  processPayment,
  showPaymentToast
} from '@/utils/paymentProcessor';

export const useOrders = () => {
  const [isCreating, setIsCreating] = useState(false);
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
      // Generate a unique order ID regardless of authentication
      const orderId = crypto.randomUUID();
      
      // Store order information for later use regardless of authentication
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

      // Create payment transaction for tracking if user is authenticated
      let paymentId = null;
      if (user) {
        const transaction = await createPaymentTransaction(
          orderId,
          orderDetails.grandTotal,
          orderDetails.paymentMethod
        );
        
        if (transaction) {
          paymentId = transaction.id;
          storePaymentId(paymentId);
        }
      }

      // If user is authenticated, try to save order to database
      if (user) {
        const order = await createOrderInDatabase(
          user.id,
          orderId,
          {
            grandTotal: orderDetails.grandTotal,
            shippingAddress: orderDetails.shippingAddress,
            paymentMethod: orderDetails.paymentMethod
          }
        );

        if (order) {
          // Create order items in database
          await createOrderItems(order.id, items);
        }
      }

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

  return {
    createOrder,
    updateOrderStatus,
    isCreating
  };
};
