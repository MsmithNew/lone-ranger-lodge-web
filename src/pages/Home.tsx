import React from 'react';
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionDivider from "@/components/SectionDivider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, House, Activity, Power, Building, Home as HomeIcon, Utensils, MapPin, Calendar, Trees, Car, Wifi, Music, IceCream } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useContent } from "@/hooks/use-content";

const Home = () => {
  const isMobile = useIsMobile();

  // Original data to use as fallback
  const originalGalleryImages = [{
    src: "/lovable-uploads/96ae0ec8-856a-412c-a730-a2f6d51df53f.png", // Placeholder, ideally replace with actual images
    alt: "Midway RV Park Pool"
  }, {
    src: "/placeholder.svg", // Placeholder
    alt: "Midway RV Park Cabin Exterior"
  }, {
    src: "/placeholder.svg", // Placeholder
    alt: "Fishing Pond at Midway RV Park"
  }, {
    src: "/placeholder.svg", // Placeholder
    alt: "RV Site with full hookups"
  }, {
    src: "/placeholder.svg", // Placeholder
    alt: "Playground at Midway RV Park"
  }, {
    src: "/placeholder.svg", // Placeholder
    alt: "Fitness Center at Midway RV Park"
  }];

  const originalFeaturedAmenities = [{
    title: "Spacious RV Sites",
    description: "Enjoy our 75 well-maintained RV sites, each with full hookups and up to 50 amp service for your convenience.",
    image: "/placeholder.svg", // Placeholder, ideally replace with actual images
    icon: <Power size={24} />
  }, {
    title: "Cozy Cabin Rentals",
    description: "Choose from our 27 comfortable cabins, offering a perfect blend of rustic charm and modern amenities for a relaxing stay.",
    image: "/placeholder.svg", // Placeholder
    icon: <House size={24} />
  }, {
    title: "Refreshing Pool",
    description: "Cool off in our inviting swimming pool, perfect for a refreshing dip after a day of activities.",
    image: "/placeholder.svg", // Placeholder
    icon: <Waves size={24} />
  }, {
    title: "Catch & Release Pond",
    description: "Enjoy leisurely fishing in our huge, stocked pond, perfect for catch and release fun for all ages.",
    image: "/placeholder.svg", // Placeholder
    icon: <Activity size={24} />
  }, {
    title: "Fitness Center",
    description: "Stay active and energized in our on-site fitness center, equipped with everything you need for a good workout.",
    image: "/placeholder.svg", // Placeholder
    icon: <Activity size={24} />
  }, {
    title: "Midway Event Center",
    description: "Host your special event at our dedicated event center, conveniently located within the park for guests.",
    image: "/placeholder.svg", // Placeholder
    icon: <Building size={24} />
  }];

  const originalThingsToDo = [{
    activity: "Take a refreshing swim in our inviting pool",
    icon: <Waves size={24} className="text-rvblue" />
  }, {
    activity: "Enjoy a game of pickleball or volleyball",
    icon: <Activity size={24} className="text-rvblue" />
  }, {
    activity: "Cast a line in our stocked catch and release pond",
    icon: <Activity size={24} className="text-rvblue" />
  }, {
    activity: "Let the kids play at our fun and safe playground",
    icon: <HomeIcon size={24} className="text-rvblue" />
  }, {
    activity: "Work out in our fully equipped fitness center",
    icon: <Activity size={24} className="text-rvblue" />
  }, {
    activity: "Enjoy a peaceful stroll on the walking trail around the pond",
    icon: <Trees size={24} className="text-rvblue" />
  }, {
    activity: "Relax and unwind in the beautiful, quiet surroundings",
    icon: <Calendar size={24} className="text-rvblue" />
  }];

  const originalLocalAttractions = [{
    name: "Current River",
    description: "Just a 10-minute drive, perfect for float trips and enjoying the scenic beauty of the river.",
    distance: "10 min",
    icon: <Waves size={20} />
  }, {
    name: "Doniphan, MO",
    description: "A charming local town offering dining, shopping, and community events.",
    distance: "Close by",
    icon: <MapPin size={20} />
  }, {
    name: "Poplar Bluff, MO",
    description: "Larger city with more extensive shopping, dining, and entertainment options.",
    distance: "Close by",
    icon: <Building size={20} />
  }];

  // Fetch content from the database with fallback to original data
  const { content: homeContent, isLoading } = useContent({
    page: 'home',
    fallbackData: {}
  });

  // Prepare the content with fallback to original data
  
  // Hero section content
  const heroContent = homeContent.hero || {};
  const heroHeadline = heroContent.headline || "Your Perfect Getaway in Fairdealing, MO";
  const heroSubtitle = heroContent.subtitle || "Midway RV Park and Cabin Rentals: Relax, Reconnect, Explore";
  const heroImage = heroContent.image_url || "/lovable-uploads/hero-midway.jpg"; // Use a specific image for Midway
  const heroCta = heroContent.cta_text || "Book Your Stay";
  
  // Parse features list from string if it exists
  const heroFeatures = heroContent.features 
    ? heroContent.features.split(',').map(item => item.trim())
    : [
        "75 RV Sites",
        "27 Cabins",
        "Year-Round Access",
        "Pet-Friendly",
        "Pool & Pond",
        "Fitness Center",
        "Shuttle to Current River",
        "Midway Event Center"
      ];

  // Welcome section content
  const welcomeContent = homeContent.welcome || {};
  const welcomeTitle = welcomeContent.title || "Welcome to Midway RV Park and Cabin Rentals";
  const welcomeDescription = welcomeContent.description || 
    "Nestled in the serene beauty of Fairdealing, Missouri, Midway RV Park and Cabin Rentals offers a peaceful and safe retreat for all ages. Our 23-acre property provides the perfect blend of outdoor adventure and comfortable relaxation. Whether you're pulling in your RV or settling into one of our cozy cabins, you'll find everything you need for a memorable stay.";
  const welcomeImage = welcomeContent.image_url || "/lovable-uploads/welcome-midway.jpg"; // Use a specific image for Midway
  const welcomeCta = welcomeContent.cta_text || "Explore Our Accommodations";

  // Gallery section content
  const galleryContent = homeContent.gallery || {};
  const galleryTitle = galleryContent.title || "Discover Our Beautiful Park";
  const galleryDescription = galleryContent.description || 
    "Take a visual tour of Midway RV Park and Cabin Rentals. See our spacious sites, comfortable cabins, and fantastic amenities.";
  
  // Create gallery images from content or fall back to original
  const galleryImages = originalGalleryImages.map((original, index) => {
    const imageNumber = index + 1;
    return {
      src: galleryContent[`image${imageNumber}_url`] || original.src,
      alt: galleryContent[`image${imageNumber}_alt`] || original.alt
    };
  });

  // Things to do section content
  const thingsToDoContent = homeContent.thingsToDo || {};
  const thingsToDoTitle = thingsToDoContent.title || "Things to Do at Midway";
  const thingsToDoDescription = thingsToDoContent.description || 
    "Your stay at Midway RV Park and Cabin Rentals is packed with opportunities for fun and relaxation. Here's a glimpse of what you can enjoy right here:";
  const thingsToDoImage = thingsToDoContent.image_url || "/lovable-uploads/things-to-do-midway.jpg"; // Use a specific image for Midway
  
  // Create things to do list from content or fall back to original
  const thingsToDo = originalThingsToDo.map((original, index) => {
    return {
      activity: thingsToDoContent[`activity${index+1}`] || original.activity,
      icon: original.icon // Keep the original icon
    };
  });

  // Featured Amenities content
  const amenitiesContent = homeContent.featuredAmenities || {};
  const amenitiesTitle = amenitiesContent.title || "Amenities Designed for Your Comfort";
  const amenitiesDescription = amenitiesContent.description || 
    "At Midway RV Park and Cabin Rentals, we've thought of everything to make your stay enjoyable and convenient. Our extensive amenities set us apart.";
  
  // Create amenities list from content or fall back to original
  const featuredAmenities = originalFeaturedAmenities.map((original, index) => {
    const amenityNumber = index + 1;
    return {
      title: amenitiesContent[`amenity${amenityNumber}_title`] || original.title,
      description: amenitiesContent[`amenity${amenityNumber}_description`] || original.description,
      image: amenitiesContent[`amenity${amenityNumber}_image`] || original.image,
      icon: original.icon // Keep the original icon
    };
  });

  // Rules section content
  const rulesContent = homeContent.rules || {};
  const rulesTitle = rulesContent.title || "Your Guide to a Smooth Stay";
  const rulesDescription = rulesContent.description || 
    "To ensure a pleasant experience for all our guests, we have a few simple guidelines:";
  const rulesImage = rulesContent.image_url || "/lovable-uploads/rules-midway.jpg"; // Use a specific image for Midway
  
  // Rules items with fallbacks
  const ruleItems = [
    {
      title: rulesContent.rule1_title || "Pet Policy:",
      text: rulesContent.rule1_text || "We love furry friends! Pets are welcome but must be kept on a leash and cleaned up after."
    },
    {
      title: rulesContent.rule2_title || "Campfires:",
      text: rulesContent.rule2_text || "Enjoy campfires in designated fire pits at your site."
    },
    {
      title: rulesContent.rule3_title || "Full Hookups:",
      text: rulesContent.rule3_text || "Every RV site offers full service with water, sewer, and electric (up to 50 amp)."
    },
    {
      title: rulesContent.rule4_title || "Internet Access:",
      text: rulesContent.rule4_text || "Wi-Fi is available in our country store for your convenience."
    },
    {
      title: rulesContent.rule5_title || "Shower House:",
      text: rulesContent.rule5_text || "Our shower house is clean, modern, and wheelchair accessible."
    }
  ];

  // CTA section content
  const ctaContent = homeContent.cta || {};
  const ctaTitle = ctaContent.title || "Ready for Your Next Adventure?";
  const ctaDescription = ctaContent.description || 
    "Book your stay at Midway RV Park and Cabin Rentals today and create lasting memories in the heart of Missouri.";
  const ctaButtonText = ctaContent.button_text || "Reserve Your Spot";

  // Attractions section content
  const attractionsContent = homeContent.attractions || {};
  const attractionsTitle = attractionsContent.title || "Explore the Area Around Midway";
  const attractionsDescription = attractionsContent.description || 
    "Midway RV Park and Cabin Rentals is perfectly situated for exploring the natural beauty and local attractions of Fairdealing, MO and beyond.";
  
  // Create attractions list from content or fall back to original
  const localAttractions = originalLocalAttractions.map((original, index) => {
    const attractionNumber = index + 1;
    return {
      name: attractionsContent[`attraction${attractionNumber}_name`] || original.name,
      description: attractionsContent[`attraction${attractionNumber}_description`] || original.description,
      distance: attractionsContent[`attraction${attractionNumber}_distance`] || original.distance,
      icon: original.icon // Keep the original icon
    };
  });

  return (
    <Layout>
      {/* Hero Banner Section - Fixed for mobile */}
      <section className="relative min-h-[600px] flex items-center py-16 md:py-0 h-[85vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Midway RV Park and Cabin Rentals" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 section-container text-white flex flex-col justify-center h-full pb-16">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display mb-4 animate-fade-in pt-12 md:pt-0">
            {heroHeadline}
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl text-rvyellow mb-8 animate-fade-in" style={{
          animationDelay: "0.2s"
        }}>
            {heroSubtitle}
          </h2>
          
          <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg max-w-2xl mb-8 animate-fade-in" style={{
          animationDelay: "0.4s"
        }}>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-base md:text-lg">
              {heroFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-8 md:mb-0">
            <Link to="/reservations" className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 animate-fade-in" style={{
            animationDelay: "0.6s"
          }}>
            {heroCta}
          </Link>
        </div>
      </div>
    </section>

      {/* Section 1 - Welcome */}
      <section className="section-container py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="section-title text-4xl mb-6">{welcomeTitle}</h2>
            <p className="text-xl text-gray-700 mb-8">
              {welcomeDescription}
            </p>
            
            <Link to="/accommodations" className="btn-primary">
              {welcomeCta}
            </Link>
          </div>
          <div className="md:w-1/2 rounded-lg overflow-hidden shadow-2xl">
            <img alt="Midway RV Park scenic view" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={welcomeImage} />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Section 2 - Photo Gallery */}
      <section className="section-container py-16 bg-gray-50">
        <h2 className="section-title text-4xl text-center mb-10">{galleryTitle}</h2>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
          {galleryDescription}
        </p>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img src={image.src} alt={image.alt} className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105" />
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
            <img alt="Activities at Midway RV Park" className="w-full h-full object-cover" src={thingsToDoImage} />
          </div>
          <div className="md:w-1/2">
            <h2 className="section-title text-4xl mb-6">{thingsToDoTitle}</h2>
            <p className="text-lg text-gray-700 mb-6">
              {thingsToDoDescription}
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
        <h2 className="section-title text-4xl text-center mb-3">{amenitiesTitle}</h2>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
          {amenitiesDescription}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAmenities.map((amenity, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img src={amenity.image} alt={amenity.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
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
            <h2 className="section-title text-4xl mb-6">{rulesTitle}</h2>
            <p className="text-lg text-gray-700 mb-6">
              {rulesDescription}
            </p>
            
            <ul className="space-y-4 text-lg">
              {ruleItems.map((rule, index) => (
                <li key={index} className="flex items-start">
                  <Calendar className="text-rvred mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-semibold">{rule.title}</span> {rule.text}
                  </div>
                </li>
              ))}
            </ul>
            
            <Link to="/rules-faqs" className="btn-secondary mt-8 inline-block">
              View All Rules & FAQs
            </Link>
          </div>
          <div className="md:w-1/2 rounded-lg overflow-hidden shadow-2xl">
            <img alt="RV campsite at Midway RV Park" className="w-full h-full object-cover" src={rulesImage} />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Section 6 - Rest CTA Section */}
      <section className="py-20 bg-rvmaroon text-white">
        <div className="section-container text-center">
          <h2 className="text-4xl md:text-5xl font-display mb-8">{ctaTitle}</h2>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            {ctaDescription}
          </p>
          <Link to="/reservations" className="btn-primary bg-rvyellow text-rvmaroon hover:bg-rvyellow/90 text-lg px-8 py-4">
            {ctaButtonText}
          </Link>
        </div>
      </section>

      {/* Section 7 - Local Attractions */}
      <section className="section-container py-16">
        <h2 className="section-title text-4xl text-center mb-3">{attractionsTitle}</h2>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
          {attractionsDescription}
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
          <Link to="/what-to-do-nearby" className="btn-secondary">
            Discover More Attractions
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;