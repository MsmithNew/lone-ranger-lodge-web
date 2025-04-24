import React from 'react';
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionDivider from "@/components/SectionDivider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Waves, 
  House, 
  Activity,
  Power, 
  Building, 
  Home as HomeIcon, 
  Utensils, 
  MapPin, 
  Calendar, 
  Trees, 
  Car,
  Wifi, 
  Music,
  IceCream
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useIsMobile } from "@/hooks/use-mobile";

const Home = () => {
  const isMobile = useIsMobile();
  
  // Sample gallery images - replace with actual images when available
  const galleryImages = [
    { src: "/placeholder.svg", alt: "Resort-Style Swimming Pool" },
    { src: "/placeholder.svg", alt: "Historic Lodges from the 1930s" },
    { src: "/placeholder.svg", alt: "Horse Hotel with Stalls & Hookups" },
    { src: "/placeholder.svg", alt: "Vintage Neon Signs" },
    { src: "/placeholder.svg", alt: "Candy & Ice Cream Shop in Texaco Station" },
    { src: "/placeholder.svg", alt: "Palo Pinto Mountains" }
  ];

  // Updated featured amenities to include tent camping
  const featuredAmenities = [
    {
      title: "Resort-Style Pool",
      description: "Our vintage-inspired pool offers the perfect place to cool off and relax with plenty of lounge seating and mountain views.",
      image: "/placeholder.svg",
      icon: <Waves size={24} />
    },
    {
      title: "Iconic Neon Signs",
      description: "Experience the glow of authentic restored neon signs throughout the property that light up the Texas night sky.",
      image: "/placeholder.svg",
      icon: <Power size={24} />
    },
    {
      title: "Historic Lodges",
      description: "Stay in our fully renovated 1930s lodges, combining authentic vintage charm with modern comforts and amenities.",
      image: "/placeholder.svg",
      icon: <Building size={24} />
    },
    {
      title: "Horse Hotel",
      description: "Traveling with equine companions? Our specialized facilities include comfortable stalls and dedicated RV hookups nearby.",
      image: "/placeholder.svg",
      icon: <House size={24} />
    },
    {
      title: "Food & Drinks",
      description: "From Gulf Burgers Restaurant to our vintage Texaco Station candy shop, enjoy delicious meals and treats without leaving the park.",
      image: "/placeholder.svg",
      icon: <Utensils size={24} />
    },
    {
      title: "Tent Camping",
      description: "Prefer something more rustic? Our tent sites offer a peaceful, no-frills outdoor experience for adventurous guests.",
      image: "/placeholder.svg",
      icon: <HomeIcon size={24} />
    }
  ];

  // Things to do with icons
  const thingsToDo = [
    { activity: "Take a refreshing dip in our resort-style swimming pool", icon: <Waves size={24} className="text-rvblue" /> },
    { activity: "Challenge friends to a pickleball match", icon: <Activity size={24} className="text-rvblue" /> },
    { activity: "Explore nearby horse trails with your equine companions", icon: <House size={24} className="text-rvblue" /> },
    { activity: "Enjoy live music events on select weekend evenings", icon: <Music size={24} className="text-rvblue" /> },
    { activity: "Savor burgers and shakes at our Gulf Burgers Restaurant", icon: <Utensils size={24} className="text-rvblue" /> },
    { activity: "Experience our outdoor movie nights under the stars", icon: <IceCream size={24} className="text-rvblue" /> },
    { activity: "Take scenic drives through the nearby Palo Pinto Mountains", icon: <Car size={24} className="text-rvblue" /> }
  ];

  // Updated local attractions with accurate locations
  const localAttractions = [
    {
      name: "Palo Pinto Mountains State Park",
      description: "Texas' newest state park with hiking, wildlife, and scenic views.",
      distance: "15 min",
      icon: <Trees size={20} />
    },
    {
      name: "Lake Leon",
      description: "A local favorite for fishing, kayaking, and relaxing afternoons by the water.",
      distance: "20 min",
      icon: <Waves size={20} />
    },
    {
      name: "Historic Downtown Ranger",
      description: "Classic Texas small town with antique shops, cafés, and local history.",
      distance: "5 min",
      icon: <MapPin size={20} />
    },
    {
      name: "Eastland County Museum",
      description: "Regional exhibits featuring oil boom stories, outlaw legends, and early Texas culture.",
      distance: "10 min",
      icon: <Building size={20} />
    },
    {
      name: "Greer's Western Store",
      description: "Shop cowboy boots, hats, and western gear in this locally loved shop.",
      distance: "10 min",
      icon: <HomeIcon size={20} />
    },
    {
      name: "R&K Café",
      description: "Southern-style breakfasts, lunch plates, and homemade pies just minutes from the park.",
      distance: "5 min",
      icon: <Utensils size={20} />
    }
  ];

  return (
    <Layout>
      {/* Hero Banner Section */}
      <section className="relative min-h-[600px] flex items-center py-8 md:py-0 h-[85vh]">
        <div className="absolute inset-0 z-0">
          <img src="/placeholder.svg" alt="Lone Ranger RV Park" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 section-container text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display mb-4 animate-fade-in">
            Where the Spirit of the Road Lives On
          </h1>
          <h2 className="text-2xl md:text-3xl text-rvyellow mb-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
            Just off Loop 254 in Ranger, Texas — minutes from Palo Pinto Mountains
          </h2>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg max-w-2xl mb-8 animate-fade-in" style={{animationDelay: "0.4s"}}>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg">
              <li>Resort-Style Pool</li>
              <li>Historic Lodges</li>
              <li>Full Hookups</li>
              <li>Horse Hotel</li>
              <li>Gulf Burgers Restaurant</li>
              <li>Pickleball Court</li>
              <li>Candy & Ice Cream Shop</li>
              <li>Free Wi-Fi</li>
            </ul>
          </div>
          
          <Link to="/reservations" className="btn-primary text-lg px-8 py-4 animate-fade-in" style={{animationDelay: "0.6s"}}>
            Book Your Stay Now
          </Link>
        </div>
      </section>

      {/* Section 1 - Welcome */}
      <section className="section-container py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="section-title text-4xl mb-6">Where History Meets Hospitality</h2>
            <p className="text-xl text-gray-700 mb-8">
              Step back in time at Lone Ranger RV Park & Lodge, where vintage neon signs illuminate your path and the spirit of classic Americana lives on. Nestled among scenic views of the Palo Pinto Mountains, our family-friendly park blends historic charm with modern amenities. Whether you're parking your RV, pitching a tent, or staying in one of our restored 1930s lodges, you'll experience Texas hospitality at its finest.
            </p>
            
            <Link to="/reservations" className="btn-primary">
              Book Now
            </Link>
          </div>
          <div className="md:w-1/2 rounded-lg overflow-hidden shadow-2xl">
            <img src="/placeholder.svg" alt="Lone Ranger RV Park at sunset" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Section 2 - Photo Gallery */}
      <section className="section-container py-16 bg-gray-50">
        <h2 className="section-title text-4xl text-center mb-10">Capture the Experience</h2>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Vintage neon, scenic mountain views, and modern comfort come together to create an unforgettable stay.
        </p>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <p className="text-center mt-2 text-sm text-gray-600">{image.alt}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="relative static left-0 right-auto translate-y-0 mr-2" />
            <CarouselNext className="relative static left-auto right-0 translate-y-0" />
          </div>
        </Carousel>
      </section>

      <SectionDivider />

      {/* Section 3 - Things To Do */}
      <section className="section-container py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 rounded-lg overflow-hidden shadow-2xl">
            <img src="/placeholder.svg" alt="Activities at Lone Ranger RV Park" className="w-full h-full object-cover" />
          </div>
          <div className="md:w-1/2">
            <h2 className="section-title text-4xl mb-6">Things to Do</h2>
            <p className="text-lg text-gray-700 mb-6">
              Your adventure doesn't end when you park. Here's what awaits at Lone Ranger RV Park:
            </p>
            
            <ul className="space-y-3 text-lg">
              {thingsToDo.map((activity, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block bg-rvyellow text-rvmaroon rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 font-bold">{index + 1}</span>
                  <span>{activity.activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Section 4 - What Awaits You */}
      <section className="section-container py-16 bg-gray-50">
        <h2 className="section-title text-4xl text-center mb-3">What Awaits You</h2>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Discover the unique features that make Lone Ranger RV Park a one-of-a-kind destination
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAmenities.map((amenity, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={amenity.image} 
                  alt={amenity.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-display mb-2 text-rvmaroon">{amenity.title}</h3>
                <p className="text-gray-600">{amenity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Section 5 - RV Rules & Regulations */}
      <section className="section-container py-16">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h2 className="section-title text-4xl mb-6">RV Rules & Regulations</h2>
            <p className="text-lg text-gray-700 mb-6">
              To ensure everyone enjoys their stay, we maintain the following policies:
            </p>
            
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <Calendar className="text-rvred mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <span className="font-semibold">Check-in/out times:</span> Check-in is at 2:00 PM, and check-out is at 11:00 AM.
                </div>
              </li>
              <li className="flex items-start">
                <Calendar className="text-rvred mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <span className="font-semibold">Quiet hours:</span> 10:00 PM to 7:00 AM to ensure everyone gets their rest.
                </div>
              </li>
              <li className="flex items-start">
                <Calendar className="text-rvred mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <span className="font-semibold">Campfire policy:</span> Fires allowed in designated fire rings only. No fires during burn bans.
                </div>
              </li>
              <li className="flex items-start">
                <Calendar className="text-rvred mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <span className="font-semibold">Pets:</span> Welcome but must be leashed at all times. Please clean up after your pets.
                </div>
              </li>
              <li className="flex items-start">
                <Calendar className="text-rvred mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <span className="font-semibold">Wi-Fi:</span> Complimentary high-speed connection available throughout the property.
                </div>
              </li>
            </ul>
            
            <Link to="/rules-faqs" className="btn-secondary mt-8 inline-block">
              View All Rules & FAQs
            </Link>
          </div>
          <div className="md:w-1/2 rounded-lg overflow-hidden shadow-2xl">
            <img src="/placeholder.svg" alt="RV campsite at Lone Ranger RV Park" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Section 6 - Rest CTA Section */}
      <section className="py-20 bg-rvmaroon text-white">
        <div className="section-container text-center">
          <h2 className="text-4xl md:text-5xl font-display mb-8">Rest Your Wheels Where History Feels Alive</h2>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Experience the perfect blend of vintage charm and modern comfort at Lone Ranger RV Park.
          </p>
          <Link to="/reservations" className="btn-primary bg-rvyellow text-rvmaroon hover:bg-rvyellow/90 text-lg px-8 py-4">
            Book Your Getaway
          </Link>
        </div>
      </section>

      {/* Section 7 - Local Attractions */}
      <section className="section-container py-16">
        <h2 className="section-title text-4xl text-center mb-3">Explore the Area</h2>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Perfectly situated to experience the best of Texas
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localAttractions.map((attraction, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 h-full">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-display text-rvmaroon flex-grow pr-2">{attraction.name}</h3>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium flex items-center whitespace-nowrap">
                  <MapPin size={14} className="mr-1" />
                  {attraction.distance}
                </span>
              </div>
              <p className="text-gray-600">{attraction.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/activities" className="btn-secondary">
            Discover More Attractions
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
