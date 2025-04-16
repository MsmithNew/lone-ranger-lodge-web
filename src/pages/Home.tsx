
import React from 'react';
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionDivider from "@/components/SectionDivider";
import TestimonialCard from "@/components/TestimonialCard";
import AmenityCard from "@/components/AmenityCard";
import { MapPin, Wifi, Utensils, Waves, Dog, ShowerHead } from "lucide-react";

const Home = () => {
  const testimonials = [{
    quote: "Our family had the most wonderful time at Lone Ranger RV Park. The facilities were immaculate and the staff went above and beyond.",
    author: "Sarah Johnson",
    location: "Denver, CO",
    rating: 5
  }, {
    quote: "The vintage atmosphere combined with modern amenities made for a perfect getaway. We can't wait to come back next summer!",
    author: "Mike and Kelly Thomas",
    location: "Portland, OR",
    rating: 5
  }, {
    quote: "Best RV park we've stayed at in our 10 years on the road. The community feel and activities were outstanding.",
    author: "Robert Miller",
    location: "Austin, TX",
    rating: 4
  }];
  return <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[550px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="/placeholder.svg" alt="Lone Ranger RV Park" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 section-container text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display mb-4">
            Stay at Lone Ranger RV Park
          </h1>
          <h2 className="text-2xl md:text-3xl text-rvyellow mb-8">
            Near Palo Pinto Mountains & Stephenville, TX
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mb-8">
            Experience the perfect blend of nostalgic charm and modern comfort at our retro Americana-inspired RV park and lodge.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/reservations" className="btn-primary">
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="section-container">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <h2 className="section-title">A Retro Americana RV Park Experience in Ranger, TX</h2>
            <p className="text-gray-600 mb-6">Located just off SH-Loop 254 in Ranger, Texas, and minutes from the new Palo Pinto Mountains State Park, Lone Ranger RV Park & Lodge offers a unique stay packed with vintage charm and modern comfort. Whether you're RVing, tent camping, or staying in a fully renovated 1930s lodge, you'll find everything you need for a relaxing escape near Stephenville, Eastland, and Lake Leon.</p>
            
            <Link to="/about" className="btn-secondary">
              Learn More About Us
            </Link>
          </div>
          <div className="md:w-1/2 rounded-lg overflow-hidden shadow-xl">
            <img src="/placeholder.svg" alt="Lone Ranger RV Park & Lodge" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Featured Amenities */}
      <section className="section-container bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Amenities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We pride ourselves on offering comprehensive facilities to make your stay comfortable and enjoyable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AmenityCard icon={<Wifi size={32} />} title="High-Speed WiFi" description="Stay connected with complimentary high-speed internet throughout the property." />
          <AmenityCard icon={<Waves size={32} />} title="Swimming Pool" description="Cool off in our vintage-inspired pool with plenty of lounge space and a splash area for kids." />
          <AmenityCard icon={<Utensils size={32} />} title="On-site Diner" description="Enjoy classic American comfort food at our 50's style diner open for breakfast and dinner." />
          <AmenityCard icon={<MapPin size={32} />} title="Central Location" description="Perfectly situated for exploring local attractions, hiking trails, and historical sites." />
          <AmenityCard icon={<ShowerHead size={32} />} title="Modern Bathhouses" description="Spotlessly clean facilities with hot showers, private changing areas, and laundry services." />
          <AmenityCard icon={<Dog size={32} />} title="Pet Friendly" description="Bring your furry friends along! We offer dedicated pet areas and walking trails." />
        </div>
        
        <div className="text-center mt-10">
          <Link to="/amenities" className="btn-secondary">
            View All Amenities
          </Link>
        </div>
      </section>

      <SectionDivider />

      {/* Accommodation Preview */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Find Your Perfect Stay</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From spacious RV sites to cozy cabins and unique vintage trailers, we have accommodations for every type of traveler.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card group">
            <div className="relative overflow-hidden h-64">
              <img src="/placeholder.svg" alt="RV Sites" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-display mb-1">RV Sites</h3>
                  <p className="text-sm">Full hookups with spacious pull-through options</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card group">
            <div className="relative overflow-hidden h-64">
              <img src="/placeholder.svg" alt="Cozy Cabins" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-display mb-1">Cozy Cabins</h3>
                  <p className="text-sm">Rustic charm with modern amenities</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card group">
            <div className="relative overflow-hidden h-64">
              <img src="/placeholder.svg" alt="Vintage Trailers" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-display mb-1">Vintage Trailers</h3>
                  <p className="text-sm">Unique retro accommodations for a nostalgic stay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Link to="/accommodations" className="btn-secondary">
            Explore All Accommodations
          </Link>
        </div>
      </section>

      <SectionDivider />

      {/* Testimonials */}
      <section className="section-container bg-rvblue/5">
        <div className="text-center mb-12">
          <h2 className="section-title">What Our Guests Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our happy campers!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => <TestimonialCard key={index} quote={testimonial.quote} author={testimonial.author} location={testimonial.location} rating={testimonial.rating} />)}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-rvmaroon text-white py-16">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Book your stay at Lone Ranger RV Park & Lodge today and experience the perfect blend of nostalgia and comfort.
          </p>
          <Link to="/reservations" className="btn-primary bg-rvyellow text-rvmaroon hover:bg-rvyellow/90">
            Book Your Stay Now
          </Link>
        </div>
      </section>
    </Layout>;
};
export default Home;
