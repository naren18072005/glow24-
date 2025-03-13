
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard, { ProductProps } from '@/components/ProductCard';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const skinCareProducts: ProductProps[] = [
  {
    id: 3,
    name: "Golden Serum (15ml)",
    description: "Luxurious golden serum that brightens and evens skin tone, enhancing your natural glow.",
    price: 250,
    image: "/lovable-uploads/34914154-1774-4647-a973-b580b0ba3e64.png"
  },
  {
    id: 4,
    name: "Golden Serum (30ml)",
    description: "Our premium gold-infused face serum for radiant, youthful skin in a larger size.",
    price: 350,
    image: "/lovable-uploads/34914154-1774-4647-a973-b580b0ba3e64.png"
  },
  {
    id: 5,
    name: "Strawberry Lip Balm",
    description: "Hydrating lip balm with delicious strawberry flavor for soft, plump lips.",
    price: 70,
    image: "/lovable-uploads/75403ddb-c41d-4a13-a08c-ee678bdd4573.png"
  },
  {
    id: 6,
    name: "Golden Facewash",
    description: "Gentle cleansing facewash that removes impurities while maintaining your skin's natural moisture.",
    price: 150,
    image: "/lovable-uploads/da5c0bf6-73f5-4067-9fd4-f0d64d8c0706.png"
  },
  {
    id: 7,
    name: "Natural Soaps",
    description: "Handcrafted organic soaps made with natural ingredients for a refreshing cleanse.",
    price: 50,
    image: "/lovable-uploads/9f5280ac-d499-4bdf-bba1-28e2f3a829d5.png"
  },
  {
    id: 8,
    name: "Aloe Vera Gel",
    description: "Soothing aloe vera gel that calms irritated skin and provides deep hydration.",
    price: 199,
    image: "/lovable-uploads/fb77df66-ff33-4208-91fe-fab026973b83.png"
  },
  {
    id: 9,
    name: "Saffron Gel",
    description: "Luxurious saffron-infused gel that brightens skin and reduces pigmentation.",
    price: 150,
    image: "/lovable-uploads/60b6dc7a-818d-4be6-a5d6-6d91245c129a.png"
  }
];

const SkinCare = () => {
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
              SKIN CARE COLLECTION
            </h5>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Premium Organic Skin Products</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Discover our carefully formulated skin care products made with the finest organic ingredients.
              Your skin deserves nothing but the purest natural care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skinCareProducts.map((product, index) => (
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

export default SkinCare;
