
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { initiatePayment } from '@/services/paymentService';

export const useOrders = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const createOrder = async (orderDetails: {
    shippingAddress: string;
    paymentMethod: 'razorpay' | 'qr' | 'cod';
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
      localStorage.setItem('checkoutInfo', JSON.stringify({
        orderId: orderId,
        customer: {
          address: orderDetails.shippingAddress,
          name: orderDetails.customerName,
          email: orderDetails.customerEmail,
          phone: orderDetails.customerPhone
        },
        items,
        totalAmount,
        shippingCost: orderDetails.shippingCost,
        grandTotal: orderDetails.grandTotal,
      }));

      // If user is authenticated, try to save order to database
      if (user) {
        try {
          // Create the order in database
          const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
              id: orderId,
              user_id: user.id,
              total: orderDetails.grandTotal,
              shipping_address: orderDetails.shippingAddress,
              payment_method: orderDetails.paymentMethod,
              status: orderDetails.paymentMethod === 'cod' ? 'pending' : 'processing'
            })
            .select()
            .single();

          if (orderError) {
            console.error('Error creating order:', orderError);
            // Continue with local storage fallback
          } else {
            // Create order items in database
            const orderItems = items.map(item => ({
              order_id: order.id,
              product_id: item.id,
              product_name: item.name,
              quantity: item.quantity,
              price: item.price
            }));

            const { error: itemsError } = await supabase
              .from('order_items')
              .insert(orderItems);

            if (itemsError) {
              console.error('Error creating order items:', itemsError);
              // Continue with local storage fallback
            }
          }
        } catch (dbError) {
          console.error('Database error:', dbError);
          // Continue with checkout even if database operations fail
        }
      }

      // Handle payment based on selected method
      if (orderDetails.paymentMethod === 'razorpay') {
        // Initiate payment with Razorpay
        const paymentResponse = await initiatePayment({
          orderId: orderId,
          amount: orderDetails.grandTotal,
          gatewayType: 'razorpay',
          customerEmail: orderDetails.customerEmail,
          customerName: orderDetails.customerName,
          customerPhone: orderDetails.customerPhone
        });

        if (paymentResponse.success && paymentResponse.redirectUrl) {
          // Store payment ID for verification
          localStorage.setItem('pendingPaymentId', paymentResponse.paymentId || '');
          localStorage.setItem('paymentMethod', 'razorpay');
          
          // Redirect to payment gateway
          window.location.href = paymentResponse.redirectUrl;
          return { id: orderId };
        } else {
          // Handle payment initiation failure
          toast({
            title: "Payment Error",
            description: paymentResponse.message || "Failed to initiate payment. Please try again.",
            variant: "destructive",
          });
          return null;
        }
      } else if (orderDetails.paymentMethod === 'qr') {
        // For QR payment, redirect to QR page
        navigate('/payment');
      } else {
        // For COD, go directly to confirmation
        localStorage.setItem('orderConfirmed', 'true');
        localStorage.setItem('paymentMethod', 'cod');
        clearCart();
        navigate('/order-confirmation');
      }

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

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      // Only update in database if user is authenticated
      if (user) {
        try {
          const { error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', orderId);

          if (error) throw error;
        } catch (updateError) {
          console.error('Error updating order status:', updateError);
          // Continue even if update fails
        }
      }

      return true;
    } catch (error: any) {
      toast({
        title: "Error updating order",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    createOrder,
    updateOrderStatus,
    isCreating
  };
};
