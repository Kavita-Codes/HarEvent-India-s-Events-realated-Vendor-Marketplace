import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Camera,
  ChefHat,
  Gift,
  Heart,
  MapPin,
  Music,
  Palette,
  PartyPopper,
  Plane,
  Shirt,
  Sparkles,
  Users,
} from "lucide-react";
import Banner from "../components/Banner";
import EventVendorChecklistModal from "../components/EventVendorChecklistModal";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { vendorCategoryNames } from "../data/vendorCategories";
import { vendorListings } from "../data/vendorListings";
import { vendorSubcategories } from "../data/vendorSubcategories";

const categoryIcons = {
  Venues: MapPin,
  Decorators: Sparkles,
  Caterers: ChefHat,
  "Makeup Artists": Palette,
  Photographers: Camera,
  "Mehndi Artists": Heart,
  "DJ'S": Music,
  "Jewellery on Rent": Gift,
  "Invitation Cards / Designers": Gift,
  Choreographers: PartyPopper,
  "Groom Wear": Shirt,
  "Bridal Wear": Shirt,
  Honeymoon: Plane,
  Gifts: Gift,
  Entertainment: Users,
  Pandits: Sparkles,
  "Rangoli Artists": Palette,
  "Corporate Venues": Building2,
};

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
const categoryCards = [
  {
    name: "All Vendors",
    image: "/Joyful Indian Family Celebration.png",
    icon: BriefcaseBusiness,
    isAll: true,
  },
  ...vendorCategoryNames.map((name) => ({
    name,
    image:
      vendorListings.find(
        (vendor) => normalize(vendor.serviceType) === normalize(name),
      )?.portfolioImage || "/wedding.jpg",
    icon: categoryIcons[name] || BriefcaseBusiness,
    isAll: false,
  })),
];

function VendorCategoryCard({ category, onSelect }) {
  const Icon = category.icon;

  return (
    <button
      type="button"
      onClick={(clickEvent) => onSelect(category, clickEvent.currentTarget)}
      aria-label={`Choose vendors for ${category.name}`}
      aria-haspopup="dialog"
      className="group relative isolate flex aspect-[1.5/1] w-full cursor-pointer overflow-hidden rounded-[22px] bg-[#30232B] text-left shadow-[0_5px_18px_rgba(0,0,0,0.10)] ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(48,35,43,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A]"
    >
      <img
        src={category.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(20,18,18,0.75) 0%, rgba(25,23,22,0.55) 30%, rgba(0,0,0,0.20) 72%, rgba(0,0,0,0.05) 100%)",
        }}
      />
      <div className="mt-auto flex w-full items-center gap-2 px-3 py-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF2E8] text-[#D4145A] shadow-[0_3px_12px_rgba(0,0,0,0.18)] ring-1 ring-white/60">
          <Icon className="h-4 w-4" strokeWidth={1.9} />
        </span>
        <h2
          title={category.name}
          className="min-w-0 flex-1 truncate font-playfair text-[15px] font-bold leading-tight text-white drop-shadow-sm sm:text-base"
        >
          {category.name}
        </h2>
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/70 text-white/95 transition-[background-color,border-color,transform] duration-300 group-hover:translate-x-1 group-hover:bg-gradient-to-r from-[#D4145A] to-[#FF7628]"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.9} />
        </span>
      </div>
    </button>
  );
}

export default function VendorCategoryLanding({
  onChecklistVisibilityChange,
}) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [modalOpener, setModalOpener] = useState(null);

  const checklistCategories = activeCategory
    ? activeCategory.isAll
      ? vendorCategoryNames
      : vendorSubcategories[activeCategory.name] || [activeCategory.name]
    : [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white font-poppins text-[#30232B]">
        <Banner title="India's Most Trusted Online Vendor Marketplace" />
        <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
          <h1 className="mb-8 font-poppins text-[24px] font-semibold text-[#30232B] sm:mb-9 sm:text-[28px]">
            Top Vendor Categories
          </h1>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryCards.map((category) => (
              <VendorCategoryCard
                key={category.name}
                category={category}
                onSelect={(selectedCategory, opener) => {
                  setActiveCategory(selectedCategory);
                  setModalOpener(opener);
                }}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
      {activeCategory && (
        <EventVendorChecklistModal
          key={activeCategory.name}
          vendorCategory={activeCategory.isAll ? null : activeCategory.name}
          filterSubcategories={Boolean(
            vendorSubcategories[activeCategory.name],
          )}
          checklistCategories={checklistCategories}
          directoryCategories={vendorCategoryNames}
          checklistIcon={activeCategory.icon}
          opener={modalOpener}
          onClose={() => setActiveCategory(null)}
          onVisibilityChange={onChecklistVisibilityChange}
        />
      )}
    </>
  );
}
