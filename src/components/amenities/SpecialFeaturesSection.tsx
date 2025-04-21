
import { styles, featureCards } from "@/data/amenitiesData";
import EssentialAmenityCard from "@/components/EssentialAmenityCard";

const SpecialFeaturesSection = () => {
  // Add the new card to the existing features
  const allFeatureCards = [
    ...featureCards,
    {
      image: "/outdoor-gathering.jpg", // This image should be added to public folder
      title: "Outdoor Gathering Area",
      description: "Every evening, guests gather near our shaded lawn for conversation, stargazing, and unplugged relaxation."
    }
  ];

  return (
    <section
      className="section-container"
      style={{ background: styles.lightBg, borderRadius: 18 }}
    >
      <div className="text-center mb-10">
        <h2 className="section-title" style={{ color: styles.maroon }}>
          Special Features
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {allFeatureCards.map(({ image, title, description }) => (
          <div key={title} className="w-full">
            <div className="w-full max-w-sm mx-auto">
              <EssentialAmenityCard
                image={image}
                title={title}
                description={description}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialFeaturesSection;
