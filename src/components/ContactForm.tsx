
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
          Name*
        </Label>
        <Input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rvblue focus:border-transparent"
        />
      </div>
      
      <div>
        <Label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email*
        </Label>
        <Input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rvblue focus:border-transparent"
        />
      </div>
      
      <div>
        <Label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone*
        </Label>
        <Input
          type="tel"
          id="contact-phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rvblue focus:border-transparent"
        />
      </div>
      
      <div>
        <Label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
          Message*
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rvblue focus:border-transparent resize-none"
        />
      </div>
      
      <div className="flex items-center">
        <div className="h-10 w-full max-w-[300px] bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
          [reCAPTCHA placeholder]
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full md:w-auto"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
