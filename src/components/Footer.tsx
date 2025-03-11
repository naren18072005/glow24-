
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Glow<span className="text-brand">24</span>
            </h2>
            <p className="text-xs text-white/70 tracking-widest text-center">
              NATURAL HAIR & SKIN CARE PRODUCTS
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-6 mb-8">
            <a 
              href="#" 
              className="text-white/70 hover:text-white transition-colors duration-300 hover-scale"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a 
              href="#" 
              className="text-white/70 hover:text-white transition-colors duration-300 hover-scale"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a 
              href="#" 
              className="text-white/70 hover:text-white transition-colors duration-300 hover-scale"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center space-x-8 mb-6">
              <a href="#home" className="text-white/70 hover:text-white transition-colors duration-300">
                Home
              </a>
              <a href="#products" className="text-white/70 hover:text-white transition-colors duration-300">
                Products
              </a>
              <a href="#about" className="text-white/70 hover:text-white transition-colors duration-300">
                About Us
              </a>
              <a href="#contact" className="text-white/70 hover:text-white transition-colors duration-300">
                Contact
              </a>
            </div>
            
            <p className="text-white/50 text-sm">
              © {currentYear} Glow24. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
