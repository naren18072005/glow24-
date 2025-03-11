
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
        className="absolute inset-0 brand-gradient opacity-60 z-0"
        ref={heroRef}
      ></div>
      
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      <div className="container mx-auto px-4 z-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-6 animate-fade-in">
            <h5 className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider text-white/90">
              PREMIUM BEAUTY PRODUCTS
            </h5>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Welcome to <span className="text-brand">Glow24</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/80 font-light">
              Your one-stop solution for premium hair and skin care.
            </p>
            
            <div className="pt-4">
              <a 
                href="#products" 
                className="button-primary inline-block hover-scale"
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
