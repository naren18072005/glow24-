
import { useState } from 'react';
import ProductCard, { ProductProps } from './ProductCard';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Button } from './ui/button';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

const ProductShowcase = () => {
  const [animateProducts] = useState(true);
  const { products, loading, error, isUsingFallback, retryFetch } = useProducts();
  
  // Organize products by category
  const organizedProducts = {
    hairCare: products.filter(p => p.category === 'hair-care' || p.id === 1 || p.id === 2),
    skinCare: products.filter(p => p.category === 'skin-care' || p.id >= 3)
  };

  const renderSkeletons = (count: number) => {
    return Array(count).fill(0).map((_, index) => (
      <div key={`skeleton-${index}`} className="animate-pulse">
        <div className="h-[400px] bg-white/5 rounded-xl overflow-hidden">
          <div className="w-full h-3/5 bg-white/10"></div>
          <div className="p-6">
            <div className="h-6 bg-white/10 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-4/5 mb-4"></div>
            <div className="flex justify-between items-center mt-6">
              <div className="h-6 bg-white/10 rounded w-1/4"></div>
              <div className="h-10 bg-white/10 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const handleRetry = () => {
    if (retryFetch) {
      retryFetch();
    } else {
      window.location.reload();
    }
  };

  return (
    <section id="products" className="section-padding bg-gradient-to-b from-black/95 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h5 className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider text-white/90">
            OUR COLLECTIONS
          </h5>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Premium Organic Products</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Discover our carefully formulated products made with the finest organic ingredients. 
            Your skin and hair deserve nothing but the purest natural care.
          </p>
          
          {isUsingFallback && (
            <div className="mt-6 max-w-xl mx-auto">
              <Alert variant="destructive" className="bg-amber-500/10 border-amber-500/30 text-amber-200">
                <WifiOff className="h-4 w-4 text-amber-500" />
                <AlertTitle className="text-amber-300">Network Connection Issue</AlertTitle>
                <AlertDescription className="text-amber-200">
                  <p className="mb-2">We're currently showing locally stored product data due to connection issues.</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRetry} 
                    className="bg-amber-500/10 border-amber-500/30 text-amber-300 hover:text-amber-200 hover:bg-amber-500/20 mt-1"
                  >
                    <RefreshCw size={14} className="mr-1" /> Retry Connection
                  </Button>
                </AlertDescription>
              </Alert>
            </div>
          )}
          
          {!isUsingFallback && !loading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-400">
              <Wifi size={16} />
              <span className="text-sm">Connected to product server</span>
            </div>
          )}
          
          <div className="mt-4">
            <Link 
              to="/products-table"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-[#F2A83B]/10 text-[#F2A83B] hover:bg-[#F2A83B]/20 transition-colors"
            >
              View Complete Product Database
            </Link>
          </div>
        </div>
        
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Hair Care Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              renderSkeletons(2)
            ) : (
              organizedProducts.hairCare.map((product, index) => (
                <div 
                  key={product.id}
                  className={animateProducts ? 'animate-scale-in' : ''}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-6">
            <Link 
              to="/hair-care"
              className="text-[#F2A83B] hover:underline inline-flex items-center"
            >
              View All Hair Care Products
            </Link>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Skin & Lip Care Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              renderSkeletons(4)
            ) : (
              organizedProducts.skinCare.map((product, index) => (
                <div 
                  key={product.id}
                  className={animateProducts ? 'animate-scale-in' : ''}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-6">
            <Link 
              to="/skin-care"
              className="text-[#F2A83B] hover:underline inline-flex items-center"
            >
              View All Skin Care Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
