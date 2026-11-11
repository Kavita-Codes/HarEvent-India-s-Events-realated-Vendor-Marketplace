import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Baby,
  BadgeCheck,
  CalendarDays,
  CalendarHeart,
  Check,
  CircleEllipsis,
  Flower2,
  Gift,
  Headset,
  Heart,
  HeartHandshake,
  LayoutGrid,
  MapPin,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = [
  {
    title: "Wedding",
    description: "A complete solution for your big day",
    image: "/Opulent Indian Garden Wedding Mandap.png",
    icon: Heart,
    filter: "wedding",
  },
  {
    title: "Engagement",
    description: "Make your special moment unforgettable",
    image: "/Rohan and Eisha’s Floral Engagement.png",
    icon: HeartHandshake,
    filter: "engagement",
  },
  {
    title: "Birthday",
    description: "Celebrate with style and joy",
    image: "/Joyful Birthday Cake Celebration.png",
    icon: Gift,
    filter: "birthday",
  },
  {
    title: "Anniversary",
    description: "Relive your special bond",
    image: "/Romantic Anniversary Cake Cutting Celebration.png",
    icon: CalendarHeart,
    filter: "anniversary",
  },
  {
    title: "Baby Shower",
    description: "A joyful welcome for the little one",
    image: "/Elegant Pastel Baby Shower Celebration.png",
    icon: Baby,
    filter: "baby-shower",
  },
  {
    title: "Naming Ceremony",
    description: "A precious beginning",
    image: "/Elegant Indian Naming Ceremony Celebration.png",
    icon: Baby,
    filter: "naming",
  },
  {
    title: "Reception",
    description: "A grand celebration with loved ones",
    image: "/Joyful Newlywed Entrance at Reception.png",
    icon: Flower2,
    filter: "reception",
  },
  {
    title: "Prewedding",
    description: "Capture love's beautiful journey",
    image: "/Golden Hour Pre-Wedding Celebration.png",
    icon: Sparkles,
    filter: "prewedding",
  },
  {
    title: "Family & Social Gatherings",
    description: "Togetherness makes it special",
    image: "/Joyful Indian Family Celebration.png",
    icon: PartyPopper,
    filter: "more",
  },
  {
    title: "Farewell & Retirement",
    description: "Honour the journey together",
    image: "/Farewell and Retirement Celebrations.png",
    icon: HeartHandshake,
    filter: "more",
  },
  {
    title: "Sangeet Ceremony",
    description: "Celebrate with music, dance and family",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: PartyPopper,
    filter: "more",
  },
  {
    title: "Naming Ceremony & Baby Shower",
    description: "Celebrate a beautiful new beginning",
    image: "/Elegant Pastel Baby Shower Celebration.png",
    icon: Baby,
    filter: "more",
  },
  {
    title: "Housewarming / Griha Pravesh",
    description: "Make your new beginning memorable",
    image: "/Elegant Indian Naming Ceremony Celebration.png",
    icon: Gift,
    filter: "more",
  },
  {
    title: "Corporate Events",
    description: "Bring your team together in style",
    image: "/Corporate Summit Networking Reception.png",
    icon: CalendarDays,
    filter: "more",
  },
  {
    title: "Conferences & Seminars",
    description: "Plan a seamless professional gathering",
    image: "/Corporate Summit Networking Reception.png",
    icon: CalendarDays,
    filter: "more",
  },
  {
    title: "Award Ceremonies",
    description: "Celebrate achievements and excellence",
    image: "/Corporate Summit Networking Reception.png",
    icon: Gift,
    filter: "more",
  },
  {
    title: "College Festivals",
    description: "Make campus celebrations unforgettable",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: PartyPopper,
    filter: "more",
  },
  {
    title: "School Events",
    description: "Create special memories for every student",
    image: "/Joyful Birthday Cake Celebration.png",
    icon: Sparkles,
    filter: "more",
  },
  {
    title: "Farewell Party",
    description: "Send them off with a celebration to remember",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: HeartHandshake,
    filter: "more",
  },
  {
    title: "Graduation Ceremony",
    description: "Celebrate every milestone and achievement",
    image: "/Corporate Summit Networking Reception.png",
    icon: Gift,
    filter: "more",
  },
  {
    title: "Bachelor Party",
    description: "Celebrate the last days before the big day",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: PartyPopper,
    filter: "more",
  },
  {
    title: "Reunion Party",
    description: "Reconnect and make new memories together",
    image: "/Joyful Indian Family Celebration.png",
    icon: HeartHandshake,
    filter: "more",
  },
  {
    title: "Cocktail Party",
    description: "An elegant evening for your favourite people",
    image: "/Romantic Anniversary Cake Cutting Celebration.png",
    icon: Gift,
    filter: "more",
  },
  {
    title: "Private Parties",
    description: "Make any gathering feel like an occasion",
    image: "/Joyful Birthday Cake Celebration.png",
    icon: Sparkles,
    filter: "more",
  },
  {
    title: "Family Get-Together",
    description: "Bring everyone closer with a special gathering",
    image: "/Joyful Indian Family Celebration.png",
    icon: HeartHandshake,
    filter: "more",
  },
  {
    title: "Festival Celebrations",
    description: "Celebrate traditions with your community",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: Sparkles,
    filter: "more",
  },
  {
    title: "Religious Events",
    description: "Gather together for meaningful occasions",
    image: "/Elegant Indian Naming Ceremony Celebration.png",
    icon: Heart,
    filter: "more",
  },
  {
    title: "Cultural Events",
    description: "Share and celebrate culture together",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: PartyPopper,
    filter: "more",
  },
  {
    title: "Concerts & Live Shows",
    description: "Bring the crowd together for a great show",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: Sparkles,
    filter: "more",
  },
  {
    title: "Fashion Shows",
    description: "Set the stage for a stylish event",
    image: "/Corporate Summit Networking Reception.png",
    icon: Sparkles,
    filter: "more",
  },
  {
    title: "Charity & Fundraising Events",
    description: "Bring people together for a good cause",
    image: "/Corporate Summit Networking Reception.png",
    icon: HeartHandshake,
    filter: "more",
  },
  {
    title: "Sports Events",
    description: "Make every match and milestone a celebration",
    image: "/Corporate Summit Networking Reception.png",
    icon: PartyPopper,
    filter: "more",
  },
  {
    title: "Political Events",
    description: "Plan an organised and engaging gathering",
    image: "/Corporate Summit Networking Reception.png",
    icon: CalendarDays,
    filter: "more",
  },
  {
    title: "Community Events",
    description: "Celebrate the people who bring us together",
    image: "/Joyful Indian Family Celebration.png",
    icon: HeartHandshake,
    filter: "more",
  },
  {
    title: "Groom Wear",
    description: "Find the perfect look for your big day",
    image: "/Joyful Newlywed Entrance at Reception.png",
    icon: Gift,
    filter: "more",
  },
  {
    title: "Bridal Wear",
    description: "Discover a look that feels uniquely yours",
    image: "/Rohan and Eisha’s Floral Engagement.png",
    icon: Sparkles,
    filter: "more",
  },
  {
    title: "Honeymoon",
    description: "Plan a beautiful beginning together",
    image: "/Golden Hour Pre-Wedding Celebration.png",
    icon: Heart,
    filter: "more",
  },
  {
    title: "Gifts",
    description: "Find thoughtful gifts for every occasion",
    image: "/Elegant Botanical Wedding Invitation Suite.png",
    icon: Gift,
    filter: "more",
  },
  {
    title: "Entertainment",
    description: "Add memorable moments to your celebration",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: Sparkles,
    filter: "more",
  },
  {
    title: "Pandits",
    description: "Find experienced professionals for your ceremony",
    image: "/Elegant Indian Naming Ceremony Celebration.png",
    icon: Heart,
    filter: "more",
  },
];

