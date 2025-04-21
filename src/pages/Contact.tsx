import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import ContactForm from "@/components/ContactForm";
import GoogleMap from "@/components/GoogleMap";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
const Contact = () => {
  return <Layout>
      <PageHeader title="Contact Us" description="We're here to help with any questions you might have about Lone Ranger RV Park & Lodge." />
      
      {/* Contact Information & Form */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div>
            <h2 className="section-title">We'd Love to Hear From You</h2>
            <p className="text-gray-600 mb-8">
              Whether you have questions about your stay, want to check availability, or need help planning your visit, our friendly team is here to help. Use the form or reach out directly.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-rvred mt-1 mr-4">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Location</h3>
                  <p className="text-gray-600">2526 SH- Loop 254, Ranger, TX 76470</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-rvred mt-1 mr-4">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">(817) 805-0582</p>
                  <p className="text-gray-500 text-sm">For general inquiries and reservations</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-rvred mt-1 mr-4">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">lodge@lonerangerrv.com
                </p>
                  <p className="text-gray-500 text-sm">We aim to respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-rvred mt-1 mr-4">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Office Hours</h3>
                  <p className="text-gray-600">Monday – Sunday: 9:00 AM – 7:00 PM</p>
                  <p className="text-gray-500 text-sm">After-hours check-in available upon request</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="section-title">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Map Section */}
      <section className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Find Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're located right off Loop 254 in Ranger, Texas — just minutes from the new Palo Pinto Mountains State Park.
          </p>
        </div>
        
        <div className="h-96 w-full">
          <GoogleMap address="2526 SH- Loop 254, Ranger, TX 76470" />
        </div>
      </section>
      
      <SectionDivider />
      
      {/* FAQs Section */}
      <section className="section-container pb-20">
        <div className="text-center mb-10">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Need more info? Here are a few quick answers — or view our full FAQ page.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-white shadow-md">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-rvmaroon mb-2">What are your check-in and check-out times?</h3>
              <p className="text-gray-600">Check-in: 2:00 PM – 8:00 PM. Check-out: 11:00 AM.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-rvmaroon mb-2">Are pets allowed?</h3>
              <p className="text-gray-600">Yes, pets are welcome in RV sites and selected lodges. Must be leashed.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-rvmaroon mb-2">Do you have horse accommodations?</h3>
              <p className="text-gray-600">Yes — Horse Hotel sites include shaded stalls with water/electric hookups.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-rvmaroon mb-2">Do I need a reservation?</h3>
              <p className="text-gray-600">Strongly recommended, especially on weekends and holidays.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Link to="/rules-faqs" className="btn-primary">
            View All FAQs →
          </Link>
        </div>
      </section>
    </Layout>;
};
export default Contact;