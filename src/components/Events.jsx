import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Cake,
  Gem,
  BriefcaseBusiness,
  Baby,
  GlassWater,
  Flower2,
  Camera,
  UsersRound,
  PartyPopper,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import useMediaQuery from "../hooks/useMediaQuery";

const events = [
  { title: "Weddings", icon: Heart, path: "/events/weddings" },
  { title: "Birthdays", icon: Cake, path: "/events/birthdays" },
  { title: "Engagements", icon: Gem, path: "/events/engagements" },
  {
    title: "Corporate Events",
    icon: BriefcaseBusiness,
    path: "/events/corporate-events",
  },
  { title: "Baby Showers", icon: Baby, path: "/events/baby-showers" },
  { title: "Anniversaries", icon: GlassWater, path: "/events/anniversaries" },
  { title: "Receptions", icon: Flower2, path: "/events/receptions" },
  { title: "Haldi & Mehendi", icon: Sparkles, path: "/events/haldi-mehendi" },
  {
    title: "Pre-Wedding Events",
    icon: Camera,
    path: "/events/pre-wedding-events",
  },
  {
    title: "Naming Ceremonies",
    icon: Baby,
    path: "/events/naming-ceremonies",
  },
  {
    title: "Family & Social Gatherings",
    icon: UsersRound,
    path: "/events/family-social-gatherings",
  },
  {
    title: "Farewell & Retirement",
    icon: PartyPopper,
    path: "/events/farewell-retirement",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1];

function EventRow({
  event,
  index,
  dimmed,
  reduced,
  onActivate,
  onDeactivate,
  navigate,
}) {
  const Icon = event.icon;
  const number = String(index + 1).padStart(2, "0");
  /* Each visual column restarts its cascade, so both columns fill in step */
  const delay = (index % 6) * 0.07;

  return (
    <motion.div
      /* The wrapper owns the focus dim so it never fights the row entrance */
      animate={{ opacity: dimmed ? 0.4 : 1 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
    >
      <motion.button
        type="button"
        onClick={() => navigate(event.path)}
        onMouseEnter={() => onActivate(index)}
        onMouseLeave={onDeactivate}
        onFocus={() => onActivate(index)}
        onBlur={onDeactivate}
        initial={reduced ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay, ease: EASE_OUT }}
        whileTap={{ opacity: 0.75 }}
        className="group relative flex w-full items-center gap-3 overflow-hidden py-[16px] pl-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#D4145A] focus-visible:ring-offset-2 sm:gap-4"
      >
        {/* Highlighter wash: wipes in from the left, no box around the row */}
        <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#D4145A]/[0.07] via-[#FF7628]/[0.05] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />

        <span className="w-[34px] shrink-0 font-playfair text-[17px] font-semibold text-[#C9AEBB] transition-colors duration-300 group-hover:text-[#D4145A]">
          {number}
        </span>

        <Icon
          strokeWidth={1.9}
          className="h-[19px] w-[19px] shrink-0 text-[#B08A9C] transition-[color,transform] duration-[400ms] ease-out group-hover:-rotate-6 group-hover:scale-110 group-hover:text-[#D4145A]"
        />

        <span className="min-w-0 flex-1 truncate text-[16px] font-semibold leading-tight text-[#2E2230] transition-[color,transform] duration-[400ms] ease-out group-hover:translate-x-1.5 group-hover:text-[#D4145A] sm:text-[17px]">
          {event.title}
        </span>

        <ArrowRight className="h-[18px] w-[18px] shrink-0 -translate-x-1.5 text-[#D4145A] opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 max-sm:translate-x-0 max-sm:opacity-100" />

        {/* Hairline draws itself left to right as the row lands */}
        <motion.span
          aria-hidden="true"
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay, ease: EASE_OUT }}
          className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left bg-[#F0E1E8]"
        />

        {/* Gradient rule grows over it on hover */}
        <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#D4145A] to-[#FF7628] transition-transform duration-[550ms] ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      </motion.button>
    </motion.div>
  );
}

export default function Events() {
  const navigate = useNavigate();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [active, setActive] = useState(null);

  /* Cursor light: springs make it trail instead of sticking to the pointer */
  const spotX = useSpring(useMotionValue(-9999), {
    stiffness: 120,
    damping: 24,
    mass: 0.6,
  });
  const spotY = useSpring(useMotionValue(-9999), {
    stiffness: 120,
    damping: 24,
    mass: 0.6,
  });
  /* Fading beats teleporting the light away when the pointer leaves */
  const spotVisibility = useMotionValue(0);
  const spotOpacity = useSpring(spotVisibility, { stiffness: 140, damping: 26 });

  const handlePointer = (pointerEvent) => {
    if (reduced) return;

    /* Measured on the section: it carries no transform, so the box stays
       correct while the page scrolls under the pointer */
    const bounds = pointerEvent.currentTarget.getBoundingClientRect();
    spotVisibility.set(1);
    spotX.set(pointerEvent.clientX - bounds.left);
    spotY.set(pointerEvent.clientY - bounds.top);
  };

  const handleLeave = () => {
    spotVisibility.set(0);
    setActive(null);
  };

  return (
    <section
      onMouseMove={handlePointer}
      onMouseLeave={handleLeave}
      className="relative isolate w-full overflow-hidden bg-white px-4 py-12 font-poppins sm:px-6 sm:py-14 lg:px-8 lg:py-16 motion-reduce:[&_*]:transition-none"
    >
      {/* Cursor light */}
      {!reduced && (
        <motion.span
          aria-hidden="true"
          style={{ left: spotX, top: spotY, opacity: spotOpacity }}
          className="pointer-events-none absolute -z-10 -ml-[260px] -mt-[260px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(212,20,90,0.10),rgba(255,118,40,0.07)_45%,transparent_72%)]"
        />
      )}

      {/* Ambient brand washes, counter-drifting so the section never sits still */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, x: [0, 26, 0], y: [0, -18, 0] }}
        transition={
          reduced
            ? { duration: 0 }
            : {
                opacity: { duration: 1 },
                x: { duration: 9, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              }
        }
        className="pointer-events-none absolute -left-36 top-10 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(212,20,90,0.09),transparent_70%)]"
      />
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, x: [0, -22, 0], y: [0, 20, 0] }}
        transition={
          reduced
            ? { duration: 0 }
            : {
                opacity: { duration: 1.2 },
                x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 11, repeat: Infinity, ease: "easeInOut" },
              }
        }
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,118,40,0.11),transparent_70%)]"
      />

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

        {/* Occasion index: twelve hairline rows, six per column on desktop */}
        <div className="relative mx-auto w-full max-w-[1180px]">
          {/* A slow band of light drifting behind the list keeps the section alive */}
          {!reduced && (
            <motion.span
              aria-hidden="true"
              initial={{ x: "-70%" }}
              animate={{ x: ["-70%", "235%"] }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1.5,
              }}
              className="pointer-events-none absolute inset-y-0 -z-10 w-[42%] bg-gradient-to-r from-transparent via-[#D4145A]/[0.05] to-transparent"
            />
          )}

          <div className="grid grid-cols-1 gap-x-16 lg:grid-cols-2 lg:grid-rows-6 lg:[grid-auto-flow:column]">
            {events.map((event, index) => (
              <EventRow
                key={event.title}
                event={event}
                index={index}
                dimmed={active !== null && active !== index}
                reduced={reduced}
                onActivate={setActive}
                onDeactivate={() => setActive(null)}
                navigate={navigate}
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
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-6 text-[13px] font-semibold text-white shadow-[0_8px_18px_rgba(212,20,90,0.25)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-lg active:scale-[0.97]"
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
  );
}
