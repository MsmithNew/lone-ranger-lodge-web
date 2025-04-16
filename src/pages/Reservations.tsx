
import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import { toast } from "sonner";
import { Calendar, CheckCircle, ParkingCircle, Bed, Tent } from "lucide-react";

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
      
      {/* Reservation Process */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-rvblue text-white' : 'bg-gray-200 text-gray-500'}`}>
              1
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? 'bg-rvblue' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-rvblue text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
            <div className={`h-1 w-16 ${step >= 3 ? 'bg-rvblue' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-rvblue text-white' : 'bg-gray-200 text-gray-500'}`}>
              3
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold">
              {step === 1 && "Choose Your Accommodation"}
              {step === 2 && "Your Information"}
              {step === 3 && "Review & Confirm"}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Accommodation Selection */}
            {step === 1 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Accommodation Type *
                    </label>
                    <select
                      name="accommodationType"
                      value={formData.accommodationType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rvblue focus:border-transparent"
                    >
                      <option value="">Select accommodation type</option>
                      <option value="rv-premium">Premium Pull-Through RV Site</option>
                      <option value="rv-standard">Standard Back-In RV Site</option>
                      <option value="rv-riverside">Riverside RV Site</option>
                      <option value="cabin-deluxe">Deluxe Family Cabin</option>
                      <option value="cabin-couple">Cozy Couple's Cabin</option>
                      <option value="airstream">Vintage Airstream</option>
                      <option value="wagon">Covered Wagon</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Check-In Date *
                      </label>
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rvblue focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Check-Out Date *
                      </label>
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rvblue focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Adults *
                      </label>
                      <select
                        name="adults"
                        value={formData.adults}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rvblue focus:border-transparent"
                      >
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Children
                      </label>
                      <select
                        name="children"
                        value={formData.children}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rvblue focus:border-transparent"
                      >
                        {Array.from({ length: 11 }, (_, i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pets
                      </label>
                      <select
                        name="pets"
                        value={formData.pets}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rvblue focus:border-transparent"
                      >
                        {Array.from({ length: 4 }, (_, i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-primary"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Personal Information */}
            {step === 2 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rvblue focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rvblue focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rvblue focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rvblue focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests or Notes
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rvblue focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-md transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-primary"
                  >
                    Review Booking
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Review & Confirm */}
            {step === 3 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                
                <div className="border-t border-b py-4 space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-rvblue mr-3">
                      {formData.accommodationType.includes('rv') ? (
                        <ParkingCircle size={20} />
                      ) : formData.accommodationType.includes('cabin') ? (
                        <Bed size={20} />
                      ) : (
                        <Tent size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">
                        {formData.accommodationType === 'rv-premium' && 'Premium Pull-Through RV Site'}
                        {formData.accommodationType === 'rv-standard' && 'Standard Back-In RV Site'}
                        {formData.accommodationType === 'rv-riverside' && 'Riverside RV Site'}
                        {formData.accommodationType === 'cabin-deluxe' && 'Deluxe Family Cabin'}
                        {formData.accommodationType === 'cabin-couple' && 'Cozy Couple\'s Cabin'}
                        {formData.accommodationType === 'airstream' && 'Vintage Airstream'}
                        {formData.accommodationType === 'wagon' && 'Covered Wagon'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-rvblue mr-3">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {formData.checkIn} to {formData.checkOut}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-rvblue mr-3">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <p>
                        {formData.adults} {formData.adults === 1 ? 'Adult' : 'Adults'}
                        {formData.children > 0 && `, ${formData.children} ${formData.children === 1 ? 'Child' : 'Children'}`}
                        {formData.pets > 0 && `, ${formData.pets} ${formData.pets === 1 ? 'Pet' : 'Pets'}`}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 mb-6">
                  <h4 className="font-semibold mb-2">Guest Information</h4>
                  <p>
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p>{formData.email}</p>
                  <p>{formData.phone}</p>
                  
                  {formData.specialRequests && (
                    <div className="mt-3">
                      <h4 className="font-semibold mb-1">Special Requests</h4>
                      <p className="text-gray-600">{formData.specialRequests}</p>
                    </div>
                  )}
                </div>
                
                <div className="bg-rvyellow/10 p-4 rounded-md mb-6">
                  <h4 className="font-semibold text-rvmaroon mb-2">Important Information</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>This is a reservation request. We'll confirm availability within 24 hours.</li>
                    <li>A 50% deposit will be required to secure your reservation after confirmation.</li>
                    <li>Check-in time is 3:00 PM. Check-out time is 11:00 AM.</li>
                    <li>Pet fee of $10 per pet per night will be added if applicable.</li>
                  </ul>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-md transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? "Submitting..." : "Confirm Reservation"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Rates */}
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
      
      {/* Seasonal Specials */}
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
      
      {/* Booking Policies */}
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
