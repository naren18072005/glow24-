
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 bg-black border-t border-[#F2A83B]/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-6">
            <img 
              src="/lovable-uploads/de4d0e6f-1626-4aee-ace1-fe33a44d010e.png" 
              alt="Glow24 Organics" 
              className="h-20 mb-2" 
            />
            <p className="text-xs text-white/70 tracking-widest text-center">
              NATURAL HAIR & SKIN CARE PRODUCTS
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-6 mb-8">
            <a 
              href="#" 
              className="text-[#F2A83B]/80 hover:text-[#F2A83B] transition-colors duration-300 hover-scale"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a 
              href="#" 
              className="text-[#F2A83B]/80 hover:text-[#F2A83B] transition-colors duration-300 hover-scale"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a 
              href="#" 
              className="text-[#F2A83B]/80 hover:text-[#F2A83B] transition-colors duration-300 hover-scale"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
          </div>
          
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-6">
              <a href="#home" className="text-white/70 hover:text-[#F2A83B] transition-colors duration-300">
                Home
              </a>
              <a href="#products" className="text-white/70 hover:text-[#F2A83B] transition-colors duration-300">
                Products
              </a>
              <a href="#contact" className="text-white/70 hover:text-[#F2A83B] transition-colors duration-300">
                Contact
              </a>
            </div>
            
            <p className="text-white/50 text-sm">
              © {currentYear} Glow24 Organics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
