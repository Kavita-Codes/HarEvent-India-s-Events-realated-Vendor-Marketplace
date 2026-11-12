import { useMemo, useState } from "react";
import { Search, Sparkles, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CategoryCard from "./CategoryCard";
import CategoryFAQ from "./CategoryFAQ";

function SpecialtySection({ group, search, index }) {
  const reducedMotion = useReducedMotion();
  const specialties = search
    ? group.specialties.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      )
    : group.specialties;

  if (specialties.length === 0) return null;

  return (
    <motion.section
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: reducedMotion ? 0 : (index % 4) * 0.05 }}
      className="rounded-[22px] border border-[#f1e4dc] bg-white p-5 shadow-[0_6px_22px_rgba(54,29,39,0.045)] sm:p-7"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4145A]">
            Specialist services
          </p>
          <h3 className="mt-1 font-poppins text-[20px] font-bold text-[#243B5A]">
            {group.name}
          </h3>
        </div>
        <span className="border border-[#d9cdbd] bg-[#fef0e1] px-3 py-1 text-[11px] font-semibold text-[#243B5A]">
          {specialties.length} {specialties.length === 1 ? "category" : "categories"}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {specialties.map((specialty) => (
          <Link
            key={specialty.id}
            to={specialty.href}
            className="inline-flex min-h-10 items-center border border-[#d9cdbd] bg-[#fffdf9] px-4 py-2 text-[12px] font-medium text-[#51434B] transition duration-200 hover:-translate-y-0.5 hover:border-[#D4145A] hover:bg-[#fef0e1] hover:text-[#243B5A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A]"
          >
            {specialty.name}
          </Link>
        ))}
      </div>
    </motion.section>
  );
}

