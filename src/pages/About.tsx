
import React from 'react';
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Waves, 
  Building, 
  Power, 
  Horse, 
  TennisBall,
  Dog,
  Music,
  Utensils,
  IceCream,
  ShowerHead,
  Sofa,
  Wifi
} from "lucide-react";

const About = () => {
  // Amenities with icons for display
  const amenities = [
    { name: "Resort-Style Swimming Pool", icon: <Waves size={24} className="text-rvblue" /> },
    { name: "Historic 1930s Lodges", icon: <Building size={24} className="text-rvblue" /> },
    { name: "Full RV Hookups", icon: <Power size={24} className="text-rvblue" /> },
    { name: "Horse Hotel with Stalls", icon: <Horse size={24} className="text-rvblue" /> },
    { name: "Pickleball Court", icon: <TennisBall size={24} className="text-rvblue" /> },
    { name: "Dog Park", icon: <Dog size={24} className="text-rvblue" /> },
    { name: "Live Music on Weekends", icon: <Music size={24} className="text-rvblue" /> },
    { name: "Gulf Burgers Restaurant", icon: <Utensils size={24} className="text-rvblue" /> },
    { name: "Candy & Ice Cream Shop", icon: <IceCream size={24} className="text-rvblue" /> },
    { name: "Laundry + Shower Facilities", icon: <ShowerHead size={24} className="text-rvblue" /> },
    { name: "Lounge with Pool Table", icon: <Sofa size={24} className="text-rvblue" /> },
    { name: "Free Wi-Fi", icon: <Wifi size={24} className="text-rvblue" /> }
  ];
  
  // Accommodation types for the 3-card grid
  const accommodations = [
    {
      title: "RV Sites",
      description: "Spacious pull-through and back-in sites with full hookups and scenic views.",
      icon: <Power size={40} className="text-rvyellow" />,
      imageUrl: "/placeholder.svg"
    },
    {
      title: "Horse Hotel",
      description: "RV sites with additional horse stalls — perfect for trail riders and rodeo travelers.",
      icon: <Horse size={40} className="text-rvyellow" />,
      imageUrl: "/placeholder.svg"
    },
    {
      title: "Lodges",
      description: "Renovated 1930s cabins with vintage exteriors and modern interiors.",
      icon: <Building size={40} className="text-rvyellow" />,
      imageUrl: "/placeholder.svg"
    }
  ];

  return (
    <Layout>
      {/* Hero Banner */}
      <PageHeader
        title="Discover a One-of-a-Kind RV Destination in Ranger, TX"
        description="Where vintage charm meets modern comfort in the heart of Texas"
        imageUrl="/placeholder.svg"
        className="pb-16"
      />
      
      {/* Section 1 - Concept & History */}
      <section className="section-container">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <h2 className="section-title">Rooted in History, Designed for Adventure</h2>
            <p className="text-gray-600 mb-4">
              Lone Ranger RV Park & Lodge brings a slice of old-school Americana to the heart of Ranger, Texas, 
              just minutes from the new Palo Pinto Mountains State Park. Originally home to 1930s-era structures, 
              the property has been thoughtfully restored by Texas builder and developer David Cassel to preserve 
              its historic charm while offering modern comforts.
            </p>
            <p className="text-gray-600">
              From the glow of rare neon signs to a vintage Texaco station turned candy shop, everything here 
              tells a story. Lone Ranger isn't just a place to stay — it's an experience made for road-trippers, 
              families, and adventurers who appreciate the magic of a roadside escape.
            </p>
          </div>
          <div className="md:w-1/2 rounded-lg overflow-hidden shadow-xl">
            <img
              src="/placeholder.svg"
              alt="Historic view of Lone Ranger RV Park"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Section 2 - The Property */}
      <section className="section-container bg-gray-50 py-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="section-title">Ten Acres of Texas Charm, All in One Park</h2>
          <p className="text-gray-600">
            The property spans 10 scenic acres on both sides of SH-Loop 254. Whether you're RVing, hauling horses, 
            or booking a lodge, you'll enjoy spacious sites, unique amenities, and views that stretch toward 
            the Palo Pinto Mountains.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="mb-3">
                {amenity.icon}
              </div>
              <h3 className="text-sm md:text-base font-medium text-rvmaroon">{amenity.name}</h3>
            </div>
          ))}
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Section 3 - Accommodations Overview */}
      <section className="section-container py-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="section-title">Find Your Perfect Stay</h2>
          <p className="text-gray-600">
            Choose from a variety of accommodations designed to suit your travel style
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {accommodations.map((accommodation, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={accommodation.imageUrl} 
                  alt={accommodation.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 rounded-full p-2">
                  {accommodation.icon}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-display text-rvmaroon mb-2">{accommodation.title}</h3>
                <p className="text-gray-600">{accommodation.description}</p>
                <Link to="/accommodations" className="text-rvblue font-medium inline-block mt-4 hover:underline">
                  View Details →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/reservations" className="btn-primary">
            Book Your Stay Now
          </Link>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-rvmaroon text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">Experience Ranger's Vintage Roadside Getaway</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Where classic American road trip nostalgia meets modern comfort in the Texas countryside.
          </p>
          <Link to="/contact" className="bg-rvyellow text-rvmaroon hover:bg-rvyellow/90 font-semibold py-3 px-8 rounded-md transition-all duration-300 inline-block text-lg">
            Contact Us
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
