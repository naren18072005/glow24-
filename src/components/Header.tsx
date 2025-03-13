
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-padding mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Brand logo and name */}
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="/lovable-uploads/de4d0e6f-1626-4aee-ace1-fe33a44d010e.png" 
                alt="Glow24 Organics" 
                className="h-16 mr-3"
              />
            </Link>
            <p className="text-xs text-white/70 tracking-widest hidden sm:block">NATURAL HAIR & SKIN CARE PRODUCTS</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/hair-care" className="nav-link">Hair Care</Link>
            <Link to="/skin-care" className="nav-link">Skin Care</Link>
            <a href="#contact" className="nav-link">Contact</a>
            <button 
              onClick={openCart}
              className="nav-link relative"
              aria-label="Open cart"
            >
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F2A83B] text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-all duration-300 ease-in-out transform ${
          mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } md:hidden`}
        style={{ top: '5rem' }}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          <Link
            to="/"
            className="text-2xl font-medium text-white hover:text-brand transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/hair-care"
            className="text-2xl font-medium text-white hover:text-brand transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Hair Care
          </Link>
          <Link
            to="/skin-care"
            className="text-2xl font-medium text-white hover:text-brand transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Skin Care
          </Link>
          <a 
            href="#contact" 
            className="text-2xl font-medium text-white hover:text-brand transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
          <button 
            onClick={() => {
              openCart();
              setMobileMenuOpen(false);
            }}
            className="text-2xl font-medium text-white hover:text-brand transition-colors duration-300"
          >
            Cart {itemCount > 0 && `(${itemCount})`}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
