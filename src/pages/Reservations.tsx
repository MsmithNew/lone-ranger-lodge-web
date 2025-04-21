
import RateCard from "@/components/RateCard";
import SectionDivider from "@/components/SectionDivider";
import { toast } from "sonner";

// No hero or h1, just a section-style intro
const Reservations = () => {
  return (
    <main>
      <section className="section-container max-w-screen-md mx-auto pb-2">
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-display mb-2 text-rvmaroon">Fair, flexible rates for every kind of traveler</h2>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            Whether you're staying a night, a week, or the whole season, Lone Ranger RV Park &amp; Lodge offers competitive rates without sacrificing comfort, charm, or location.
          </p>
        </div>
      </section>

      <section className="section-container pt-2">
        <h3 className="text-xl md:text-2xl font-display mb-6 text-rvblue">RV Sites</h3>
        <div className="flex flex-wrap gap-x-6 gap-y-6 justify-center mb-8">
          <RateCard
            title="Daily Rate"
            price="Starting at $45 / NIGHT"
            note="Includes full hookups and free Wi-Fi"
            highlightColor="bg-rvred text-white"
            buttonColor="bg-rvblue hover:bg-rvblue/90"
            border="border-rvred"
          />
          <RateCard
            title="Weekly Rate"
            price="Starting at $250 / WEEK"
            note="Includes full hookups and free Wi-Fi"
            highlightColor="bg-rvyellow text-rvmaroon"
            buttonColor="bg-rvred hover:bg-rvred/90"
            border="border-rvyellow"
          />
          <RateCard
            title="Monthly Rate"
            price="Starting at $600 / MONTH"
            note="Includes Wi-Fi; utilities billed separately"
            highlightColor="bg-rvolive text-white"
            buttonColor="bg-rvmaroon hover:bg-rvmaroon/80"
            border="border-rvolive"
          />
        </div>
      </section>

      <SectionDivider />

      <section className="section-container pt-2">
        <h3 className="text-xl md:text-2xl font-display mb-6 text-rvmaroon">Horse Hotel Sites</h3>
        <div className="flex flex-wrap justify-center mb-8">
          <RateCard
            title="Horse Hotel Sites"
            price="Same rates as RV Sites"
            note="Includes full hookups + shaded horse stalls"
            highlightColor="bg-rvblue text-white"
            buttonColor="bg-rvyellow text-rvmaroon hover:bg-rvyellow/90"
            border="border-rvblue"
          />
        </div>
      </section>

      <SectionDivider />

      <section className="section-container pt-2">
        <h3 className="text-xl md:text-2xl font-display mb-6 text-rvred">Lodges</h3>
        <div className="flex flex-wrap justify-center mb-8">
          <RateCard
            title="Lodges"
            price="$175 / NIGHT"
            note="Private 1930s cabins with modern amenities"
            highlightColor="bg-rvmaroon text-white"
            buttonColor="bg-rvblue hover:bg-rvblue/90"
            border="border-rvmaroon"
          />
        </div>
      </section>
    </main>
  );
};

export default Reservations;
