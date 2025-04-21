
import { styles, featureCards } from "@/data/amenitiesData";
import EssentialAmenityCard from "@/components/EssentialAmenityCard";

const SpecialFeaturesSection = () => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center max-w-6xl mx-auto">
        {featureCards.map(({ image, title, description }) => (
          <div key={title} className="w-full">
            <EssentialAmenityCard
              image={image}
              title={title}
              description={description}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialFeaturesSection;
