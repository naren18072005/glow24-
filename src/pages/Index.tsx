
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
      <div className="fixed inset-0 pointer-events-none bg-pattern opacity-10">
        {/* Added repeating pattern with the logo */}
      </div>
      
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center opacity-20">
        <img 
          src="/lovable-uploads/08e166cf-e063-48e7-b7dd-82bf6a86ebfc.png" 
          alt="Glow24 Logo Background" 
          className="max-w-md w-full"
        />
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
