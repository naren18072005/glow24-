
import { useToast } from "@/hooks/use-toast";

export interface GooglePayOptions {
  transactionId: string;
  merchantId: string;
  merchantName: string;
  amount: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

// Simulates creating a Google Pay intent
export const createGooglePayIntent = async (options: GooglePayOptions): Promise<string> => {
  try {
    // In a real implementation, this would make an API call to create a payment intent
    // For our simulation, we'll construct a URL with the parameters
    
    // Format the amount to have two decimal places
    const formattedAmount = options.amount.toFixed(2);
    
    // Construct the Google Pay URL
    const gPayURL = `https://pay.google.com/gp/v/u/0/home?hdr=0&origin=https://lovableproject.com#checkout?transactionId=${options.transactionId}&merchantId=${options.merchantId}&merchantName=${options.merchantName}&totalPrice=${formattedAmount}&customerName=${encodeURIComponent(options.customerInfo.name)}`;
    
    // In a real implementation, we would save this intent to your backend
    console.log(`Created Google Pay intent for transaction ${options.transactionId}`);
    
    return gPayURL;
  } catch (error) {
    console.error('Error creating Google Pay intent:', error);
    throw error;
  }
};

// Opens the Google Pay window
export const openGooglePayCheckout = (gPayURL: string): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      // For a real implementation, redirect to the Google Pay URL
      console.log('Opening Google Pay checkout URL:', gPayURL);
      
      // In a real app, we would redirect the user to the Google Pay URL
      // Here we just simulate opening a new window
      const gPayWindow = window.open(gPayURL, '_blank');
      
      // If popup is blocked, handle gracefully
      if (!gPayWindow) {
        console.log('Popup blocked, would redirect to Google Pay');
        window.location.href = '/payment/redirect';
      }
      
      // Simulate successful payment
      setTimeout(() => {
        resolve(true);
      }, 1000);
      
    } catch (error) {
      console.error('Error opening Google Pay:', error);
      // Even if there's an error, we'll resolve with true for demo purposes
      resolve(true);
    }
  });
};

// Redirect to Google Pay and handle the return
export const handleGooglePayCheckout = async (
  transactionId: string,
  amount: number,
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  }
): Promise<boolean> => {
  try {
    // Create a Google Pay intent
    const gPayURL = await createGooglePayIntent({
      transactionId,
      merchantId: "GLOW24_MERCHANT",
      merchantName: "Glow24 Organics",
      amount,
      customerInfo
    });
    
    // Open Google Pay checkout
    await openGooglePayCheckout(gPayURL);
    
    // Redirect to our payment redirect page
    window.location.href = '/payment/redirect';
    
    return true;
  } catch (error) {
    console.error('Google Pay checkout error:', error);
    // Still redirect to success for demo purposes
    window.location.href = '/payment/redirect';
    return true;
  }
};
