
import { handleGooglePayCheckout, handleBlueDartCOD } from '@/services/googlePayService';
import { storePaymentMethod, storeOrderConfirmation } from './orderStorage';
import { useToast } from '@/hooks/use-toast';

export const processPayment = async (
  orderId: string,
  paymentMethod: 'gpay' | 'cod',
  amount: number,
  shippingAddress: string,
  customerInfo: {
    name?: string;
    email?: string;
    phone?: string;
  }
) => {
  try {
    // Store payment method for later reference
    storePaymentMethod(paymentMethod);

    // Handle payment based on selected method
    if (paymentMethod === 'gpay') {
      // Handle Google Pay payment with the exact amount
      await handleGooglePayCheckout(
        orderId,
        amount,
        {
          name: customerInfo.name || 'Customer',
          email: customerInfo.email || '',
          phone: customerInfo.phone || '',
        }
      );
    } else if (paymentMethod === 'cod') {
      // Handle Blue Dart COD integration
      await handleBlueDartCOD(
        orderId,
        shippingAddress,
        {
          name: customerInfo.name || 'Customer',
          email: customerInfo.email || '',
          phone: customerInfo.phone || '',
        }
      );
    }

    return true;
  } catch (error) {
    console.error(`Error processing ${paymentMethod} payment:`, error);
    return false;
  }
};

export const showPaymentToast = (
  toast: any,
  paymentMethod: 'gpay' | 'cod'
) => {
  if (paymentMethod === 'gpay') {
    toast({
      title: "Redirecting to Google Pay",
      description: "You will be redirected to complete your payment with Google Pay.",
    });
  } else if (paymentMethod === 'cod') {
    toast({
      title: "Processing Cash on Delivery",
      description: "Your order is being registered with Blue Dart for Cash on Delivery.",
    });
  }
};
