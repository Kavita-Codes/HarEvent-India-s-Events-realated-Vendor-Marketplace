
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
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// All 30 Event Categories
const events = [
  // Weddings and Wedding Functions
  {
    name: "Wedding",
    image: "/Opulent Indian Garden Wedding Mandap.png",
    icon: Heart,
  },
  {
    name: "Reception",
    image: "/Joyful Newlywed Entrance at Reception.png",
    icon: PartyPopper,
  },
  {
    name: "Engagement",
    image: "/Rohan and Eisha’s Floral Engagement.png",
    icon: Heart,
  },
  {
    name: "Anniversary",
    image: "/Romantic Anniversary Cake Cutting Celebration.png",
    icon: Gift,
  },
  {
    name: "Sangeet Ceremony",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: Music,
  },
  {
    name: "Naming Ceremony",
    image: "/Elegant Indian Naming Ceremony Celebration.png",
    icon: Baby,
  },
  {
    name: "Baby Shower",
    image: "/Elegant Pastel Baby Shower Celebration.png",
    icon: Baby,
  },
  {
    name: "Birthday",
    image: "/Joyful Birthday Cake Celebration.png",
    icon: Cake,
  },
  {
    name: "Housewarming / Griha Pravesh",
    image: "/Golden Mandap Wedding Ceremony.png",
    icon: House,
  },
  {
    name: "Bachelor Party",
    image: "/Lavish Nighttime Wedding Canopy.png",
    icon: PartyPopper,
  },
  {
    name: "Cocktail Party",
    image: "/Lavish Indian Fusion Wedding Buffet.png",
    icon: Wine,
  },
  {
    name: "Private Parties",
    image: "/Joyful Indian Family Celebration.png",
    icon: Users,
  },
  {
    name: "Family Get-Together",
    image: "/Joyful Indian Family Celebration.png",
    icon: Users,
  },
  {
    name: "Reunion Party",
    image: "/Joyful Indian Family Celebration.png",
    icon: Handshake,
  },
  {
    name: "Farewell Party",
    image: "/Farewell and Retirement Celebrations.png",
    icon: Gift,
  },
  {
    name: "Graduation Ceremony",
    image: "/Corporate Summit Networking Reception.png",
    icon: GraduationCap,
  },

  // Corporate and Education
  {
    name: "Corporate Events",
    image: "/Corporate Summit Networking Reception.png",
    icon: Building2,
  },
  {
    name: "Conferences & Seminars",
    image: "/Elegant Banquet Table Inspection.png",
    icon: Presentation,
  },
  {
    name: "Award Ceremonies",
    image: "/Golden Wedding Buffet Under Crystal Lights.png",
    icon: Trophy,
  },
  {
    name: "College Festivals",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: GraduationCap,
  },
  {
    name: "School Events",
    image: "/Joyful Birthday Cake Celebration.png",
    icon: School,
  },

  // Culture and Community
  {
    name: "Festival Celebrations",
    image: "/Joyful Indian Family Celebration.png",
    icon: Sparkles,
  },
  {
    name: "Religious Events",
    image: "/Golden Mandap Wedding Ceremony.png",
    icon: Church,
  },
  {
    name: "Cultural Events",
    image: "/Joyful Indian Family Celebration.png",
    icon: Palette,
  },
  {
    name: "Community Events",
    image: "/Elegant Banquet Table Inspection.png",
    icon: Handshake,
  },

  // Shows and Special Events
  {
    name: "Concerts & Live Shows",
    image: "/Glittering Indian Wedding Dance Stage.png",
    icon: Mic2,
  },
  {
    name: "Fashion Shows",
    image: "/Corporate Summit Networking Reception.png",
    icon: Shirt,
  },
  {
    name: "Sports Events",
    image: "/Corporate Summit Networking Reception.png",
    icon: Trophy,
  },
  {
    name: "Political Events",
    image: "/Corporate Summit Networking Reception.png",
    icon: Landmark,
  },
  {
    name: "Charity & Fundraising Events",
    image: "/Joyful Indian Family Celebration.png",
    icon: HandHeart,
  },
];


// Event Card Component
function EventCard({ event }) {
  const Icon = event.icon;

  return (
    <div
      className="group relative isolate flex aspect-[1.5/1] cursor-default overflow-hidden rounded-[5px] bg-[#30232B] shadow-[0_5px_18px_rgba(0,0,0,0.10)]"
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
            "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.30) 55%, rgba(0,0,0,0.12) 100%)",
        }}
      />

      {/* Bottom Content */}
      <div className="mt-auto flex w-full items-center gap-4 px-6 py-5 sm:px-7">

        {/* Icon */}
        <Icon
          size={16}
          strokeWidth={2}
          className="shrink-0 text-white sm:h-6 sm:w-8"
        />

        {/* Event Name */}
        <h3 className="text-[16px] font-semibold leading-snug text-white sm:text-[19px]">
          {event.name}
        </h3>

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
