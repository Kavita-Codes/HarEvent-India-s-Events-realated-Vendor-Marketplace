import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import VendorCard from "../../components/VendorCard";

const corporateVendorCategories = [
  {
    name: "Corporate Event Planners",
    image: "/corporate event planner.jpg",
    description: "Find planners to organize your corporate event from start to finish.",
  },
  {
    name: "Corporate Venues",
    image: "/corporate venues.jpg",
    description: "Explore venues suited to meetings, launches, and company events.",
  },
  {
    name: "Conference & Meeting Halls",
    image: "/conference meeting halls.jpg",
    description: "Discover meeting halls for conferences and corporate gatherings.",
  },
  {
    name: "Hotels & Resorts",
    image: "/corporate hotels and resorts.jpg",
    description: "Find hotels and resorts for corporate events and retreats.",
  },
  {
    name: "Decorators",
    image: "/corporate decorators.jpg",
    description: "Browse decorators for polished corporate event spaces.",
  },
  {
    name: "Corporate Caterers",
    image: "/corporate caterers.jpg",
    description: "Explore catering services for your corporate guests.",
  },
  {
    name: "Photographers",
    image: "/corporate photographers.jpg",
    description: "Find photographers to capture key moments at your event.",
  },
  {
    name: "Videographers",
    image: "/corporate videographers.jpg",
    description: "Connect with videographers for corporate event coverage.",
  },
  {
    name: "DJs & Music",
    image: "/corporate dj and music.jpg",
    description: "Book DJs and music services for your corporate gathering.",
  },
  {
    name: "Live Bands & Singers",
    image: "/corporates live bands and singers.jpg",
    description: "Discover live bands and singers for your event.",
  },
  {
    name: "Anchors & Emcees",
    image: "/corporates anchors.jpg",
    description: "Find professional anchors and emcees to host your program.",
  },
  {
    name: "Entertainment Artists",
    image: "/corporate entertainment artist.jpg",
    description: "Explore entertainment artists for your corporate event.",
  },
  {
    name: "Stage Setup",
    image: "/corporate stage setup.jpg",
    description: "Plan a professional stage setup for presentations and events.",
  },
  {
    name: "Sound & Lighting",
    image: "/corporate sound and lighting.jpg",
    description: "Find sound and lighting teams for a smooth event experience.",
  },
  {
    name: "LED Wall & Screen Rentals",
    image: "/corporates led walls and screen rentals.jpg",
    description: "Rent LED walls and screens for presentations and showcases.",
  },
];

const CorporateEvents = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-[#fafafa] font-poppins text-[#30232B]">
      <Banner
        title="Corporate Events"
        image="/coporate.jpg"
        description="Plan successful corporate events with experienced professionals and services for every detail."
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
        <div className="mb-8">
          <h2 className="font-poppins text-[24px] font-semibold text-[#30232B] sm:text-[28px]">
            Corporate Event Vendors
          </h2>
          <p className="mt-2 text-sm text-[#756871] sm:text-base">
            Explore trusted services for your meetings, conferences, and company celebrations.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {corporateVendorCategories.map((category, index) => (
            <VendorCard
              key={category.name}
              name={category.name}
              categoryLabel="Corporate Services"
              description={category.description}
              image={category.image}
              imageAlt={`${category.name} for corporate events`}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default CorporateEvents;
