
import { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const parallaxSpeed = 0.5;
      heroRef.current.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => {
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);
  
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-black opacity-90 z-0"
        ref={heroRef}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <img 
            src="/lovable-uploads/de4d0e6f-1626-4aee-ace1-fe33a44d010e.png" 
            alt="Glow24 Logo Background" 
            className="w-full h-full object-contain animate-pulse"
            style={{ animation: 'pulse 4s infinite' }}
          />
        </div>
      </div>
      
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="container mx-auto px-4 z-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-6 animate-fade-in">
            <h5 className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider text-white/90">
              PREMIUM BEAUTY PRODUCTS
            </h5>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Welcome to <span className="text-[#F2A83B] bg-gradient-to-r from-[#F2A83B] to-[#F2A83B]/80 bg-clip-text text-transparent">Glow24</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/80 font-light">
              Where beauty meets nature, and your glow lasts 24/7! ✨
            </p>
            
            <div className="pt-4 px-6 md:px-12">
              <p className="text-white/80 leading-relaxed">
                At Glow 24, we believe that true beauty starts with healthy skin and radiant hair. 
                Our premium skin and hair oils are crafted with a powerful blend of natural ingredients 
                and cutting-edge science to deeply nourish, strengthen, and revitalize from within. 
              </p>
              <p className="text-white/80 leading-relaxed mt-4">
                Every drop is designed to enhance your natural glow, leaving you with silky-smooth hair 
                and flawless, radiant skin. Say goodbye to dullness and dryness — and hello to a glow that never fades! 🌸💖
              </p>
              <p className="text-white/80 leading-relaxed mt-4">
                Experience the magic of Glow 24 — because you deserve to shine, always! 🌿
              </p>
            </div>
            
            <div className="pt-4">
              <a 
                href="#products" 
                className="bg-gradient-to-r from-[#F2A83B] to-[#F2A83B]/80 text-black font-medium py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#F2A83B]/20 inline-flex items-center hover-scale"
              >
                Explore Products
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
