import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import VendorCard from "../../components/VendorCard";

const sangeetVendorCategories = [
  {
    name: "Venues",
    image: "/sangeet venues.jpg",
    description:
      "Find venues with space for your Sangeet performances and celebrations.",
  },
  {
    name: "Decorators",
    image: "/sangeet decorators.jpg",
    description:
      "Explore decorators for a colorful stage, dance floor, and Sangeet setup.",
  },
  {
    name: "Caterers",
    image: "/sangeet caterers.jpg",
    description:
      "Discover caterers for delicious food and live counters at your Sangeet.",
  },
  {
    name: "Makeup Artists",
    image: "/sangeet makeup artist.jpg",
    description:
      "Browse makeup artists for your Sangeet night look and celebrations.",
  },
  {
    name: "Photographers",
    image: "/wedding photographers.jpg",
    description:
      "Find photographers to capture every performance and Sangeet moment.",
  },
  {
    name: "Mehndi Artists",
    image: "/wedding mehndi artist.jpg",
    description:
      "Connect with mehndi artists for you and your guests before the Sangeet.",
  },
  {
    name: "DJ'S",
    image: "/wedding dj.jpg",
    description:
      "Book DJs to keep the music and dance going through your Sangeet.",
  },
  {
    name: "Jewellery on Rent",
    image: "/wedding jwellery on rent.jpg",
    description:
      "Explore jewellery rentals to complete your Sangeet outfit.",
  },
  {
    name: "Invitation Cards / Designers",
    image: "/wedding invitation card.jpg",
    description:
      "Find invitation designers for your Sangeet ceremony and celebrations.",
  },
  {
    name: "Choreographers",
    image: "/sangeet choreographers.jpg",
    description:
      "Get choreography for memorable Sangeet performances.",
  },
  {
    name: "Groom Wear",
    image: "/sangeet groom wear.jpg",
    description:
      "Browse groom wear for a stylish Sangeet celebration.",
  },
  {
    name: "Bridal Wear",
    image: "/sangeet bridal wear.jpg",
    description:
      "Discover bridal outfits for your Sangeet night.",
  },
  {
    name: "Entertainment",
    image: "/sangeet entertainment.jpg",
    description:
      "Explore performers and entertainment for your Sangeet celebration.",
  },
];

const SangeetCeremony = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-[#fafafa] font-poppins text-[#30232B]">
      <Banner
        title="Sangeet Ceremony"
        image="/sangeet.jpg"
        description="Plan an unforgettable Sangeet with trusted event professionals for music, dance, style, and every celebration detail."
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
        <div className="mb-8">
          <h2 className="font-poppins text-[24px] font-semibold text-[#30232B] sm:text-[28px]">
            Sangeet Ceremony Vendors
          </h2>
          <p className="mt-2 text-sm text-[#756871] sm:text-base">
            Explore services and vendors to bring your Sangeet celebration to life.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sangeetVendorCategories.map((category, index) => (
            <VendorCard
              key={category.name}
              name={category.name}
              categoryLabel="Sangeet Services"
              description={category.description}
              image={category.image}
              imageAlt={`${category.name} for Sangeet ceremony`}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default SangeetCeremony;