export default function CategoryDirectory({
  mode,
  items,
  allItems = items,
  filters = [],
  specialtyGroups = [],
}) {
  const reducedMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [vendorView, setVendorView] = useState("services");
  const searching = query.trim().length > 0;
  const isEvents = mode === "events";
  const heroImage = isEvents
    ? "/Golden-Hour Garden Wedding Ceremony.png"
    : "/Elegant Banquet Table Inspection.png";

  const filteredItems = useMemo(() => {
    const source = searching
      ? allItems
      : isEvents
        ? items.filter(
            (item) => activeFilter === "all" || item.group === activeFilter,
          )
        : vendorView === "services"
          ? items
          : [];

    if (!searching) return source;
    const needle = query.trim().toLowerCase();
    return source.filter((item) => item.name.toLowerCase().includes(needle));
  }, [activeFilter, allItems, isEvents, items, query, searching, vendorView]);

  const clearSearch = () => setQuery("");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fffaf6] font-poppins text-[#30232B]">
        <section className="relative isolate min-h-[440px] overflow-hidden bg-[#21151f] text-white sm:min-h-[490px]">
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-55"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(28,16,27,0.97)_0%,rgba(38,20,34,0.86)_48%,rgba(40,18,29,0.3)_100%)]" />
          <div className="absolute -right-8 top-10 -z-10 hidden h-[340px] w-[36%] -skew-x-12 border-l border-white/10 sm:block" />
          <div className="absolute right-[5%] top-24 -z-10 hidden h-[220px] w-[25%] -skew-x-12 border-l border-[#ffb47f]/20 sm:block" />

          <div className="mx-auto flex min-h-[440px] max-w-[1440px] items-center px-5 pb-20 pt-16 sm:min-h-[490px] sm:px-8 sm:pb-24 lg:px-14">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[740px]"
            >
              <Link
                to="/"
                className="mb-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:text-white"
              >
                HarEvent <span className="text-[#ffb47f]">/</span>{" "}
                {isEvents ? "Event directory" : "Vendor directory"}
              </Link>
              <span className="flex w-fit items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ffd4b8] backdrop-blur">
                <Sparkles size={14} />
                {isEvents ? "Every occasion has a story" : "Find your kind of expert"}
              </span>
              <h1 className="mt-5 max-w-[700px] font-playfair text-[42px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[58px] lg:text-[68px]">
                {isEvents ? (
                  <>
                    Make room for
                    <span className="block bg-gradient-to-r from-[#ffcf9f] via-[#ff9d86] to-[#f071a1] bg-clip-text text-transparent">
                      life&apos;s big moments.
                    </span>
                  </>
                ) : (
                  <>
                    The right people.
                    <span className="block bg-gradient-to-r from-[#ffcf9f] via-[#ff9d86] to-[#f071a1] bg-clip-text text-transparent">
                      The beautiful details.
                    </span>
                  </>
                )}
              </h1>
              <p className="mt-4 max-w-[600px] text-[14px] leading-7 text-white/75 sm:text-[16px]">
                {isEvents
                  ? "From the first yes to the final dance, discover celebrations for every chapter and find inspiration to make yours unforgettable."
                  : "Explore the people, services and specialities that bring a celebration to life. Start with a service or search by name."}
              </p>
              <div className="mt-7 flex flex-wrap gap-3 text-[11px] font-medium text-white/80">
                {(isEvents
                  ? [`${items.length} occasions`, "Made for every milestone"]
                  : [`${items.length} service types`, `${allItems.length - items.length} specialities`]
                ).map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 border border-white/15 bg-white/10 px-4 py-2 backdrop-blur"
                  >
                    <span className="h-1.5 w-1.5 bg-[#ffae7a]" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="category-directory"
          className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-12 lg:px-12"
        >
          <div className="relative z-10 -mt-[66px] mb-12 rounded-[22px] border border-white/80 bg-white p-3 shadow-[0_18px_55px_rgba(36,20,31,0.14)] sm:-mt-[76px] sm:mb-14 sm:flex sm:items-center sm:gap-4 sm:p-4">
            <div className="flex h-12 flex-1 items-center gap-3 rounded-[14px] bg-[#fff8f5] px-4 sm:h-14">
              <Search size={19} className="shrink-0 text-[#D4145A]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={
                  isEvents
                    ? "Search weddings, birthdays, celebrations..."
                    : "Search a service or speciality..."
                }
                aria-label={isEvents ? "Search event categories" : "Search vendor categories"}
                className="min-w-0 flex-1 bg-transparent text-[13px] text-[#30232B] outline-none placeholder:text-[#9a8992] sm:text-[14px]"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-[#776970] transition hover:bg-white hover:text-[#D4145A]"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <p className="px-3 pt-2 text-[10px] text-[#8b7b82] sm:pt-0 sm:text-[11px]">
              {searching
                ? `${filteredItems.length} matching ${isEvents ? "events" : "categories"}`
                : isEvents
                  ? "Find a moment that feels like yours"
                  : "All names and categories are from your sheet"}
            </p>
          </div>

          {isEvents && !searching && (
            <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
              {filters.map(({ id, label, Icon }) => {
                const active = activeFilter === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveFilter(id)}
                    className={`inline-flex shrink-0 items-center gap-2 border px-4 py-2.5 text-[11px] font-semibold transition ${
                      active
                        ? "border-[#243B5A] bg-[#243B5A] text-white shadow-[0_8px_18px_rgba(36,59,90,0.16)]"
                        : "border-[#d9cdbd] bg-white text-[#655861] hover:border-[#d3b27e] hover:bg-[#fef0e1] hover:text-[#243B5A]"
                    }`}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          {!isEvents && !searching && (
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4145A]">
                  Browse the directory
                </p>
                <h2 className="mt-1 font-playfair text-[30px] font-bold tracking-[-0.02em] text-[#30232B] sm:text-[36px]">
                  {vendorView === "services" ? "Find your service" : "Explore every speciality"}
                </h2>
              </div>
              <div className="flex border border-[#d9cdbd] bg-white p-1">
                {[
                  ["services", "Service types"],
                  ["specialties", "Specialities"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={vendorView === value}
                    onClick={() => setVendorView(value)}
                    className={`rounded-md px-4 py-2 text-[11px] font-semibold transition ${
                      vendorView === value
                        ? "bg-[#30232B] text-white"
                        : "text-[#756871] hover:text-[#D4145A]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searching && (
            <div className="mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4145A]">
                Search results
              </p>
              <h2 className="mt-1 font-playfair text-[30px] font-bold text-[#30232B]">
                Matches for “{query.trim()}”
              </h2>
            </div>
          )}

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {(!isEvents && !searching ? items : filteredItems).map(
                (category, index) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    index={index}
                  />
                ),
              )}
            </div>
          ) : isEvents || searching || vendorView === "services" ? (
            <div className="rounded-[22px] border border-dashed border-[#e5ccd4] bg-white px-6 py-16 text-center">
              <Sparkles className="mx-auto text-[#D4145A]" size={24} />
              <h2 className="mt-4 font-playfair text-[24px] font-bold text-[#30232B]">
                No exact match yet
              </h2>
              <p className="mx-auto mt-2 max-w-md text-[13px] leading-6 text-[#756871]">
                Try a different search or browse the complete directory.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveFilter("all");
                  setVendorView("services");
                }}
                className="mt-5 rounded-md bg-[#243B5A] px-5 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#D4145A]"
              >
                Show everything
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {specialtyGroups.map((group, index) => (
                <SpecialtySection
                  key={group.name}
                  group={group}
                  search={query}
                  index={index}
                />
              ))}
            </div>
          )}

          {!isEvents && !searching && vendorView === "specialties" && (
            <p className="mt-5 text-center text-[11px] text-[#8b7b82]">
              {allItems.length - items.length} specialities from your category sheet
            </p>
          )}
        </section>

        <section className="mx-auto mb-16 max-w-[1440px] px-5 sm:px-8 lg:px-12">
        </section>
      </main>
      <CategoryFAQ mode={isEvents ? "events" : "vendors"} />
      <Footer />
    </>
  );
}
