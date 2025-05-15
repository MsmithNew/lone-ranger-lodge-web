
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(false); // Reset on route change
    
    // Small delay to ensure the opacity is 0 before fading in
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30);

    // Ensure body overflow is reset when component mounts
    document.body.style.overflow = '';
    
    return () => {
      clearTimeout(timer);
      // Ensure body overflow is reset when component unmounts
      document.body.style.overflow = '';
    };
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main 
        className={`flex-grow transition-all duration-500 ease-out ${
          isVisible 
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
        style={{
          willChange: "opacity, transform"
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
