
import { styles, featureCards } from "@/data/amenitiesData";
import EssentialAmenityCard from "@/components/EssentialAmenityCard";

const SpecialFeaturesSection = () => {
  // Calculate number of cards needed to complete the last row
  const totalCards = featureCards.length;
  const cardsNeededForLastRow = totalCards % 3 === 0 ? 0 : 3 - (totalCards % 3);
  
  // Create placeholder cards if needed to maintain grid symmetry
  const placeholderCards = Array(cardsNeededForLastRow).fill(null).map((_, idx) => ({
    image: "",
    title: "",
    description: "",
    isPlaceholder: true
  }));

  const allCards = [...featureCards, ...placeholderCards];

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
        {allCards.map((card, idx) => (
          card.isPlaceholder ? (
            <div key={`placeholder-${idx}`} className="invisible w-full h-full" />
          ) : (
            <div key={card.title} className="w-full h-full">
              <EssentialAmenityCard
                image={card.image}
                title={card.title}
                description={card.description}
              />
            </div>
          )
        ))}
      </div>
    </section>
  );
};

export default SpecialFeaturesSection;
