
import { Instagram } from 'lucide-react';

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
              href="https://instagram.com" 
              className="text-[#F2A83B]/80 hover:text-[#F2A83B] transition-colors duration-300 hover-scale"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={28} />
            </a>
            <a 
              href="https://wa.me/9383717744" 
              className="text-[#F2A83B]/80 hover:text-[#F2A83B] transition-colors duration-300 hover-scale"
              aria-label="WhatsApp"
              target="_blank"
              rel="noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                <path d="M9.5 13.5c.5 1 1.5 1 2 1s1.5 0 2-1" />
              </svg>
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
