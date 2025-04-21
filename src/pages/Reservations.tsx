import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import { toast } from "sonner";
import { Calendar, CheckCircle, ParkingCircle, Bed, Tent } from "lucide-react";

const RateCard = ({
  title,
  price,
  note,
  highlightColor = "bg-rvred text-white",
  buttonColor = "bg-rvblue hover:bg-rvblue/90",
  border = "border-rvred"
}: {
  title: string;
  price: string;
  note: string;
  highlightColor?: string;
  buttonColor?: string;
  border?: string;
}) => (
  <div className={`rounded-xl shadow-md border-2 ${border} flex flex-col p-6 mb-4 w-full max-w-[350px] mx-auto`} style={{ minHeight: 250 }}>
    <h3 className={`font-display text-lg font-bold mb-3 ${highlightColor} py-2 px-3 rounded-md inline-block w-fit`}>{title}</h3>
    <div className="mt-2 mb-4">
      <span className="block text-3xl font-extrabold text-rvmaroon mb-2">{price}</span>
      <span className="block text-gray-600 text-sm">{note}</span>
    </div>
    <div className="flex-grow" />
    <button className={`mt-4 ${buttonColor} text-white font-bold rounded-md py-2 px-4 transition duration-200 text-lg shadow-sm`} style={{ backgroundColor: "#1FBEFF" }}>
      Book Now
    </button>
  </div>
);

