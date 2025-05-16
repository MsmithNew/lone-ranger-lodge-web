
import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface Accommodation {
  title: string;
  description: string;
  imageUrl: string;
}

interface AccommodationsSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  accommodations: Accommodation[];
}

const AccommodationsSection = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink, 
  accommodations 
}: AccommodationsSectionProps) => {
  return (
    <section className="section-container py-16">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="section-title">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {accommodations.map((accommodation, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={accommodation.imageUrl || "/placeholder.svg"} 
                alt={accommodation.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
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
        <Link to={buttonLink} className="btn-primary">
          {buttonText}
        </Link>
      </div>
    </section>
  );
};

export default AccommodationsSection;
