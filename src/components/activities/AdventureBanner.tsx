
import { MapPin } from "lucide-react";

const AdventureBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-rvmaroon to-rvblue text-white py-16 mt-12">
      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <h2 className="font-display text-3xl mb-4">Find Your Texas Adventure</h2>
        <p className="text-lg mb-8">
          Our central location puts you within easy reach of the best that central Texas has to offer.
        </p>
        <div className="flex items-center justify-center gap-3">
          <MapPin className="h-6 w-6" />
          <span className="font-medium">Within 30 minutes of all these attractions</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-30"></div>
    </section>
  );
};

export default AdventureBanner;
