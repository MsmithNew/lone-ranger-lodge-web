
import { recreationAmenities } from "@/data/amenitiesData";
import AmenityBlock from "@/components/AmenityBlock";

const RecreationSection = () => {
  return (
    <section className="section-container bg-white rounded-2xl">
      <div className="text-center mb-10">
        <h2 className="section-title" style={{ color: "#804F58" }}>
          Recreation &amp; Activities
        </h2>
      </div>
      <div className="flex flex-col gap-8">
        {recreationAmenities.map(({ image, title, description }, idx) => (
          <AmenityBlock
            key={title}
            image={image}
            title={title}
            description={description}
            reverse={idx % 2 !== 0}
            alternateBg={idx % 2 === 1}
            showDivider={idx !== recreationAmenities.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default RecreationSection;