const Reservations = () => {
  const [formData, setFormData] = useState({
    accommodationType: "",
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    pets: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: ""
  });
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.accommodationType || !formData.checkIn || !formData.checkOut) {
        toast.error("Please complete all required fields");
        return;
      }
    }
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handlePrevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Reservation request submitted successfully! You'll receive a confirmation email shortly.");
      setFormData({
        accommodationType: "",
        checkIn: "",
        checkOut: "",
        adults: 1,
        children: 0,
        pets: 0,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialRequests: ""
      });
      setStep(1);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <PageHeader
        title="Reservations & Rates"
        description="Book your stay at Lone Ranger RV Park & Lodge. Check availability, rates, and make your reservation online."
      />
      
      <section className="section-container max-w-screen-lg mx-auto pb-2">
        <h1 className="page-title text-4xl md:text-5xl mb-2" style={{ color: "#FF1F47" }}>
          Fair, flexible rates for every kind of traveler
        </h1>
        <p className="mb-10 text-lg md:text-xl max-w-2xl text-gray-700 font-medium">
          Whether you're staying a night, a week, or the whole season, Lone Ranger RV Park & Lodge offers competitive rates without sacrificing comfort, charm, or location.
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-6 justify-center mb-10">
          <RateCard
            title="Daily Rate"
            price="Starting at $45 / NIGHT"
            note="Includes full hookups and free Wi-Fi"
            highlightColor="bg-rvred text-white"
            buttonColor="bg-rvblue hover:bg-rvblue/90"
            border="border-rvred"
          />
          <RateCard
            title="Weekly Rate"
            price="Starting at $250 / WEEK"
            note="Includes full hookups and free Wi-Fi"
            highlightColor="bg-rvyellow text-rvmaroon"
            buttonColor="bg-rvred hover:bg-rvred/90"
            border="border-rvyellow"
          />
          <RateCard
            title="Monthly Rate"
            price="Starting at $600 / MONTH"
            note="Includes Wi-Fi; utilities billed separately"
            highlightColor="bg-rvolive text-white"
            buttonColor="bg-rvmaroon hover:bg-rvmaroon/80"
            border="border-rvolive"
          />
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-6 justify-center mb-10">
          <RateCard
            title="Horse Hotel Sites"
            price="Same rates as RV Sites"
            note="Includes full hookups + shaded horse stalls"
            highlightColor="bg-rvblue text-white"
            buttonColor="bg-rvyellow text-rvmaroon hover:bg-rvyellow/90"
            border="border-rvblue"
          />
          <RateCard
            title="Lodges"
            price="$175 / NIGHT"
            note="Private 1930s cabins with modern amenities"
            highlightColor="bg-rvmaroon text-white"
            buttonColor="bg-rvblue hover:bg-rvblue/90"
            border="border-rvmaroon"
          />
        </div>
      </section>
      
      <SectionDivider />
      
      <section className="section-container bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="section-title">Our Rates</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transparent pricing for all our accommodation options. Rates may vary by season.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-rvmaroon text-white font-display text-xl">
              RV Sites
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-rvmaroon/10">
                    <th className="text-left py-3 px-4 font-semibold text-rvmaroon">Site Type</th>
                    <th className="text-center py-3 px-4 font-semibold text-rvmaroon">Daily</th>
                    <th className="text-center py-3 px-4 font-semibold text-rvmaroon">Weekly</th>
                    <th className="text-center py-3 px-4 font-semibold text-rvmaroon">Monthly</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Premium Pull-Through</td>
                    <td className="py-3 px-4 text-center">$45</td>
                    <td className="py-3 px-4 text-center">$290</td>
                    <td className="py-3 px-4 text-center">$850</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Standard Back-In</td>
                    <td className="py-3 px-4 text-center">$35</td>
                    <td className="py-3 px-4 text-center">$225</td>
                    <td className="py-3 px-4 text-center">$700</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Riverside</td>
                    <td className="py-3 px-4 text-center">$50</td>
                    <td className="py-3 px-4 text-center">$320</td>
                    <td className="py-3 px-4 text-center">$950</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
            <div className="p-4 bg-rvblue text-white font-display text-xl">
              Cabins & Unique Stays
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-rvblue/10">
                    <th className="text-left py-3 px-4 font-semibold text-rvblue">Accommodation Type</th>
                    <th className="text-center py-3 px-4 font-semibold text-rvblue">Daily</th>
                    <th className="text-center py-3 px-4 font-semibold text-rvblue">Weekly</th>
                    <th className="text-center py-3 px-4 font-semibold text-rvblue">Maximum Occupancy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Deluxe Family Cabin</td>
                    <td className="py-3 px-4 text-center">$125</td>
                    <td className="py-3 px-4 text-center">$750</td>
                    <td className="py-3 px-4 text-center">6</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Cozy Couple's Cabin</td>
                    <td className="py-3 px-4 text-center">$95</td>
                    <td className="py-3 px-4 text-center">$570</td>
                    <td className="py-3 px-4 text-center">3</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Vintage Airstream</td>
                    <td className="py-3 px-4 text-center">$110</td>
                    <td className="py-3 px-4 text-center">$660</td>
                    <td className="py-3 px-4 text-center">3</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Covered Wagon</td>
                    <td className="py-3 px-4 text-center">$85</td>
                    <td className="py-3 px-4 text-center">$510</td>
                    <td className="py-3 px-4 text-center">4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-rvyellow/10 p-4 rounded-lg mt-8">
            <h3 className="font-semibold text-rvmaroon mb-2">Additional Fees</h3>
            <ul className="space-y-1 text-gray-700">
              <li>Pet Fee: $10 per pet per night</li>
              <li>Additional Vehicle: $5 per day</li>
              <li>Early Check-In (when available): $20</li>
              <li>Late Check-Out (when available): $20</li>
              <li>Cancellation: Free 7+ days before arrival, 1-night fee within 7 days</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Seasonal Specials</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take advantage of our special offers and promotions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
            <div className="h-40 bg-gradient-to-r from-rvred to-rvmaroon flex items-center justify-center p-6">
              <h3 className="text-white font-display text-2xl text-center">
                Summer Family Package
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Book a 5+ night stay in a Family Cabin and receive:
              </p>
              <ul className="space-y-1 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="text-rvred mr-2">•</span>
                  Free s'mores kit for the family
                </li>
                <li className="flex items-start">
                  <span className="text-rvred mr-2">•</span>
                  One complimentary breakfast at our diner
                </li>
                <li className="flex items-start">
                  <span className="text-rvred mr-2">•</span>
                  10% discount on any local activities booked through us
                </li>
              </ul>
              <p className="text-sm text-gray-500">Valid June 1 - August 31</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
            <div className="h-40 bg-gradient-to-r from-rvblue to-rvblue/70 flex items-center justify-center p-6">
              <h3 className="text-white font-display text-2xl text-center">
                Midweek RV Special
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Stay Sunday through Thursday in any RV site and save:
              </p>
              <ul className="space-y-1 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="text-rvblue mr-2">•</span>
                  20% off daily rates
                </li>
                <li className="flex items-start">
                  <span className="text-rvblue mr-2">•</span>
                  Free firewood bundle
                </li>
                <li className="flex items-start">
                  <span className="text-rvblue mr-2">•</span>
                  Late checkout when available
                </li>
              </ul>
              <p className="text-sm text-gray-500">Valid year-round except holidays</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
            <div className="h-40 bg-gradient-to-r from-rvolive to-rvolive/70 flex items-center justify-center p-6">
              <h3 className="text-white font-display text-2xl text-center">
                Fall Foliage Package
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Experience autumn colors with our special fall package:
              </p>
              <ul className="space-y-1 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="text-rvolive mr-2">•</span>
                  Stay 3 nights, get the 4th night free
                </li>
                <li className="flex items-start">
                  <span className="text-rvolive mr-2">•</span>
                  Complimentary guided fall foliage hike
                </li>
                <li className="flex items-start">
                  <span className="text-rvolive mr-2">•</span>
                  Hot cider and donuts on arrival
                </li>
              </ul>
              <p className="text-sm text-gray-500">Valid September 15 - November 15</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-container bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center">Booking Policies</h2>
          
          <div className="space-y-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-display text-rvmaroon mb-3">Reservation & Payment</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-rvred mr-2">•</span>
                  A 50% deposit is required at the time of booking to secure your reservation.
                </li>
                <li className="flex items-start">
                  <span className="text-rvred mr-2">•</span>
                  The remaining balance is due upon arrival.
                </li>
                <li className="flex items-start">
                  <span className="text-rvred mr-2">•</span>
                  We accept major credit cards, cash, and travelers checks.
                </li>
                <li className="flex items-start">
                  <span className="text-rvred mr-2">•</span>
                  All rates are subject to applicable taxes and fees.
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-display text-rvmaroon mb-3">Cancellation Policy</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-rvred mr-2">•</span>
                  Cancellations made 7 or more days prior to arrival: Full refund minus a $20 processing fee.
                </li>
                <li className="flex items-start">
                  <span className="text-rvred mr-2">•</span>
                  Cancellations within 7 days of arrival: One night's fee will be charged.
                </li>
                <li className="flex items-start">
                  <span className="text-rvred mr-2">•</span>
                  No-shows will be charged for the entire reservation.
                </li>
                <li className="flex items-start">
                  <span className="text-rvred mr-2">•</span>
                  Early departures do not qualify for refunds.
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-display text-rvmaroon mb-3">Check-In & Check-Out</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-rvred mr-2">•</span>
                  Check-in time: 3:00 PM for all accommodations.
                </li>
                <li className="flex items-start">
                  <span className="text-rvred mr-2">•</span>
                  Check-out time: 11:00 AM.
                </li>
                <li className="flex items-start">
                  <span className="text-rvred mr-2">•</span>
                  Early check-in and late check-out may be available for an additional fee, subject to availability.
                </li>
                <li className="flex items-start">
                  <span className="text-rvred mr-2">•</span>
                  Office hours: 8:00 AM - 8:00 PM (summer), 9:00 AM - 6:00 PM (off-season).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Reservations;
