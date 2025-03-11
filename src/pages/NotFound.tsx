
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Set body background to black on mount
    document.body.classList.add('bg-black');
    
    return () => {
      // Cleanup
      document.body.classList.remove('bg-black');
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="glass-card p-8 md:p-12 rounded-2xl max-w-md w-full text-center animate-scale-in">
        <h1 className="text-6xl font-bold text-brand mb-4">404</h1>
        <p className="text-xl text-white mb-6">Oops! Page not found</p>
        <p className="text-white/70 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <a 
          href="/" 
          className="button-primary inline-flex items-center gap-2 hover-scale"
        >
          <ArrowLeft size={18} />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
