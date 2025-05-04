
import { useState, useEffect } from 'react';
import { ProductProps } from '@/components/ProductCard';

// Local product data
const localProductData: ProductProps[] = [
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
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      setLoading(true);
      
      // Filter products by category if specified
      const filteredProducts = category 
        ? localProductData.filter(product => product.category === category)
        : localProductData;
        
      // Simulate loading delay
      setTimeout(() => {
        setProducts(filteredProducts);
        setLoading(false);
      }, 500);
    };
    
    loadProducts();
  }, [category]);

  return {
    products,
    loading
  };
};
