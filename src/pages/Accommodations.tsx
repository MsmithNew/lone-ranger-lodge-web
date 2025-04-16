
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import AccommodationCard from "@/components/AccommodationCard";
import { Link } from "react-router-dom";

const Accommodations = () => {
  const rvSites = [
    {
      title: "Premium Pull-Through Sites",
      description: "Our most spacious RV sites with easy access and extra amenities.",
      imageUrl: "/placeholder.svg",
      price: "From $45/night",
      features: [
        "Full hookups (50/30/20 amp)",
        "Extra-wide concrete pad",
        "Fire ring and picnic table",
        "Cable TV and Wi-Fi included",
        "Seasonal flower planters"
      ],
      link: "#"
    },
    {
      title: "Standard Back-In Sites",
      description: "Comfortable RV sites with all the essentials for a great stay.",
      imageUrl: "/placeholder.svg",
      price: "From $35/night",
      features: [
        "Full hookups (30/20 amp)",
        "Gravel pad with patio area",
        "Fire ring and picnic table",
        "Wi-Fi included",
        "Close to bathhouse"
      ],
      link: "#"
    },
    {
      title: "Riverside Sites",
      description: "Premium locations along the scenic riverside with beautiful views.",
      imageUrl: "/placeholder.svg",
      price: "From $50/night",
      features: [
        "Full hookups (50/30/20 amp)",
        "Direct river access",
        "Extra-large site area",
        "Private fishing spot",
        "Enhanced privacy landscaping"
      ],
      link: "#"
    }
  ];

  const cabins = [
    {
      title: "Deluxe Family Cabin",
      description: "Spacious cabin perfect for families, with separate bedroom and full amenities.",
      imageUrl: "/placeholder.svg",
      price: "From $125/night",
      features: [
        "Sleeps up to 6 people",
        "Full kitchen",
        "Bathroom with shower",
        "TV and Wi-Fi",
        "Screened porch with seating"
      ],
      link: "#"
    },
    {
      title: "Cozy Couple's Cabin",
      description: "Romantic cabin ideal for couples looking for a quiet getaway.",
      imageUrl: "/placeholder.svg",
      price: "From $95/night",
      features: [
        "Queen bed and day bed",
        "Kitchenette",
        "Bathroom with shower",
        "TV and Wi-Fi",
        "Private deck with views"
      ],
      link: "#"
    }
  ];

  const uniqueStays = [
    {
      title: "Vintage Airstream",
      description: "Authentically restored 1960s Airstream trailer with modern comforts.",
      imageUrl: "/placeholder.svg",
      price: "From $110/night",
      features: [
        "Queen bed and convertible dining area",
        "Retro kitchenette with microwave",
        "Small bathroom with shower",
        "Air conditioning and heating",
        "Private outdoor seating area"
      ],
      link: "#"
    },
    {
      title: "Covered Wagon Experience",
      description: "Sleep under the stars in our covered wagon for a true pioneer experience with modern comforts.",
      imageUrl: "/placeholder.svg",
      price: "From $85/night",
      features: [
        "Queen bed and two bunk beds",
        "Electric lights and outlets",
        "Outdoor cooking area",
        "Access to nearby bathhouse",
        "Picnic table and fire ring"
      ],
      link: "#"
    }
  ];

  return (
    <Layout>
      <PageHeader
        title="Accommodations"
        description="From spacious RV sites to cozy cabins and unique lodging options, find the perfect stay for your next adventure."
      />
      
      {/* RV Sites */}
      <section className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">RV Sites</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our well-maintained RV sites offer full hookups, spacious layouts, and easy access. Choose from pull-through, back-in, or premium riverside locations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rvSites.map((site, index) => (
            <AccommodationCard
              key={index}
              title={site.title}
              description={site.description}
              imageUrl={site.imageUrl}
              price={site.price}
              features={site.features}
              link={site.link}
            />
          ))}
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Cabins */}
      <section className="section-container bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="section-title">Cozy Cabins</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our rustic cabins blend vintage charm with modern amenities, providing a comfortable lodging option for those who prefer a roof over their heads.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cabins.map((cabin, index) => (
            <AccommodationCard
              key={index}
              title={cabin.title}
              description={cabin.description}
              imageUrl={cabin.imageUrl}
              price={cabin.price}
              features={cabin.features}
              link={cabin.link}
            />
          ))}
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Unique Stays */}
      <section className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Unique Lodging Experiences</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            For a truly memorable stay, try one of our specialty accommodations that celebrate the spirit of vintage Americana.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {uniqueStays.map((stay, index) => (
            <AccommodationCard
              key={index}
              title={stay.title}
              description={stay.description}
              imageUrl={stay.imageUrl}
              price={stay.price}
              features={stay.features}
              link={stay.link}
            />
          ))}
        </div>
      </section>
      
      {/* Accessibility */}
      <section className="section-container bg-rvblue/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center mb-6">Accessibility Information</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-600 mb-4">
              Lone Ranger RV Park & Lodge is committed to providing accessible accommodations for all guests. We offer:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
              <li>Accessible RV sites with paved pads and nearby parking</li>
              <li>ADA-compliant restroom and shower facilities</li>
              <li>One fully accessible cabin with ramp access and accessible bathroom</li>
              <li>Paved pathways to main lodge and common areas</li>
              <li>Service animals welcome throughout the property</li>
            </ul>
            <p className="text-gray-600">
              If you have specific accessibility requirements, please contact us directly to ensure we can accommodate your needs.
            </p>
          </div>
        </div>
      </section>
      
      {/* Booking CTA */}
      <section className="section-container bg-rvmaroon text-white py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">Ready to Book Your Stay?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Check availability and rates for your preferred accommodation options.
          </p>
          <Link to="/reservations" className="btn-primary bg-rvyellow text-rvmaroon hover:bg-rvyellow/90">
            Book Now
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Accommodations;
