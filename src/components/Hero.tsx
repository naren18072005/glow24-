
import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const parallaxSpeed = 0.5;
      heroRef.current.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
    };
    
    // Add staggered animation visibility
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
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
        className="absolute inset-0 bg-black/80 opacity-90 z-0"
        ref={heroRef}
      >
        {/* Background decorative element */}
      </div>
      
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="container mx-auto px-4 z-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="overflow-hidden rounded-full mx-auto mb-4 p-4 w-32 h-32 flex items-center justify-center border border-[#F2A83B]/20 bg-black/40 backdrop-blur-sm">
              <img
                src="/lovable-uploads/08e166cf-e063-48e7-b7dd-82bf6a86ebfc.png"
                alt="Glow24 Organics"
                className="h-24 animate-float"
              />
            </div>
            
            <h5 className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider text-white/90">
              PREMIUM BEAUTY PRODUCTS
            </h5>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Welcome to <span className="gold-shimmer font-extrabold">Glow24</span>
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
            
            <div className="pt-6">
              <a 
                href="#products" 
                className="bg-gradient-to-r from-[#F2A83B] to-[#F2A83B]/80 text-black font-medium py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#F2A83B]/20 inline-flex items-center hover:scale-105 hover:translate-y-[-2px]"
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
