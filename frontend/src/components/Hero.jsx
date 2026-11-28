import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  CalendarDays,
  Camera,
  MapPin,
  ChevronDown,
  Star,
  X,
} from "lucide-react";
import { eventCategories, getEventCategorySlug } from "../data/eventCategories";
import {
  buildVendorDirectoryPath,
  getVendorCategoriesForEvent,
} from "../data/eventVendorCategories";
import { vendorCategoryNames } from "../data/vendorCategories";
import { indianCities } from "../data/cities";

// All available event types from eventCategories
const eventOptions = eventCategories.map((e) => e.name);

// Fallback all vendor options
const defaultVendorOptions = vendorCategoryNames;

const eventCategoryAliases = {
  Weddings: "Wedding",
  Birthdays: "Birthday",
  Engagements: "Engagement",
  "Baby Showers": "Baby Shower",
  Anniversaries: "Anniversary",
  Receptions: "Reception",
  "Pre-Wedding Events": "Wedding",
  "Naming Ceremonies": "Naming Ceremony",
};

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

function findVendorCategory(value, categories) {
  if (!value) return null;
  const normalizedValue = normalize(value);
  const singularValue = normalizedValue.replace(/s$/, "");

  return (
    categories.find((category) => normalize(category) === normalizedValue) ||
    categories.find(
      (category) => normalize(category).replace(/s$/, "") === singularValue,
    ) ||
    categories.find((category) => normalize(category).includes(singularValue)) ||
    null
  );
}

const rotatingKeywords = [
  "Venues",
  "Photographers",
  "Caterers",
  "Decorators",
  "Event Planner",
  "Wedding Planner",
  "Makeup Artists",
];

/* Entrance presets: the hero plays on mount (it is above the fold), timed so
   the pieces land just as the brand intro lifts away. */
const EASE_OUT = [0.22, 1, 0.36, 1];

const rise = (delay) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE_OUT },
});

/* Opacity only: the search card hosts a `fixed` dropdown backdrop, and any
   transform on an ancestor would break that positioning. */
const fade = (delay) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.7, delay, ease: EASE_OUT },
});

