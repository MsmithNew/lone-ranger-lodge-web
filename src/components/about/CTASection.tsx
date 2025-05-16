
import React from 'react';
import { Link } from "react-router-dom";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonLinkType: "internal" | "external";
}

const CTASection = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink, 
  buttonLinkType 
}: CTASectionProps) => {
  const CTAButtonComponent = buttonLinkType === "external" ? 
    ({ children }: { children: React.ReactNode }) => (
      <a 
        href={buttonLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="bg-rvyellow text-rvmaroon hover:bg-rvyellow/90 font-semibold py-3 px-8 rounded-md transition-all duration-300 inline-block text-lg"
      >
        {children}
      </a>
    ) : 
    ({ children }: { children: React.ReactNode }) => (
      <Link 
        to={buttonLink} 
        className="bg-rvyellow text-rvmaroon hover:bg-rvyellow/90 font-semibold py-3 px-8 rounded-md transition-all duration-300 inline-block text-lg"
      >
        {children}
      </Link>
    );

  return (
    <section className="py-16 bg-rvblue text-white">
      <div className="section-container text-center">
        <h2 className="text-3xl md:text-4xl font-display mb-6">{title}</h2>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          {description}
        </p>
        <CTAButtonComponent>
          {buttonText}
        </CTAButtonComponent>
      </div>
    </section>
  );
};

export default CTASection;
