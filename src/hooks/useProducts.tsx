
import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '@/services/apiService';
import { ProductProps } from '@/components/ProductCard';
import { useToast } from '@/hooks/use-toast';

// Fallback data to use when API fails - only hair care products
const fallbackProductData: ProductProps[] = [
  {
    id: 1,
    name: "Hair Oil",
    description: "Nourishing hair oil that strengthens hair follicles and promotes healthy growth.",
    price: 199,
    image: "/lovable-uploads/666e7309-d5d2-456a-ba0a-2bd5e0db41f6.png",
    isBestSeller: true,
    category: 'hair-care'
  },
  {
    id: 2,
    name: "Rosemary Spray",
    description: "Refreshing rosemary spray that stimulates the scalp and adds shine to hair.",
    price: 150,
    image: "/lovable-uploads/8b6970d3-aa7a-4b17-b67b-3b06dd0b3383.png",
    category: 'hair-care'
  }
];

export const useProducts = (category?: string) => {
  const [products, setProducts] = useState<ProductProps[]>(fallbackProductData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const { toast } = useToast();

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchProducts();
      
      if (data.length === 0) {
        // API returned no products, use fallback
        setIsUsingFallback(true);
        setProducts(getFilteredProducts(fallbackProductData, category));
        setError('Could not load products from server. Using local data instead.');
        toast({
          title: "Network Issue",
          description: "Could not connect to product server. Showing locally stored products.",
          variant: "destructive",
          duration: 5000,
        });
      } else {
        // API returned products successfully
        setIsUsingFallback(false);
        setProducts(getFilteredProducts(data, category));
        
        if (isUsingFallback) {
          // If we were previously using fallback data but now got real data
          toast({
            title: "Connection Restored",
            description: "Successfully connected to product server.",
            variant: "default",
            duration: 3000,
          });
        }
      }
    } catch (err) {
      // This should not happen now since fetchProducts handles errors internally
      setIsUsingFallback(true);
      setProducts(getFilteredProducts(fallbackProductData, category));
      setError('Failed to load products. Using local data instead.');
    } finally {
      setLoading(false);
    }
  }, [category, toast, isUsingFallback]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Helper function to filter products by category
  const getFilteredProducts = (data: ProductProps[], filterCategory?: string): ProductProps[] => {
    if (!filterCategory) return data;
    
    return data.filter(product => 
      product.category === filterCategory
    );
  };

  // Function to manually retry fetching products
  const retryFetch = () => {
    setLoading(true);
    getProducts();
  };

  return { products, loading, error, isUsingFallback, retryFetch };
};
