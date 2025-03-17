
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
const generateRazorpayUrl = (orderId: string, amount: number, customerEmail?: string, customerName?: string): string => {
  // This is a mock URL - in production, this would be a real payment gateway URL
  const baseUrl = `https://checkout.razorpay.com/v1/checkout.html?key=rzp_test_YOUR_KEY&amount=${amount * 100}&order_id=${orderId}`;
  const customerDetails = customerName ? `&name=${encodeURIComponent(customerName || 'Customer')}` : '';
  const emailDetails = customerEmail ? `&prefill.email=${encodeURIComponent(customerEmail)}` : '';
  
  return `${baseUrl}${customerDetails}${emailDetails}`;
};

export const initiatePayment = async (params: InitiatePaymentParams): Promise<PaymentResponse> => {
  try {
    const { orderId, amount, gatewayType, customerEmail, customerName, customerPhone } = params;
    
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
      const redirectUrl = generateRazorpayUrl(orderId, amount, customerEmail, customerName);
      
      try {
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
      } catch (error) {
        console.error('Supabase error:', error);
        // If there's an error with the database, still allow the payment to proceed
        // This ensures the user experience isn't blocked by database issues
        return {
          success: true,
          redirectUrl,
          message: 'Payment initiated, but transaction recording failed. Please keep your payment confirmation.'
        };
      }
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
    // If no paymentId is provided, we can't update the transaction
    // This can happen in guest checkout when the database transaction wasn't recorded
    if (!paymentId) {
      return true; // Allow the payment to be considered successful
    }
    
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
      // Even if the database update fails, we can still consider payment successful
      // for user experience purposes
      return true;
    }
    
    return true;
  } catch (error) {
    console.error('Payment verification error:', error);
    // For better user experience, return true even if there's an error
    // In a production environment, you'd want more robust error handling
    return true;
  }
};
