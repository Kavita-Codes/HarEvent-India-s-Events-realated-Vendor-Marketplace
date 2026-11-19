
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import {
  eventCategories,
  getEventCategorySlug,
} from "../data/eventCategories";

// Event Card Component
function EventCard({ event }) {
  const Icon = event.icon;

  return (
    <Link
      to={`/event-categories/${getEventCategorySlug(event.name)}`}
      aria-label={`View ${event.name} event details`}
      className="group relative isolate flex aspect-[1.5/1] cursor-pointer overflow-hidden rounded-[22px] bg-[#30232B] shadow-[0_5px_18px_rgba(0,0,0,0.10)] ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(48,35,43,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A]"
    >
      {/* Background Image */}
      <img
        src={event.image}
        alt={event.name}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark Overlay */}
<div
  className="absolute inset-0 -z-10"
  style={{
    background:
      "linear-gradient(to top, rgba(20,18,18,0.75) 0%, rgba(25,23,22,0.55) 30%, rgba(0,0,0,0.20) 72%, rgba(0,0,0,0.05) 100%)",
  }}
/>
      {/* Bottom Content */}
      <div className="mt-auto flex w-full items-center gap-2 px-3 py-3">
        {/* Icon */}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF2E8] text-[#D4145A] shadow-[0_3px_12px_rgba(0,0,0,0.18)] ring-1 ring-white/60">
          <Icon className="h-4 w-4" strokeWidth={1.9} />
        </span>

        {/* Event Name */}
        <h3
          title={event.name}
          className="min-w-0 flex-1 truncate font-playfair text-[15px] font-bold leading-tight text-white drop-shadow-sm sm:text-base"
        >
          {event.name}
        </h3>

        {/* Decorative arrow */}
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/70 text-white/95 transition-[background-color,border-color,transform] duration-300 group-hover:translate-x-1 group-hover:bg-gradient-to-r from-[#D4145A] to-[#FF7628] "
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.9} />
        </span>
      </div>
      </Link>
  );
}


// Main Page
export default function EventCategories() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fafafa] font-poppins text-[#30232B]">

        <Banner/>


        {/* Event Categories */}
        <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">

          {/* Section Heading */}
          <h2 className="mb-8 font-poppins text-[24px] font-normal text-[#30232B] sm:mb-9 sm:text-[28px]">
            Top Event Categories
          </h2>

          {/* All 30 Event Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {eventCategories.map((event) => (
              <EventCard
                key={event.name}
                event={event}
              />
            ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}
