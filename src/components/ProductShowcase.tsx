
import { useEffect, useState } from 'react';
import ProductCard, { ProductProps } from './ProductCard';

const productData: { hairCare: ProductProps[], skinCare: ProductProps[] } = {
  hairCare: [
    {
      id: 1,
      name: "Hair Oil",
      description: "Nourishing hair oil that strengthens hair follicles and promotes healthy growth.",
      price: 199,
      image: "/lovable-uploads/666e7309-d5d2-456a-ba0a-2bd5e0db41f6.png"
    },
    {
      id: 2,
      name: "Rosemary Spray",
      description: "Refreshing rosemary spray that stimulates the scalp and adds shine to hair.",
      price: 150,
      image: "https://images.unsplash.com/photo-1637319460943-10da953a3ad8?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: 3,
      name: "Hair Serum 15ml",
      description: "Advanced formula that repairs damaged hair and reduces frizz. Travel size.",
      price: 250,
      image: "https://images.unsplash.com/photo-1624972985097-d0a7a288a222?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: 4,
      name: "Hair Serum 30ml",
      description: "Advanced formula that repairs damaged hair and reduces frizz. Standard size.",
      price: 350,
      image: "https://images.unsplash.com/photo-1630082900894-edbd503588f7?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  ],
  skinCare: [
    {
      id: 5,
      name: "Hydrating Face Serum",
      description: "Intensive hydration serum with hyaluronic acid that plumps and revitalizes skin.",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: 6,
      name: "Brightening Eye Cream",
      description: "Reduces dark circles and puffiness while illuminating the delicate eye area.",
      price: 38.99,
      image: "https://images.unsplash.com/photo-1626273869656-6488a88877a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: 7,
      name: "Nourishing Lip Balm",
      description: "Rich, moisturizing lip treatment that repairs and protects dry, chapped lips.",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1599305090598-fe179d501228?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: 8,
      name: "Overnight Recovery Mask",
      description: "Rejuvenating sleep mask that works while you rest for radiant morning skin.",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=2035&auto=format&fit=crop&ixlib=rb-4.0.3"
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
    <section id="products" className="section-padding bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h5 className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider text-white/90 mb-4">
            OUR COLLECTIONS
          </h5>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Premium Products for You</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Discover our carefully formulated products made with the finest natural ingredients. 
            Your skin and hair deserve nothing but the best.
          </p>
        </div>
        
        <div className="flex justify-center gap-6 mb-12">
          <button 
            className={`px-6 py-3 text-white rounded-full transition-all duration-300 ${
              category === 'hairCare' 
                ? 'bg-brand shadow-lg shadow-brand/30' 
                : 'bg-dark-light hover:bg-dark-lighter'
            }`}
            onClick={() => setCategory('hairCare')}
          >
            Hair Care Products
          </button>
          <button 
            className={`px-6 py-3 text-white rounded-full transition-all duration-300 ${
              category === 'skinCare' 
                ? 'bg-brand shadow-lg shadow-brand/30' 
                : 'bg-dark-light hover:bg-dark-lighter'
            }`}
            onClick={() => setCategory('skinCare')}
          >
            Skin & Lip Care Products
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
