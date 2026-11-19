import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import VendorCard from "../../components/VendorCard";

const birthdayVendorCategories = [
  {
    name: "Venues",
    image: "/birthday venues.jpg",
    description: "Find the perfect venue for your birthday celebration.",
  },
  {
    name: "Decorators",
    image: "/birthday decorators.jpg",
    description: "Explore decorators for a festive birthday setup.",
  },
  {
    name: "Caterers",
    image: "/birthday caterers.jpg",
    description: "Discover caterers for food, treats, and birthday cakes.",
  },
  {
    name: "DJ'S",
    image: "/birthday dj.jpg",
    description: "Book a DJ to bring music and fun to your birthday party.",
  },
  {
    name: "Photographers",
    image: "/birthday photographers.jpg",
    description: "Find photographers to capture your birthday memories.",
  },
  {
    name: "Invitation Cards / Designers",
    image: "/birthday invitation card.jpg",
    description: "Find invitation designers for your birthday celebration.",
  },
  {
    name: "Choreographers",
    image: "/birthday choreographers.jpg",
    description: "Get choreography for a fun birthday performance.",
  },
  {
    name: "Gifts",
    image: "/birthday gifts.jpg",
    description: "Explore gift options for the birthday celebration.",
  },
  {
    name: "Entertainment",
    image: "/birthday entertainment.jpg",
    description: "Discover entertainment to make the party memorable.",
  },
];

const Birthday = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-[#fafafa] font-poppins text-[#30232B]">
      <Banner
        title="Birthday"
        image="/birthday.jpg"
        description="Plan a joyful birthday celebration with trusted event professionals for every special detail."
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
        <div className="mb-8">
          <h2 className="font-poppins text-[24px] font-semibold text-[#30232B] sm:text-[28px]">
            Birthday Vendors
          </h2>
          <p className="mt-2 text-sm text-[#756871] sm:text-base">
            Explore services and vendors to make your birthday memorable.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {birthdayVendorCategories.map((category, index) => (
            <VendorCard
              key={category.name}
              name={category.name}
              categoryLabel="Birthday Services"
              description={category.description}
              image={category.image}
              imageAlt={`${category.name} for birthday`}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Birthday;
