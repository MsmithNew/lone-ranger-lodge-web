
import Layout from "@/components/Layout";
import RateCard from "@/components/RateCard";

const sectionTitleClass =
  "text-center font-display text-xl md:text-2xl font-bold mb-7 text-rvmaroon";

const Reservations = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto pt-8 pb-2 px-4">
        <h2 className="text-center text-lg font-bold text-rvmaroon mb-2">
          Fair, flexible rates for every kind of traveler
        </h2>
        <p className="text-center text-base text-gray-800 mb-8">
          Whether you're staying a night, a week, or the whole season, Lone Ranger RV Park &amp; Lodge offers competitive rates without sacrificing comfort, charm, or location.
        </p>
      </div>

      {/* RV Sites Section */}
      <section className="section-container pt-4 pb-0">
        <h3 className={sectionTitleClass}>RV Sites</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center">
          <RateCard
            title="Daily Rate"
            price="Starting at $45 / NIGHT"
            note="Includes full hookups and free Wi-Fi"
            highlightColor="bg-white text-rvmaroon"
            border="border-rvmaroon"
            buttonColor="bg-rvblue hover:bg-rvblue/90"
            className="bg-white"
          />
          <RateCard
            title="Weekly Rate"
            price="Starting at $250 / WEEK"
            note="Includes full hookups and free Wi-Fi"
            highlightColor="bg-white text-rvmaroon"
            border="border-rvmaroon"
            buttonColor="bg-rvblue hover:bg-rvblue/90"
            className="bg-white"
          />
          <RateCard
            title="Monthly Rate"
            price="Starting at $600 / MONTH"
            note="Includes Wi-Fi; utilities billed separately"
            highlightColor="bg-white text-rvmaroon"
            border="border-rvmaroon"
            buttonColor="bg-rvblue hover:bg-rvblue/90"
            className="bg-white"
          />
        </div>
      </section>

      {/* Horse Hotel Section */}
      <section className="section-container pt-2 pb-0">
        <h3 className={sectionTitleClass}>Horse Hotel Sites</h3>
        <div className="flex flex-wrap justify-center">
          <RateCard
            title="Horse Hotel Sites"
            price="Same rates as RV Sites"
            note="Includes full hookups + shaded horse stalls"
            highlightColor="bg-white text-rvmaroon"
            border="border-rvmaroon"
            buttonColor="bg-rvblue hover:bg-rvblue/90"
            className="bg-white"
          />
        </div>
      </section>

      {/* Lodges Section */}
      <section className="section-container pt-2 pb-8">
        <h3 className={sectionTitleClass}>Lodges</h3>
        <div className="flex flex-wrap justify-center">
          <RateCard
            title="Lodges"
            price="$175 / NIGHT"
            note="Private 1930s cabins with modern amenities"
            highlightColor="bg-white text-rvmaroon"
            border="border-rvmaroon"
            buttonColor="bg-rvblue hover:bg-rvblue/90"
            className="bg-white"
          />
        </div>
      </section>
    </Layout>
  );
};

export default Reservations;

