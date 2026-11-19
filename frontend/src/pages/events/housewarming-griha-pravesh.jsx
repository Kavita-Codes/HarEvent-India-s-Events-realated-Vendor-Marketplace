import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import VendorCard from "../../components/VendorCard";

const housewarmingVendorCategories = [
  {
    name: "Decorators",
    image: "/wedding decorators.jpg",
    description: "Find decorators to make your new home celebration special.",
  },
  {
    name: "Caterers",
    image: "/wedding caterers.jpg",
    description: "Explore caterers for your Griha Pravesh gathering.",
  },
  {
    name: "Makeup Artists",
    image: "/wedding makeup artist.jpg",
    description: "Browse makeup artists for your housewarming celebration.",
  },
  {
    name: "Photographers",
    image: "/wedding photographers.jpg",
    description: "Find photographers to capture your family's new beginning.",
  },
  {
    name: "Mehndi Artists",
    image: "/wedding mehndi artist.jpg",
    description: "Connect with mehndi artists for you and your guests.",
  },
  {
    name: "Invitation Cards / Designers",
    image: "/wedding invitation card.jpg",
    description: "Find invitation designers for your housewarming ceremony.",
  },
  {
    name: "Gifts",
    image: "/wedding gifts.jpg",
    description: "Explore thoughtful gifts for your new home celebration.",
  },
  {
    name: "Pandits",
    image: "/wedding pandits.jpg",
    description: "Connect with pandits for Griha Pravesh rituals and puja.",
  },
  {
    name: "Rangoli Artists",
    image: "/wedding rangoli artist.jpg",
    description: "Find rangoli artists to welcome guests to your new home.",
  },
  {
    name: "Entertainment",
    image: "/wedding entertainment.jpg",
    description: "Explore entertainment options for your housewarming party.",
  },
];

const HousewarmingGrihaPravesh = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-[#fafafa] font-poppins text-[#30232B]">
      <Banner
        title="Housewarming / Griha Pravesh"
        image="/grihpravesh.jpg"
        description="Celebrate your new home with trusted event professionals and services for every special detail."
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
        <div className="mb-8">
          <h2 className="font-poppins text-[24px] font-semibold text-[#30232B] sm:text-[28px]">
            Housewarming Vendors
          </h2>
          <p className="mt-2 text-sm text-[#756871] sm:text-base">
            Explore services and vendors for your housewarming and Griha Pravesh.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {housewarmingVendorCategories.map((category, index) => (
            <VendorCard
              key={category.name}
              name={category.name}
              categoryLabel="Housewarming Services"
              description={category.description}
              image={category.image}
              imageAlt={`${category.name} for housewarming`}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default HousewarmingGrihaPravesh;
