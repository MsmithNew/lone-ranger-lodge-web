
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const location = useLocation();
  
  const mainNavItems = [
    { name: "Home", path: "/" },
    { name: "Accommodations", path: "/accommodations" },
    { name: "Amenities", path: "/amenities" },
    { name: "What to Do", path: "/activities" },
    { name: "Reservations", path: "/reservations" },
    { name: "Contact Us", path: "/contact" },
  ];

  const aboutSubItems = [
    { name: "Get to Know the Park", path: "/about" },
    { name: "Rules & FAQs", path: "/rules-faqs" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Logo and Mobile Menu Button */}
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <span className="font-display text-xl text-rvred">Lone Ranger</span>
              <span className="font-display text-base text-rvblue">RV Park & Lodge</span>
            </Link>
            
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

          {/* Desktop Navigation */}
          <nav className="hidden md:block py-2">
            <div className="flex flex-wrap justify-end items-center gap-3">
              {/* Home (first item) */}
              <Link
                key="home"
                to="/"
                className={cn(
                  "text-xs font-medium px-3 py-1 border-b-2 transition-colors duration-200 rounded-md truncate whitespace-nowrap",
                  location.pathname === "/"
                    ? "border-rvred text-rvmaroon"
                    : "border-transparent text-gray-600 hover:text-rvmaroon hover:border-rvyellow hover:bg-rvyellow/10"
                )}
              >
                Home
              </Link>
              
              {/* About Dropdown (second item) */}
              <Collapsible 
                open={isAboutOpen} 
                onOpenChange={setIsAboutOpen}
                className="relative"
              >
                <CollapsibleTrigger className={cn(
                  "text-xs font-medium px-3 py-1 border-b-2 transition-colors duration-200 rounded-md truncate whitespace-nowrap flex items-center",
                  (location.pathname === "/about" || location.pathname === "/rules-faqs")
                    ? "border-rvred text-rvmaroon"
                    : "border-transparent text-gray-600 hover:text-rvmaroon hover:border-rvyellow hover:bg-rvyellow/10"
                )}>
                  About
                  {isAboutOpen ? (
                    <ChevronUp className="h-3 w-3 ml-1" />
                  ) : (
                    <ChevronDown className="h-3 w-3 ml-1" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="absolute top-full left-0 bg-white rounded-md shadow-md mt-1 w-[200px] z-50">
                  <div className="py-1">
                    {aboutSubItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className={cn(
                          "block px-4 py-2 text-xs whitespace-nowrap",
                          location.pathname === subItem.path
                            ? "bg-rvyellow/10 text-rvmaroon"
                            : "text-gray-600 hover:bg-rvyellow/10 hover:text-rvmaroon"
                        )}
                        onClick={() => setIsAboutOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Other main nav items (after About) */}
              {mainNavItems.slice(1).map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "text-xs font-medium px-3 py-1 border-b-2 transition-colors duration-200 rounded-md truncate whitespace-nowrap",
                    location.pathname === item.path
                      ? "border-rvred text-rvmaroon"
                      : "border-transparent text-gray-600 hover:text-rvmaroon hover:border-rvyellow hover:bg-rvyellow/10"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <Link to="/reservations" className="btn-primary text-xs px-3 py-1 whitespace-nowrap">
                Book Now
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Home (first item) */}
            <Link
              key="home"
              to="/"
              className={cn(
                "block px-4 py-2 rounded-md text-sm font-medium truncate whitespace-nowrap",
                location.pathname === "/"
                  ? "bg-rvyellow/10 text-rvmaroon"
                  : "text-gray-700 hover:bg-rvyellow/10 hover:text-rvmaroon"
              )}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile About Dropdown (second item) */}
            <Collapsible className="w-full">
              <CollapsibleTrigger className={cn(
                "w-full flex justify-between items-center px-4 py-2 rounded-md text-sm font-medium",
                (location.pathname === "/about" || location.pathname === "/rules-faqs")
                  ? "bg-rvyellow/10 text-rvmaroon"
                  : "text-gray-700 hover:bg-rvyellow/10 hover:text-rvmaroon"
              )}>
                About
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pl-4 space-y-1">
                  {aboutSubItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className={cn(
                        "block px-4 py-2 rounded-md text-sm font-medium truncate whitespace-nowrap",
                        location.pathname === subItem.path
                          ? "bg-rvyellow/10 text-rvmaroon"
                          : "text-gray-700 hover:bg-rvyellow/10 hover:text-rvmaroon"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            {/* Other main nav items (after About) */}
            {mainNavItems.slice(1).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "block px-4 py-2 rounded-md text-sm font-medium truncate whitespace-nowrap",
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
              className="block px-4 py-2 mt-4 btn-primary text-center text-sm whitespace-nowrap"
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
