import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import VendorCard from "../../components/VendorCard";

const engagementVendorCategories = [
  {
    name: "Venues",
    image: "/wedding venues.jpg",
    description: "Find venues for your engagement celebration.",
  },
  {
    name: "Decorators",
    image: "/wedding decorators.jpg",
    description: "Explore decor for your engagement venue and celebration.",
  },
  {
    name: "Caterers",
    image: "/wedding caterers.jpg",
    description: "Discover catering options for your engagement guests.",
  },
  {
    name: "Makeup Artists",
    image: "/wedding makeup artist.jpg",
    description: "Browse makeup artists for your engagement look.",
  },
  {
    name: "Photographers",
    image: "/wedding photographers.jpg",
    description: "Find photographers to capture your engagement memories.",
  },
  {
    name: "Mehndi Artists",
    image: "/wedding mehndi artist.jpg",
    description: "Connect with mehndi artists for your engagement.",
  },
  {
    name: "DJ'S",
    image: "/wedding dj.jpg",
    description: "Book DJs for music and dancing at your engagement.",
  },
  {
    name: "Jewellery on Rent",
    image: "/wedding jwellery on rent.jpg",
    description: "Explore jewellery rental options for your engagement look.",
  },
  {
    name: "Invitation Cards / Designers",
    image: "/wedding invitation card.jpg",
    description: "Find designers for engagement invitations and stationery.",
  },
  {
    name: "Choreographers",
    image: "/wedding choreographers.jpg",
    description: "Get choreography for your engagement performances.",
  },
  {
    name: "Gifts",
    image: "/wedding gifts.jpg",
    description: "Find engagement gifts for your partner, family, and guests.",
  },
  {
    name: "Pandits",
    image: "/wedding pandits.jpg",
    description: "Connect with pandits for engagement rituals and ceremonies.",
  },
  {
    name: "Entertainment",
    image: "/wedding entertainment.jpg",
    description: "Explore entertainment options for your engagement.",
  },
  {
    name: "Rangoli Artists",
    image: "/wedding rangoli artist.jpg",
    description: "Find rangoli artists to decorate your engagement venue.",
  },
];

const Engagement = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-[#fafafa] font-poppins text-[#30232B]">
      <Banner
        title="Engagement"
        image="/engagement.jpg"
        description="Plan a memorable engagement with trusted event professionals and services for every detail."
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
        <div className="mb-8">
          <h2 className="font-poppins text-[24px] font-semibold text-[#30232B] sm:text-[28px]">
            Engagement Vendors
          </h2>
          <p className="mt-2 text-sm text-[#756871] sm:text-base">
            Explore services and vendors for every part of your engagement.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {engagementVendorCategories.map((category, index) => (
            <VendorCard
              key={category.name}
              name={category.name}
              categoryLabel="Engagement Services"
              description={category.description}
              image={category.image}
              imageAlt={`${category.name} engagement services`}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Engagement;
