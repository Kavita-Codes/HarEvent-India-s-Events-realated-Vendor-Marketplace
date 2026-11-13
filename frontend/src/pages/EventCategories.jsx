
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const eventGroups = [
  {
    title: "Weddings and Wedding Functions",
    events: [
      {
        name: "Wedding",
        description: "Venues, decor, photography and everything for your big day.",
        image: "/Opulent Indian Garden Wedding Mandap.png",
      },
      {
        name: "Engagement",
        description: "Beautiful setups and services for your ring ceremony.",
        image: "/Rohan and Eisha’s Floral Engagement.png",
      },
      {
        name: "Sangeet Ceremony",
        description: "Music, dance and decor for a night to remember.",
        image: "/Glittering Indian Wedding Dance Stage.png",
      },
      {
        name: "Reception",
        description: "Elegant venues, catering and entertainment for the evening.",
        image: "/Joyful Newlywed Entrance at Reception.png",
      },
      {
        name: "Cocktail Party",
        description: "Stylish venues, drinks and music for a glamorous night.",
        image: "/Lavish Nighttime Wedding Canopy.png",
      },
      {
        name: "Bachelor Party",
        description: "Venues, music and entertainment for the pre-wedding party.",
        image: "/Lavish Indian Fusion Wedding Buffet.png",
      },
    ],
  },
  {
    title: "Family and Personal Celebrations",
    events: [
      {
        name: "Birthday",
        description: "Venues, cakes, decor and fun for every age.",
        image: "/Joyful Birthday Cake Celebration.png",
      },
      {
        name: "Anniversary",
        description: "Romantic venues, dining and decor for your milestone.",
        image: "/Romantic Anniversary Cake Cutting Celebration.png",
      },
      {
        name: "Naming Ceremony & Baby Shower",
        description: "Warm, welcoming setups to celebrate your little one.",
        image: "/Elegant Pastel Baby Shower Celebration.png",
      },
      {
        name: "Housewarming (Griha Pravesh)",
        description: "Puja, decor and catering for your new home.",
        image: "/Elegant Indian Naming Ceremony Celebration.png",
      },
      {
        name: "Family Get-Together",
        description: "Easy planning for gatherings with the people you love.",
        image: "/Joyful Indian Family Celebration.png",
      },
      {
        name: "Private Parties",
        description: "Venues, food and music for a party your way.",
        image: "/Golden Wedding Buffet Under Crystal Lights.png",
      },
      {
        name: "Reunion Party",
        description: "Bring old friends together with the right venue and food.",
        image: "/Joyful Indian Family Celebration.png",
      },
    ],
  },
  {
    title: "Corporate and Professional Events",
    events: [
      {
        name: "Corporate Events",
        description: "Venues, catering, stage and sound for company events.",
        image: "/Corporate Summit Networking Reception.png",
      },
      {
        name: "Conferences & Seminars",
        description: "Halls, AV, catering and hosts for larger gatherings.",
        image: "/Elegant Banquet Table Inspection.png",
      },
      {
        name: "Award Ceremonies",
        description: "Stage, lighting, anchors and photography for recognition nights.",
        image: "/Golden Wedding Buffet Under Crystal Lights.png",
      },
      {
        name: "Charity & Fundraising Events",
        description: "Well-run events for causes that matter.",
        image: "/Joyful Indian Family Celebration.png",
      },
    ],
  },
  {
    title: "College and School Events",
    events: [
      {
        name: "College Festivals",
        description: "Stage, sound, decor and crew for campus fests.",
        image: "/Glittering Indian Wedding Dance Stage.png",
      },
      {
        name: "School Events",
        description: "Annual days, functions and celebrations made simple.",
        image: "/Joyful Birthday Cake Celebration.png",
      },
      {
        name: "Farewell Party",
        description: "A memorable send-off with venues, food and entertainment.",
        image: "/Farewell and Retirement Celebrations.png",
      },
      {
        name: "Graduation Ceremony",
        description: "Celebrate achievements with venues, photos and catering.",
        image: "/Corporate Summit Networking Reception.png",
      },
    ],
  },
  {
    title: "Festivals, Religious and Community Events",
    events: [
      {
        name: "Festival Celebrations",
        description: "Decor, food and entertainment for festive gatherings.",
        image: "/Joyful Indian Family Celebration.png",
      },
      {
        name: "Religious Events",
        description: "Pandits, puja arrangements and venues for ceremonies.",
        image: "/Golden Mandap Wedding Ceremony.png",
      },
      {
        name: "Cultural Events",
        description: "Performers, stage and decor for traditions and arts.",
        image: "/Joyful Indian Family Celebration.png",
      },
      {
        name: "Community Events",
        description: "Halls, catering and logistics for community gatherings.",
        image: "/Elegant Banquet Table Inspection.png",
      },
    ],
  },
  {
    title: "Shows and Public Events",
    events: [
      {
        name: "Concerts & Live Shows",
        description: "Stage, sound, lighting and crew for live performances.",
        image: "/Glittering Indian Wedding Dance Stage.png",
      },
      {
        name: "Fashion Shows",
        description: "Runway setups, lighting and styling teams.",
        image: "/Corporate Summit Networking Reception.png",
      },
      {
        name: "Sports Events",
        description: "Venues, stage and crew for tournaments and matches.",
        image: "/Corporate Summit Networking Reception.png",
      },
      {
        name: "Political Events",
        description: "Stage, sound and logistics for meetings and gatherings.",
        image: "/Corporate Summit Networking Reception.png",
      },
    ],
  },
];

