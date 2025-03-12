
import { Sparkles, Shield, Droplet, Award } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="section-padding bg-gradient-to-b from-black to-black/90">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-in">
            <h5 className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider text-white/90">
              ABOUT GLOW24 ORGANICS
            </h5>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Natural Beauty, <span className="text-[#F2A83B]">Extraordinary Results</span>
            </h2>
            
            <div className="relative">
              <p className="text-white/80 leading-relaxed">
                Welcome to Glow 24 – where beauty meets nature, and your glow lasts 24/7! ✨ At Glow 24, 
                we believe that true beauty starts with healthy skin and radiant hair. Our premium skin 
                and hair oils are crafted with a powerful blend of natural ingredients and cutting-edge 
                science to deeply nourish, strengthen, and revitalize from within. 
              </p>
              
              <p className="text-white/80 leading-relaxed mt-4">
                Every drop is designed to enhance your natural glow, leaving you with silky-smooth hair 
                and flawless, radiant skin. Say goodbye to dullness and dryness — and hello to a glow 
                that never fades! 🌸💖 Experience the magic of Glow 24 — because you deserve to shine, always! 🌿
              </p>
              
              <div className="absolute -left-5 top-0 w-1 h-full bg-gradient-to-b from-[#F2A83B] to-transparent"></div>
            </div>
            
            <div className="pt-4">
              <a 
                href="#contact" 
                className="bg-gradient-to-r from-[#F2A83B] to-[#F2A83B]/80 hover:from-[#F2A83B]/90 hover:to-[#F2A83B]/70 text-black font-medium py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#F2A83B]/20 inline-flex items-center"
              >
                Discover Our Story
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-xl animate-fade-in border border-[#F2A83B]/20 hover:border-[#F2A83B]/40 transition-all duration-300 group" style={{ animationDelay: '100ms' }}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F2A83B] to-[#F2A83B]/70 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Sparkles size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F2A83B] transition-colors duration-300">Premium Quality</h3>
              <p className="text-white/70">
                Handcrafted with the finest organic ingredients to ensure exceptional results for your skin and hair.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-fade-in border border-[#F2A83B]/20 hover:border-[#F2A83B]/40 transition-all duration-300 group" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F2A83B] to-[#F2A83B]/70 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F2A83B] transition-colors duration-300">Cruelty Free</h3>
              <p className="text-white/70">
                We stand firmly against animal testing and embrace ethical practices throughout our production.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-fade-in border border-[#F2A83B]/20 hover:border-[#F2A83B]/40 transition-all duration-300 group" style={{ animationDelay: '300ms' }}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F2A83B] to-[#F2A83B]/70 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Droplet size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F2A83B] transition-colors duration-300">Organic Ingredients</h3>
              <p className="text-white/70">
                We harness the potent power of nature with carefully selected organic botanical extracts.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-fade-in border border-[#F2A83B]/20 hover:border-[#F2A83B]/40 transition-all duration-300 group" style={{ animationDelay: '400ms' }}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F2A83B] to-[#F2A83B]/70 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F2A83B] transition-colors duration-300">Ayurvedic Wisdom</h3>
              <p className="text-white/70">
                Our formulations blend ancient Ayurvedic knowledge with modern science for holistic beauty solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
