
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Accommodations", path: "/accommodations" },
    { name: "Amenities", path: "/amenities" },
    { name: "What to Do", path: "/activities" },
    { name: "Reservations", path: "/reservations" },
    { name: "Rules & FAQs", path: "/rules-faqs" },
    { name: "Contact Us", path: "/contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-display text-2xl text-rvred">Lone Ranger</span>
              <span className="ml-2 font-display text-lg text-rvblue">RV Park & Lodge</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-sm font-medium py-2 border-b-2 transition-colors duration-200",
                  location.pathname === item.path
                    ? "border-rvred text-rvmaroon"
                    : "border-transparent text-gray-600 hover:text-rvmaroon hover:border-rvyellow"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/reservations" className="btn-primary text-sm">
              Book Now
            </Link>
          </nav>

          {/* Mobile Navigation Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-rvmaroon focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === item.path
                    ? "bg-rvyellow/10 text-rvmaroon"
                    : "text-gray-700 hover:bg-rvyellow/10 hover:text-rvmaroon"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/reservations" 
              className="block px-3 py-2 mt-4 btn-primary text-center"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
