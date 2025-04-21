
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTABanner = () => {
  return (
    <section className="bg-[#F1F0FB] py-16 mt-8">
      <div className="section-container text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display text-rvmaroon mb-4">
          Turn your next road trip into a real adventure.
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Reserve your stay at Lone Ranger RV Park &amp; Lodge and experience retro Americana with all the comforts of today.
        </p>
        <Button 
          asChild
          className="bg-rvblue hover:bg-rvblue/90 text-white px-8 py-6 text-lg"
          size="lg"
        >
          <Link to="/reservations">Book Now</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTABanner;
