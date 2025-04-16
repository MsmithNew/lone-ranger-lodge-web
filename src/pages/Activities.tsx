
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import ActivityCard from "@/components/ActivityCard";

const Activities = () => {
  const outdoorActivities = [
    {
      title: "Mountain Trails",
      description: "Explore miles of scenic hiking trails with difficulty levels ranging from beginner to expert. Enjoy breathtaking views and wildlife spotting opportunities.",
      imageUrl: "/placeholder.svg",
      distance: "5-15 miles away"
    },
    {
      title: "Blue River Fishing",
      description: "Some of the best trout fishing in the region can be found just minutes from our park. Guided fishing tours available or venture out on your own.",
      imageUrl: "/placeholder.svg",
      distance: "2 miles away"
    },
    {
      title: "Canyon Biking Trails",
      description: "Mountain biking trails for all skill levels with bike rentals available in town. Maps provided at our front desk.",
      imageUrl: "/placeholder.svg",
      distance: "8 miles away"
    },
    {
      title: "Wild Horse Wildlife Reserve",
      description: "Observe wild horses and other native wildlife in their natural habitat. Guided tours available with local naturalists.",
      imageUrl: "/placeholder.svg",
      distance: "12 miles away"
    }
  ];
  
  const familyActivities = [
    {
      title: "Pioneer Village Historic Site",
      description: "Step back in time at this living history museum showcasing pioneer life in the American West. Interactive exhibits and demonstrations daily.",
      imageUrl: "/placeholder.svg",
      distance: "10 miles away"
    },
    {
      title: "Splash Valley Water Park",
      description: "Cool off at this family-friendly water park featuring slides, wave pools, and splash areas for younger children.",
      imageUrl: "/placeholder.svg",
      distance: "15 miles away"
    },
    {
      title: "Wild West Mini Golf",
      description: "18 holes of themed mini golf fun for the whole family with an adjacent ice cream parlor.",
      imageUrl: "/placeholder.svg",
      distance: "5 miles away"
    }
  ];
  
  const culturalActivities = [
    {
      title: "Wilderness County Historical Museum",
      description: "Learn about the rich history of the region from Native American settlements to the railroad boom era.",
      imageUrl: "/placeholder.svg",
      distance: "8 miles away"
    },
    {
      title: "Frontier Art Gallery",
      description: "Contemporary and traditional Western art featuring local and regional artists. Regular exhibits and events.",
      imageUrl: "/placeholder.svg",
      distance: "7 miles away"
    },
    {
      title: "Main Street Historic District",
      description: "Charming downtown area with preserved 19th century architecture, boutique shopping, and local restaurants.",
      imageUrl: "/placeholder.svg",
      distance: "6 miles away"
    }
  ];
  
  const seasonalEvents = [
    {
      name: "Wilderness County Rodeo",
      description: "Annual rodeo event featuring professional and amateur competitions, carnival, and Western entertainment.",
      date: "July 15-17",
      location: "County Fairgrounds (12 miles)"
    },
    {
      name: "Harvest Festival",
      description: "Celebrate the autumn harvest with a farmers market, crafts fair, live music, and seasonal food and drinks.",
      date: "October 8-9",
      location: "Main Street (6 miles)"
    },
    {
      name: "Winter Wonderland Light Festival",
      description: "Spectacular holiday light displays, horse-drawn carriage rides, and seasonal treats.",
      date: "December 1-31",
      location: "City Park (7 miles)"
    },
    {
      name: "Spring Wildflower Festival",
      description: "Guided hikes, photography workshops, and educational exhibits celebrating the region's spectacular wildflower blooms.",
      date: "April 15-16",
      location: "Various locations (5-15 miles)"
    }
  ];

  return (
    <Layout>
      <PageHeader
        title="What to Do Nearby"
        description="Discover the many attractions and activities within a short drive of Lone Ranger RV Park & Lodge."
      />
      
      {/* Outdoor Activities */}
      <section className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Outdoor Adventures</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the natural beauty of the surrounding area with these outdoor activities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {outdoorActivities.map((activity, index) => (
            <ActivityCard
              key={index}
              title={activity.title}
              description={activity.description}
              imageUrl={activity.imageUrl}
              distance={activity.distance}
            />
          ))}
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Family Activities */}
      <section className="section-container bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="section-title">Family Fun</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Activities and attractions perfect for visitors of all ages.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {familyActivities.map((activity, index) => (
            <ActivityCard
              key={index}
              title={activity.title}
              description={activity.description}
              imageUrl={activity.imageUrl}
              distance={activity.distance}
            />
          ))}
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Cultural Activities */}
      <section className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Arts & Culture</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Immerse yourself in the rich history and culture of the region.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {culturalActivities.map((activity, index) => (
            <ActivityCard
              key={index}
              title={activity.title}
              description={activity.description}
              imageUrl={activity.imageUrl}
              distance={activity.distance}
            />
          ))}
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Seasonal Events */}
      <section className="section-container bg-rvblue/10">
        <div className="text-center mb-10">
          <h2 className="section-title">Seasonal Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Special events throughout the year in the surrounding area.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {seasonalEvents.map((event, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm mb-4 border-l-4 border-rvyellow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-display text-rvmaroon">{event.name}</h3>
                  <p className="text-gray-600 mt-1">{event.description}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-rvblue font-semibold">{event.date}</p>
                  <p className="text-gray-500 text-sm">{event.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Day Trips */}
      <section className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Recommended Day Trips</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore these attractions within a 1-2 hour drive from Lone Ranger RV Park & Lodge.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-display text-rvmaroon mb-3">Canyon National Park</h3>
            <div className="flex items-center mb-2">
              <span className="bg-rvred/10 text-rvred text-sm font-medium px-2 py-1 rounded-md">1 hour drive</span>
            </div>
            <p className="text-gray-600 mb-4">
              Explore this stunning national park featuring dramatic canyons, hiking trails, and scenic overlooks. The visitor center offers excellent educational exhibits about the region's geology.
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Open year-round</span>
              <span>Entrance fee: $20 per vehicle</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-display text-rvmaroon mb-3">Historic Mining Town</h3>
            <div className="flex items-center mb-2">
              <span className="bg-rvred/10 text-rvred text-sm font-medium px-2 py-1 rounded-md">1.5 hour drive</span>
            </div>
            <p className="text-gray-600 mb-4">
              Step back in time in this preserved 19th century mining town. Take a tour of the old mine, pan for gold, and enjoy the authentic saloons and shops along the wooden boardwalks.
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Hours vary seasonally</span>
              <span>Tours from $15 per person</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-display text-rvmaroon mb-3">Lake Recreation Area</h3>
            <div className="flex items-center mb-2">
              <span className="bg-rvred/10 text-rvred text-sm font-medium px-2 py-1 rounded-md">45 minute drive</span>
            </div>
            <p className="text-gray-600 mb-4">
              Enjoy a day at this beautiful mountain lake offering boating, swimming, and picnic areas. Boat rentals available on-site, including kayaks, canoes, and small motorboats.
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Open May through September</span>
              <span>Day use fee: $10 per vehicle</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-display text-rvmaroon mb-3">Wine Country</h3>
            <div className="flex items-center mb-2">
              <span className="bg-rvred/10 text-rvred text-sm font-medium px-2 py-1 rounded-md">1.25 hour drive</span>
            </div>
            <p className="text-gray-600 mb-4">
              Visit several family-owned wineries offering tastings and tours. The scenic drive through rolling vineyards makes this a perfect adult day trip from the park.
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Most wineries open 11am-5pm</span>
              <span>Tasting fees vary by winery</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Local Tips */}
      <section className="section-container bg-rvyellow/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center mb-6">Local Tips & Recommendations</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-display text-rvmaroon mb-4">Staff Favorites</h3>
            
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-rvblue bg-rvblue/5 rounded-r-md">
                <p className="italic text-gray-600 mb-2">
                  "For the best sunrise views, take the Mountain Ridge Trail to Eagle Point. It's a moderate 30-minute hike from the trailhead, and the view is absolutely worth the early wake-up call."
                </p>
                <p className="text-sm text-rvblue">— John, Park Manager</p>
              </div>
              
              <div className="p-4 border-l-4 border-rvblue bg-rvblue/5 rounded-r-md">
                <p className="italic text-gray-600 mb-2">
                  "Don't miss Mabel's Diner in town for the best pie you'll ever taste. Their seasonal fruit pies use local ingredients and the crust is perfect every time."
                </p>
                <p className="text-sm text-rvblue">— Sarah, Guest Services</p>
              </div>
              
              <div className="p-4 border-l-4 border-rvblue bg-rvblue/5 rounded-r-md">
                <p className="italic text-gray-600 mb-2">
                  "If you're here on a Thursday, check out the farmers market downtown. Local produce, crafts, and often live music make it a great morning activity before heading out on other adventures."
                </p>
                <p className="text-sm text-rvblue">— Mike, Facilities Manager</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-rvred/10 rounded-md">
              <h4 className="font-semibold text-rvmaroon mb-2">Need More Recommendations?</h4>
              <p className="text-gray-600">
                Our front desk staff is always happy to provide personalized recommendations based on your interests, the season, and current local events. Stop by the office anytime!
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Activities;