const filters = [
  { label: "All Events", value: "all", icon: Sparkles },
  { label: "Wedding", value: "wedding", icon: Heart },
  { label: "Engagement", value: "engagement", icon: HeartHandshake },
  { label: "Birthday", value: "birthday", icon: Gift },
  { label: "Anniversary", value: "anniversary", icon: CalendarHeart },
  { label: "Baby Shower", value: "baby-shower", icon: Baby },
  { label: "Naming Ceremony", value: "naming", icon: Baby },
  { label: "Reception", value: "reception", icon: Flower2 },
  { label: "Prewedding", value: "prewedding", icon: Sparkles },
  { label: "More", value: "more", icon: CircleEllipsis },
];

const packages = [
  {
    title: "Wedding Package",
    price: "₹75,000",
    image: "/Lavish Red and Gold Wedding Stage.png",
    badge: "Best Seller",
  },
  {
    title: "Birthday Bash",
    price: "₹15,000",
    image: "/Joyful Birthday Cake Celebration.png",
  },
  {
    title: "Corporate Event",
    price: "₹50,000",
    image: "/Corporate Summit Networking Reception.png",
  },
  {
    title: "Baby Shower",
    price: "₹12,000",
    image: "/Elegant Pastel Baby Shower Celebration.png",
  },
  {
    title: "Engagement",
    price: "₹35,000",
    image: "/Rohan and Eisha’s Floral Engagement.png",
  },
];

