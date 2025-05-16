
import React from 'react';

interface Amenity {
  name: string;
  icon: React.ReactElement;
}

interface TexasCharmSectionProps {
  title: string;
  description: string;
  amenities: Amenity[];
}

const TexasCharmSection = ({ title, description, amenities }: TexasCharmSectionProps) => {
  return (
    <section className="section-container bg-gray-50 py-16">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="section-title">{title}</h2>
        <p className="text-gray-600">{description}</p>
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
  );
};

export default TexasCharmSection;