const pageTitle =
  "Event Categories | Find Vendors for Every Occasion | HarEvent";

const pageDescription =
  "Explore every event on HarEvent, from weddings and birthdays to corporate events and festivals, and find venues, decorators, caterers, photographers and more.";

// Event Card
function EventCard({ event }) {
  return (
    <Link
      to={`/enquiry?category=${encodeURIComponent(event.name)}&vendor=${encodeURIComponent(event.name)}`}
      aria-label={`Explore ${event.name}`}
      className="group relative flex aspect-square overflow-hidden rounded-[18px] bg-[#30232B] shadow-[0_8px_24px_rgba(54,29,39,0.12)] outline-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(54,29,39,0.2)] focus-visible:ring-2 focus-visible:ring-[#D4145A] focus-visible:ring-offset-2"
      style={{ aspectRatio: "1.5 / 1" }}
    >
      {/* Background Image */}
      <img
        src={event.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Strong Bottom Black Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 25%, rgba(0,0,0,0.30) 55%, rgba(0,0,0,0.02) 100%)",
        }}
      />

      {/* Card Text */}
      <div className="relative z-20 mt-auto w-full p-4 sm:p-5">
        <h3 className="text-[18px] font-semibold leading-snug text-white drop-shadow-md">
          {event.name}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-[14px] leading-5 text-white drop-shadow-md">
          {event.description}
        </p>
      </div>
    </Link>
  );
}