const benefits = [
  { title: "Verified Vendors", detail: "100% trusted professionals", icon: ShieldCheck },
  { title: "Wide Category Coverage", detail: "All events, all in one place", icon: LayoutGrid },
  { title: "Easy Booking", detail: "Compare and book in a few clicks", icon: CalendarDays },
  { title: "Budget Friendly", detail: "Compare and choose the best deals", icon: Wallet },
  { title: "Hassle-Free Planning", detail: "Enjoy your event, we manage the rest", icon: Headset },
];

const easeOut = [0.22, 1, 0.36, 1];

function EventCard({ category, index, reducedMotion }) {
  const Icon = category.icon;

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, delay: (index % 5) * 0.045, ease: easeOut }}
      className="min-w-0"
    >
      <Link
        to={`/search?query=${encodeURIComponent(category.title)}`}
        aria-label={`Explore vendors for ${category.title}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-[14px] border border-[#F2E8EB] bg-white shadow-[0_3px_14px_rgba(74,34,49,0.07)] outline-none transition duration-300 hover:-translate-y-1 hover:border-[#F2B9CB] hover:shadow-[0_12px_28px_rgba(74,34,49,0.13)] focus-visible:ring-2 focus-visible:ring-[#D4145A] focus-visible:ring-offset-2"
      >
        <div className="relative h-[176px] shrink-0 overflow-visible bg-[#fff1f4]">
          <img
            src={category.image}
            alt={`${category.title} celebration`}
            loading={index < 5 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm">
            <Heart size={15} strokeWidth={2} />
          </span>
          <span className="absolute -bottom-4 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-[#fff0f4] text-[#D4145A] shadow-sm">
            <Icon size={19} strokeWidth={2.2} />
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center px-2.5 pb-3 pt-5 text-center">
          <h2 className="font-poppins text-[16px] font-bold leading-tight text-[#3A2630] group-hover:text-[#D4145A]">
            {category.title}
          </h2>
          <p className="mt-1.5 min-h-[42px] max-w-[220px] text-[14px] leading-[1.45] text-[#756871]">
            {category.description}
          </p>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F4] px-3 py-1 text-[14px] font-semibold text-[#D4145A] transition-colors group-hover:bg-gradient-to-r group-hover:from-[#D4145A] group-hover:to-[#FF7628] group-hover:text-white">
            Explore Vendors <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function SectionHeading({ children }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-2.5">
      <span className="h-px w-9 bg-gradient-to-r from-transparent to-[#FF7628]" />
      <Heart size={13} className="fill-[#D4145A] text-[#D4145A]" />
      <h2 className="font-poppins text-[22px] font-bold text-[#30232B] sm:text-[24px]">
        {children}
      </h2>
      <span className="h-px w-9 bg-gradient-to-l from-transparent to-[#FF7628]" />
    </div>
  );
}

export default function EventCategories() {
  const reducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("all");
  const visibleCategories =
    activeFilter === "all"
      ? categories
      : categories.filter((category) => category.filter === activeFilter);

  return (
    <>
      <Navbar />

      <main className="bg-white font-poppins">
        <section className="relative flex min-h-[210px] w-full items-center overflow-hidden bg-[#FFF7F1] px-5 py-6 sm:min-h-[250px] sm:px-10 lg:min-h-[280px] lg:px-14">
          <img
            src="/hero.png"
            alt="A beautifully decorated wedding celebration venue"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[72%_48%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8F2] via-[#FFF8F2]/95 to-[#FFF8F2]/5" />
          <div className="relative z-10 max-w-[520px] py-3">
            <h1 className="font-poppins text-[28px] font-bold leading-tight text-[#B70D45] sm:text-[34px]">
              Explore All Event Categories
            </h1>
            <p className="mt-2 text-[16px] leading-snug text-[#30232B]">
              Plan, Book &amp; Celebrate
              <span className="block">Every Special Moment</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[14px] font-medium text-[#30232B]">
              {["Trusted Vendors", "Verified Profiles", "Real Reviews"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-[#D4145A]" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          id="event-categories"
          className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-5 lg:px-8"
        >
          <div
            aria-label="Filter event categories"
            className="mb-4 flex flex-wrap justify-center gap-2 px-0.5 pb-2"
          >
            {filters.map((filter) => {
              const Icon = filter.icon;
              const selected = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`inline-flex shrink-0 flex-col items-center justify-center gap-1 rounded-[11px] border px-3 py-2 text-[14px] font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A] ${
                    selected
                      ? "border-[#FAD9E3] bg-[#FDE8EE] text-[#D4145A]"
                      : "border-[#F4EEF0] bg-white text-[#392B32] hover:border-[#F4C5D3] hover:bg-[#FFF7F9]"
                  }`}
                >
                  <Icon size={16} strokeWidth={2} />
                  <span className="whitespace-nowrap">{filter.label}</span>
                </button>
              );
            })}
          </div>

          <header className="mb-5 text-center">
            <div className="mb-2 flex items-center justify-center gap-2.5">
              <span className="hidden h-px w-9 bg-gradient-to-r from-transparent to-[#FF7628] sm:block" />
              <Heart size={16} className="hidden shrink-0 fill-[#D4145A] text-[#D4145A] sm:block" />
              <h2 className="max-w-full break-words font-playfair text-[36px] font-bold leading-tight text-[#30232B]">
                Event Categories
              </h2>
              <Heart size={16} className="hidden shrink-0 fill-[#D4145A] text-[#D4145A] sm:block" />
              <span className="hidden h-px w-9 bg-gradient-to-l from-transparent to-[#FF7628] sm:block" />
            </div>
            <p className="text-[16px] leading-6 text-[#554A50]">
              Choose From Our Wide Range of Celebration Events
            </p>
          </header>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-4">
            {visibleCategories.map((category, index) => (
              <EventCard
                key={category.title}
                category={category}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </section>

        <section className="mx-auto mb-8 grid w-[calc(100%-2rem)] max-w-[1392px] gap-3 rounded-[18px] border border-[#FCE5EC] bg-[#fef0e1] px-4 py-5 sm:mb-10 sm:grid-cols-[1.15fr_4fr] sm:items-center sm:px-6 lg:px-8">
          <h2 className="text-center font-poppins text-[18px] font-bold leading-tight text-[#B70D45] sm:border-r sm:border-[#F3C6D3] sm:py-3 sm:text-left sm:text-[20px]">
            Why Choose HarEvent
            <span className="block text-[#30232B]">for Events?</span>
          </h2>
          <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-5 sm:gap-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="flex flex-col items-center px-1 text-center"
                >
                  <Icon size={23} strokeWidth={1.8} className="mb-1.5 text-[#D4145A]" />
                  <h3 className="text-[16px] font-bold leading-tight text-[#30232B]">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 max-w-[180px] text-[14px] leading-[1.4] text-[#71656B]">
                    {benefit.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mb-9 w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <SectionHeading>Popular Event Packages</SectionHeading>
          <div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
              {packages.map((eventPackage) => (
                <article
                  key={eventPackage.title}
                  className="relative overflow-hidden rounded-[12px] border border-[#F0E7EA] bg-white p-2 shadow-[0_3px_12px_rgba(74,34,49,0.06)]"
                >
                  {eventPackage.badge && (
                    <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-[#D4145A] px-2 py-1 text-[14px] font-semibold text-white">
                      {eventPackage.badge}
                    </span>
                  )}
                  <img
                    src={eventPackage.image}
                    alt={eventPackage.title}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[1.45/1] w-full rounded-[8px] object-cover"
                  />
                  <div className="px-1 pb-1 pt-2 text-center">
                    <h3 className="break-words text-[14px] font-semibold text-[#30232B]">
                      {eventPackage.title}
                    </h3>
                    <p className="mt-1 text-[14px] font-bold text-[#D4145A]">
                      {eventPackage.price} <span className="font-normal">Onwards</span>
                    </p>
                    <Link
                      to={`/search?query=${encodeURIComponent(eventPackage.title)}`}
                      className="mt-1.5 inline-flex rounded-full border border-[#D4145A] px-3 py-1 text-[14px] font-medium text-[#D4145A] transition hover:bg-[#D4145A] hover:text-white"
                    >
                      View Package
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto mb-2 flex min-h-[170px] w-[calc(100%-2rem)] max-w-[1370px] items-center overflow-hidden rounded-[16px] bg-gradient-to-r from-[#B90045] via-[#D4145A] to-[#A5003C] px-5 py-6 text-white sm:px-8 lg:px-10">
          <img
            src="/Golden Mandap Wedding Ceremony.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-y-0 right-[20%] hidden h-full w-[34%] object-cover object-center opacity-90 [mask-image:linear-gradient(to_right,transparent,black_25%)] sm:block"
          />
          <div className="relative z-10 max-w-[55%]">
            <h2 className="font-poppins text-[21px] font-semibold leading-tight sm:text-[27px]">
              Ready to Plan Your Dream Event?
            </h2>
            <p className="mt-1 max-w-[420px] text-[14px] leading-relaxed text-white/90 sm:text-[16px]">
              Join HarEvent today and make your celebration unforgettable.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to="#event-categories"
                className="rounded-md bg-gradient-to-r from-[#FF7628] to-[#F4A51C] px-4 py-2 text-[14px] font-semibold text-white shadow-sm transition hover:brightness-105"
              >
                Explore Events
              </Link>
              <Link
                to="/signup"
                className="rounded-md border border-white/80 px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-white/10"
              >
                Join as Customer
              </Link>
            </div>
          </div>
          <div className="relative z-10 ml-auto hidden max-w-[240px] text-[14px] font-semibold text-[#FFE36E] sm:block">
            {["Your Perfect Event Partner", "Trusted Vendors", "Verified Profiles", "Real Reviews"].map(
              (item) => (
                <p key={item} className="mb-1 flex items-center gap-2">
                  <Check size={15} strokeWidth={3} /> {item}
                </p>
              ),
            )}
          </div>
          <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full border border-white/10 sm:right-[42%] sm:top-1/2 sm:h-28 sm:w-28 sm:-translate-y-1/2 sm:bg-gradient-to-br sm:from-[#F5AA2C] sm:to-[#D76B1E]">
            <span className="hidden h-full items-center justify-center text-center font-poppins text-[14px] font-semibold text-white sm:flex">
              It&apos;s FREE
              <br />
              to Get Started!
            </span>
          </div>
        </section>

        <section className="mx-auto mb-8 mt-2 grid w-[calc(100%-2rem)] max-w-[1370px] grid-cols-2 gap-3 rounded-[12px] bg-[#FFF0F4] px-3 py-3 text-[14px] font-medium text-[#30232B] sm:grid-cols-4 sm:px-5">
          {[
            { text: "500+ Trusted Vendors", icon: BadgeCheck },
            { text: "300+ Cities Covered", icon: MapPin },
            { text: "Secure & Easy Booking", icon: CalendarDays },
            { text: "100% Satisfaction", icon: Heart },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-center justify-center gap-1.5">
                <Icon size={14} className="text-[#D4145A]" />
                {item.text}
              </div>
            );
          })}
        </section>
      </main>

      <Footer />
    </>
  );
}
