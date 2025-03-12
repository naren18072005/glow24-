
import { useEffect, useState } from 'react';
import ProductCard, { ProductProps } from './ProductCard';

const productData: { hairCare: ProductProps[], skinCare: ProductProps[] } = {
  hairCare: [
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
  ],
  skinCare: [
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
  ]
};

const ProductShowcase = () => {
  const [category, setCategory] = useState<'hairCare' | 'skinCare'>('hairCare');
  const [animateProducts, setAnimateProducts] = useState(true);

  useEffect(() => {
    // Temporarily disable animations when switching categories
    setAnimateProducts(false);
    
    const timer = setTimeout(() => {
      setAnimateProducts(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [category]);

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
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <button 
            className={`px-6 py-3 text-white rounded-full transition-all duration-300 ${
              category === 'hairCare' 
                ? 'bg-[#F2A83B] shadow-lg shadow-[#F2A83B]/30' 
                : 'bg-dark-light hover:bg-dark-lighter'
            }`}
            onClick={() => setCategory('hairCare')}
          >
            Hair Care Products
          </button>
          <button 
            className={`px-6 py-3 text-white rounded-full transition-all duration-300 ${
              category === 'skinCare' 
                ? 'bg-[#F2A83B] shadow-lg shadow-[#F2A83B]/30' 
                : 'bg-dark-light hover:bg-dark-lighter'
            }`}
            onClick={() => setCategory('skinCare')}
          >
            Skin & Lip Care Products
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productData[category].map((product, index) => (
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
    </section>
  );
};

export default ProductShowcase;
