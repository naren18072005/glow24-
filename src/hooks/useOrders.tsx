import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { 
  createRazorpayOrder, 
  openRazorpayCheckout, 
  getRazorpayKey 
} from '@/services/paymentService';
import { handleGooglePayCheckout } from '@/services/googlePayService';

export const useOrders = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const createOrder = async (orderDetails: {
    shippingAddress: string;
    paymentMethod: 'razorpay' | 'qr' | 'cod' | 'gpay';
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
      
      // Store payment method for later reference
      localStorage.setItem('paymentMethod', orderDetails.paymentMethod);

      // Create payment transaction for tracking
      let paymentId = null;
      if (user) {
        try {
          // Create payment transaction for tracking
          const { data: transaction, error } = await supabase
            .from('payment_transactions')
            .insert({
              order_id: orderId,
              amount: orderDetails.grandTotal,
              payment_gateway: orderDetails.paymentMethod,
              status: 'pending'
            })
            .select()
            .single();
          
          if (error) {
            console.error('Error creating payment transaction:', error);
          } else {
            paymentId = transaction.id;
            localStorage.setItem('pendingPaymentId', paymentId);
          }
        } catch (dbError) {
          console.error('Database error creating payment transaction:', dbError);
        }
      }

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
        handleRazorpayPayment(
          orderId,
          orderDetails.grandTotal,
          {
            name: orderDetails.customerName || 'Customer',
            email: orderDetails.customerEmail || '',
            phone: orderDetails.customerPhone || '',
            address: orderDetails.shippingAddress
          }
        );
      } else if (orderDetails.paymentMethod === 'gpay') {
        // Show toast notification
        toast({
          title: "Redirecting to Google Pay",
          description: "You will be redirected to complete your payment with Google Pay.",
        });
        
        // Handle Google Pay payment
        await handleGooglePayCheckout(
          orderId,
          orderDetails.grandTotal,
          {
            name: orderDetails.customerName || 'Customer',
            email: orderDetails.customerEmail || '',
            phone: orderDetails.customerPhone || '',
          }
        );
      } else if (orderDetails.paymentMethod === 'qr') {
        // For QR payment, redirect to QR page
        navigate('/payment');
      } else {
        // For COD, go directly to confirmation
        localStorage.setItem('orderConfirmed', 'true');
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

  const handleRazorpayPayment = async (
    orderId: string,
    amount: number,
    customerInfo: {
      name: string;
      email: string;
      phone: string;
      address: string;
    }
  ) => {
    try {
      // Create order in Razorpay
      const razorpayOrder = await createRazorpayOrder(
        amount * 100, // Razorpay accepts amount in paise
        orderId
      );
      
      if (!razorpayOrder) {
        throw new Error('Failed to create Razorpay order');
      }
      
      // Get Razorpay key
      const razorpayKey = getRazorpayKey();
      
      // Show toast notification
      toast({
        title: "Redirecting to Payment",
        description: "Please complete your payment in the Razorpay window.",
      });
      
      // Open Razorpay checkout
      await openRazorpayCheckout(
        {
          key: razorpayKey,
          amount: amount * 100, // in paise
          currency: 'INR',
          name: 'Glow24 Organics',
          description: 'Order #' + orderId.substring(0, 8),
          order_id: razorpayOrder.id,
          prefill: {
            name: customerInfo.name,
            email: customerInfo.email,
            contact: customerInfo.phone
          },
          notes: {
            address: customerInfo.address
          },
          theme: {
            color: '#F2A83B'
          }
        },
        (response) => {
          // Payment successful
          console.log('Payment successful', response);
          localStorage.setItem('razorpayResponse', JSON.stringify(response));
          localStorage.setItem('orderConfirmed', 'true');
          clearCart();
          
          // Update payment status
          updateOrderStatus(orderId, 'paid');
          
          // Show success toast
          toast({
            title: "Payment Successful!",
            description: "Your order has been placed. Thank you for shopping with us!",
          });
          
          // Navigate to confirmation page
          navigate('/order-confirmation');
        },
        (error) => {
          // Payment failed
          console.error('Razorpay payment failed:', error);
          
          // Show a more detailed error message
          toast({
            title: "Payment Failed",
            description: error.description || "Your payment could not be processed. Please try again.",
            variant: "destructive",
          });
          
          // Navigate to payment callback with error
          navigate('/payment-callback?status=failed');
        }
      );
    } catch (error: any) {
      console.error('Razorpay error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      });
      
      // Navigate to payment callback with error
      navigate('/payment-callback?status=failed');
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
