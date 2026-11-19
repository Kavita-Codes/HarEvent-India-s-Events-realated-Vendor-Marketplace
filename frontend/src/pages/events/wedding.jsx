import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import VendorCard from "../../components/VendorCard";

const weddingVendorCategories = [
  {
    name: "Venues",
    image: "/wedding venues.jpg",
    description:
      "Find wedding venues for your ceremony, reception, and celebrations.",
  },
  {
    name: "Decorators",
    image: "/wedding decorators.jpg",
    description:
      "Explore decorators for mandaps, flowers, and wedding styling.",
  },
  {
    name: "Caterers",
    image: "/wedding caterers.jpg",
    description:
      "Discover caterers for wedding menus, feasts, and live counters.",
  },
  {
    name: "Makeup Artists",
    image: "/wedding makeup artist.jpg",
    description:
      "Browse makeup artists for bridal looks and wedding functions.",
  },
  {
    name: "Photographers",
    image: "/wedding photographers.jpg",
    description: "Find photographers to capture your wedding moments.",
  },
  {
    name: "Mehndi Artists",
    image: "/wedding mehndi artist.jpg",
    description: "Connect with mehndi artists for bridal and guest designs.",
  },
  {
    name: "DJ'S",
    image: "/wedding dj.jpg",
    description: "Book wedding DJs for music, dance, and celebrations.",
  },
  {
    name: "Jewellery on Rent",
    image: "/wedding jwellery on rent.jpg",
    description: "Explore jewellery rental options for wedding occasions.",
  },
  {
    name: "Invitation Cards / Designers",
    image: "/wedding invitation card.jpg",
    description: "Find invitation designers for your wedding stationery.",
  },
  {
    name: "Choreographers",
    image: "/wedding choreographers.jpg",
    description: "Get choreography for your sangeet and wedding performances.",
  },
  {
    name: "Groom Wear",
    image: "/wedding groom wear.jpg",
    description: "Browse groom wear for ceremonies and wedding celebrations.",
  },
  {
    name: "Bridal Wear",
    image: "/wedding bridal wear.jpg",
    description: "Discover bridal wear for your wedding and related functions.",
  },
  {
    name: "Honeymoon",
    image: "/wedding honeymoon.jpg",
    description: "Explore honeymoon planning and travel services.",
  },
  {
    name: "Gifts",
    image: "/wedding gifts.jpg",
    description: "Find wedding gifts and favors for family and guests.",
  },
  {
    name: "Pandits",
    image: "/wedding pandits.jpg",
    description: "Connect with pandits for wedding rituals and ceremonies.",
  },
  {
    name: "Rangoli Artists",
    image: "/wedding rangoli artist.jpg",
    description: "Find rangoli artists to decorate your wedding venue.",
  },
  {
    name: "Entertainment",
    image: "/wedding entertainment.jpg",
    description:
      "Explore entertainment options for your wedding celebrations.",
  },
];

const Wedding = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-[#fafafa] font-poppins text-[#30232B]">
      <Banner
        title="Wedding"
        image="/wedding.jpg"
        description="Plan a memorable wedding with trusted event professionals and services for every detail."
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
        <div className="mb-8">
          <h2 className="font-poppins text-[24px] font-semibold text-[#30232B] sm:text-[28px]">
            Wedding Vendors
          </h2>
          <p className="mt-2 text-sm text-[#756871] sm:text-base">
            Explore services and vendors for every part of your wedding.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {weddingVendorCategories.map((category, index) => (
            <VendorCard
              key={category.name}
              name={category.name}
              categoryLabel="Wedding Services"
              description={category.description}
              image={category.image}
              imageAlt={`${category.name} wedding services`}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Wedding;