function Hero() {
  const navigate = useNavigate();
  const [eventType, setEventType] = useState("");
  const [vendorCategory, setVendorCategory] = useState("");
  const [location, setLocation] = useState("");
  const [searchError, setSearchError] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  // Tracks whether the user is actively typing a search filter in the field
  const [isTypingEvent, setIsTypingEvent] = useState(false);
  const [isTypingVendor, setIsTypingVendor] = useState(false);

  const searchCardRef = useRef(null);

  const [keywordIndex, setKeywordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Global click outside listener to close dropdowns
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (searchCardRef.current && !searchCardRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("touchstart", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("touchstart", handleDocumentClick);
    };
  }, []);

  // Compute vendor categories based on currently selected eventType
  const currentEventName = eventCategoryAliases[eventType.trim()] || eventType.trim();
  const currentSelectedEvent = eventCategories.find(
    (event) => event.name.toLowerCase() === currentEventName.toLowerCase(),
  );
  const currentEventSlug = currentSelectedEvent
    ? getEventCategorySlug(currentSelectedEvent.name)
    : "all";

  const availableVendorOptions = currentSelectedEvent
    ? getVendorCategoriesForEvent(currentEventSlug)
    : defaultVendorOptions;

  // Filtered lists based on user typing directly in the input
  const filteredEventOptions =
    isTypingEvent && eventType.trim()
      ? eventOptions.filter((option) =>
          option.toLowerCase().includes(eventType.trim().toLowerCase()),
        )
      : eventOptions;

  const filteredVendorOptions =
    isTypingVendor && vendorCategory.trim()
      ? availableVendorOptions.filter((option) =>
          option.toLowerCase().includes(vendorCategory.trim().toLowerCase()),
        )
      : availableVendorOptions;

  const trimmedLocation = location.trim().toLowerCase();
  const filteredCities = trimmedLocation
    ? indianCities
        .filter((city) => city.toLowerCase().includes(trimmedLocation))
        .slice(0, 8)
    : [];

  useEffect(() => {
    const word = rotatingKeywords[keywordIndex];
    const delay = isDeleting ? 45 : typedText === word ? 1600 : 90;

    const timer = setTimeout(
      () => {
        if (!isDeleting && typedText === word) {
          setIsDeleting(true);
        } else if (isDeleting && typedText === "") {
          setIsDeleting(false);
          setKeywordIndex((index) => (index + 1) % rotatingKeywords.length);
        } else {
          setTypedText(word.slice(0, typedText.length + (isDeleting ? -1 : 1)));
        }
      },
      isDeleting && typedText === "" ? 280 : delay,
    );

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, keywordIndex]);

  const selectOption = (type, value) => {
    if (type === "event") {
      setEventType(value);
      setIsTypingEvent(false);
      // Reset vendor category if it doesn't match the new event's categories
      const nextEventName = eventCategoryAliases[value] || value;
      const nextEvt = eventCategories.find(
        (e) => e.name.toLowerCase() === nextEventName.toLowerCase(),
      );
      if (nextEvt) {
        const nextSlug = getEventCategorySlug(nextEvt.name);
        const nextCategories = getVendorCategoriesForEvent(nextSlug);
        if (vendorCategory && !findVendorCategory(vendorCategory, nextCategories)) {
          setVendorCategory("");
        }
      }
    } else {
      setVendorCategory(value);
      setIsTypingVendor(false);
    }

    setSearchError("");
    setOpenDropdown(null);
  };

  const handleLocationChange = (e) => {
    const nextValue = e.target.value;
    setLocation(nextValue);
    setSearchError("");

    if (nextValue.trim().length > 0) {
      setOpenDropdown("city");
    } else if (openDropdown === "city") {
      setOpenDropdown(null);
    }
  };

  const handleSearch = (submitEvent) => {
    submitEvent.preventDefault();

    const hasSelection =
      Boolean(eventType.trim()) ||
      Boolean(vendorCategory.trim()) ||
      Boolean(location.trim());

    if (!hasSelection) {
      setSearchError(
        "Please select an Event Type, Vendor Category, or enter a City to search.",
      );
      return;
    }

    setSearchError("");
    setOpenDropdown(null);

    const eventName = eventCategoryAliases[eventType] || eventType;
    const selectedEvent = eventCategories.find(
      (event) => event.name.toLowerCase() === eventName.toLowerCase(),
    );
    const eventSlug = selectedEvent
      ? getEventCategorySlug(selectedEvent.name)
      : "all";
    const categories = selectedEvent
      ? getVendorCategoriesForEvent(eventSlug)
      : defaultVendorOptions;

    const matchedCategory = vendorCategory
      ? findVendorCategory(vendorCategory, categories)
      : null;

    // Never pass empty array: if category is chosen, use it; otherwise show all categories for that event
    const selectedCategories = matchedCategory
      ? [matchedCategory]
      : categories;

    const path = buildVendorDirectoryPath(
      eventSlug,
      selectedCategories,
      categories,
    );
    const searchParams = new URLSearchParams();

    if (location.trim()) searchParams.set("city", location.trim());

    const query = searchParams.toString();
    navigate(query ? `${path}?${query}` : path);
  };

  const renderCombobox = (
    type,
    value,
    setValue,
    setIsTyping,
    placeholder,
    options,
    Icon,
  ) => {
    const isOpen = openDropdown === type;

    const handleInputChange = (e) => {
      const val = e.target.value;
      setValue(val);
      setIsTyping(true);
      setSearchError("");
      setOpenDropdown(type);

      if (type === "event") {
        const nextEventName = eventCategoryAliases[val.trim()] || val.trim();
        const nextEvt = eventCategories.find(
          (item) => item.name.toLowerCase() === nextEventName.toLowerCase(),
        );
        if (nextEvt) {
          const nextSlug = getEventCategorySlug(nextEvt.name);
          const nextCategories = getVendorCategoriesForEvent(nextSlug);
          if (vendorCategory && !findVendorCategory(vendorCategory, nextCategories)) {
            setVendorCategory("");
          }
        }
      }
    };

    const handleInputFocus = (e) => {
      setOpenDropdown(type);
      setIsTyping(false);
      e.target.select();
    };

    const handleClear = (e) => {
      e.stopPropagation();
      setValue("");
      setIsTyping(false);
      if (type === "event") {
        setVendorCategory("");
      }
      setOpenDropdown(type);
    };

    return (
      <div className="relative w-full min-w-0">
        <div className="flex h-[44px] w-full min-w-0 items-center gap-2 rounded-[7px] border border-white/35 bg-white/5 px-3 transition-colors hover:bg-white/10 focus-within:bg-white/10">
          <Icon size={16} strokeWidth={2} className="shrink-0 text-white" />

          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onClick={() => {
              setOpenDropdown(type);
              setIsTyping(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpenDropdown(null);
              }
            }}
            placeholder={placeholder}
            aria-label={placeholder}
            autoComplete="off"
            className="w-full min-w-0 bg-transparent font-poppins text-[12px] font-medium text-white outline-none placeholder:font-normal placeholder:text-white/90 sm:text-[13px]"
          />

          {value && (
            <button
              type="button"
              onClick={handleClear}
              aria-label={`Clear ${placeholder}`}
              className="shrink-0 p-0.5 text-white/70 hover:text-white focus:outline-none"
            >
              <X size={14} />
            </button>
          )}

          <button
            type="button"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              setOpenDropdown(isOpen ? null : type);
              setIsTyping(false);
            }}
            aria-label={`Toggle ${placeholder} dropdown`}
            className="shrink-0 text-white/90 hover:text-white focus:outline-none"
          >
            <ChevronDown
              size={15}
              strokeWidth={1.8}
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {isOpen && (
          <div
            role="listbox"
            aria-label={placeholder}
            className="dropdown-menu absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-[260px] overflow-x-hidden overflow-y-auto overscroll-contain rounded-xl border border-white/25 bg-[#24151B]/95 shadow-2xl backdrop-blur-xl focus:outline-none"
          >
            <div className="py-1">
              {options.length > 0 ? (
                options.map((option) => {
                  const isSelected =
                    value.trim().toLowerCase() === option.toLowerCase();
                  return (
                    <button
                      key={option}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => selectOption(type, option)}
                      className={`block w-full border-0 px-3.5 py-2.5 text-left font-poppins text-[12px] outline-none transition-colors duration-200 focus:outline-none sm:text-[13px] ${
                        isSelected
                          ? "bg-gradient-to-r from-[#D4145A] to-[#FF7628] font-semibold text-white"
                          : "bg-transparent font-normal text-white/90 hover:bg-gradient-to-r hover:from-[#D4145A] hover:to-[#FF7628] hover:font-semibold hover:text-white"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })
              ) : (
                <div className="p-3 text-center font-poppins text-[12px] text-white/60">
                  No matching {placeholder.toLowerCase()} found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <main>
      <section className="relative flex min-h-[640px] items-center justify-center bg-[#24151B] px-4 py-12 sm:min-h-[660px] lg:min-h-[calc(100svh-68px)]">
        <style>{`
          /* The venue photo settles into place right as the brand intro lifts away */
          .hero-bg {
            animation: hero-settle 2.8s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          @keyframes hero-settle {
            from {
              transform: scale(1.14);
            }
            to {
              transform: scale(1);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .hero-bg {
              animation: none;
            }
          }
        `}</style>

        {/* The photo clips itself, not the section: overflow-hidden on the
            section would cut off the search dropdowns that hang below it. */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/hero.png"
            alt="Elegant wedding event venue"
            className="hero-bg h-full w-full object-cover object-center"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#000000]/60"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1250px] text-center">
          <motion.div
            {...rise(0.1)}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 font-poppins text-[10px] font-semibold uppercase tracking-wide text-[#FF7628] sm:text-[11px]"
          >
            <span className="flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628]">
              <Star
                size={9}
                strokeWidth={2.5}
                fill="white"
                className="text-white"
              />
            </span>

            <span>India's Event &amp; Vendor Discovery Platform</span>
          </motion.div>

          <motion.h1
            {...rise(0.22)}
            className="mt-6 font-playfair text-[34px] font-bold leading-[1.15] text-white sm:text-[48px] md:text-[60px]"
          >
            <span className="block">Plan Your Perfect Event</span>

            <span className="mt-1 flex flex-wrap items-baseline justify-center gap-x-3 text-center sm:inline-flex sm:flex-nowrap">
              <span className="shrink-0 bg-gradient-to-r from-[#D4145A] to-[#FF7628] bg-clip-text text-transparent">
                All in One Place..
              </span>

              <span className="relative inline-block h-[1.2em] w-[290px] max-w-full overflow-visible whitespace-nowrap text-center align-baseline bg-gradient-to-r from-[#D4145A] to-[#FF7628] bg-clip-text text-transparent sm:w-[380px] sm:text-left md:w-[480px]">
                <span className="inline-block">{typedText}</span>

                <span
                  aria-hidden="true"
                  className="ml-1 inline-block h-[0.75em] w-[3px] translate-y-[2px] animate-pulse rounded-full bg-[#FF7628]"
                />
              </span>
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.34)}
            className="mx-auto mt-4 max-w-[820px] font-poppins text-[15px] font-normal leading-[1.6] text-white/90 sm:text-[17px]"
          >
            Discover trusted event professionals, explore inspiring services,
            and connect with the right vendors to bring your special occasions
            to life.
          </motion.p>

          <motion.div
            {...fade(0.46)}
            ref={searchCardRef}
            className="mx-auto mt-8 w-full max-w-[940px] rounded-[12px] border border-white/30 bg-black/25 p-3 text-left shadow-xl backdrop-blur-md sm:p-4"
          >
            <form
              onSubmit={handleSearch}
              noValidate
              className="grid grid-cols-1 items-center gap-2.5 sm:grid-cols-2 lg:grid-cols-[1fr_1.1fr_0.85fr_auto]"
            >
              {renderCombobox(
                "event",
                eventType,
                setEventType,
                setIsTypingEvent,
                "Event Type",
                filteredEventOptions,
                CalendarDays,
              )}

              {renderCombobox(
                "vendor",
                vendorCategory,
                setVendorCategory,
                setIsTypingVendor,
                "Vendor Category",
                filteredVendorOptions,
                Camera,
              )}

              <div className="relative w-full min-w-0">
                <div className="flex h-[44px] w-full min-w-0 items-center gap-2 rounded-[7px] border border-white/35 bg-white/5 px-3 transition-colors focus-within:bg-white/10">
                  <MapPin
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 text-white"
                  />

                  <input
                    type="text"
                    value={location}
                    onChange={handleLocationChange}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setOpenDropdown(null);
                      }
                    }}
                    placeholder="Enter city"
                    aria-label="Location"
                    autoComplete="off"
                    className="w-full min-w-0 bg-transparent font-poppins text-[12px] font-medium text-white outline-none placeholder:font-normal placeholder:text-white/90 sm:text-[13px]"
                  />
                </div>

                {openDropdown === "city" && location.trim().length > 0 && (
                  <>
                    <button
                      type="button"
                      aria-label="Close city suggestions"
                      className="fixed inset-0 z-20 cursor-default"
                      onClick={() => setOpenDropdown(null)}
                    />

                    <div
                      role="listbox"
                      aria-label="City suggestions"
                      className="dropdown-menu absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-[220px] overflow-x-hidden overflow-y-auto overscroll-contain rounded-lg border border-white/25 bg-[#24151B]/95 text-left shadow-xl backdrop-blur-xl"
                    >
                      {filteredCities.length > 0 ? (
                        filteredCities.map((city) => (
                          <button
                            key={city}
                            type="button"
                            role="option"
                            aria-selected={
                              location.trim().toLowerCase() ===
                              city.toLowerCase()
                            }
                            onClick={() => {
                              setLocation(city);
                              setSearchError("");
                              setOpenDropdown(null);
                            }}
                            className="block w-full border-0 bg-transparent px-3 py-2.5 text-left font-poppins text-[12px] font-normal text-white/90 outline-none transition-colors duration-200 hover:bg-gradient-to-r hover:from-[#D4145A] hover:to-[#FF7628] hover:font-semibold hover:text-white sm:text-[13px]"
                          >
                            {city}
                          </button>
                        ))
                      ) : (
                        <p className="px-3 py-2.5 font-poppins text-[12px] text-white/70 sm:text-[13px]">
                          No matching city found
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              <button
                type="submit"
                className="flex h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-5 font-poppins text-[13px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:brightness-105"
              >
                <Search size={16} strokeWidth={2.2} />
                Search Vendors
              </button>
            </form>

            {searchError && (
              <p
                role="alert"
                className="mt-2.5 font-poppins text-xs font-medium text-[#FF9E6D]"
              >
                {searchError}
              </p>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default Hero;