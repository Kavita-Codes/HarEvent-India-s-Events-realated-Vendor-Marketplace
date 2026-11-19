import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import VendorCard from "../../components/VendorCard";

const namingCeremonyVendorCategories = [
  {
    name: "Venues",
    image: "/baby shower venues.jpg",
    description:
      "Find welcoming venues for your baby's naming ceremony.",
  },
  {
    name: "Decorators",
    image: "/baby shower decorators.jpg",
    description:
      "Explore decorators for a beautiful naming ceremony setup.",
  },
  {
    name: "Caterers",
    image: "/baby shower caterers.jpg",
    description:
      "Discover caterers for meals and refreshments at your celebration.",
  },
  {
    name: "Makeup Artists",
    image: "/baby shower makeup artist.jpg",
    description:
      "Browse makeup artists for your special ceremony look.",
  },
  {
    name: "Photographers",
    image: "/baby shower photographers.jpg",
    description:
      "Find photographers to capture your family's naming ceremony moments.",
  },
  {
    name: "Mehndi Artists",
    image: "/baby shower mehndi artist.jpg",
    description:
      "Connect with mehndi artists for you and your guests.",
  },
  {
    name: "Rangoli Artists",
    image: "/baby shower rangoli.jpg",
    description:
      "Find rangoli artists to add a festive touch to your venue.",
  },
  {
    name: "Jewellery on Rent",
    image: "/baby shower jwellery on rent.jpg",
    description:
      "Explore jewellery rentals to complete your celebration outfit.",
  },
  {
    name: "Invitation Cards / Designers",
    image: "/baby shower invitation cards.jpg",
    description:
      "Find invitation designers for your naming ceremony.",
  },
  {
    name: "Entertainment",
    image: "/baby shower entertainment.jpg",
    description:
      "Explore entertainment options for your family celebration.",
  },
];

const NamingCeremony = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-[#fafafa] font-poppins text-[#30232B]">
      <Banner
        title="Naming Ceremony"
        image="/naming.jpg"
        description="Celebrate your baby's naming ceremony with trusted event professionals and services for every special detail."
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
        <div className="mb-8">
          <h2 className="font-poppins text-[24px] font-semibold text-[#30232B] sm:text-[28px]">
            Naming Ceremony Vendors
          </h2>
          <p className="mt-2 text-sm text-[#756871] sm:text-base">
            Explore services and vendors for a joyful naming ceremony.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {namingCeremonyVendorCategories.map((category, index) => (
            <VendorCard
              key={category.name}
              name={category.name}
              categoryLabel="Naming Ceremony Services"
              description={category.description}
              image={category.image}
              imageAlt={`${category.name} for naming ceremony`}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default NamingCeremony;
