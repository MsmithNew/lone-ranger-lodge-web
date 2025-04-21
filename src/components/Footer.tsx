import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
const Footer = () => {
  return <footer className="bg-rvmaroon text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo & Description */}
          <div>
            <Link to="/" className="flex items-center">
              <span className="font-display text-2xl text-white">Lone Ranger</span>
              <span className="ml-2 font-display text-lg text-rvyellow">RV Park & Lodge</span>
            </Link>
            <p className="mt-4 text-gray-300">
              Experience the perfect blend of retro Americana charm and modern comfort at our RV park and lodge. Your adventure starts here.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-white hover:text-rvyellow transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-rvyellow transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-rvyellow transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-rvyellow transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/accommodations" className="text-gray-300 hover:text-rvyellow transition-colors">Accommodations</Link>
              </li>
              <li>
                <Link to="/amenities" className="text-gray-300 hover:text-rvyellow transition-colors">Amenities</Link>
              </li>
              <li>
                <Link to="/activities" className="text-gray-300 hover:text-rvyellow transition-colors">What to Do</Link>
              </li>
              <li>
                <Link to="/reservations" className="text-gray-300 hover:text-rvyellow transition-colors">Reservations</Link>
              </li>
              <li>
                <Link to="/rules-faqs" className="text-gray-300 hover:text-rvyellow transition-colors">Rules & FAQs</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-rvyellow transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="mr-2 mt-1 flex-shrink-0 text-rvyellow" size={18} />
                <span>2526 SH - Loop 254, Ranger, TX</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 flex-shrink-0 text-rvyellow" size={18} />
                <span>(817) 805-0582</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 flex-shrink-0 text-rvyellow" size={18} />
                <span>info@loneranger-rvpark.com</span>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/contact" className="bg-rvyellow hover:bg-rvyellow/90 text-rvmaroon font-semibold py-2 px-4 rounded-md transition-all duration-300 inline-block">
                Get Directions
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Lone Ranger RV Park & Lodge. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;