import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import AttractionSection from "@/components/attractions/AttractionSection";
import FrontDeskRecommendations from "@/components/activities/FrontDeskRecommendations";

// Unsplash IDs for images
const images = {
  paloPinto: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  lakeLeon: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
  copperasCreek: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
  stephensLake: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
  driveIn: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
  plazaTheatre: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e",
  splashPad: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  stephenvillePark: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
  downtownStephenville: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  grimesGarden: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
  eastlandMuseum: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
  gordonCenter: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  marysCafe: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e",
  eastlandAntiques: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
};

const outdoorActivities = [
  {
    title: "Palo Pinto Mountains State Park",
    description:
      "Just one exit away, this newly opened Texas state park offers scenic hiking trails, horseback riding, and panoramic overlooks of the surrounding mountains.",
    imageUrl: images.paloPinto,
    learnMore: "#",
  },
  {
    title: "Lake Leon (Eastland County)",
    description:
      "A peaceful spot for fishing, kayaking, or swimming. Ideal for a morning on the water or a relaxed picnic by the shoreline.",
    imageUrl: images.lakeLeon,
    learnMore: "#",
  },
  {
    title: "Copperas Creek Park",
    description:
      "A day-use park near Lake Proctor with trails, shaded picnic areas, and birdwatching opportunities.",
    imageUrl: images.copperasCreek,
    learnMore: "#",
  },
  {
    title: "Stephens Lake Trailhead (Gorman, TX)",
    description:
      "A scenic local trailhead perfect for hiking or nature walks just under 30 minutes away.",
    imageUrl: images.stephensLake,
    learnMore: "#",
  },
];

const familyFun = [
  {
    title: "Historic Ranger Drive-In Theater (Ranger, TX)",
    description:
      "A classic drive-in movie experience under renovation and reopening soon. Stay tuned for screenings and special events.",
    imageUrl: images.driveIn,
    learnMore: "#",
  },
  {
    title: "Plaza Theatre (Eastland, TX)",
    description:
      "A beautifully restored historic cinema still showing current films with vintage charm.",
    imageUrl: images.plazaTheatre,
    learnMore: "#",
  },
  {
    title: "Downtown Eastland Splash Pad",
    description:
      "A fun, free option for kids to cool off during summer, located in Eastland’s walkable town square.",
    imageUrl: images.splashPad,
    learnMore: "#",
  },
  {
    title: "Stephenville City Park",
    description:
      "One of the largest parks in the area, with playgrounds, walking trails, and plenty of green space for family fun.",
    imageUrl: images.stephenvillePark,
    learnMore: "#",
  },
];

const artsCulture = [
  {
    title: "Downtown Stephenville",
    description:
      "Known for its local shops, art galleries, coffee spots, and live music. Great for a relaxed afternoon or date night stroll.",
    imageUrl: images.downtownStephenville,
    learnMore: "#",
  },
  {
    title: "Grimes Memorial Garden & Murals (Eastland, TX)",
    description:
      "A quiet spot to enjoy local murals and flower gardens — great for photos and a quick cultural stop.",
    imageUrl: images.grimesGarden,
    learnMore: "#",
  },
  {
    title: "Eastland County Museum & Historical Society",
    description:
      "Explore the history of this Texas region through local artifacts, Route 66 memorabilia, and more.",
    imageUrl: images.eastlandMuseum,
    learnMore: "#",
  },
  {
    title: "W.K. Gordon Center for Industrial History of Texas (Mingus, TX)",
    description:
      "A unique museum just off I-20 focused on ghost towns, oil booms, and Texas industrial life.",
    imageUrl: images.gordonCenter,
    learnMore: "#",
  },
];

const frontDeskRecommendations = [
  {
    title: "Palo Pinto Mountains State Park",
    description: "Our top pick for hiking, horseback riding, and views.",
    imageUrl: images.paloPinto,
    learnMore: "#",
  },
  {
    title: "Lake Leon",
    description: "A guest favorite for early morning fishing or kayaking.",
    imageUrl: images.lakeLeon,
    learnMore: "#",
  },
  {
    title: "Mary’s Café (Strawn, TX)",
    description: "Local legend for its massive chicken-fried steak.",
    imageUrl: images.marysCafe,
    learnMore: "#",
  },
  {
    title: "Downtown Stephenville",
    description:
      "Great for dining, shopping, and soaking up small-town charm.",
    imageUrl: images.downtownStephenville,
    learnMore: "#",
  },
  {
    title: "Eastland Antique Shops",
    description:
      "Multiple storefronts filled with vintage finds and Texas treasures.",
    imageUrl: images.eastlandAntiques,
    learnMore: "#",
  },
  {
    title: "W.K. Gordon Center",
    description:
      "Educational and visually immersive — guests often rave about it.",
    imageUrl: images.gordonCenter,
    learnMore: "#",
  },
];

const Activities = () => (
  <Layout>
    <PageHeader
      title="What to Do Nearby"
      description="Explore a curated selection of local outdoor adventures, family-friendly attractions, arts & culture, and our top off-site recommendations near Lone Ranger RV Park & Lodge."
      imageUrl={images.paloPinto}
    />

    <div className="section-container">
      <AttractionSection
        title="Outdoor Activities"
        color="bg-rvblue"
        activities={outdoorActivities}
      />
    </div>
    <SectionDivider />

    <div className="section-container bg-gray-50 rounded-xl">
      <AttractionSection
        title="Family Fun"
        color="bg-rvyellow"
        activities={familyFun}
      />
    </div>
    <SectionDivider />

    <div className="section-container">
      <AttractionSection
        title="Arts & Culture"
        color="bg-rvolive"
        activities={artsCulture}
      />
    </div>
    <SectionDivider />

    <div className="section-container bg-gray-50 rounded-xl mb-10">
      <FrontDeskRecommendations />
    </div>
  </Layout>
);

export default Activities;
