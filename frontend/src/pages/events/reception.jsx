import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import VendorCard from "../../components/VendorCard";

const receptionVendorCategories = [
  {
    name: "Venues",
    image: "/reception venues.jpg",
    description:
      "Find reception venues for your celebration, dinner, and guests.",
  },
  {
    name: "Decorators",
    image: "/reception decorators.jpg",
    description:
      "Explore decorators for reception stages, flowers, and venue styling.",
  },
  {
    name: "Caterers",
    image: "/reception caterers.jpg",
    description:
      "Discover caterers for reception menus, dining, and live counters.",
  },
  {
    name: "Makeup Artists",
    image: "/reception makeup artist.jpg",
    description:
      "Browse makeup artists for reception-ready looks and touch-ups.",
  },
  {
    name: "Photographers",
    image: "/reception photographers.jpg",
    description: "Find photographers to capture your reception memories.",
  },
  {
    name: "Mehndi Artists",
    image: "/reception mehndi artist.jpg",
    description: "Connect with mehndi artists for your reception celebration.",
  },
  {
    name: "DJ'S",
    image: "/reception dj.jpg",
    description: "Book DJs for reception music, dancing, and entertainment.",
  },
  {
    name: "Jewellery on Rent",
    image: "/reception jwellery on rent.jpg",
    description: "Explore jewellery rental options for your reception look.",
  },
  {
    name: "Invitation Cards / Designers",
    image: "/reception invitation cards.jpg",
    description: "Find designers for reception invitations and stationery.",
  },
  {
    name: "Choreographers",
    image: "/reception choreographers.jpg",
    description:
      "Get choreography for reception performances and special dances.",
  },
  {
    name: "Groom Wear",
    image: "/reception groom wear.jpg",
    description: "Browse groom outfits for your reception celebration.",
  },
  {
    name: "Bridal Wear",
    image: "/reception bridal wear.jpg",
    description: "Discover bridal outfits for your reception celebration.",
  },
  {
    name: "Gifts",
    image: "/reception gifts.jpg",
    description: "Find reception gifts and favors for family and guests.",
  },
  {
    name: "Rangoli Artists",
    image: "/reception rangoli artist.jpg",
    description: "Find rangoli artists to decorate your reception venue.",
  },
  {
    name: "Entertainment",
    image: "/reception entertainment.jpg",
    description: "Explore entertainment options for your reception.",
  },
];

const Reception = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-[#fafafa] font-poppins text-[#30232B]">
      <Banner
        title="Reception"
        image="/reception.jpg"
        description="Plan a memorable reception with trusted event professionals and services for every detail."
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
        <div className="mb-8">
          <h2 className="font-poppins text-[24px] font-semibold text-[#30232B] sm:text-[28px]">
            Reception Vendors
          </h2>
          <p className="mt-2 text-sm text-[#756871] sm:text-base">
            Explore services and vendors for every part of your reception.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {receptionVendorCategories.map((category, index) => (
            <VendorCard
              key={category.name}
              name={category.name}
              categoryLabel="Reception Services"
              description={category.description}
              image={category.image}
              imageAlt={`${category.name} reception services`}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Reception;