export default function EventCategories() {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const visibleGroups = useMemo(
    () =>
      eventGroups
        .map((group) => ({
          ...group,
          events: group.events.filter(
            (event) =>
              !normalizedQuery ||
              `${event.name} ${event.description} ${group.title}`
                .toLowerCase()
                .includes(normalizedQuery)
          ),
        }))
        .filter((group) => group.events.length > 0),
    [normalizedQuery]
  );

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag = document.querySelector(
      'meta[name="description"]'
    );

    const previousDescription =
      descriptionTag?.getAttribute("content") ?? null;

    const createdDescriptionTag = !descriptionTag;
    const metaDescription =
      descriptionTag ?? document.createElement("meta");

    document.title = pageTitle;

    if (createdDescriptionTag) {
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute("content", pageDescription);

    return () => {
      document.title = previousTitle;

      if (createdDescriptionTag) {
        metaDescription.remove();
      } else if (previousDescription !== null) {
        metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white font-poppins text-[#30232B]">

        {/* Hero Section */}
        <section
          className="relative isolate flex min-h-[300px] items-center justify-center overflow-hidden bg-[#21151f] px-5 py-10 text-center text-white sm:min-h-[340px] sm:py-12"
          style={{ minHeight: "clamp(300px, 22vw, 350px)" }}
        >
          <img
            src="/Circle of Henna Hands.png"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 -z-10 bg-black/65" />

          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#21151d]/40 via-transparent to-[#21151d]/40" />

          <div className="max-w-[850px] pt-4 sm:pt-6">
            <p className="text-[14px] font-semibold uppercase tracking-[0.18em] text-[#ffd4b8] sm:text-[16px]">
              HarEvent · Celebrations, made memorable
            </p>

            <h1 className="mt-6 font-playfair text-[42px] font-bold leading-[1.14] sm:mt-8 sm:text-[58px] lg:text-[64px]">
              Event Categories

              <span className="block bg-gradient-to-r from-[#ffcf9f] via-[#ff9d86] to-[#f071a1] bg-clip-text text-transparent">
                Whatever you're celebrating, start here.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-[760px] text-[14px] leading-7 text-white/95 sm:mt-6 sm:text-[16px]">
              Choose your event and explore the vendors you need, from venues
              and decorators to caterers, photographers and entertainers.
            </p>
          </div>
        </section>

        {/* Event Categories */}
        <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-12 lg:px-12">

          {/* Search Bar */}
          <div className="mb-9 rounded-[18px] border border-[#eee5dd] bg-white p-3 shadow-[0_8px_24px_rgba(54,29,39,0.07)] sm:mb-11 sm:p-4">
            <label className="flex h-12 items-center gap-3 rounded-[14px] bg-[#faf8f5] px-4 sm:h-14">
              <Search size={19} className="shrink-0 text-[#D4145A]" />

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for an event, for example Birthday"
                aria-label="Search event categories"
                className="min-w-0 flex-1 bg-transparent text-[14px] text-[#30232B] outline-none placeholder:text-[#9a8992] sm:text-[16px]"
              />
            </label>
          </div>

          {/* Heading */}
          <header className="mb-9 text-center sm:mb-11">
            <p className="text-[14px] font-bold uppercase tracking-[0.16em] text-[#D4145A]">
              Explore our collection
            </p>

            <h2 className="mt-2 font-playfair text-[30px] font-bold leading-tight text-[#30232B] sm:text-[38px]">
              Event Categories
            </h2>

            <p className="mx-auto mt-3 max-w-[720px] text-[14px] leading-6 text-[#756871] sm:text-[16px]">
              Choose an occasion to discover the services and vendors that can
              bring it to life.
            </p>
          </header>

          {/* Event Groups */}
          {visibleGroups.length > 0 ? (
            <div className="space-y-12 sm:space-y-14">
              {visibleGroups.map((group) => (
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
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                    {group.events.map((event) => (
                      <EventCard key={event.name} event={event} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="rounded-[18px] border border-dashed border-[#e8d9d3] px-6 py-12 text-center">
              <p className="text-[16px] font-semibold text-[#30232B]">
                No event categories found
              </p>

              <p className="mt-2 text-[14px] text-[#756871]">
                Try another search, such as Wedding or Birthday.
              </p>
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        {/* <section className="mx-auto max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12">
          <div className="flex flex-col gap-5 rounded-[22px] bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-6 py-8 text-white sm:px-9 sm:py-9 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-playfair text-[26px] font-bold sm:text-[32px]">
                Planning something different?
              </h2>

              <p className="mt-2 text-[14px] leading-6 text-white/90 sm:text-[16px]">
                Share your requirements and connect with the right vendors.
              </p>
            </div>

            <Link
              to="/enquiry?category=Event%20Planning&vendor=Event%20Planner"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-5 text-[14px] font-semibold text-[#B70D45] transition hover:-translate-y-0.5 hover:bg-[#fff7f2] sm:text-[16px] lg:self-auto"
            >
              Send an Inquiry
              <ArrowRight size={16} />
            </Link>
          </div>
        </section> */}


<section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
  <div
    className="relative flex min-h-[260px] flex-col justify-center gap-8 overflow-hidden rounded-[24px] px-7 py-11 text-white shadow-[0_15px_35px_rgba(212,20,90,0.18)] sm:px-10 sm:py-14 lg:min-h-[280px] lg:flex-row lg:items-center lg:justify-between lg:px-14"
    style={{
      background: "linear-gradient(110deg, #A90D48 0%, #D4145A 48%, #FF7628 100%)",
    }}
  >
    {/* Decorative Circles */}
    <div className="pointer-events-none absolute -right-16 -top-28 h-80 w-80 rounded-full border border-white/10" />
    <div className="pointer-events-none absolute -right-6 -top-16 h-60 w-60 rounded-full border border-white/10" />
    <div className="pointer-events-none absolute -bottom-32 right-[30%] h-64 w-64 rounded-full bg-white/5 blur-3xl" />

    {/* Left Content */}
    <div className="relative z-10 max-w-[680px]">
      <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-white">
        HAR EVENT · MAKE IT MEMORABLE
      </p>

      <h2 className="font-playfair text-[30px] font-bold leading-tight text-white sm:text-[38px] lg:text-[42px]">
        Planning Something Different?
      </h2>

      <p className="mt-4 max-w-[570px] text-[14px] leading-7 text-white sm:text-[16px]">
        Every celebration is unique. Tell us what you have in mind,
        and let us help you find the right vendors to make it special.
      </p>

      <p className="mt-5 text-[14px] font-medium text-white">
        Your celebration, your way.
      </p>
    </div>

    {/* Right Button */}
    <div className="relative z-10 shrink-0">
      <Link
        to="/enquiry?category=Event%20Planning&vendor=Event%20Planner"
        className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#D4145A] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#fff5f5] hover:shadow-xl sm:px-10"
      >
        <span>Plan Your Event</span>

        <ArrowRight
          size={19}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>

      <p className="mt-4 text-center text-[12px] font-medium text-white">
        Let's get your celebration started
      </p>
    </div>
  </div>
</section>

      </main>

      <Footer />
    </>
  );
}
