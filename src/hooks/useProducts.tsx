
import { useState, useEffect } from 'react';
import { fetchProducts } from '@/services/apiService';
import { ProductProps } from '@/components/ProductCard';
import { useToast } from '@/hooks/use-toast';

export const useProducts = (category?: string) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchProducts();
        
        // Filter by category if provided
        const filteredProducts = category
          ? data.filter(product => {
              // This assumes your product has a category field
              // You may need to adjust this logic based on your data structure
              return product.category === category;
            })
          : data;
          
        setProducts(filteredProducts);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        toast({
          title: "Error",
          description: "Could not load products. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [category, toast]);

  return { products, loading, error };
};
