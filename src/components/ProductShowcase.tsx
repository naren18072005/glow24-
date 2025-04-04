
import { useEffect, useState } from 'react';
import ProductCard, { ProductProps } from './ProductCard';
import { Link } from 'react-router-dom';

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
    }
  ]
};

const ProductShowcase = () => {
  const [animateProducts] = useState(true);

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
        
        {/* Hair Care Products */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Hair Care Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productData.hairCare.map((product, index) => (
              <div 
                key={product.id}
                className={animateProducts ? 'animate-scale-in' : ''}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
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
        
        {/* Skin Care Products */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Skin & Lip Care Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productData.skinCare.map((product, index) => (
              <div 
                key={product.id}
                className={animateProducts ? 'animate-scale-in' : ''}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
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
