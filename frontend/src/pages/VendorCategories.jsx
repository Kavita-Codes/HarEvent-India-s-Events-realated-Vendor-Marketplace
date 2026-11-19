import { useEffect, useRef, useState } from "react";
import {
  ArrowDownWideNarrow,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ListChecks,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import EventVendorChecklistModal from "../components/EventVendorChecklistModal";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { VendorCard } from "../components/Card";
import { eventCategories, getEventCategorySlug } from "../data/eventCategories";
import {
  buildVendorDirectoryPath,
  getVendorCategoriesForEvent,
  parseVendorDirectoryCategories,
} from "../data/eventVendorCategories";
import { vendorListings } from "../data/vendorListings";
import { vendorSubcategories } from "../data/vendorSubcategories";

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
const availableCategories = [
  ...new Set(vendorListings.map((vendor) => vendor.serviceType)),
].sort();
const availableCities = [
  ...new Set(vendorListings.flatMap((vendor) => vendor.cities || [])),
].sort();
const vendorsPerPage = 6;

function vendorMatchesCategory(vendor, category) {
  const normalizedCategory = normalize(category);
  return [vendor.serviceType, vendor.filterCategory, vendor.category]
    .filter(Boolean)
    .some((value) => normalize(value) === normalizedCategory);
}

function VendorDirectory({
  event,
  eventSlug,
  categoryOptions,
  selectedCategories,
  onChecklistVisibilityChange,
}) {
  const navigate = useNavigate();
  const cityMenuRef = useRef(null);
  const activeCategory =
    selectedCategories.length === 1 ? selectedCategories[0] : "All";
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [modalOpener, setModalOpener] = useState(null);
  const selectedCategorySet = new Set(selectedCategories);
  const selectedCategoryKey = selectedCategories.join("\u001F");

  useEffect(() => {
    const closeCityMenu = (event) => {
      if (!cityMenuRef.current?.contains(event.target)) {
        if (cityMenuRef.current) cityMenuRef.current.open = false;
      }
    };

    document.addEventListener("pointerdown", closeCityMenu);
    return () => document.removeEventListener("pointerdown", closeCityMenu);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeSubcategory,
    city,
    maximumPrice,
    minimumPrice,
    search,
    selectedCategoryKey,
    sortOrder,
  ]);

  const minPrice = minimumPrice === "" ? null : Number(minimumPrice);
  const maxPrice = maximumPrice === "" ? null : Number(maximumPrice);
  const eventVendors = event
    ? vendorListings.filter((vendor) => vendor.eventSlugs?.includes(eventSlug))
    : vendorListings;
  const hasEventVendors = eventVendors.length > 0;
  const filteredVendors = eventVendors.filter((vendor) => {
    if (
      !selectedCategories.some((category) =>
        vendorMatchesCategory(vendor, category),
      )
    ) {
      return false;
    }
    if (
      activeCategory !== "All" &&
      !vendorMatchesCategory(vendor, activeCategory)
    ) {
      return false;
    }
    if (
      activeSubcategory &&
      !(vendor.subcategories || []).some(
        (subcategory) => normalize(subcategory) === normalize(activeSubcategory),
      )
    ) {
      return false;
    }
    if (city && !(vendor.cities || []).includes(city)) return false;
    if (minPrice !== null && vendor.priceValue < minPrice) return false;
    if (maxPrice !== null && vendor.priceValue > maxPrice) return false;

    const searchableText = [
      vendor.businessName,
      vendor.category,
      vendor.serviceType,
      vendor.description,
      ...(vendor.services || []),
      ...(vendor.subcategories || []),
    ]
      .join(" ")
      .toLowerCase();
    return searchableText.includes(search.trim().toLowerCase());
  });
  const visibleVendors =
    sortOrder === "price-low"
      ? [...filteredVendors].sort((first, second) => first.priceValue - second.priceValue)
      : sortOrder === "price-high"
        ? [...filteredVendors].sort((first, second) => second.priceValue - first.priceValue)
        : filteredVendors;
  const totalPages = Math.ceil(visibleVendors.length / vendorsPerPage);
  const displayedPage = Math.min(currentPage, Math.max(totalPages, 1));
  const pageVendors = visibleVendors.slice(
    (displayedPage - 1) * vendorsPerPage,
    displayedPage * vendorsPerPage,
  );
  const paginationStart = Math.max(
    1,
    Math.min(displayedPage - 2, totalPages - 4),
  );
  const pageNumbers = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => paginationStart + index,
  );

  const subcategories = vendorSubcategories[activeCategory] || [];
  const enquiryCategory = selectedCategories.join(", ") || "Vendor";
  const enquiryParams = new URLSearchParams({ category: enquiryCategory });
  if (event?.name) enquiryParams.set("event", event.name);
  const appliedFilters = [];

  if (activeCategory !== "All") {
    appliedFilters.push({
      label: activeCategory,
      remove: () => chooseCategory("All"),
    });
  }
  if (activeSubcategory) {
    appliedFilters.push({
      label: activeSubcategory,
      remove: () => setActiveSubcategory(""),
    });
  }
  if (city) {
    appliedFilters.push({ label: city, remove: () => setCity("") });
  }
  if (minimumPrice || maximumPrice) {
    appliedFilters.push({
      label: `₹${minimumPrice || "0"} – ₹${maximumPrice || "No max"}`,
      remove: () => {
        setMinimumPrice("");
        setMaximumPrice("");
      },
    });
  }
  if (search.trim()) {
    appliedFilters.push({
      label: `Search: ${search.trim()}`,
      remove: () => setSearch(""),
    });
  }
  if (
    selectedCategories.length !== categoryOptions.length &&
    activeCategory === "All"
  ) {
    appliedFilters.push({
      label: `${selectedCategories.length} of ${categoryOptions.length} services`,
      remove: () =>
        navigate(
          buildVendorDirectoryPath(
            eventSlug,
            categoryOptions,
            categoryOptions,
          ),
          { replace: true },
        ),
    });
  }

  function toggleCategory(category) {
    const next = new Set(selectedCategories);
    if (next.has(category)) next.delete(category);
    else next.add(category);
    setActiveSubcategory("");
    navigate(
      buildVendorDirectoryPath(eventSlug, [...next], categoryOptions),
      { replace: true },
    );
  }

  function chooseCategory(category) {
    setActiveSubcategory("");
    const next = category === "All" ? categoryOptions : [category];
    navigate(buildVendorDirectoryPath(eventSlug, next, categoryOptions), {
      replace: true,
    });
  }

  function clearFilters() {
    navigate(
      buildVendorDirectoryPath(eventSlug, categoryOptions, categoryOptions),
      { replace: true },
    );
    setActiveSubcategory("");
    setCity("");
    setSearch("");
    setMinimumPrice("");
    setMaximumPrice("");
    setSortOrder("recommended");
  }

  function openChecklist(opener) {
    setModalOpener(opener);
    setIsChecklistOpen(true);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white font-poppins text-[#30232B]">
        <div className="mx-auto max-w-[1480px] px-4 pb-14 pt-7 sm:px-7 lg:px-10 lg:pt-9">
          <header className="flex flex-col gap-5 border-b border-[#F1E7EB] pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#D4145A]">
                HarEvent vendor marketplace
              </p>
              <h1 className="mt-1 text-[28px] font-bold leading-tight text-[#30232B] sm:text-[34px]">
                {event?.name || "Explore Vendors"}
              </h1>
              <p className="mt-1 text-sm text-[#81717A]">
                {visibleVendors.length}{" "}
                {visibleVendors.length === 1 ? "vendor" : "vendors"} match your
                checklist and filters
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {event ? (
                <button
                  type="button"
                  onClick={(clickEvent) =>
                    openChecklist(clickEvent.currentTarget)
                  }
                  aria-haspopup="dialog"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#F0C9D7] bg-[#FFF7FA] px-4 text-sm font-semibold text-[#B41049] shadow-sm transition hover:border-[#D4145A] hover:bg-[#FFF0F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A]"
                >
                  <ListChecks size={17} />
                  View checklist
                </button>
              ) : (
                <Link
                  to="/event-categories"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#F0C9D7] bg-[#FFF7FA] px-4 text-sm font-semibold text-[#B41049] shadow-sm transition hover:border-[#D4145A] hover:bg-[#FFF0F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A]"
                >
                  <ListChecks size={17} />
                  Choose an event
                </Link>
              )}
              <details
                ref={cityMenuRef}
                onKeyDown={(keyboardEvent) => {
                  if (
                    keyboardEvent.key === "Escape" &&
                    cityMenuRef.current?.open
                  ) {
                    cityMenuRef.current.open = false;
                    keyboardEvent.preventDefault();
                    cityMenuRef.current.querySelector("summary")?.focus();
                  }
                }}
                className="group relative min-w-[180px]"
              >
                <summary
                  aria-label="Filter vendors by city"
                  className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-lg border border-[#E8DDE2] bg-white px-3 text-sm text-[#61515A] shadow-sm transition hover:border-[#D4145A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A] [&::-webkit-details-marker]:hidden"
                >
                  <MapPin size={16} className="shrink-0 text-[#D4145A]" />
                  <span className="min-w-0 flex-1 truncate">
                    {city || "All cities"}
                  </span>
                  <ChevronDown
                    size={16}
                    className="shrink-0 text-[#81717A] transition-transform group-open:rotate-180"
                  />
                </summary>
                <div
                  role="group"
                  aria-label="City options"
                  className="absolute right-0 top-full z-40 mt-2 w-full min-w-[200px] overflow-hidden rounded-xl border border-[#F1DDE5] bg-white p-1.5 shadow-[0_12px_30px_rgba(48,35,43,0.16)]"
                >
                  {["", ...availableCities].map((cityOption) => (
                    <button
                      key={cityOption || "all-cities"}
                      type="button"
                      aria-pressed={city === cityOption}
                      onClick={(clickEvent) => {
                        setCity(cityOption);
                        const menu = clickEvent.currentTarget.closest("details");
                        if (menu) menu.open = false;
                      }}
                      className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                        city === cityOption
                          ? "bg-gradient-to-r from-[#D4145A] to-[#FF7628] text-white"
                          : "text-[#493740] hover:bg-gradient-to-r hover:from-[#D4145A] hover:to-[#FF7628] hover:text-white"
                      }`}
                    >
                      {cityOption || "All cities"}
                    </button>
                  ))}
                </div>
              </details>
            </div>
          </header>

          <nav
            aria-label="Vendor service categories"
            className="hide-scrollbar mt-5 flex gap-2 overflow-x-auto pb-2"
          >
            {["All", ...categoryOptions].map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => chooseCategory(category)}
                  className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold shadow-sm transition ${
                    isActive
                      ? "border-[#D4145A] bg-[#FFF0F5] text-[#B41049]"
                      : "border-[#F0DDE4] bg-white text-[#61515A] hover:border-[#E59AB5] hover:text-[#B41049]"
                  }`}
                >
                  {category === "All" && <SlidersHorizontal size={15} />}
                  {category === "All" ? "All services" : category}
                </button>
              );
            })}
          </nav>

          <div className="mt-5 flex items-center justify-between lg:hidden">
            <p className="text-sm font-semibold text-[#30232B]">Refine results</p>
            <button
              type="button"
              onClick={() => setShowFilters((isOpen) => !isOpen)}
              aria-expanded={showFilters}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E8DDE2] bg-white px-3 text-sm font-semibold text-[#61515A]"
            >
              <SlidersHorizontal size={16} />
              Filters
              {showFilters ? <X size={15} /> : null}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 items-start gap-5 lg:grid-cols-[272px_minmax(0,1fr)] lg:gap-6">
            <aside
              aria-label="Vendor filters"
              className={`${
                showFilters ? "block" : "hidden"
              } rounded-2xl border border-[#F1E7EB] bg-white p-4 shadow-[0_4px_16px_rgba(48,35,43,0.04)] lg:block lg:p-5`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#30232B]">Filters</h2>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-medium text-[#81717A] underline decoration-[#D8C8CE] underline-offset-2 hover:text-[#D4145A]"
                >
                  Clear all
                </button>
              </div>

              <label className="mt-4 flex h-10 items-center gap-2 rounded-lg border border-[#E8DDE2] px-3 focus-within:border-[#D4145A]">
                <Search size={16} className="shrink-0 text-[#81717A]" />
                <span className="sr-only">Search vendors</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search vendors"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#A3929A]"
                />
              </label>

              <div className="mt-5 border-t border-[#F1E7EB] pt-4">
                <h3 className="text-sm font-semibold text-[#493740]">Budget</h3>
                <p className="mt-1 text-xs text-[#978891]">Price range in ₹</p>
                <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <label className="min-w-0">
                    <span className="sr-only">Minimum price</span>
                    <input
                      type="number"
                      min="0"
                      value={minimumPrice}
                      onChange={(event) => setMinimumPrice(event.target.value)}
                      placeholder="Min"
                      className="h-10 w-full rounded-lg border border-[#E8DDE2] px-2.5 text-sm outline-none focus:border-[#D4145A]"
                    />
                  </label>
                  <span className="text-xs text-[#978891]">to</span>
                  <label className="min-w-0">
                    <span className="sr-only">Maximum price</span>
                    <input
                      type="number"
                      min="0"
                      value={maximumPrice}
                      onChange={(event) => setMaximumPrice(event.target.value)}
                      placeholder="Max"
                      className="h-10 w-full rounded-lg border border-[#E8DDE2] px-2.5 text-sm outline-none focus:border-[#D4145A]"
                    />
                  </label>
                </div>
              </div>

              <fieldset className="mt-5 border-t border-[#F1E7EB] pt-4">
                <legend className="text-sm font-semibold text-[#493740]">
                  Services
                </legend>
                <div className="mt-3 max-h-[260px] space-y-2 overflow-y-auto pr-1">
                  {categoryOptions.map((category) => (
                    <label
                      key={category}
                      className="flex cursor-pointer items-start gap-2.5 text-sm leading-5 text-[#61515A]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategorySet.has(category)}
                        onChange={() => toggleCategory(category)}
                        className="mt-0.5 h-4 w-4 accent-[#D4145A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A]"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </aside>

            <section aria-label="Vendor results" className="min-w-0">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#30232B]">
                    {activeCategory === "All" ? "Matching vendors" : activeCategory}
                  </h2>
                  <p aria-live="polite" className="mt-1 text-sm text-[#81717A]">
                    {visibleVendors.length} results found
                  </p>
                </div>

                <label className="flex h-10 items-center gap-2 self-start rounded-lg border border-[#E8DDE2] bg-white px-3 text-sm text-[#61515A] sm:self-auto">
                  <ArrowDownWideNarrow size={16} className="text-[#81717A]" />
                  <span className="sr-only">Sort vendor results</span>
                  <select
                    value={sortOrder}
                    onChange={(event) => setSortOrder(event.target.value)}
                    className="bg-transparent outline-none accent-[#D4145A]"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price: low to high</option>
                    <option value="price-high">Price: high to low</option>
                  </select>
                </label>
              </div>

              {appliedFilters.length > 0 && (
                <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-[#F1E7EB] bg-white px-3.5 py-3">
                  <span className="mr-1 text-xs font-semibold uppercase tracking-[0.7px] text-[#81717A]">
                    Applied filters
                  </span>
                  {appliedFilters.map((filter) => (
                    <button
                      key={filter.label}
                      type="button"
                      onClick={filter.remove}
                      aria-label={`Remove ${filter.label} filter`}
                      className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#F0C9D7] bg-[#FFF7FA] px-3 py-1.5 text-xs font-medium text-[#A92D58] transition hover:border-[#D4145A] hover:bg-[#FFF0F5]"
                    >
                      <span className="truncate">{filter.label}</span>
                      <X size={13} className="shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {subcategories.length > 0 && (
                <div className="mb-5 rounded-xl border border-[#F1E7EB] bg-white p-3.5 sm:p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.8px] text-[#81717A]">
                    Popular {activeCategory.toLowerCase()} categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {subcategories.map((subcategory) => {
                      const isActive = activeSubcategory === subcategory;
                      return (
                        <button
                          key={subcategory}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() =>
                            setActiveSubcategory(isActive ? "" : subcategory)
                          }
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                            isActive
                              ? "border-[#D4145A] bg-[#FFF0F5] text-[#B41049]"
                              : "border-[#F0DDE4] bg-white text-[#61515A] hover:border-[#E59AB5] hover:text-[#B41049]"
                          }`}
                        >
                          {subcategory}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {visibleVendors.length > 0 ? (
                <>
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {pageVendors.map((vendor, index) => (
                      <VendorCard key={vendor.id} vendor={vendor} index={index} />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#F1E7EB] pt-5 sm:flex-row">
                      <p className="text-sm text-[#81717A]">
                        Showing {(displayedPage - 1) * vendorsPerPage + 1}–
                        {Math.min(
                          displayedPage * vendorsPerPage,
                          visibleVendors.length,
                        )}{" "}
                        of {visibleVendors.length} vendors
                      </p>
                      <nav
                        aria-label="Vendor result pages"
                        className="flex items-center gap-1.5"
                      >
                        <button
                          type="button"
                          aria-label="Previous page"
                          disabled={displayedPage === 1}
                          onClick={() =>
                            setCurrentPage(Math.max(1, displayedPage - 1))
                          }
                          className="grid h-9 w-9 place-items-center rounded-lg border border-[#F0DDE4] text-[#61515A] transition hover:border-[#D4145A] hover:text-[#B41049] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ChevronLeft size={17} />
                        </button>
                        {pageNumbers.map((page) => (
                          <button
                            key={page}
                            type="button"
                            aria-label={`Page ${page}`}
                            aria-current={
                              displayedPage === page ? "page" : undefined
                            }
                            onClick={() => setCurrentPage(page)}
                            className={`grid h-9 min-w-9 place-items-center rounded-lg px-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A] ${
                              displayedPage === page
                                ? "bg-gradient-to-r from-[#D4145A] to-[#FF7628] text-white shadow-sm"
                                : "border border-[#F0DDE4] text-[#61515A] hover:border-[#D4145A] hover:text-[#B41049]"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          type="button"
                          aria-label="Next page"
                          disabled={displayedPage === totalPages}
                          onClick={() =>
                            setCurrentPage(
                              Math.min(totalPages, displayedPage + 1),
                            )
                          }
                          className="grid h-9 w-9 place-items-center rounded-lg border border-[#F0DDE4] text-[#61515A] transition hover:border-[#D4145A] hover:text-[#B41049] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ChevronRight size={17} />
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#E8DDE2] bg-white px-6 py-10 text-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#FFF0F5] text-[#D4145A]">
                    <Search size={21} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-[#30232B]">
                    {hasEventVendors
                      ? "No vendors match these filters"
                      : `No ${event?.name || "event"} vendors yet`}
                  </h3>
                  <p className="mt-1 max-w-md text-sm leading-6 text-[#81717A]">
                    {hasEventVendors
                      ? "Try another city, widen your budget, or clear a service filter. Vendor availability can vary by location."
                      : `There are no ${event?.name || "event"} listings yet. Wedding vendors are kept in the Wedding category and will not appear here.`}
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E8DDE2] bg-white px-4 text-sm font-semibold text-[#61515A] transition hover:border-[#D4145A] hover:text-[#B41049]"
                    >
                      Clear filters
                    </button>
                    <Link
                      to={`/enquiry?${enquiryParams.toString()}`}
                      className="inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-4 text-sm font-semibold text-white transition hover:brightness-95"
                    >
                      Send an enquiry
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
      {event && isChecklistOpen && (
        <EventVendorChecklistModal
          event={event}
          initialCategories={selectedCategories}
          opener={modalOpener}
          onClose={() => setIsChecklistOpen(false)}
          onVisibilityChange={onChecklistVisibilityChange}
        />
      )}
    </>
  );
}

const VendorCategories = ({ onChecklistVisibilityChange }) => {
  const { eventSlug, categorySlug } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const legacySearchParams = new URLSearchParams(search);
  const legacyEventName = legacySearchParams.get("event");
  const legacyCategories = legacySearchParams.get("categories");
  const event = eventCategories.find(
    (category) => getEventCategorySlug(category.name) === eventSlug,
  );
  const categoryOptions = event
    ? getVendorCategoriesForEvent(eventSlug)
    : availableCategories;
  const selectedCategories = categorySlug
    ? parseVendorDirectoryCategories(categorySlug, categoryOptions)
    : categoryOptions;

  useEffect(() => {
    if (eventSlug || !legacyEventName) return;

    const legacyEvent = eventCategories.find(
      (category) =>
        category.name.toLowerCase() === legacyEventName.toLowerCase(),
    );
    if (!legacyEvent) return;

    const legacyEventSlug = getEventCategorySlug(legacyEvent.name);
    const legacyCategoryOptions =
      getVendorCategoriesForEvent(legacyEventSlug);
    const requestedCategories = legacyCategories
      ? legacyCategories.split(",").map((category) => category.trim())
      : legacyCategoryOptions;
    const categories = legacyCategoryOptions.filter((category) =>
      requestedCategories.includes(category),
    );

    navigate(
      buildVendorDirectoryPath(
        legacyEventSlug,
        categories,
        legacyCategoryOptions,
      ),
      { replace: true },
    );
  }, [eventSlug, legacyCategories, legacyEventName, navigate]);

  return (
    <VendorDirectory
      event={event}
      eventSlug={eventSlug || "all"}
      categoryOptions={categoryOptions}
      selectedCategories={selectedCategories}
      onChecklistVisibilityChange={onChecklistVisibilityChange}
    />
  );
};

export default VendorCategories;
