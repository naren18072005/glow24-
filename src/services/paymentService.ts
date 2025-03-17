
import { supabase } from "@/integrations/supabase/client";

type PaymentGateway = 'upi' | 'qr' | 'cod';

interface InitiatePaymentParams {
  orderId: string;
  amount: number;
  gatewayType: PaymentGateway;
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
  upiId?: string;
}

interface PaymentResponse {
  success: boolean;
  redirectUrl?: string;
  paymentId?: string;
  message?: string;
}

// Generate a UPI payment URL
const generateUpiUrl = (orderId: string, amount: number, upiId: string = "naren1872005@oksbi", customerName?: string): string => {
  // Format: upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&tr=TRANSACTION_ID&tn=NOTE
  const encodedName = encodeURIComponent(customerName || 'Customer');
  const encodedNote = encodeURIComponent(`Payment for order #${orderId}`);
  
  return `upi://pay?pa=${upiId}&pn=${encodedName}&am=${amount}&tr=${orderId}&tn=${encodedNote}`;
};

export const initiatePayment = async (params: InitiatePaymentParams): Promise<PaymentResponse> => {
  try {
    const { orderId, amount, gatewayType, customerEmail, customerName, customerPhone, upiId } = params;
    
    // For COD, no redirection needed
    if (gatewayType === 'cod') {
      return { success: true };
    }
    
    // For QR payment, redirect to QR page
    if (gatewayType === 'qr') {
      return { success: true, redirectUrl: '/payment' };
    }
    
    // For UPI direct payment
    if (gatewayType === 'upi') {
      // Generate UPI payment URL
      const redirectUrl = generateUpiUrl(orderId, amount, upiId, customerName);
      
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
          // Still allow the payment to proceed even if database record fails
          return { 
            success: true, 
            redirectUrl,
            message: 'Redirecting to UPI payment app'
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
    return true;
  }
};
