
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import OutdoorActivities from "@/components/activities/OutdoorActivities";
import FamilyActivities from "@/components/activities/FamilyActivities";
import CulturalActivities from "@/components/activities/CulturalActivities";
import SeasonalEvents from "@/components/activities/SeasonalEvents";
import StaffRecommendations from "@/components/activities/StaffRecommendations";
import AdventureBanner from "@/components/activities/AdventureBanner";

const Activities = () => {
  return (
    <Layout>
      <PageHeader
        title="What to Do Nearby"
        description="Discover local attractions and activities within a short drive of Lone Ranger RV Park & Lodge."
        imageUrl="/placeholder.svg"
      />
      
      <OutdoorActivities />
      <SectionDivider />
      <FamilyActivities />
      <SectionDivider />
      <CulturalActivities />
      <SectionDivider />
      <SeasonalEvents />
      <SectionDivider />
      <StaffRecommendations />
      <AdventureBanner />
    </Layout>
  );
};

export default Activities;
