import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { vendorListings as vendors } from "../data/vendorListings";
import {
  EASE_OUT,
  VendorCard,
  EmptyVendorCard,
} from "./Card";

const filters = [
  "All",
  "Photography",
  "Decor",
  "Venues",
  "Catering",
  "Entertainment",
];

export default function PopularVendors() {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleVendors = vendors.filter(
    (vendor) =>
      activeFilter === "All" ||
      (vendor.filterCategory || vendor.category)
        .toLowerCase()
        .includes(activeFilter.toLowerCase()),
  );

  return (
    /* reducedMotion="user" lets every motion prop below fall back to a
       transform-free state for visitors who ask for less animation */
    <MotionConfig reducedMotion="user">
      <section className="bg-white px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <style>{`
          /* Idle Ken Burns breathing: animates transform only, so the hover
             scale utility multiplies on top of it instead of fighting it */
          .vendor-kb {
            animation: vendor-kenburns 18s ease-in-out infinite alternate;
          }

          @keyframes vendor-kenburns {
            from {
              transform: scale(1) translate3d(0, 0, 0);
            }
            to {
              transform: scale(1.06) translate3d(-1.5%, -1.5%, 0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .vendor-kb {
              animation: none;
            }
          }
        `}</style>

        <div className="mx-auto max-w-[1440px]">
          <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[1.5px] text-[#D4145A]">
                <span className="h-[2px] w-6 bg-[#D4145A]" />
                Featured Professionals
              </p>

              <h2 className="font-playfair text-[36px] font-bold leading-tight tracking-tight text-[#30232B]">
                Popular Vendors
              </h2>

              <p className="mt-2 text-[16px] leading-6 text-[#8A7580]">
                Explore trusted event professionals near you.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={activeFilter === filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-[12px] font-semibold transition ${
                      activeFilter === filter
                        ? "border-transparent bg-gradient-to-r from-[#D4145A] to-[#FF7628] text-white"
                        : "border-[#F1DDE5] bg-white text-[#78646E] hover:border-[#D4145A] hover:text-[#D4145A]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <Link
                to="/vendor-categories"
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-5 text-[12px] font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-105"
              >
                View All Vendors <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Filtering cross-fades the grid instead of snapping to a new list */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {visibleVendors.length > 0
                ? visibleVendors.map((vendor, index) => (
                    <VendorCard key={vendor.id} vendor={vendor} index={index} />
                  ))
                : [1, 2, 3, 4].map((slot) => (
                    <EmptyVendorCard key={slot} category={activeFilter} />
                  ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </MotionConfig>
  );
}
