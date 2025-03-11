
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductCard = ({ product }: { product: ProductProps }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative h-[400px] glass-card rounded-xl overflow-hidden transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center transition-all duration-500 filter"
          style={{ 
            backgroundImage: `url(${product.image})`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col space-y-2 transform transition-all duration-300" 
        style={{ transform: isHovered ? 'translateY(-12px)' : 'translateY(0)' }}>
        <h3 className="text-xl font-bold text-white">
          {product.name}
        </h3>
        
        <p className={`text-white/80 text-sm line-clamp-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`}>
          {product.description}
        </p>
        
        <div className="pt-2 flex justify-between items-center">
          <span className="text-lg font-bold text-white">${product.price.toFixed(2)}</span>
          
          <button className="button-success flex items-center gap-1 py-2 px-4 rounded-md">
            <ShoppingCart size={16} />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
      
      <div 
        className="absolute top-4 right-4 h-12 w-12 glass-card rounded-full flex items-center justify-center text-white cursor-pointer opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
      >
        <ShoppingCart size={18} />
      </div>
    </div>
  );
};

export default ProductCard;
