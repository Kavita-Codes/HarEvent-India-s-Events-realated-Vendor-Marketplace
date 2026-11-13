
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const eventGroups = [
  {
    title: "Weddings & Milestones",
    description: "Celebrate life's most meaningful moments.",
    events: [
      ["Wedding", "/Opulent Indian Garden Wedding Mandap.png"],
      ["Reception", "/Joyful Newlywed Entrance at Reception.png"],
      ["Engagement", "/Rohan and Eisha’s Floral Engagement.png"],
      ["Anniversary", "/Romantic Anniversary Cake Cutting Celebration.png"],
      ["Sangeet Ceremony", "/Glittering Indian Wedding Dance Stage.png"],
      ["Naming Ceremony", "/Elegant Indian Naming Ceremony Celebration.png"],
      ["Baby Shower", "/Elegant Pastel Baby Shower Celebration.png"],
      ["Birthday", "/Joyful Birthday Cake Celebration.png"],
      ["Housewarming / Griha Pravesh", "/Golden Mandap Wedding Ceremony.png"],
      ["Bachelor Party", "/Lavish Nighttime Wedding Canopy.png"],
      ["Cocktail Party", "/Lavish Indian Fusion Wedding Buffet.png"],
      ["Private Parties", "/Joyful Indian Family Celebration.png"],
      ["Family Get-Together", "/Joyful Indian Family Celebration.png"],
      ["Reunion Party", "/Joyful Indian Family Celebration.png"],
      ["Farewell Party", "/Farewell and Retirement Celebrations.png"],
      ["Graduation Ceremony", "/Corporate Summit Networking Reception.png"],
    ],
  },
  {
    title: "Corporate & Education",
    description: "Bring teams, ideas, and communities together.",
    events: [
      ["Corporate Events", "/Corporate Summit Networking Reception.png"],
      ["Conferences & Seminars", "/Elegant Banquet Table Inspection.png"],
      ["Award Ceremonies", "/Golden Wedding Buffet Under Crystal Lights.png"],
      ["College Festivals", "/Glittering Indian Wedding Dance Stage.png"],
      ["School Events", "/Joyful Birthday Cake Celebration.png"],
    ],
  },
  {
    title: "Culture & Community",
    description: "Honor the traditions and people that connect us.",
    events: [
      ["Festival Celebrations", "/Joyful Indian Family Celebration.png"],
      ["Religious Events", "/Golden Mandap Wedding Ceremony.png"],
      ["Cultural Events", "/Joyful Indian Family Celebration.png"],
      ["Community Events", "/Joyful Indian Family Celebration.png"],
    ],
  },
  {
    title: "Shows & Special Events",
    description: "Make every gathering a moment to remember.",
    events: [
      ["Concerts & Live Shows", "/Glittering Indian Wedding Dance Stage.png"],
      ["Fashion Shows", "/Corporate Summit Networking Reception.png"],
      ["Sports Events", "/Corporate Summit Networking Reception.png"],
      ["Political Events", "/Corporate Summit Networking Reception.png"],
      ["Charity & Fundraising Events", "/Joyful Indian Family Celebration.png"],
    ],
  },
];

function EventCard({ name, image }) {
  return (
    <Link
      to={`/enquiry?category=${encodeURIComponent(name)}&vendor=${encodeURIComponent(name)}`}
      aria-label={`Enquire about ${name}`}
      className="group relative isolate flex aspect-[1.35/1] overflow-hidden rounded-[18px] bg-[#30232B] shadow-[0_8px_24px_rgba(54,29,39,0.12)] outline-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(54,29,39,0.2)] focus-visible:ring-2 focus-visible:ring-[#D4145A] focus-visible:ring-offset-2"
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Light Card Overlay */}
      <span className="absolute inset-0 -z-10 bg-black/0" />

      {/* Soft Bottom Gradient for Text */}
      <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

      <span className="mt-auto flex w-full items-end justify-between gap-3 p-4 sm:p-5">
        <span className="text-[16px] font-semibold leading-snug text-white">
          {name}
        </span>

        <span className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] text-white transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight size={17} />
        </span>
      </span>
    </Link>
  );
}

export default function EventCategories() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white font-poppins text-[#30232B]">

        {/* Hero Section */}
        <section
          className="relative isolate flex min-h-[340px] items-center justify-center overflow-hidden bg-[#21151f] px-5 py-12 text-center text-white sm:min-h-[380px] sm:py-14"
          style={{ minHeight: "clamp(340px, 25vw, 390px)" }}
        >
          <img
            src="/Circle of Henna Hands.png"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />

          {/* Strong Black Overlay - 75% */}
          <div className="absolute inset-0 -z-10 bg-black/75" />

          <div className="max-w-[850px] pt-8 sm:pt-10">
            <p className="text-[14px] font-semibold uppercase tracking-[0.18em] text-[#ffd4b8] sm:text-[16px]">
              HarEvent · Celebrations, made memorable
            </p>

            <h1 className="mt-7 font-playfair text-[42px] font-bold leading-[1.14] sm:mt-8 sm:text-[58px] lg:text-[64px]">
              Make Every Celebration
              <span className="block bg-gradient-to-r from-[#ffcf9f] via-[#ff9d86] to-[#f071a1] bg-clip-text text-transparent">
                Unforgettable
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-[680px] text-[14px] leading-7 text-white/95 sm:mt-6 sm:text-[16px]">
              From weddings and family milestones to corporate gatherings, find
              the occasion and inspiration to bring your celebration to life.
            </p>
          </div>
        </section>

        {/* Event Categories Section */}
        <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12">

          <header className="mb-10 pt-2 text-center sm:mb-12">
            <p className="text-[14px] font-bold uppercase tracking-[0.16em] text-[#D4145A]">
              Explore our collection
            </p>

            <h2 className="mt-3 font-playfair text-[30px] font-bold leading-tight text-[#30232B] sm:text-[38px]">
              Event Categories for Every Occasion
            </h2>

            <p className="mx-auto mt-4 max-w-[720px] text-[14px] leading-6 text-[#756871] sm:text-[16px]">
              From weddings and family milestones to corporate gatherings and
              cultural celebrations, find the occasion you are planning.
            </p>
          </header>

          <div className="space-y-12 sm:space-y-14">
            {eventGroups.map((group) => (
              <section
                key={group.title}
                aria-labelledby={`group-${group.title}`}
              >
                <div className="mb-5">
                  <h3
                    id={`group-${group.title}`}
                    className="font-poppins text-[20px] font-bold text-[#30232B] sm:text-[24px]"
                  >
                    {group.title}
                  </h3>

                  <p className="mt-1 text-[14px] text-[#756871]">
                    {group.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                  {group.events.map(([name, image]) => (
                    <EventCard
                      key={name}
                      name={name}
                      image={image}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}
