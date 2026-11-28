import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import VendorCard from "../../components/VendorCard";

const ceremonyBabyShowerVendorCategories = [
  {
    name: "Venues",
    image: "/baby shower venues.jpg",
    description:
      "Find welcoming venues for your naming ceremony or baby shower celebration.",
  },
  {
    name: "Decorators",
    image: "/baby shower decorators.jpg",
    description:
      "Explore decorators for a beautiful naming ceremony or baby shower setup.",
  },
  {
    name: "Caterers",
    image: "/baby shower caterers.jpg",
    description:
      "Discover caterers for treats, meals, and celebration favorites.",
  },
  {
    name: "Makeup Artists",
    image: "/baby shower makeup artist.jpg",
    description:
      "Browse makeup artists for your special celebration look.",
  },
  {
    name: "Photographers",
    image: "/baby shower photographers.jpg",
    description:
      "Find photographers to capture joyful naming ceremony and baby shower moments.",
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
      "Find invitation designers for your naming ceremony or baby shower celebration.",
  },
  {
    name: "Entertainment",
    image: "/baby shower entertainment.jpg",
    description:
      "Explore entertainment options to make your celebration memorable.",
  },
];

const CeremonyBabyShower = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-[#fafafa] font-poppins text-[#30232B]">
      <Banner
        title="Naming Ceremony/Baby Shower"
        image="/babyshower.jpg"
        description="Plan a joyful naming ceremony or baby shower with trusted event professionals for every special detail."
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
        <div className="mb-8">
          <h2 className="font-poppins text-[24px] font-semibold text-[#30232B] sm:text-[28px]">
            Naming Ceremony/Baby Shower Vendors
          </h2>
          <p className="mt-2 text-sm text-[#756871] sm:text-base">
            Explore services and vendors to make your naming ceremony or baby
            shower memorable.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ceremonyBabyShowerVendorCategories.map((category, index) => (
            <VendorCard
              key={category.name}
              name={category.name}
              categoryLabel="Naming Ceremony/Baby Shower Services"
              description={category.description}
              image={category.image}
              imageAlt={`${category.name} for Naming Ceremony/Baby Shower`}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default CeremonyBabyShower;
