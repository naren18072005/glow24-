
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard, { ProductProps } from '@/components/ProductCard';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const hairCareProducts: ProductProps[] = [
  {
    id: 1,
    name: "Hair Oil",
    description: "Nourishing hair oil that strengthens hair follicles and promotes healthy growth.",
    price: 199,
    image: "/lovable-uploads/666e7309-d5d2-456a-ba0a-2bd5e0db41f6.png",
    isBestSeller: true
  },
  {
    id: 2,
    name: "Rosemary Spray",
    description: "Refreshing rosemary spray that stimulates the scalp and adds shine to hair.",
    price: 150,
    image: "/lovable-uploads/8b6970d3-aa7a-4b17-b67b-3b06dd0b3383.png"
  }
];

const HairCare = () => {
  const navigate = useNavigate();
  const [animateProducts] = useState(true);

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
              HAIR CARE COLLECTION
            </h5>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Premium Organic Hair Products</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Discover our carefully formulated hair care products made with the finest organic ingredients.
              Your hair deserves nothing but the purest natural care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hairCareProducts.map((product, index) => (
              <div 
                key={product.id}
                className={animateProducts ? 'animate-scale-in' : ''}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HairCare;
