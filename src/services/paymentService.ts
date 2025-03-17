
import { supabase } from "@/integrations/supabase/client";

type PaymentGateway = 'razorpay' | 'qr' | 'cod';

interface InitiatePaymentParams {
  orderId: string;
  amount: number;
  gatewayType: PaymentGateway;
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
}

interface PaymentResponse {
  success: boolean;
  redirectUrl?: string;
  paymentId?: string;
  message?: string;
}

// Mock function to generate Razorpay payment URL
// In a real implementation, you would call your payment gateway's API
const generateRazorpayUrl = (orderId: string, amount: number): string => {
  // This is a mock URL - in production, this would be a real payment gateway URL
  return `https://checkout.razorpay.com/v1/checkout.html?key=rzp_test_YOUR_KEY&amount=${amount * 100}&order_id=${orderId}&name=Glow24%20Organics&prefill.email=customer@example.com`;
};

export const initiatePayment = async (params: InitiatePaymentParams): Promise<PaymentResponse> => {
  try {
    const { orderId, amount, gatewayType, customerEmail, customerName } = params;
    
    // For COD, no redirection needed
    if (gatewayType === 'cod') {
      return { success: true };
    }
    
    // For QR payment, redirect to QR page
    if (gatewayType === 'qr') {
      return { success: true, redirectUrl: '/payment' };
    }
    
    // For Razorpay or other gateways that need redirection
    if (gatewayType === 'razorpay') {
      // Generate redirect URL for the payment gateway
      const redirectUrl = generateRazorpayUrl(orderId, amount);
      
      // Create a record in the payment_transactions table
      const { data, error } = await supabase
        .from('payment_transactions')
        .insert({
          order_id: orderId,
          payment_gateway: gatewayType,
          amount: amount,
          redirect_url: redirectUrl,
        })
        .select()
        .single();
        
      if (error) {
        console.error('Error creating payment transaction:', error);
        return { 
          success: false, 
          message: 'Failed to initiate payment. Please try again.'
        };
      }
      
      // Return success with redirect URL
      return {
        success: true,
        redirectUrl,
        paymentId: data.id
      };
    }
    
    return {
      success: false,
      message: 'Invalid payment method'
    };
  } catch (error) {
    console.error('Payment initiation error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.'
    };
  }
};

export const verifyPayment = async (paymentId: string, gatewayResponse: any): Promise<boolean> => {
  try {
    // Update the payment transaction with the gateway response
    const { error } = await supabase
      .from('payment_transactions')
      .update({
        status: 'completed',
        callback_data: gatewayResponse
      })
      .eq('id', paymentId);
      
    if (error) {
      console.error('Error updating payment status:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Payment verification error:', error);
    return false;
  }
};
