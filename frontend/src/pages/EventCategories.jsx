
import {
  MapPin,
  Utensils,
  Camera,
  Heart,
  Music,
  Baby,
  Gift,
  House,
  PartyPopper,
  Wine,
  Users,
  GraduationCap,
  Building2,
  Presentation,
  Trophy,
  School,
  Sparkles,
  Church,
  Palette,
  Handshake,
  Mic2,
  Shirt,
  Dumbbell,
  Landmark,
  HandHeart,
  Cake,
  ArrowRight,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// All 30 Event Categories
const events = [
  // Weddings and Wedding Functions
  {
    name: "Wedding",
    image: "/wedding.jpg",
    icon: Heart,
  },
  {
    name: "Reception",
    image: "/reception.jpg",
    icon: PartyPopper,
  },
  {
    name: "Engagement",
    image: "/engagement.jpg",
    icon: Heart,
  },
  {
    name: "Anniversary",
    image: "/anniversary.jpg",
    icon: Gift,
  },
  {
    name: "Sangeet Ceremony",
    image: "/sangeet.jpg",
    icon: Music,
  },
  {
    name: "Naming Ceremony",
    image: "/naming.jpg",
    icon: Baby,
  },
  {
    name: "Baby Shower",
    image: "/babyshower.jpg",
    icon: Baby,
  },
  {
    name: "Birthday",
    image: "/birthday.jpg",
    icon: Cake,
  },
  {
    name: "Housewarming / Griha Pravesh",
    image: "/grihpravesh.jpg",
    icon: House,
  },
  {
    name: "Bachelor Party",
    image: "/bachelor.jpg",
    icon: PartyPopper,
  },
  {
    name: "Cocktail Party",
    image: "/cocktail.jpg",
    icon: Wine,
  },
  {
    name: "Private Parties",
    image: "/privateparties.jpg",
    icon: Users,
  },
  {
    name: "Family Get-Together",
    image: "/family get gether.jpg",
    icon: Users,
  },
  {
    name: "Reunion Party",
    image: "/reunion.jpg",
    icon: Handshake,
  },
  {
    name: "Farewell Party",
    image: "/farewell.jpg",
    icon: Gift,
  },
  {
    name: "Graduation Ceremony",
    image: "/graduation.jpg",
    icon: GraduationCap,
  },

  // Corporate and Education
  {
    name: "Corporate Events",
    image: "/coporate.jpg",
    icon: Building2,
  },
  {
    name: "Conferences & Seminars",
    image: "/conference.jpg",
    icon: Presentation,
  },
  {
    name: "Award Ceremonies",
    image: "/award.jpg",
    icon: Trophy,
  },
  {
    name: "College Festivals",
    image: "/college.jpg",
    icon: GraduationCap,
  },
  {
    name: "School Events",
    image: "/school events.jpg",
    icon: School,
  },

  // Culture and Community
  {
    name: "Festival Celebrations",
    image: "/festival.jpg",
    icon: Sparkles,
  },
  {
    name: "Religious Events",
    image: "/religious.jpg",
    icon: Church,
  },
  {
    name: "Cultural Events",
    image: "/cultural.avif",
    icon: Palette,
  },
  {
    name: "Community Events",
    image: "/community.jpg",
    icon: Handshake,
  },

  // Shows and Special Events
  {
    name: "Concerts & Live Shows",
    image: "/concert.jpg",
    icon: Mic2,
  },
  {
    name: "Fashion Shows",
    image: "/fashion.jpg",
    icon: Shirt,
  },
  {
    name: "Sports Events",
    image: "/sports.jpg",
    icon: Trophy,
  },
  {
    name: "Political Events",
    image: "/political.png",
    icon: Landmark,
  },
  {
    name: "Charity & Fundraising Events",
    image: "/charity.jpg",
    icon: HandHeart,
  },
];


// Event Card Component
function EventCard({ event }) {
  const Icon = event.icon;

  return (
    <div
      className="group relative isolate flex aspect-[1.5/1] cursor-default overflow-hidden rounded-[22px] bg-[#30232B] shadow-[0_5px_18px_rgba(0,0,0,0.10)] ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(48,35,43,0.22)]"
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
      {/* <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(83,38,34,0.88) 0%, rgba(83,38,34,0.58) 30%, rgba(0,0,0,0.18) 72%, rgba(0,0,0,0.08) 100%)",
        }}
      /> */}
      <div
  className="absolute inset-0 -z-10"
  style={{
    background:
      "linear-gradient(to top, rgba(20,18,18,0.92) 0%, rgba(25,23,22,0.72) 30%, rgba(0,0,0,0.28) 72%, rgba(0,0,0,0.10) 100%)",
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
    </div>
  );
}


// Main Page
export default function EventCategories() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fafafa] font-poppins text-[#30232B]">

        {/* Hero Banner */}
        <section className="relative flex h-[200px] items-center justify-center overflow-hidden bg-[#21151f] sm:h-[200px] lg:h-[255px]">

          <img
            src="/Circle of Henna Hands.png"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/65" />

          {/* Hero Heading */}
          <div className="relative z-10 px-5 text-center">
            <h1 className="text-[24px] font-bold leading-tight text-white sm:text-[30px] lg:text-[32px]">
              India's Most Trusted Online Event Marketplace
            </h1>
          </div>

        </section>


        {/* Event Categories */}
        <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">

          {/* Section Heading */}
          <h2 className="mb-8 font-poppins text-[24px] font-normal text-[#30232B] sm:mb-9 sm:text-[28px]">
            Top Event Categories
          </h2>

          {/* All 30 Event Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {events.map((event) => (
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
