
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { useMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openCart, itemCount } = useCart();
  const { user, signOut } = useAuth();
  const isMobile = useMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-white font-bold text-2xl">
            Glow24
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white/70 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/hair-care"
              className="text-white/70 hover:text-white transition-colors"
            >
              Hair Care
            </Link>
            <Link
              to="/skin-care"
              className="text-white/70 hover:text-white transition-colors"
            >
              Skin Care
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <Link
                  to="/account"
                  className="flex items-center text-white/70 hover:text-white transition-colors"
                >
                  <User size={20} />
                  {!isMobile && <span className="ml-2">Account</span>}
                </Link>
              </div>
            ) : (
              <Link
                to="/auth"
                className="text-white/70 hover:text-white transition-colors flex items-center"
              >
                <User size={20} />
                {!isMobile && <span className="ml-2">Sign In</span>}
              </Link>
            )}

            <button
              onClick={openCart}
              className="flex items-center text-white/70 hover:text-white transition-colors relative"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F2A83B] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              {!isMobile && <span className="ml-2">Cart</span>}
            </button>

            <button
              className="md:hidden text-white"
              onClick={handleMobileMenuToggle}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-white hover:text-[#F2A83B] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/hair-care"
              className="text-white hover:text-[#F2A83B] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hair Care
            </Link>
            <Link
              to="/skin-care"
              className="text-white hover:text-[#F2A83B] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Skin Care
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/account"
                  className="text-white hover:text-[#F2A83B] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-white hover:text-[#F2A83B] transition-colors text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="text-white hover:text-[#F2A83B] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
