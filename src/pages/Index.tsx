
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import AboutUs from '@/components/AboutUs';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Set body background to black on mount
    document.body.classList.add('bg-black');
    
    return () => {
      // Cleanup
      document.body.classList.remove('bg-black');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black/90">
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="h-full w-full flex items-center justify-center">
          <img 
            src="/lovable-uploads/2895600e-410c-45ec-8e13-f615915bb7bd.png" 
            alt="Glow24 Logo Background" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
      <Header />
      <main className="flex-grow relative z-10">
        <Hero />
        <div className="section-with-bg-overlay">
          <ProductShowcase />
        </div>
        <div className="section-with-bg-overlay">
          <AboutUs />
        </div>
        <div className="section-with-bg-overlay">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
