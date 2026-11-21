import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import EventVendorChecklistModal from "./EventVendorChecklistModal";
import { eventCategories, getEventCategorySlug } from "../data/eventCategories";
import useMediaQuery from "../hooks/useMediaQuery";

const eventShortcuts = [
  { title: "Weddings", categoryName: "Wedding" },
  { title: "Birthdays", categoryName: "Birthday" },
  { title: "Engagements", categoryName: "Engagement" },
  { title: "Baby Showers", categoryName: "Baby Shower" },
  { title: "Anniversaries", categoryName: "Anniversary" },
  { title: "Receptions", categoryName: "Reception" },
  { title: "Haldi & Mehendi", categoryName: "Wedding" },
  { title: "Pre-Wedding Events", categoryName: "Wedding" },
  { title: "Naming Ceremonies", categoryName: "Naming Ceremony" },
  { title: "Corporate Events", categoryName: "Corporate Events" },
  { title: "Conferences & Seminars", categoryName: "Conferences & Seminars" },
  { title: "Sports Events", categoryName: "Sports Events" },
];

const events = eventShortcuts.map(({ title, categoryName }) => ({
  title,
  category: eventCategories.find((event) => event.name === categoryName),
}));

const EASE_OUT = [0.22, 1, 0.36, 1];

function EventCapsule({ event, index, reduced, onSelect }) {
  const Icon = event.category.icon;
  const delay = index * 0.055;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 26, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
      className="h-full"
    >
      <button
        type="button"
        onClick={(clickEvent) =>
          onSelect(event.category, clickEvent.currentTarget)
        }
        aria-label={`Choose vendors for ${event.title}`}
        aria-haspopup="dialog"
        className="group relative flex h-full w-full items-center gap-3 overflow-hidden rounded-full border border-[#F1DDE5] bg-white px-3.5 py-3 text-left no-underline shadow-[0_2px_10px_rgba(71,34,52,0.04)] outline-none transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-[#E9A0BA] hover:shadow-[0_14px_30px_rgba(71,34,52,0.12)] focus-visible:ring-2 focus-visible:ring-[#D4145A] focus-visible:ring-offset-2 active:translate-y-0 sm:gap-3.5 sm:px-4"
      >
        {/* Soft gradient wash fades in behind the pill — no shapes, no circles */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#D4145A]/[0.08] via-[#FF7628]/[0.05] to-transparent opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />

        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-gradient-to-br from-[#D4145A] to-[#FF7628] text-white shadow-[0_4px_10px_rgba(71,34,52,0.14)] transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-105">
          <Icon size={16.5} strokeWidth={2.1} />
        </span>

        <span className="relative min-w-0 flex-1 truncate text-[14.5px] font-semibold leading-tight text-[#2E2230] transition-colors duration-300 group-hover:text-[#D4145A] sm:text-[15px]">
          {event.title}
        </span>

        <ArrowRight
          size={15}
          className="relative shrink-0 -translate-x-1.5 text-[#D4145A] opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 max-sm:translate-x-0 max-sm:opacity-100"
        />
      </button>
    </motion.div>
  );
}

export default function Events({ onChecklistVisibilityChange }) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [activeEvent, setActiveEvent] = useState(null);
  const [modalOpener, setModalOpener] = useState(null);

  return (
    <>
    <section className="relative isolate w-full overflow-hidden bg-white px-4 py-12 font-poppins sm:px-6 sm:py-14 lg:px-8 lg:py-16 motion-reduce:[&_*]:transition-none">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mb-10 text-center sm:mb-12">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="mb-3 flex items-center justify-center gap-2.5 text-[12px] font-semibold tracking-[2px] text-[#D4145A]"
          >
            <span className="h-[3px] w-6 rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628]" />
            <span className="text-[13px] font-bold">OCCASIONS &amp; GATHERINGS</span>
            <span className="h-[3px] w-6 rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628]" />
          </motion.div>

          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT }}
            className="font-playfair text-[36px] font-bold leading-tight tracking-[-0.5px] text-[#21151d]"
          >
            Explore Events
          </motion.h2>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.55, delay: 0.32, ease: EASE_OUT }}
            className="mx-auto mt-3 max-w-3xl text-[16px] font-normal leading-7 text-[#77717b]"
          >
            Whatever the occasion, discover the right professionals and
            services to make it special.
          </motion.p>
        </header>

        {/* Capsule grid: aligned event shortcuts, no numbers or drifting shapes */}
        <div className="mx-auto w-full max-w-[1180px]">
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((event, index) => (
              <EventCapsule
                key={event.title}
                event={event}
                index={index}
                reduced={reduced}
                onSelect={(selectedEvent, opener) => {
                  setActiveEvent(selectedEvent);
                  setModalOpener(opener);
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
          className="mt-9 flex justify-center"
        >
          <Link
            to="/event-categories"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-6 text-[13px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.97]"
          >
            View All Event Categories
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
      {activeEvent && (
        <EventVendorChecklistModal
          key={getEventCategorySlug(activeEvent.name)}
          event={activeEvent}
          opener={modalOpener}
          onClose={() => setActiveEvent(null)}
          onVisibilityChange={onChecklistVisibilityChange}
        />
      )}
    </>
  );
}
