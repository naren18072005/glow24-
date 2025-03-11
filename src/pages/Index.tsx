
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
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProductShowcase />
        <AboutUs />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
