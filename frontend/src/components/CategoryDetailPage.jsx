import {
  BadgeCheck,
  CalendarHeart,
  MapPin,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CategoryCard from "./CategoryCard";
import CategoryFAQ from "./CategoryFAQ";
import EventVendorBrowser from "./EventVendorBrowser";

export default function CategoryDetailPage({
  category,
  relatedItems,
  eventVendors = [],
  mode,
  directoryHref,
  relatedHeading,
}) {
  const reducedMotion = useReducedMotion();
  const isEvent = mode === "event";
  const faqMode = isEvent ? "events" : "vendors";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fffaf6] font-poppins text-[#30232B]">
        <section className="relative isolate min-h-[440px] overflow-hidden bg-[#21151f] text-white sm:min-h-[520px]">
          <img
            src={category.image}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(29,17,28,0.96)_0%,rgba(37,19,33,0.82)_48%,rgba(32,16,26,0.28)_100%)]" />
          <div className="absolute -right-12 top-16 -z-10 hidden h-[360px] w-[35%] -skew-x-12 border-l border-white/15 lg:block" />
          <div className="absolute -right-4 top-28 -z-10 hidden h-[260px] w-[25%] -skew-x-12 border-l border-[#ffb47f]/20 lg:block" />

          <div className="mx-auto flex min-h-[440px] max-w-[1440px] items-center px-5 py-16 sm:min-h-[520px] sm:px-8 lg:px-14">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[720px]"
            >
              <Link
                to={directoryHref}
                className="mb-7 inline-flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:text-white"
              >
                Back to {isEvent ? "events" : "vendor categories"}
              </Link>
              <span className="text-[14px] font-bold uppercase tracking-[0.16em] text-[#ffd1b2]">
                {isEvent ? category.groupLabel : mode === "vendorType" ? "Vendor service" : category.groupName}
              </span>
              <h1 className="mt-4 font-poppins text-[40px] font-bold leading-[1.04] tracking-[-0.03em] sm:text-[56px] lg:text-[66px]">
                {category.name}
              </h1>
              <p className="mt-5 max-w-[590px] text-[14px] leading-7 text-white/80 sm:text-[16px]">
                {category.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to={`/enquiry?category=${encodeURIComponent(category.name)}&vendor=${encodeURIComponent(category.name)}${category.eventContext ? `&event=${encodeURIComponent(category.eventContext)}` : ""}`}
                  className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-5 py-3 text-[14px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_28px_rgba(212,20,90,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(212,20,90,0.4)]"
                >
                  {isEvent ? "Start an enquiry" : "Book now"}
                </Link>
                <Link
                  to={directoryHref}
                  className="inline-flex items-center gap-2 rounded-md border border-white/35 bg-white/10 px-5 py-3 text-[14px] font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Browse all {isEvent ? "events" : "categories"}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
          {!isEvent && (
            <div className="grid gap-4 sm:grid-cols-3">
            {[
              { Icon: BadgeCheck, title: "Made for your occasion", text: "Explore a dedicated page for this category." },
              { Icon: CalendarHeart, title: "Plan at your pace", text: "Start with ideas and reach out when you are ready." },
              { Icon: MapPin, title: "A simpler starting point", text: "Use the directory to discover more options." },
            ].map(({ Icon: FactIcon, title, text }) => (
              <div
                key={title}
                className="flex gap-4 rounded-[18px] border border-[#f1e4dc] bg-white p-5 shadow-[0_6px_22px_rgba(54,29,39,0.045)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#fef0e1] text-[#243B5A]">
                  <FactIcon size={18} />
                </span>
                <div>
                  <h2 className="text-[14px] font-bold text-[#30232B]">{title}</h2>
                  <p className="mt-1 text-[14px] leading-6 text-[#756871]">{text}</p>
                </div>
              </div>
            ))}
            </div>
          )}

          {isEvent && (
            <EventVendorBrowser event={category} vendors={eventVendors} />
          )}

          <div className="mb-6 mt-14 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[14px] font-bold uppercase tracking-[0.14em] text-[#D4145A]">
                Keep exploring
              </p>
              <h2 className="mt-1 font-poppins text-[26px] font-bold text-[#243B5A] sm:text-[34px]">
                {relatedHeading}
              </h2>
            </div>
            <Link
              to={directoryHref}
              className="inline-flex items-center text-[14px] font-bold uppercase tracking-[0.08em] text-[#B70D45]"
            >
              View directory
            </Link>
          </div>

          {relatedItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {relatedItems.map((item, index) => (
                <CategoryCard key={item.id} category={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-[22px] border border-[#f1e4dc] bg-white px-6 py-10 text-center">
              <p className="font-poppins text-[14px] font-semibold text-[#243B5A]">
                Browse the directory to discover more categories.
              </p>
              <Link
                to={directoryHref}
                className="mt-4 inline-flex items-center text-[14px] font-bold text-[#B70D45]"
              >
                {mode === "vendorType" && category.specialties.length === 0
                  ? "Explore vendor directory"
                  : "Explore all categories"}
              </Link>
            </div>
          )}
        </section>
      </main>
      <CategoryFAQ mode={faqMode} />
      <Footer />
    </>
  );
}
