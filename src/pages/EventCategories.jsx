import { Link } from "react-router-dom";
import {
  ArrowRight,
  Baby,
  BriefcaseBusiness,
  Cake,
  CalendarDays,
  Church,
  Clapperboard,
  Flower2,
  Gift,
  GraduationCap,
  Heart,
  House,
  Landmark,
  Music2,
  PartyPopper,
  Plane,
  Presentation,
  Sparkles,
  Trophy,
  UsersRound,
  Shirt,
  Gem,
  Utensils,
  Mic2,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = [
  {
    title: "Wedding",
    image: "/Opulent Indian Garden Wedding Mandap.png",
    icon: Heart,
  },
  {
    title: "Reception",
    image: "/Joyful Newlywed Entrance at Reception.png",
    icon: Flower2,
  },
  {
    title: "Engagement",
    image: "/Rohan and Eisha’s Floral Engagement.png",
    icon: Gem,
  },
  {
    title: "Anniversary",
    image: "/Romantic Anniversary Cake Cutting Celebration.png",
    icon: CalendarDays,
  },
  {
    title: "Sangeet Ceremony",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: Music2,
  },
  {
    title: "Naming Ceremony & Baby Shower",
    image: "/Elegant Pastel Baby Shower Celebration.png",
    icon: Baby,
  },
  {
    title: "Birthday",
    image: "/Joyful Birthday Cake Celebration.png",
    icon: Cake,
  },
  {
    title: "Housewarming / Griha Pravesh",
    image: "/Elegant Indian Naming Ceremony Celebration.png",
    icon: House,
  },
  {
    title: "Corporate Events",
    image: "/Corporate Summit Networking Reception.png",
    icon: BriefcaseBusiness,
  },
  {
    title: "Conferences & Seminars",
    image: "/Corporate Summit Networking Reception.png",
    icon: Presentation,
  },
  {
    title: "Award Ceremonies",
    image: "/Corporate Summit Networking Reception.png",
    icon: Trophy,
  },
  {
    title: "College Festivals",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: GraduationCap,
  },
  {
    title: "School Events",
    image: "/Joyful Birthday Cake Celebration.png",
    icon: UsersRound,
  },
  {
    title: "Farewell Party",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: PartyPopper,
  },
  {
    title: "Graduation Ceremony",
    image: "/Corporate Summit Networking Reception.png",
    icon: GraduationCap,
  },
  {
    title: "Bachelor Party",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: PartyPopper,
  },
  {
    title: "Reunion Party",
    image: "/Joyful Birthday Cake Celebration.png",
    icon: UsersRound,
  },
  {
    title: "Cocktail Party",
    image: "/Romantic Anniversary Cake Cutting Celebration.png",
    icon: Utensils,
  },
  {
    title: "Private Parties",
    image: "/Joyful Birthday Cake Celebration.png",
    icon: Sparkles,
  },
  {
    title: "Family Get-Together",
    image: "/Elegant Indian Naming Ceremony Celebration.png",
    icon: UsersRound,
  },
  {
    title: "Festival Celebrations",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: Sparkles,
  },
  {
    title: "Religious Events",
    image: "/Elegant Indian Naming Ceremony Celebration.png",
    icon: Church,
  },
  {
    title: "Cultural Events",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: Landmark,
  },
  {
    title: "Concerts & Live Shows",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: Mic2,
  },
  {
    title: "Fashion Shows",
    image: "/Corporate Summit Networking Reception.png",
    icon: Shirt,
  },
  {
    title: "Charity & Fundraising Events",
    image: "/Corporate Summit Networking Reception.png",
    icon: Heart,
  },
  {
    title: "Sports Events",
    image: "/Corporate Summit Networking Reception.png",
    icon: Trophy,
  },
  {
    title: "Political Events",
    image: "/Corporate Summit Networking Reception.png",
    icon: UsersRound,
  },
  {
    title: "Community Events",
    image: "/Elegant Indian Naming Ceremony Celebration.png",
    icon: UsersRound,
  },
  {
    title: "Groom Wear",
    image: "/Joyful Newlywed Entrance at Reception.png",
    icon: Shirt,
  },
  {
    title: "Bridal Wear",
    image: "/Rohan and Eisha’s Floral Engagement.png",
    icon: Gem,
  },
  {
    title: "Honeymoon",
    image: "/Opulent Indian Garden Wedding Mandap.png",
    icon: Plane,
  },
  {
    title: "Gifts",
    image: "/Elegant Botanical Wedding Invitation Suite.png",
    icon: Gift,
  },
  {
    title: "Entertainment",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: Clapperboard,
  },
  {
    title: "Pandits",
    image: "/Elegant Indian Naming Ceremony Celebration.png",
    icon: Church,
  },
];

const easeOut = [0.22, 1, 0.36, 1];

function EventCard({ category, index, reducedMotion }) {
  const Icon = category.icon;

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.48,
        delay: (index % 4) * 0.05,
        ease: easeOut,
      }}
      className="h-full min-w-0"
    >
      <Link
        to={`/search?query=${encodeURIComponent(category.title)}`}
        aria-label={`Explore ${category.title}`}
        className="group relative flex aspect-[1.1/1] h-auto w-full flex-col justify-end overflow-hidden rounded-[6px] bg-[#24151b] shadow-[0_5px_18px_rgba(43,24,32,0.12)] outline-none transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(43,24,32,0.24)] focus-visible:ring-2 focus-visible:ring-[#db530f] focus-visible:ring-offset-4"
      >
        <img
          src={category.image}
          alt={`${category.title} event`}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/50 transition-colors duration-500 group-hover:bg-black/45" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent transition-colors duration-500 group-hover:from-black/60 group-hover:via-black/20" />

        <div className="relative z-10 flex w-full items-center gap-3 px-4 pb-4 pt-8 sm:px-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] text-white shadow-md">
            <Icon size={22} strokeWidth={2} />
          </span>

          <h2 className="min-w-0 flex-1 font-poppins text-[14px] font-semibold leading-snug text-white drop-shadow-md sm:text-[15px]">
            {category.title}
          </h2>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] text-white opacity-0 shadow-md transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function EventCategories() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <Navbar />

      <main className="bg-[#fffaf7] font-poppins">
        <section className="relative isolate flex min-h-[280px] items-center justify-center overflow-hidden bg-[#24151b] sm:min-h-[310px] lg:min-h-[340px]">
          <img
            src="/hero.png"
            alt="A beautifully decorated celebration venue"
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 -z-10 bg-black/70" />

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="mx-auto w-full max-w-[1440px] px-5 py-10 text-center sm:px-8 sm:py-12 lg:px-12 lg:py-14"
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[2.5px] text-[#ffc18e] sm:text-xs">
              Every occasion, beautifully planned
            </p>

            <h1 className="mx-auto max-w-[900px] font-playfair text-[34px] font-semibold leading-tight text-white drop-shadow-lg sm:text-[48px] lg:text-[54px]">
              Make Every Moment
              <span className="block text-[#ffc18e]">
                Unforgettable
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-[680px] text-[12px] leading-6 text-white/90 sm:text-[14px] sm:leading-7">
              From timeless weddings and joyful family celebrations to
              corporate gatherings, discover the perfect occasion and bring
              your celebration to life with HarEvent.
            </p>
          </motion.div>
        </section>

        <section
          id="event-categories"
          className="scroll-mt-6 px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16"
        >
          <div className="mx-auto max-w-[1500px]">
            <header className="mb-7">
              <h2 className="font-playfair text-[30px] font-bold leading-tight tracking-tight text-[#30232B] sm:text-[36px]">
                Event Categories
              </h2>
              <p className="mt-2 text-[13px] leading-6 text-[#8A7580] sm:text-[16px]">
                Find the perfect people and inspiration for every celebration.
              </p>
            </header>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {categories.map((category, index) => (
                <EventCard
                  key={category.title}
                  category={category}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}