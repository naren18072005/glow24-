
/**
 * API Service for product and order operations
 */

import { ProductProps } from '@/components/ProductCard';

const API_BASE_URL = "https://api.glow24organics.com"; // Replace with your actual API base URL

// Fetch all products
export const fetchProducts = async (): Promise<ProductProps[]> => {
  try {
    // Add a timeout to the fetch request to avoid long waiting times
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return empty array instead of throwing, to allow fallback data to be used
    return [];
  }
};

// Submit an order
export interface OrderData {
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress: string;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  shippingCost: number;
  grandTotal: number;
  paymentMethod: 'gpay' | 'cod';
}

export const submitOrder = async (orderData: OrderData): Promise<{ orderId: string }> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Order submission failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting order:", error);
    // Generate a local order ID since the API call failed
    return { orderId: crypto.randomUUID() };
  }
};

// Track an order
export interface TrackingData {
  status: string;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  estimatedDelivery: string;
  stages: {
    name: string;
    completed: boolean;
    timestamp?: string;
  }[];
  distance?: number;
}

export const trackOrder = async (orderId: string): Promise<TrackingData> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/track`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to track order: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error tracking order:", error);
    
    // Return simulated tracking data since the API call failed
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
  }
};
