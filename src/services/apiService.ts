
/**
 * API Service for product and order operations
 */

import { ProductProps } from '@/components/ProductCard';
import { useToast } from '@/hooks/use-toast';

const API_BASE_URL = "https://api.glow24organics.com"; // Replace with your actual API base URL

// Fetch all products
export const fetchProducts = async (): Promise<ProductProps[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
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
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Order submission failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error;
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
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/track`);
    if (!response.ok) {
      throw new Error(`Failed to track order: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error tracking order:", error);
    throw error;
  }
};
