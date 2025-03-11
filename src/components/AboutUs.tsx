
import { Sparkles, Shield, Droplet, Award } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="section-padding bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-in">
            <h5 className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider text-white/90">
              ABOUT US
            </h5>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Natural Beauty, <span className="text-brand">Extraordinary Results</span>
            </h2>
            
            <p className="text-white/80 leading-relaxed">
              At Glow24, we believe in the power of nature to transform your skin and hair. 
              Our premium formulations combine the best natural ingredients with cutting-edge 
              beauty science to deliver exceptional results.
            </p>
            
            <p className="text-white/80 leading-relaxed">
              Founded in 2020, our mission is to create beauty products that not only 
              enhance your natural features but also prioritize your health and the 
              environment. Every product is carefully crafted, ethically sourced, and 
              never tested on animals.
            </p>
            
            <div className="pt-4">
              <a 
                href="#contact" 
                className="button-primary hover-scale inline-flex"
              >
                Get in Touch
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="w-12 h-12 rounded-lg brand-gradient flex items-center justify-center mb-4">
                <Sparkles size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Quality</h3>
              <p className="text-white/70">
                Our products are made with the highest quality ingredients, ensuring effective results.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 rounded-lg brand-gradient flex items-center justify-center mb-4">
                <Shield size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Cruelty Free</h3>
              <p className="text-white/70">
                We never test on animals and are committed to ethical beauty practices.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="w-12 h-12 rounded-lg brand-gradient flex items-center justify-center mb-4">
                <Droplet size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Natural Ingredients</h3>
              <p className="text-white/70">
                We harness the power of nature with carefully selected botanical extracts.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="w-12 h-12 rounded-lg brand-gradient flex items-center justify-center mb-4">
                <Award size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Award Winning</h3>
              <p className="text-white/70">
                Our formulations have been recognized for their exceptional performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
