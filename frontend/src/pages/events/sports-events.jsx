import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import VendorCard from "../../components/VendorCard";

const sportsVendorCategories = [
  {
    name: "Sports Event Planners",
    description:
      "Find teams for tournament planning, match-day coordination, and fan experiences.",
  },
  {
    name: "Sports Venues",
    description:
      "Explore sports grounds and arenas for tournaments, team events, and community games.",
  },
];

const SportsEvents = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-[#fafafa] font-poppins text-[#30232B]">
      <Banner
        title="Sports Events"
        image="/sports.jpg"
        description="Plan tournaments and sports gatherings with event professionals and venues."
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
        <div className="mb-8">
          <h2 className="font-poppins text-[24px] font-semibold text-[#30232B] sm:text-[28px]">
            Sports Event Vendors
          </h2>
          <p className="mt-2 text-sm text-[#756871] sm:text-base">
            Explore planning support and venues for your sports event.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sportsVendorCategories.map((category, index) => (
            <VendorCard
              key={category.name}
              name={category.name}
              categoryLabel="Sports Services"
              description={category.description}
              image="/sports.jpg"
              imageAlt={`${category.name} for sports events`}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default SportsEvents;
