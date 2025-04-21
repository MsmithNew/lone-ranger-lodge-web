
import Layout from "@/components/Layout";
import RateCard from "@/components/RateCard";
import SectionDivider from "@/components/SectionDivider";

const sectionTitleClass =
  "text-center font-display text-2xl md:text-3xl font-bold mb-7 text-rvmaroon";

const Reservations = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-b from-rvblue/10 to-white py-10 md:py-14 mb-4">
        <div className="section-container relative z-10 flex flex-col items-center">
          <h1 className="page-title mb-2">Reservations &amp; Rates</h1>
          <p className="text-base md:text-lg max-w-xl text-gray-700 text-center">
            Whether you're staying a night, a week, or the whole season, Lone Ranger RV Park &amp; Lodge offers competitive rates without sacrificing comfort, charm, or location.
          </p>
        </div>
      </div>

      {/* RV Sites Section */}
      <section className="section-container pt-4 pb-0">
        <h3 className={sectionTitleClass}>RV Sites</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center">
          <RateCard
            label="Daily Rate"
            price="Starting at $45 / NIGHT"
            note="Includes full hookups and free Wi-Fi"
          />
          <RateCard
            label="Weekly Rate"
            price="Starting at $250 / WEEK"
            note="Includes full hookups and free Wi-Fi"
          />
          <RateCard
            label="Monthly Rate"
            price="Starting at $600 / MONTH"
            note="Includes Wi-Fi; utilities billed separately"
          />
        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider className="my-2" />

      {/* Horse Hotel Section */}
      <section className="section-container pt-4 pb-0">
        <h3 className={sectionTitleClass}>Horse Hotel Sites</h3>
        <div className="flex flex-wrap justify-center">
          <RateCard
            label="Horse Hotel Sites"
            price="Same rates as RV Sites"
            note="Includes full hookups + shaded horse stalls"
          />
        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider className="my-2" />

      {/* Lodges Section */}
      <section className="section-container pt-4 pb-8">
        <h3 className={sectionTitleClass}>Lodges</h3>
        <div className="flex flex-wrap justify-center">
          <RateCard
            label="Lodges"
            price="$175 / NIGHT"
            note="Private 1930s cabins with modern amenities"
          />
        </div>
      </section>
    </Layout>
  );
};

export default Reservations;
