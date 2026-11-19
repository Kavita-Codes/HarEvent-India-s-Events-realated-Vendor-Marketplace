import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import VendorCard from "../../components/VendorCard";

const conferenceVendorCategories = [
  {
    name: "Conference Event Planners",
    image: "/conference event planner.jpg",
    description: "Find planners to coordinate your conference or seminar.",
  },
  {
    name: "Conference & Meeting Halls",
    image: "/conference meeting halls.jpg",
    description: "Explore meeting halls for conferences and seminars.",
  },
  {
    name: "Hotels & Resorts",
    image: "/conference hotels.jpg",
    description: "Discover hotels and resorts for your conference guests.",
  },
  {
    name: "Decorators",
    image: "/conference decorators.jpg",
    description: "Browse decorators for a professional event setting.",
  },
  {
    name: "Corporate Caterers",
    image: "/conference caterers.jpg",
    description: "Find caterers for conference meals and refreshments.",
  },
  {
    name: "Photographers",
    image: "/conference photographers.jpg",
    description: "Connect with photographers to document your event.",
  },
  {
    name: "Videographers",
    image: "/conference videographers.jpg",
    description: "Find videographers for conference and seminar coverage.",
  },
  {
    name: "Anchors & Emcees",
    image: "/conference anchors.jpg",
    description: "Book anchors and emcees to guide your event program.",
  },
  {
    name: "DJs & Music",
    image: "/conference dj.jpg",
    description: "Explore music and DJ services for your conference.",
  },
  {
    name: "Live Bands & Singers",
    image: "/conference singers.jpg",
    description: "Discover live music for conference receptions and events.",
  },
];

const ConferencesSeminars = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-[#fafafa] font-poppins text-[#30232B]">
      <Banner
        title="Conferences & Seminars"
        image="/conference.jpg"
        description="Organize a smooth and engaging conference or seminar with trusted event professionals."
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
        <div className="mb-8">
          <h2 className="font-poppins text-[24px] font-semibold text-[#30232B] sm:text-[28px]">
            Conference & Seminar Vendors
          </h2>
          <p className="mt-2 text-sm text-[#756871] sm:text-base">
            Explore services and vendors for every part of your conference or seminar.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {conferenceVendorCategories.map((category, index) => (
            <VendorCard
              key={category.name}
              name={category.name}
              categoryLabel="Conference Services"
              description={category.description}
              image={category.image}
              imageAlt={`${category.name} for conferences and seminars`}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default ConferencesSeminars;
