import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import VendorCard from "../../components/VendorCard";

const anniversaryVendorCategories = [
  {
    name: "Venues",
    image: "/wedding venues.jpg",
    description: "Find a venue to celebrate your anniversary together.",
  },
  {
    name: "Decorators",
    image: "/wedding decorators.jpg",
    description: "Explore decor to make your anniversary celebration special.",
  },
  {
    name: "Caterers",
    image: "/wedding caterers.jpg",
    description: "Discover catering options for your anniversary gathering.",
  },
  {
    name: "Makeup Artists",
    image: "/wedding makeup artist.jpg",
    description: "Browse makeup artists for your anniversary celebration.",
  },
  {
    name: "Photographers",
    image: "/wedding photographers.jpg",
    description: "Find photographers to capture your anniversary memories.",
  },
  {
    name: "Mehndi Artists",
    image: "/wedding mehndi artist.jpg",
    description: "Connect with mehndi artists for your anniversary.",
  },
  {
    name: "DJ'S",
    image: "/wedding dj.jpg",
    description: "Book DJs for music and dancing at your anniversary party.",
  },
  {
    name: "Gifts",
    image: "/wedding gifts.jpg",
    description: "Find thoughtful anniversary gifts for your loved one.",
  },
  {
    name: "Invitation Cards / Designers",
    image: "/wedding invitation card.jpg",
    description: "Find designers for anniversary invitations and stationery.",
  },
  {
    name: "Choreographers",
    image: "/wedding choreographers.jpg",
    description: "Get choreography for a special anniversary performance.",
  },
  {
    name: "Rangoli Artists",
    image: "/wedding rangoli artist.jpg",
    description: "Find rangoli artists to decorate your anniversary venue.",
  },
  {
    name: "Entertainment",
    image: "/wedding entertainment.jpg",
    description: "Explore entertainment options for your anniversary.",
  },
];

const Anniversary = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-[#fafafa] font-poppins text-[#30232B]">
      <Banner
        title="Anniversary"
        image="/anniversary.jpg"
        description="Plan a memorable anniversary with trusted event professionals and services for every detail."
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
        <div className="mb-8">
          <h2 className="font-poppins text-[24px] font-semibold text-[#30232B] sm:text-[28px]">
            Anniversary Vendors
          </h2>
          <p className="mt-2 text-sm text-[#756871] sm:text-base">
            Explore services and vendors for every part of your anniversary.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {anniversaryVendorCategories.map((category, index) => (
            <VendorCard
              key={category.name}
              name={category.name}
              categoryLabel="Anniversary Services"
              description={category.description}
              image={category.image}
              imageAlt={`${category.name} anniversary services`}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Anniversary;
