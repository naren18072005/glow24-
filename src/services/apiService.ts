
/**
 * API Service for product and order operations
 */

import { ProductProps } from '@/components/ProductCard';

// Use environment variables for API URL with fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; 
console.log("API base URL:", API_BASE_URL); // Log the API URL for debugging

// API Key for secure endpoints
const API_KEY = "193930cd-d040-4a41-82d7-0b8ffe4a98b4";

// Common headers for API requests
const getHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  'x-api-key': API_KEY
});

// Fetch all products with retry mechanism
export const fetchProducts = async (retryCount = 2): Promise<ProductProps[]> => {
  try {
    console.log(`Fetching products from: ${API_BASE_URL}/api/products`);
    
    // Add a timeout to the fetch request to avoid long waiting times
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
    
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      signal: controller.signal,
      headers: getHeaders()
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("Products fetched successfully:", data.length);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    
    // Retry logic - attempt to fetch again if retries remain
    if (retryCount > 0) {
      console.log(`Retrying fetch products. Attempts remaining: ${retryCount}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
      return fetchProducts(retryCount - 1);
    }
    
    // Return empty array after all retries fail
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
      headers: getHeaders(),
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
      headers: getHeaders(),
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

// Update order status
export const updateOrderStatus = async (orderId: string, status: string): Promise<void> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to update order status: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};
