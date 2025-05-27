import React from 'react';
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionDivider from "@/components/SectionDivider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// Added Horse, Tent, BedDouble, Wrench, Globe for new amenities specific to Lone Ranger
import { Waves, House, Activity, Power, Building, Home as HomeIcon, Utensils, MapPin, Calendar, Trees, Car, Wifi, Music, IceCream, Horse, Tent, BedDouble, Wrench, Globe } from "lucide-react"; 
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useContent } from "@/hooks/use-content";

const Home = () => {
  const isMobile = useIsMobile();

  // Updated gallery images with relevant alt text for Lone Ranger RV Park & Lodge
  const originalGalleryImages = [
    { src: "/loneranger-uploads/rv-spots.jpg", alt: "Spacious RV Spots with Full Hookups at Lone Ranger RV Park, Ranger Texas" }, 
    { src: "/loneranger-uploads/horse-stalls.jpg", alt: "Comfortable Horse Stalls and Full Hookups at Lone Ranger Horse Hotel" }, 
    { src: "/loneranger-uploads/historic-lodge-exterior.jpg", alt: "Beautifully Renovated Historic Lodges at Lone Ranger RV Park & Lodge" }, 
    { src: "/loneranger-uploads/tent-camping.jpg", alt: "Peaceful Tent Camping Spots surrounded by nature at Lone Ranger Campground" }, 
    { src: "/loneranger-uploads/vintage-neon.jpg", alt: "Iconic Vintage Neon Signs Illuminating Lone Ranger RV Park at Night" }, 
    { src: "/loneranger-uploads/texaco-shop.jpg", alt: "Vintage Texaco Station Candy and Ice Cream Shop on-site at Lone Ranger" } 
  ];

  // Updated featured amenities to highlight Lone Ranger's specific offerings and capacities
  const originalFeaturedAmenities = [{
    title: "Spacious RV Sites",
    description: "Settle into one of our **18 spacious RV spots**, each featuring **full hookups** (30/50 amp, water, sewer) for ultimate convenience.",
    image: "/loneranger-uploads/rv-site-amenity.jpg",
    icon: <Car size={24} />
  }, {
    title: "Horse Hotel & Stalls",
    description: "Traveling with horses? Our **5 dedicated horse hotel spots** offer secure **stalls with full hookups** for your peace of mind and your equine companions' comfort.",
    image: "/loneranger-uploads/horse-hotel-amenity.jpg",
    icon: <Horse size={24} />
  }, {
    title: "Historic Renovated Lodges",
    description: "Experience a unique stay in one of our **4 charming, fully renovated 1930s lodges**, blending vintage Texas charm with modern amenities.",
    image: "/loneranger-uploads/lodge-amenity.jpg",
    icon: <Building size={24} />
  }, {
    title: "Peaceful Tent Camping",
    description: "Reconnect with nature at one of our **10 shaded tenting spots**, perfect for a classic outdoor experience in a serene setting.",
    image: "/loneranger-uploads/tent-amenity.jpg",
    icon: <Tent size={24} />
  }, {
    title: "Year-Round Operation",
    description: "Enjoy **no seasonality**! Lone Ranger RV Park & Lodge welcomes campers, RVers, and horse enthusiasts year-round in Ranger, Texas.",
    image: "/loneranger-uploads/year-round-amenity.jpg",
    icon: <Calendar size={24} />
  }, {
    title: "On-Site Office & Support",
    description: "Our friendly **on-site team** is here to ensure your stay is comfortable and hassle-free, from check-in to local recommendations.",
    image: "/loneranger-uploads/office-amenity.jpg",
    icon: <HomeIcon size={24} /> 
  }];

  // Updated 'Things To Do' to reflect Lone Ranger's unique offerings and local area
  const originalThingsToDo = [{
    activity: "Take a refreshing dip in our inviting resort-style swimming pool", // Assuming pool exists
    icon: <Waves size={24} className="text-rvblue" />
  }, {
    activity: "Explore local horse trails directly from our convenient horse hotel facilities",
    icon: <Horse size={24} className="text-rvblue" />
  }, {
    activity: "Step back in time with a stay or visit to our unique historical renovated lodges",
    icon: <Building size={24} className="text-rvblue" />
  }, {
    activity: "Indulge in a sweet treat or ice cream at our vintage Texaco Station candy shop",
    icon: <IceCream size={24} className="text-rvblue" />
  }, {
    activity: "Take scenic drives through the picturesque Palo Pinto Mountains, just minutes away",
    icon: <Car size={24} className="text-rvblue" />
  }, {
    activity: "Enjoy a peaceful night of stargazing under the clear Texas sky from your campsite",
    icon: <Globe size={24} className="text-rvblue" /> 
  }, {
    activity: "Set up your tent and enjoy classic camping in a serene setting",
    icon: <Tent size={24} className="text-rvblue" />
}];

  // Kept local attractions as they seem relevant to Ranger, Texas
  const originalLocalAttractions = [{
    name: "Palo Pinto Mountains State Park",
    description: "Texas' newest state park, offering hiking, wildlife viewing, and breathtaking scenic views.",
    distance: "15 min",
    icon: <Trees size={20} />
  }, {
    name: "Lake Leon",
    description: "A local gem perfect for fishing, kayaking, and relaxing afternoons by the water.",
    distance: "20 min",
    icon: <Waves size={20} />
  }, {
    name: "Historic Downtown Ranger",
    description: "Discover classic Texas charm with antique shops, cafes, and a rich local history.",
    distance: "5 min",
    icon: <MapPin size={20} />
  }, {
    name: "Eastland County Museum",
    description: "Explore regional exhibits detailing the oil boom, outlaw legends, and early Texas culture.",
    distance: "10 min",
    icon: <Building size={20} />
  }, {
    name: "Greer's Western Store",
    description: "Shop for authentic cowboy boots, hats, and western gear at this beloved local institution.",
    distance: "10 min",
    icon: <HomeIcon size={20} />
  }, {
    name: "R&K Café",
    description: "Enjoy Southern-style breakfasts, hearty lunch plates, and homemade pies just minutes from the park.",
    distance: "5 min",
    icon: <Utensils size={20} />
  }];

  // Fetch content from the database with fallback to updated data
  const { content: homeContent, isLoading } = useContent({
    page: 'home',
    fallbackData: {}
  });

  // Prepare the content with fallback to updated data
  
  // Hero section content
  const heroContent = homeContent.hero || {};
  const heroHeadline = heroContent.headline || "Lone Ranger RV Park & Lodge: Your Texas Oasis Awaits";
  const heroSubtitle = heroContent.subtitle || "Ranger, Texas – Offering RV, Tent, Horse Hotel & Historic Lodge Stays Year-Round";
  const heroImage = heroContent.image_url || "/loneranger-uploads/hero-banner.jpg"; 
  const heroCta = heroContent.cta_text || "Book Your Texas Getaway Now";
  
  // Parse features list from string if it exists or use updated list
  const heroFeatures = heroContent.features 
    ? heroContent.features.split(',').map(item => item.trim())
    : [
        "RV Full Hookups",
        "Horse Stalls & Hookups",
        "Historic Lodges",
        "Peaceful Tent Sites",
        "Year-Round Access",
        "Free High-Speed Wi-Fi",
        "On-Site Office",
        "Pet-Friendly" 
      ];

  // Welcome section content
  const welcomeContent = homeContent.welcome || {};
  const welcomeTitle = welcomeContent.title || "Welcome to Lone Ranger RV Park & Lodge in Ranger, Texas";
  const welcomeDescription = welcomeContent.description || 
    "Discover the unique charm of **Lone Ranger RV Park & Lodge**, nestled in the heart of **Ranger, Texas**. We proudly offer **18 spacious full hookup RV spots**, **10 serene tenting sites**, **5 dedicated horse hotel spots with stalls and full hookups**, and **4 beautifully renovated historical lodges**. Perfect for both short visits and extended stays, our park combines authentic Texas hospitality with modern comforts. We're open **year-round**, inviting you to experience the natural beauty and rich history of Eastland County whenever you travel. Come rest your wheels and create lasting memories!";
  const welcomeImage = welcomeContent.image_url || "/loneranger-uploads/welcome-overview.jpg"; 
  const welcomeCta = welcomeContent.cta_text || "Explore Our Accommodations"; 

  // Gallery section content
  const galleryContent = homeContent.gallery || {};
  const galleryTitle = galleryContent.title || "A Glimpse into Lone Ranger RV Park & Lodge";
  const galleryDescription = galleryContent.description || 
    "Explore our spacious RV sites, comfortable horse stalls, charming historic lodges, and peaceful tent areas – capturing the moments that make your stay unforgettable.";
  
  // Create gallery images from content or fall back to original (now updated)
  const galleryImages = originalGalleryImages.map((original, index) => {
    const imageNumber = index + 1;
    return {
      src: galleryContent[`image${imageNumber}_url`] || original.src,
      alt: galleryContent[`image${imageNumber}_alt`] || original.alt
    };
  });

  // Things to do section content
  const thingsToDoContent = homeContent.thingsToDo || {};
  const thingsToDoTitle = thingsToDoContent.title || "Your Lone Ranger Adventure Awaits";
  const thingsToDoDescription = thingsToDoContent.description || 
    "Beyond your site, discover exciting activities both within our park and in the scenic Ranger, Texas area:";
  const thingsToDoImage = thingsToDoContent.image_url || "/loneranger-uploads/things-to-do-overview.jpg"; 
  
  // Create things to do list from content or fall back to original (now updated)
  const thingsToDo = originalThingsToDo.map((original, index) => {
    return {
      activity: thingsToDoContent[`activity${index+1}`] || original.activity,
      icon: original.icon 
    };
  });

  // Featured Amenities content
  const amenitiesContent = homeContent.featuredAmenities || {};
  const amenitiesTitle = amenitiesContent.title || "Explore Our Unique Stays & Amenities";
  const amenitiesDescription = amenitiesContent.description || 
    "From spacious RV hookups to historic lodges and a dedicated horse hotel, we offer diverse options for every traveler at Lone Ranger RV Park & Lodge.";
  
  // Create amenities list from content or fall back to original (now updated)
  const featuredAmenities = originalFeaturedAmenities.map((original, index) => {
    const amenityNumber = index + 1;
    return {
      title: amenitiesContent[`amenity${amenityNumber}_title`] || original.title,
      description: amenitiesContent[`amenity${amenityNumber}_description`] || original.description,
      image: amenitiesContent[`amenity${amenityNumber}_image`] || original.image,
      icon: original.icon 
    };
  });

  // Rules section content
  const rulesContent = homeContent.rules || {};
  const rulesTitle = rulesContent.title || "Park Guidelines for a Pleasant Stay";
  const rulesDescription = rulesContent.description || 
    "To ensure everyone enjoys their time at Lone Ranger RV Park & Lodge, please observe our park guidelines:";
  const rulesImage = rulesContent.image_url || "/loneranger-uploads/rules-overview.jpg"; 
  
  // Rules items with fallbacks - Adjusted for general park rules, not just RV
  const ruleItems = [
    {
      title: rulesContent.rule1_title || "Check-in/out times:",
      text: rulesContent.rule1_text || "Check-in is at 2:00 PM, and check-out is at 11:00 AM for all accommodations."
    },
    {
      title: rulesContent.rule2_title || "Quiet hours:",
      text: rulesContent.rule2_text || "10:00 PM to 7:00 AM to ensure all guests enjoy peaceful rest."
    },
    {
      title: rulesContent.rule3_title || "Campfire policy:",
      text: rulesContent.rule3_text || "Fires are allowed in designated fire rings only. Please check for local burn bans before lighting a fire."
    },
    {
      title: rulesContent.rule4_title || "Pets:",
      text: rulesContent.rule4_text || "Well-behaved pets are welcome in designated areas and must be leashed at all times. Please clean up after your pets."
    },
    {
      title: rulesContent.rule5_title || "Wi-Fi:",
      text: rulesContent.rule5_text || "Enjoy complimentary high-speed Wi-Fi connectivity throughout the property for your convenience."
    }
  ];

  // CTA section content
  const ctaContent = homeContent.cta || {};
  const ctaTitle = ctaContent.title || "Book Your Unforgettable Texas Getaway Today!";
  const ctaDescription = ctaContent.description || 
    "Whether you're bringing your RV, horse, tent, or staying in a historic lodge, Lone Ranger RV Park & Lodge offers year-round comfort and adventure in Ranger, Texas. Contact us at **(817) 805-0582** or **Lodge@lonerangerrv.com** to plan your visit!";
  const ctaButtonText = ctaContent.button_text || "Reserve Your Spot Now";

  // Attractions section content
  const attractionsContent = homeContent.attractions || {};
  const attractionsTitle = attractionsContent.title || "Explore Ranger, Texas & Surrounding Wonders";
  const attractionsDescription = attractionsContent.description || 
    "Our prime location in Ranger, Texas, places you perfectly to explore local history, nature, and unique attractions.";
  
  // Create attractions list from content or fall back to original (now updated)
  const localAttractions = originalLocalAttractions.map((original, index) => {
    const attractionNumber = index + 1;
    return {
      name: attractionsContent[`attraction${attractionNumber}_name`] || original.name,
      description: attractionsContent[`attraction${attractionNumber}_description`] || original.description,
      distance: attractionsContent[`attraction${attractionNumber}_distance`] || original.distance,
      icon: original.icon 
    };
  });

  return (
    <Layout>
      {/* Hero Banner Section */}
      <section className="relative min-h-[600px] flex items-center py-16 md:py-0 h-[85vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Lone Ranger RV Park & Lodge in Ranger, Texas, with RVs, Horse Stalls, and Historic Lodges" className="w-full h-full object-cover" />
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

      {/* --- */}
      {/* Section 1 - Welcome */}
      <section className="section-container py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="section-title text-4xl mb-6">{welcomeTitle}</h2>
            <p className="text-xl text-gray-700 mb-8">
              {welcomeDescription}
            </p>
            
            <Link to="/reservations" className="btn-primary">
              {welcomeCta}
            </Link>
          </div>
          <div className="md:w-1/2 rounded-lg overflow-hidden shadow-2xl">
            <img alt="Overview of Lone Ranger RV Park & Lodge, showing RVs, lodges, and scenic surroundings." className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={welcomeImage} />
          </div>
        </div>
      </section>

      ---

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

      ---

      {/* Section 3 - Things To Do */}
      <section className="section-container py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 rounded-lg overflow-hidden shadow-2xl">
            <img alt="Activities and amenities at Lone Ranger RV Park & Lodge, including horse riding and nature trails." className="w-full h-full object-cover" src={thingsToDoImage} />
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

      ---

      {/* Section 4 - What Awaits You (Amenities) */}
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

      ---

      {/* Section 5 - Park Guidelines */}
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
            <img alt="A serene RV campsite at Lone Ranger RV Park, showcasing park rules and peaceful environment." className="w-full h-full object-cover" src={rulesImage} />
          </div>
        </div>
      </section>

      ---

      {/* Section 6 - CTA Section */}
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

      ---

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
          <Link to="/activities" className="btn-secondary">
            Discover More Attractions
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;