
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

const SkinCare = () => {
  const navigate = useNavigate();
  const [animateProducts] = useState(true);
  const { products, loading, error, isUsingFallback, retryFetch } = useProducts('skin-care');

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
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-10">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </button>
          
          <div className="text-center mb-12 animate-fade-in">
            <h5 className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider text-white/90">
              SKIN CARE COLLECTION
            </h5>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Premium Organic Skin Products</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Discover our carefully formulated skin care products made with the finest organic ingredients.
              Your skin deserves nothing but the purest natural care.
            </p>
            
            {isUsingFallback && (
              <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-md inline-flex items-center gap-2">
                <AlertCircle size={16} className="text-amber-500" />
                <span className="text-amber-200 text-sm">
                  Using locally stored product data. Some features may be limited.
                </span>
                <button 
                  onClick={handleRetry} 
                  className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors"
                  title="Refresh page"
                >
                  <RefreshCw size={16} className="text-amber-500" />
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              renderSkeletons(6)
            ) : (
              products.map((product, index) => (
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SkinCare;
