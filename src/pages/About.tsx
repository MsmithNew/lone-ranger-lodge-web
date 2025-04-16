
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import ImageGallery from "@/components/ImageGallery";

const About = () => {
  const teamMembers = [
    {
      name: "John Ranger",
      role: "Owner & Manager",
      bio: "With over 20 years in hospitality, John brings his passion for the great outdoors and vintage Americana to every aspect of Lone Ranger RV Park & Lodge.",
      imageUrl: "/placeholder.svg"
    },
    {
      name: "Sarah Martinez",
      role: "Guest Services Director",
      bio: "Sarah ensures every guest feels at home from the moment they arrive. Her attention to detail and warm personality make her a favorite among returning guests.",
      imageUrl: "/placeholder.svg"
    },
    {
      name: "Mike Johnson",
      role: "Facilities Manager",
      bio: "Mike keeps everything running smoothly. With his background in construction and landscaping, he maintains our grounds and amenities to the highest standards.",
      imageUrl: "/placeholder.svg"
    }
  ];
  
  const historyImages = [
    { src: "/placeholder.svg", alt: "Historic view of Lone Ranger RV Park 1970s" },
    { src: "/placeholder.svg", alt: "Original lodge building 1960s" },
    { src: "/placeholder.svg", alt: "Vintage camping at Lone Ranger 1980s" },
    { src: "/placeholder.svg", alt: "Renovations in the 2000s" },
    { src: "/placeholder.svg", alt: "Modern facilities today" },
    { src: "/placeholder.svg", alt: "Expanded RV sites" }
  ];

  return (
    <Layout>
      <PageHeader
        title="About Us"
        description="Learn about our history, our mission, and the dedicated team that makes Lone Ranger RV Park & Lodge a special place."
      />
      
      {/* Our Story */}
      <section className="section-container">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <h2 className="section-title">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 1968, Lone Ranger RV Park & Lodge began as a simple roadside camping spot for travelers exploring the beautiful wilderness of the region. Over the decades, we've grown and evolved while preserving the classic American road trip spirit that has always been our foundation.
            </p>
            <p className="text-gray-600 mb-4">
              The original owner, Robert "Ranger" Williams, was passionate about creating a place where families could disconnect from the hustle of everyday life and reconnect with each other and nature. That vision continues to guide us today as we blend nostalgic charm with modern amenities.
            </p>
            <p className="text-gray-600">
              In 2010, the park underwent a major renovation to upgrade facilities while carefully preserving its vintage character. Today, we're proud to offer an experience that honors the golden age of road travel while providing all the comforts modern travelers expect.
            </p>
          </div>
          <div className="md:w-1/2 rounded-lg overflow-hidden shadow-xl">
            <img
              src="/placeholder.svg"
              alt="Historic view of Lone Ranger RV Park"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Our Mission */}
      <section className="section-container bg-rvyellow/10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-title">Our Mission</h2>
          <p className="text-xl text-gray-700 italic mb-6">
            "To create an authentic getaway where the spirit of classic American road trips meets modern comfort, providing memorable experiences for every guest while preserving the natural beauty of our surroundings."
          </p>
          <p className="text-gray-600">
            At Lone Ranger RV Park & Lodge, we're committed to sustainable practices, exceptional service, and creating a welcoming community for travelers from all walks of life. We believe in preserving the nostalgia of simpler times while embracing the conveniences that make your stay comfortable and enjoyable.
          </p>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Our Team */}
      <section className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The dedicated individuals who work hard to make your stay exceptional.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4 border-4 border-rvred">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-display text-rvmaroon">{member.name}</h3>
              <p className="text-rvblue font-medium mb-2">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Photo History */}
      <section className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Through the Years</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A visual journey through the history of Lone Ranger RV Park & Lodge from its humble beginnings to the present day.
          </p>
        </div>
        
        <ImageGallery images={historyImages} />
      </section>
      
      {/* Values */}
      <section className="section-container bg-rvmaroon text-white py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display mb-6">Our Values</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🌿</span>
            </div>
            <h3 className="text-xl font-display mb-3">Sustainability</h3>
            <p className="text-gray-200">
              We're committed to eco-friendly practices that preserve our beautiful surroundings for future generations.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="text-xl font-display mb-3">Community</h3>
            <p className="text-gray-200">
              We foster a welcoming environment where travelers can connect and create lasting memories together.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⭐</span>
            </div>
            <h3 className="text-xl font-display mb-3">Excellence</h3>
            <p className="text-gray-200">
              We strive to exceed expectations in every aspect of our service and facilities.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
