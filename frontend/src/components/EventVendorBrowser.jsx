import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import CategoryCard from "./CategoryCard";
import { vendorListings } from "../data/vendorListings";

const priceRanges = [
  { id: "under-25000", label: "Under ₹25,000", matches: (price) => price < 25000 },
  { id: "25000-50000", label: "₹25,000 – ₹50,000", matches: (price) => price >= 25000 && price <= 50000 },
  { id: "50000-100000", label: "₹50,000 – ₹1 Lakh", matches: (price) => price > 50000 && price <= 100000 },
  { id: "over-100000", label: "₹1 Lakh and above", matches: (price) => price > 100000 },
  { id: "on-request", label: "Price on request", matches: (price) => price == null },
];

export default function EventVendorBrowser({ event, vendors }) {
  const [query, setQuery] = useState("");
  const [activeVendor, setActiveVendor] = useState("all");
  const [selectedPrices, setSelectedPrices] = useState([]);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredVendors = useMemo(
    () => {
      const selectedPriceFilters = priceRanges.filter((range) =>
        selectedPrices.includes(range.id),
      );

      return vendors.filter((vendor) => {
        const listing = vendorListings.find(
          (item) => item.serviceType === vendor.sourceName,
        );
        const matchesVendor =
          activeVendor === "all" || vendor.slug === activeVendor;
        const matchesSearch =
          !normalizedQuery ||
          vendor.name.toLowerCase().includes(normalizedQuery) ||
          vendor.specialties.some((specialty) =>
            specialty.name.toLowerCase().includes(normalizedQuery),
          ) ||
          listing?.businessName.toLowerCase().includes(normalizedQuery) ||
          listing?.location.toLowerCase().includes(normalizedQuery);
        const matchesPrice =
          selectedPriceFilters.length === 0 ||
          selectedPriceFilters.some((range) =>
            range.matches(listing?.priceValue),
          );
        return matchesVendor && matchesSearch && matchesPrice;
      });
    },
    [activeVendor, normalizedQuery, selectedPrices, vendors],
  );

  return (
    <section className="mt-16 border-t border-[#e8dfd3] pt-10 sm:mt-20 sm:pt-14">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[14px] font-bold uppercase tracking-[0.16em] text-[#D4145A]">
            {event.name} service directory
          </p>
          <h2 className="mt-2 font-poppins text-[28px] font-bold leading-tight text-[#243B5A] sm:text-[38px]">
            Find the right people for {event.name}
          </h2>
          <p className="mt-2 max-w-[650px] text-[14px] leading-6 text-[#756871]">
            Compare event services, check starting prices, and book the right
            professional for your celebration.
          </p>
        </div>

        {vendors.length > 0 && (
          <label className="flex h-12 w-full items-center gap-3 border border-[#d9cdbd] bg-white px-4 lg:max-w-[350px]">
            <Search size={17} className="shrink-0 text-[#D4145A]" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search service or speciality"
              aria-label={`Search ${event.name} vendor services`}
              className="min-w-0 flex-1 bg-transparent font-poppins text-[14px] text-[#243B5A] outline-none placeholder:text-[#9a8992]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear vendor search"
                className="text-[#756871] transition hover:text-[#D4145A]"
              >
                <X size={15} />
              </button>
            )}
          </label>
        )}
      </div>

      {vendors.length > 0 && (
        <>
          <div className="mt-7 grid gap-6 rounded-xl border border-[#eadfd4] bg-white p-5 sm:p-6 lg:grid-cols-[minmax(210px,0.7fr)_2fr]">
            <div>
              <label
                htmlFor="event-vendor-filter"
                className="mb-2 block text-[14px] font-semibold text-[#51434B]"
              >
                Filter by vendor service
              </label>
              <select
                id="event-vendor-filter"
                value={activeVendor}
                onChange={(event) => setActiveVendor(event.target.value)}
                className="h-11 w-full border border-[#d9cdbd] bg-white px-3 font-poppins text-[14px] text-[#243B5A] outline-none focus:border-[#D4145A] focus:ring-1 focus:ring-[#D4145A]"
              >
                <option value="all">All {vendors.length} services</option>
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.slug}>
                    {vendor.name}
                  </option>
                ))}
              </select>
            </div>
            <fieldset>
              <legend className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-[#51434B]">
                <SlidersHorizontal size={14} className="text-[#D4145A]" />
                Starting price
              </legend>
              <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
                {priceRanges.map((range) => (
                  <label
                    key={range.id}
                    className="flex cursor-pointer items-center gap-2 text-[14px] text-[#51434B]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes(range.id)}
                      onChange={() =>
                        setSelectedPrices((current) =>
                          current.includes(range.id)
                            ? current.filter((value) => value !== range.id)
                            : [...current, range.id],
                        )
                      }
                      className="h-4 w-4 accent-[#D4145A]"
                    />
                    {range.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <p
            className="mt-5 text-[14px] font-medium text-[#756871]"
            aria-live="polite"
          >
            Showing {filteredVendors.length} of {vendors.length} services
          </p>
        </>
      )}

      {filteredVendors.length > 0 ? (
        <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredVendors.map((vendor, index) => {
            const listing = vendorListings.find(
              (item) => item.serviceType === vendor.sourceName,
            );
            const bookingVendor = listing?.businessName ?? vendor.name;
            const bookingCategory = listing?.category ?? vendor.name;

            return (
              <CategoryCard
                key={vendor.id}
                bookingHref={`/enquiry?event=${encodeURIComponent(event.name)}&category=${encodeURIComponent(bookingCategory)}&vendor=${encodeURIComponent(bookingVendor)}`}
                priceLabel={listing?.priceFrom}
                priceNote={listing?.priceNote}
                category={{
                  ...vendor,
                  name: listing?.businessName ?? vendor.name,
                  image: listing?.portfolioImage ?? vendor.image,
                  href: listing
                    ? `${listing.profileUrl}?event=${encodeURIComponent(event.name)}`
                    : `${vendor.href}?event=${encodeURIComponent(event.name)}`,
                  metaLabel: listing
                    ? listing.category
                    : `${vendor.specialties.length} specialit${vendor.specialties.length === 1 ? "y" : "ies"}`,
                  description: listing
                    ? listing.description
                    : vendor.specialties.length > 0
                      ? `${vendor.specialties.length} ${vendor.name.toLowerCase()} specialit${vendor.specialties.length === 1 ? "y" : "ies"} available for ${event.name}.`
                      : `Explore ${vendor.name.toLowerCase()} services for ${event.name}. Request a quote based on your requirements.`,
                }}
                index={index}
                detailLabel={listing ? "View vendor details" : "View service details"}
              />
            );
          })}
        </div>
      ) : vendors.length === 0 ? (
        <div className="mt-7 border border-[#eadfd4] bg-white px-6 py-10 text-center">
          <p className="font-poppins text-[14px] font-bold uppercase tracking-[0.14em] text-[#D4145A]">
            None listed
          </p>
          <h3 className="mt-2 font-poppins text-[18px] font-bold text-[#243B5A]">
            Currently no vendors available for {event.name}
          </h3>
          <p className="mx-auto mt-2 max-w-[480px] text-[14px] leading-6 text-[#756871]">
            There are no vendors listed in this event category right now.
          </p>
        </div>
      ) : (
        <div className="mt-3 border border-dashed border-[#d9cdbd] bg-white px-6 py-12 text-center">
          <h3 className="font-poppins text-[18px] font-bold text-[#243B5A]">
            No matching vendor services
          </h3>
          <p className="mt-2 text-[14px] text-[#756871]">
            Try another search or clear the selected service filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveVendor("all");
              setSelectedPrices([]);
            }}
            className="mt-4 border border-[#D4145A] px-4 py-2 font-poppins text-[14px] font-semibold text-[#D4145A] transition hover:bg-[#D4145A] hover:text-white"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
