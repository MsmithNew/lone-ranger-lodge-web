
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import ContactForm from "@/components/ContactForm";
import GoogleMap from "@/components/GoogleMap";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <PageHeader
        title="Contact Us"
        description="We're here to help with any questions you might have about Lone Ranger RV Park & Lodge."
      />
      
      {/* Contact Information & Form */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div>
            <h2 className="section-title">Get In Touch</h2>
            <p className="text-gray-600 mb-8">
              Whether you have questions about our accommodations, want to check availability, or need directions, our friendly staff is here to help!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-rvred mt-1 mr-4">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-gray-600">1234 Ranger Road</p>
                  <p className="text-gray-600">Wilderness County, WC 12345</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-rvred mt-1 mr-4">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-rvred mt-1 mr-4">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">info@loneranger-rvpark.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-rvred mt-1 mr-4">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Office Hours</h3>
                  <p className="text-gray-600"><span className="font-medium">Summer (May-Sept):</span> 8:00 AM - 8:00 PM Daily</p>
                  <p className="text-gray-600"><span className="font-medium">Off-Season:</span> 9:00 AM - 6:00 PM Daily</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-3">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-rvblue hover:text-rvred transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-rvblue hover:text-rvred transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-rvblue hover:text-rvred transition-colors">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
            
            <div className="mt-8 h-60 lg:h-80">
              <GoogleMap />
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="section-title">Send Us a Message</h2>
            <p className="text-gray-600 mb-8">
              Have a question or need more information? Fill out the form below and we'll get back to you as soon as possible.
            </p>
            
            <ContactForm />
          </div>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Directions */}
      <section className="section-container bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="section-title">Directions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're conveniently located and easy to find. Follow these directions to reach Lone Ranger RV Park & Lodge.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-display text-rvmaroon mb-3">From the North</h3>
            <ol className="space-y-2 text-gray-600 list-decimal pl-5">
              <li>Take Interstate 95 South to Exit 42</li>
              <li>Turn right onto Highway 17</li>
              <li>Continue for 8 miles</li>
              <li>Turn left onto Ranger Road</li>
              <li>The park entrance will be 1.5 miles on your right</li>
            </ol>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-display text-rvmaroon mb-3">From the South</h3>
            <ol className="space-y-2 text-gray-600 list-decimal pl-5">
              <li>Take Interstate 95 North to Exit 36</li>
              <li>Turn left onto Route 29</li>
              <li>Continue for 5 miles</li>
              <li>Turn right onto Wilderness Road</li>
              <li>At the second stoplight, turn left onto Ranger Road</li>
              <li>The park entrance will be 0.7 miles on your left</li>
            </ol>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-display text-rvmaroon mb-3">From the East</h3>
            <ol className="space-y-2 text-gray-600 list-decimal pl-5">
              <li>Take Highway 64 West to the Wilderness County exit</li>
              <li>Follow signs for County Road 7</li>
              <li>Turn right at the T-intersection onto Ranger Road</li>
              <li>The park entrance will be 3 miles ahead on your right</li>
            </ol>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-display text-rvmaroon mb-3">From the West</h3>
            <ol className="space-y-2 text-gray-600 list-decimal pl-5">
              <li>Take Highway 40 East until it merges with Route 29</li>
              <li>Continue on Route 29 for 12 miles</li>
              <li>Turn left at the sign for Wilderness County Lake</li>
              <li>At the four-way stop, turn right onto Ranger Road</li>
              <li>The park entrance will be 2 miles ahead on your left</li>
            </ol>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto mt-8 bg-rvyellow/10 p-6 rounded-lg">
          <h3 className="text-lg font-display text-rvmaroon mb-3 text-center">GPS Coordinates</h3>
          <p className="text-center text-gray-700">
            For GPS navigation, use the following coordinates:<br />
            <span className="font-semibold">Latitude: 38.9876 | Longitude: -77.1234</span>
          </p>
          <p className="text-center text-gray-600 mt-3 text-sm">
            Note: Some GPS systems may not recognize our address. If you have trouble finding us, please call our office for assistance.
          </p>
        </div>
      </section>
      
      {/* Emergency Information */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center">Emergency Information</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-rvmaroon">After-Hours Emergency Contact</h3>
                <p className="text-gray-600 mt-1">
                  For urgent matters outside of office hours, please call our emergency line: <span className="font-semibold">(555) 987-6543</span>
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-rvmaroon">Local Emergency Services</h3>
                <ul className="mt-1 space-y-1 text-gray-600">
                  <li><span className="font-semibold">Emergency:</span> 911</li>
                  <li><span className="font-semibold">Wilderness County Hospital:</span> (555) 555-1234 (5 miles from park)</li>
                  <li><span className="font-semibold">Urgent Care Clinic:</span> (555) 555-5678 (3 miles from park)</li>
                  <li><span className="font-semibold">Pharmacy:</span> (555) 555-9012 (2 miles from park)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-rvmaroon">Weather Emergencies</h3>
                <p className="text-gray-600 mt-1">
                  In case of severe weather, please check in at the office or with park staff for guidance. Our storm shelter is located behind the main lodge building.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
