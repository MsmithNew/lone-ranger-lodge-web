import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import FAQItem from "@/components/FAQItem";
const RulesFAQs = () => {
  const parkRules = [{
    category: "General Rules",
    rules: ["Quiet hours are from 10:00 PM to 7:00 AM. Please be considerate of your neighbors.", "Speed limit throughout the park is 5 mph. Watch for children and pets!", "Check-in time is 3:00 PM. Check-out time is 11:00 AM.", "All visitors must register at the office. Guest fees may apply.", "Smoking is not permitted in any buildings, cabins, or rental units.", "Alcoholic beverages are permitted at your site only. No alcohol in public areas."]
  }, {
    category: "RV & Camping Rules",
    rules: ["One RV and one vehicle per site unless otherwise approved.", "Please place all trash in designated dumpsters.", "Campfires are allowed in fire rings only and must never be left unattended.", "No washing of RVs or vehicles in the park.", "Electric heaters are not permitted when using 30 amp service.", "Clotheslines are not permitted."]
  }, {
    category: "Pet Rules",
    rules: ["Pets must be kept on a leash at all times when outside your RV or cabin.", "Pet owners must clean up after their pets immediately.", "Pets cannot be left unattended outside at any time.", "Excessive barking will not be tolerated.", "Maximum of 2 pets per site.", "Pets are not allowed in the pool area, playground, or community buildings (except service animals)."]
  }, {
    category: "Facility & Amenity Rules",
    rules: ["Children under 14 must be supervised by an adult in all amenity areas.", "No glass containers allowed in pool area or other public spaces.", "The swimming pool is open from 10:00 AM to dusk, weather permitting.", "Use of the pool, playground, and other amenities is at your own risk.", "Please report any facility issues to the office promptly.", "Management reserves the right to refuse service to anyone and to evict without refund any person who creates a disturbance."]
  }];
  const faqs = [{
    question: "What is your cancellation policy?",
    answer: "Cancellations made 7 or more days prior to arrival receive a full refund minus a $20 processing fee. Cancellations within 7 days of arrival will be charged one night's fee. No-shows will be charged for the entire reservation."
  }, {
    question: "Do you allow pets?",
    answer: "Yes, we are a pet-friendly campground. We allow up to 2 pets per site. Pets must be kept on a leash at all times when outside your RV or cabin. There is a pet fee of $10 per pet per night for cabin stays. Please see our pet rules for more details."
  }, {
    question: "Do all RV sites have full hookups?",
    answer: "Yes, all of our RV sites offer full hookups including water, sewer, and electric (30/50 amp). Our premium sites also include cable TV connections."
  }, {
    question: "What amenities are included with my stay?",
    answer: "All guests have access to our swimming pool, bathhouses, laundry facilities, WiFi, community fire pit, playground, and nature trails. Some activities may have additional fees."
  }, {
    question: "Can I have visitors during my stay?",
    answer: "Yes, visitors are welcome but must register at the office upon arrival. Day visitors must leave by 10:00 PM. There may be a visitor fee depending on amenity usage."
  }, {
    question: "Is WiFi available?",
    answer: "Yes, we offer complimentary WiFi throughout the park. Signal strength may vary based on your location and the number of users. Premium WiFi with higher speeds is available for an additional fee."
  }, {
    question: "What is your check-in and check-out time?",
    answer: "Check-in time is 3:00 PM for all accommodations. Check-out time is 11:00 AM. Early check-in or late check-out may be available for an additional fee, subject to availability."
  }, {
    question: "Do I need to bring my own linens for cabin stays?",
    answer: "Our deluxe cabins come with bed linens and towels. For our basic cabins and vintage trailer rentals, you'll need to bring your own linens, pillows, and towels. A detailed list of what to bring will be included in your reservation confirmation."
  }, {
    question: "Are campfires allowed?",
    answer: "Yes, campfires are allowed in the designated fire rings only. Fires must never be left unattended and should be fully extinguished before going to bed or leaving your site. Firewood is available for purchase at the camp store."
  }, {
    question: "Is there a camp store on-site?",
    answer: "Yes, our general store carries camping essentials, basic groceries, ice, firewood, souvenirs, and RV supplies. The store is open daily, though hours may vary seasonally."
  }, {
    question: "Do you have laundry facilities?",
    answer: "Yes, we have a laundry room located near the main bathhouse. The machines operate with quarters, and detergent is available for purchase in the camp store."
  }, {
    question: "Are there restaurants nearby?",
    answer: "We have our own 50's style diner on-site serving breakfast and dinner. There are also several restaurants within a 5-10 minute drive from the park, ranging from fast food to fine dining."
  }];
  return <Layout>
      <PageHeader title="Rules & FAQs" description="Our park guidelines and answers to commonly asked questions to help you plan your stay." />
      
      {/* Park Rules */}
      <section className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Park Rules & Guidelines</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            To ensure everyone has an enjoyable stay, we ask all guests to observe the following rules.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {parkRules.map((section, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-display text-rvmaroon mb-4">{section.category}</h3>
              <ul className="space-y-2">
                {section.rules.map((rule, ruleIndex) => <li key={ruleIndex} className="flex items-start text-gray-700">
                    <span className="text-rvred mr-2 mt-1">•</span>
                    {rule}
                  </li>)}
              </ul>
            </div>)}
        </div>
        
        <div className="max-w-4xl mx-auto mt-8 bg-rvyellow/10 p-6 rounded-lg">
          <h3 className="text-xl font-display text-rvmaroon mb-4 text-center">Important Note</h3>
          <p className="text-gray-700 text-center">
            These rules are in place to ensure the safety and enjoyment of all our guests. Failure to comply may result in being asked to leave without refund. We appreciate your cooperation and hope you have a wonderful stay!
          </p>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Frequently Asked Questions */}
      
      
      {/* Accessibility Information */}
      
      
      {/* Policies */}
      
    </Layout>;
};
export default RulesFAQs;