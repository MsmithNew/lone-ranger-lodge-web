
import React from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import EssentialAmenitiesSection from "@/components/amenities/EssentialAmenitiesSection";
import RecreationSection from "@/components/amenities/RecreationSection";
import SpecialFeaturesSection from "@/components/amenities/SpecialFeaturesSection";

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
    </Layout>
  );
};

export default Amenities;
