
import React from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import EssentialAmenitiesSection from "@/components/amenities/EssentialAmenitiesSection";
import RecreationSection from "@/components/amenities/RecreationSection";
import SpecialFeaturesSection from "@/components/amenities/SpecialFeaturesSection";
import CTABanner from "@/components/CTABanner";

const Amenities = () => {
  return (
    <Layout>
      <PageHeader
        title="Amenities &amp; Features"
        description="Real comfort and memorable experiences — discover what makes Lone Ranger RV Park &amp; Lodge the perfect getaway."
      />
      <EssentialAmenitiesSection />
      <SectionDivider />
      <RecreationSection />
      <SectionDivider />
      <SpecialFeaturesSection />
      <CTABanner 
        title="Ready to experience our amenities?"
        description="Book your stay at Lone Ranger RV Park & Lodge and enjoy all the amenities and features we have to offer."
        buttonText="Book Now"
        buttonLink="/reservations"
        linkType="internal"
      />
    </Layout>
  );
};

export default Amenities;
