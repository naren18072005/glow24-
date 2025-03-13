
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';

export const useOrders = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const createOrder = async (orderDetails: {
    shippingAddress: string;
    paymentMethod: 'qr' | 'cod';
    shippingCost: number;
    grandTotal: number;
  }) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to complete your order",
        variant: "destructive",
      });
      navigate('/auth', { state: { from: '/checkout' } });
      return null;
    }

    setIsCreating(true);

    try {
      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total: orderDetails.grandTotal,
          shipping_address: orderDetails.shippingAddress,
          payment_method: orderDetails.paymentMethod,
          status: orderDetails.paymentMethod === 'cod' ? 'pending' : 'processing'
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // Create order items
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
        throw itemsError;
      }

      // Store order information for later use
      localStorage.setItem('checkoutInfo', JSON.stringify({
        orderId: order.id,
        customer: {
          address: orderDetails.shippingAddress,
        },
        items,
        totalAmount,
        shippingCost: orderDetails.shippingCost,
        grandTotal: orderDetails.grandTotal,
      }));

      if (orderDetails.paymentMethod === 'qr') {
        navigate('/payment');
      } else {
        localStorage.setItem('orderConfirmed', 'true');
        localStorage.setItem('paymentMethod', 'cod');
        clearCart();
        navigate('/order-confirmation');
      }

      return order;
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
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;

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
