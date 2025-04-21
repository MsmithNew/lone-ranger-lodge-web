
import Layout from "@/components/Layout";
import RateCard from "@/components/RateCard";
import SectionDivider from "@/components/SectionDivider";

const sectionTitleClass =
  "text-center text-2xl md:text-3xl font-bold mb-7 text-[#804F58] font-display";

const Reservations = () => (
  <Layout>
    {/* Hero Banner: Left-aligned, matching site-wide style */}
    <div className="relative bg-gradient-to-b from-rvblue/10 to-white py-10 md:py-16 mb-4">
      <div className="section-container relative z-10 flex flex-col items-start">
        <h1 className="page-title mb-2 text-left">Reservations &amp; Rates</h1>
        <p className="text-base md:text-lg max-w-xl text-gray-700 mb-2 text-left">
          Whether you're staying a night, a week, or the whole season, Lone Ranger RV Park &amp; Lodge offers competitive rates without sacrificing comfort, charm, or location.
        </p>
      </div>
    </div>

    {/* RV Sites Section */}
    <section className="section-container pt-2 pb-2">
      <h3 className={sectionTitleClass}>RV Sites</h3>
      <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center">
        <RateCard
          label="Daily Rate"
          price="$45 / NIGHT"
          note="Includes full hookups and free Wi-Fi"
        />
        <RateCard
          label="Weekly Rate"
          price="$250 / WEEK"
          note="Includes full hookups and free Wi-Fi"
        />
        <RateCard
          label="Monthly Rate"
          price="$600 / MONTH"
          note="Includes Wi-Fi; utilities billed separately"
        />
      </div>
    </section>

    <SectionDivider className="my-2" />

    {/* Horse Hotel Sites Section */}
    <section className="section-container pt-2 pb-2">
      <h3 className={sectionTitleClass}>Horse Hotel Sites</h3>
      <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center">
        <RateCard
          label="Daily Rate"
          price="$45 / NIGHT"
          note="Includes full hookups + shaded horse stalls"
        />
        <RateCard
          label="Weekly Rate"
          price="$250 / WEEK"
          note="Includes full hookups + shaded horse stalls"
        />
        <RateCard
          label="Monthly Rate"
          price="$600 / MONTH"
          note="Includes full hookups + shaded horse stalls"
        />
      </div>
    </section>

    <SectionDivider className="my-2" />

    {/* Lodges Section */}
    <section className="section-container pt-2 pb-2">
      <h3 className={sectionTitleClass}>Lodges</h3>
      <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center">
        <RateCard
          label="Nightly Rate"
          price="$175 / NIGHT"
          note="Private 1930s cabins with modern amenities"
        />
      </div>
    </section>

    <SectionDivider className="my-2" />

    {/* Tents Section */}
    <section className="section-container pt-2 pb-8">
      <h3 className={sectionTitleClass}>Tents</h3>
      <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center">
        <RateCard
          label="Daily Rate"
          price="$25 / NIGHT"
          note="Shaded tent spaces with access to restrooms and Wi-Fi"
        />
        <RateCard
          label="Weekly Rate"
          price="$75 / WEEK"
          note="Great for multi-day outdoor stays with nearby amenities"
        />
      </div>
    </section>
  </Layout>
);

export default Reservations;

