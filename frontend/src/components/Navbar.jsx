import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  UserRound,
  X,
  ChevronDown,
  ArrowRight,
  LogOut,
  User,
  ShieldCheck,
  Heart,
  Calendar,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const EVENT_MEGA_MENU = {
  id: "events",
  label: "Event Category",
  path: "/event-categories",
  tabs: [
    {
      id: "weddings",
      name: "Wedding Events",
      columns: [
        {
          title: "Pre-Wedding",
          items: [
            "Engagements",
            "Sangeet Night",
            "Mehendi Ceremony",
            "Haldi Ceremony",
            "Roka Ceremony",
            "Pre-Wedding Shoots",
          ],
        },
        {
          title: "Wedding Day",
          items: [
            "Mandap Weddings",
            "Destination Weddings",
            "Royal Palace Weddings",
            "Garden & Lawn Weddings",
            "Varmala & Baraat",
          ],
        },
        {
          title: "Post-Wedding",
          items: [
            "Receptions",
            "Cocktail Parties",
            "Vidai & Farewell",
            "Family Brunch",
            "After Parties",
          ],
        },
        {
          title: "Wedding Specials",
          items: [
            "Anniversaries",
            "Vow Renewals",
            "Intimate Celebrations",
            "Theme Weddings",
            "Silver & Golden Jubilee",
          ],
        },
      ],
    },
    {
      id: "birthdays",
      name: "Birthdays & Socials",
      columns: [
        {
          title: "Birthdays",
          items: [
            "Birthdays",
            "Kids Birthdays",
            "1st Birthday Specials",
            "Milestone 18th & 21st",
            "Surprise Celebrations",
          ],
        },
        {
          title: "Social Gatherings",
          items: [
            "Family & Social Gatherings",
            "Family Reunions",
            "Housewarming / Griha Pravesh",
            "Farewell & Retirement",
            "Get-Togethers",
          ],
        },
        {
          title: "Baby Celebrations",
          items: [
            "Baby Showers",
            "Naming Ceremonies",
            "Gender Reveal",
            "Annaprashan Ceremony",
            "Cradle Ceremonies",
          ],
        },
        {
          title: "Party & Nightlife",
          items: [
            "Cocktail Nights",
            "Pool Parties",
            "Theme Nights",
            "Alumni Meets",
            "Festival Celebrations",
          ],
        },
      ],
    },
    {
      id: "corporate",
      name: "Corporate Events",
      columns: [
        {
          title: "Conferences & Summits",
          items: [
            "Corporate Events",
            "Business Conclaves",
            "Annual General Meetings",
            "Medical Conferences",
            "Seminars & Workshops",
          ],
        },
        {
          title: "Launches & Meets",
          items: [
            "Product Launches",
            "Inauguration Ceremonies",
            "Builder Site Launches",
            "Press Conferences",
            "Brand Activations",
          ],
        },
        {
          title: "Celebrations & Galas",
          items: [
            "Annual Award Nights",
            "Work Anniversaries",
            "Foundation Days",
            "Success Celebrations",
            "Gala Dinners",
          ],
        },
        {
          title: "Team Engagement",
          items: [
            "Corporate Retreats",
            "Team Building Offsites",
            "Employee Engagement",
            "Sports Events",
            "Townhall Meets",
          ],
        },
      ],
    },
    {
      id: "traditional",
      name: "Traditional & Ceremonies",
      columns: [
        {
          title: "Sacred Poojas",
          items: [
            "Satyanarayan Pooja",
            "Griha Shanti",
            "Mata Ki Chowki",
            "Ganesh Sthapana",
            "Hawan & Homa",
          ],
        },
        {
          title: "Family Rituals",
          items: [
            "Thread Ceremony (Upanayana)",
            "Mundan Ceremony",
            "Godh Bharai",
            "Shasti Poorti (60th)",
            "Namkaran Sanskar",
          ],
        },
        {
          title: "Festive Occasions",
          items: [
            "Bhajan Sandhya",
            "Dandiya & Garba Nights",
            "Diwali & Festive Galas",
            "Jagran Nights",
            "Community Feasts",
          ],
        },
        {
          title: "Cultural Events",
          items: [
            "Heritage Celebrations",
            "Spiritual Gatherings",
            "Traditional Music Evenings",
            "Memorial Services",
          ],
        },
      ],
    },
  ],
};

const VENDOR_MEGA_MENU = {
  id: "vendors",
  label: "Vendor Category",
  path: "/vendor-categories",
  tabs: [
    {
      id: "services",
      name: "Event Services",
      columns: [
        {
          title: "Planning & Management",
          items: [
            "Event Planner",
            "Wedding Planners",
            "Corporate Event Planners",
            "Theme Designers",
            "Hospitality Management",
          ],
        },
        {
          title: "Photographer & Video",
          items: [
            "Photographer",
            "Cinematic Wedding Films",
            "Candid Photographers",
            "Pre-Wedding Shoot Studios",
            "Drone Videography",
          ],
        },
        {
          title: "Caterer & Food",
          items: [
            "Caterer",
            "Multi-Cuisine Catering",
            "Live Cooking Counters",
            "Food & Beverage Stalls",
            "Dessert & Sweet Bars",
          ],
        },
        {
          title: "Event Essentials",
          items: [
            "Stage & Truss Setup",
            "Sound & DJ Equipment",
            "Security & Bouncers",
            "Valet Parking Management",
            "Invitations & Favors",
          ],
        },
      ],
    },
    {
      id: "decor",
      name: "Decor & Rentals",
      columns: [
        {
          title: "Floral & Theme Decor",
          items: [
            "Decorator",
            "Flower Decor",
            "Royal Mandap Decor",
            "Theme Stage Design",
            "Entrance & Floral Arches",
          ],
        },
        {
          title: "Lighting & Ambience",
          items: [
            "Ambient Fairy Lighting",
            "LED Wall & Screens",
            "Laser & Pyro Shows",
            "Chandelier Installations",
          ],
        },
        {
          title: "Furniture & Setup",
          items: [
            "Banquet Chairs & Sofas",
            "VIP Lounge Furniture",
            "Canopies & Shamiyana",
            "Table Linens & Runners",
          ],
        },
        {
          title: "Props & Photo Booths",
          items: [
            "Selfie Booths",
            "360 Video Booths",
            "Vintage Car Rentals",
            "Floral Backdrops",
          ],
        },
      ],
    },
    {
      id: "venues",
      name: "Venues",
      columns: [
        {
          title: "Banquet Halls",
          items: [
            "Venues",
            "Luxury Banquet Halls",
            "AC Marriage Halls",
            "Mini Halls for Parties",
            "Budget Function Halls",
          ],
        },
        {
          title: "Outdoor Lawns",
          items: [
            "Wedding Lawns & Gardens",
            "Poolside Lawns",
            "Open-Air Amphitheatres",
            "Farmhouses for Events",
          ],
        },
        {
          title: "Hotels & Resorts",
          items: [
            "5-Star Luxury Hotels",
            "Boutique Destination Resorts",
            "Beachfront Properties",
            "Palace & Heritage Stays",
          ],
        },
        {
          title: "Specialty Spaces",
          items: [
            "Rooftop Terraces",
            "Art & Cultural Centers",
            "Clubhouses",
            "Corporate Auditoriums",
          ],
        },
      ],
    },
    {
      id: "entertainment",
      name: "Entertainment & Beauty",
      columns: [
        {
          title: "Music & Artists",
          items: [
            "Entertainment",
            "DJ & Live Sound",
            "Live Fusion Bands",
            "Singers & Vocalists",
            "Dhol Tasha Groups",
          ],
        },
        {
          title: "Performers",
          items: [
            "Choreographers for Sangeet",
            "Celebrity Anchors & Emcees",
            "Stand-Up Comedians",
            "Folk Dancers & Troupes",
          ],
        },
        {
          title: "Makeup & Hair",
          items: [
            "Makeup Artist",
            "Bridal Makeup Artists",
            "Airbrush & HD Makeup",
            "Groom Styling & Hair",
            "Family Makeup Packages",
          ],
        },
        {
          title: "Styling & Mehendi",
          items: [
            "Bridal Mehendi Artists",
            "Arabic & Rajasthani Mehendi",
            "Saree & Turban Draping",
            "Costume & Jewelry Rentals",
          ],
        },
      ],
    },
  ],
};

function Navbar({ onLoginClick }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [activeEventTab, setActiveEventTab] = useState("weddings");
  const [activeVendorTab, setActiveVendorTab] = useState("services");

  // Mobile accordion state
  const [mobileEventOpen, setMobileEventOpen] = useState(false);
  const [mobileVendorOpen, setMobileVendorOpen] = useState(false);

  // Authenticated user state
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("harevent_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleAuthChange = () => {
      try {
        const stored = localStorage.getItem("harevent_user");
        setUser(stored ? JSON.parse(stored) : null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("harevent_auth_change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("harevent_auth_change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("harevent_user");
      window.dispatchEvent(new Event("harevent_auth_change"));
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    setUserMenuOpen(false);
    navigate("/");
  };

  const navigate = useNavigate();
  const navRef = useRef(null);
  const timeoutRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const links = [
    { name: "Home", to: "/" },
    { name: "Event Planner", to: "/event-planners" },
    {
      name: "Event Category",
      to: "/event-categories",
      hasMega: "events",
    },
    {
      name: "Vendor Category",
      to: "/vendor-categories",
      hasMega: "vendors",
    },
  ];

  const handleMouseEnter = (menuType) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMegaMenu(menuType);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/search?query=${encodeURIComponent(search.trim())}`);
    setOpen(false);
    setActiveMegaMenu(null);
  };

  const closeMenu = () => {
    setOpen(false);
    setActiveMegaMenu(null);
  };

  const currentMegaData =
    activeMegaMenu === "events"
      ? EVENT_MEGA_MENU
      : activeMegaMenu === "vendors"
      ? VENDOR_MEGA_MENU
      : null;

  const currentTabId =
    activeMegaMenu === "events" ? activeEventTab : activeVendorTab;

  const activeTabObj =
    currentMegaData?.tabs.find((t) => t.id === currentTabId) ||
    currentMegaData?.tabs[0];

  const loginClassBase =
    "btn-sheen btn-lift group inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-[18px] py-2 text-[14px] font-semibold font-poppins text-white hover:brightness-105";

  const loginClass = `press-off ${loginClassBase}`;

  const mobileLoginClass =
    "btn-sheen btn-lift group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-3 py-3 text-center text-sm font-semibold font-poppins text-white hover:brightness-105";

  const loginSpring = {
    type: "spring",
    stiffness: 420,
    damping: 28,
    mass: 0.7,
  };

  const loginMotionProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    whileHover: prefersReducedMotion ? undefined : { scale: 1.05 },
    whileTap: prefersReducedMotion ? undefined : { scale: 0.9 },
    transition: prefersReducedMotion ? { duration: 0 } : loginSpring,
  };

  const loginContent = (size) => (
    <>
      <UserRound
        size={size}
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
      />

      <span>Login</span>
    </>
  );

  return (
    <header
      ref={navRef}
      onMouseLeave={handleMouseLeave}
      className="sticky top-0 z-50 w-full border-b border-[#F4E5EB] bg-white font-poppins"
    >
      <div className="mx-auto flex min-h-[68px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:gap-4 lg:px-10">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-0"
          aria-label="HarEvent Home"
        >
          <img
            src="/logoForm.jpeg"
            alt="HarEvent Logo"
            className="h-17 w-17 object-contain"
          />

          <span className="font-playfair bg-gradient-to-r from-[#D4145A] to-[#FF7628] bg-clip-text text-[28px] font-bold leading-none text-transparent">
            HarEvent
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-1 xl:ml-auto xl:flex 2xl:gap-2"
          aria-label="Main navigation"
        >
          {links.map((link) => {
            const hasMega = link.hasMega;
            const isMegaActive = activeMegaMenu === hasMega;

            if (hasMega) {
              return (
                <div
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(hasMega)}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setActiveMegaMenu(null)}
                    className={({ isActive }) =>
                      `flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-[16px] font-semibold transition-colors ${
                        isActive || isMegaActive
                          ? "text-[#D4145A]"
                          : "text-[#51434B] hover:text-[#D4145A]"
                      }`
                    }
                  >
                    <span>{link.name}</span>

                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        isMegaActive
                          ? "rotate-180 text-[#D4145A]"
                          : "text-[#7d6f76]"
                      }`}
                    />
                  </NavLink>
                </div>
              );
            }

            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onMouseEnter={() => setActiveMegaMenu(null)}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-md px-2.5 py-2 text-[16px] font-semibold transition-colors ${
                    isActive
                      ? "text-[#D4145A]"
                      : "text-[#51434B] hover:text-[#D4145A]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden shrink-0 items-center gap-2 md:flex xl:ml-2">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex h-9 w-[220px] items-center gap-2 rounded-full border border-[#F0DDE5] bg-[#fef0e1] px-3 focus-within:border-[#D4145A] 2xl:w-[240px]"
          >
            <Search size={18} className="shrink-0 text-[#907D87]" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events, vendors..."
              aria-label="Search events, vendors or locations"
              className="min-w-0 flex-1 bg-transparent text-[13px] text-[#453640] outline-none placeholder:text-[#9A8992]"
            />
          </form>

          {/* Login or User Profile Icon */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                aria-label="User account"
                className="btn-lift group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#D4145A] to-[#FF7628] p-0.5 shadow-[0_4px_16px_rgba(212,20,90,0.22)] transition hover:scale-105 hover:shadow-[0_6px_20px_rgba(212,20,90,0.32)]"
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-[#D4145A] transition group-hover:bg-[#FFF7FA]">
                  <UserRound size={20} className="text-[#D4145A]" />
                </div>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl border border-[#F2DEE6] bg-white shadow-[0_16px_40px_rgba(50,20,35,0.14)] animate-in fade-in zoom-in-95">
                  {/* Header Card */}
                  <div className="relative overflow-hidden border-b border-[#F5E6EC] bg-gradient-to-br from-[#FFF5F8] to-[#FFF0EA] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#D4145A] to-[#FF7628] p-0.5 shadow-sm">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-[#D4145A]">
                          <UserRound size={20} className="text-[#D4145A]" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] font-bold text-[#30232B]">
                          {user.fullName || (user.role === "vendor" ? "Vendor Partner" : "HarEvent User")}
                        </p>
                        <p className="truncate text-[12px] font-medium text-[#7C6973]">
                          {user.phone || user.email || "Member"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-[#F2DEE6]/70 pt-2.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#D4145A] shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4145A]" />
                        {user.role === "vendor" ? "Vendor" : "Customer"}
                      </span>
                    </div>
                  </div>

                  {/* Menu Items - Only Vendor Dashboard */}
                  <div className="p-1.5">
                    <Link
                      to="/vendor-dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[13px] font-semibold text-[#4A3B44] transition hover:bg-[#FFF2F6] hover:text-[#D4145A]"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF2F6] text-[#D4145A] transition group-hover:bg-gradient-to-tr group-hover:from-[#D4145A] group-hover:to-[#FF7628] group-hover:text-white shadow-sm">
                        <Calendar size={18} />
                      </span>
                      <div className="flex-1">
                        <p className="leading-tight text-[14px]">Vendor Dashboard</p>
                        <p className="text-[11px] font-normal text-[#8A7882]">Manage services, leads & bookings</p>
                      </div>
                    </Link>
                  </div>

                  {/* Logout Button */}
                  <div className="border-t border-[#F5E6EC] p-1.5">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[13px] font-semibold text-[#D62842] transition hover:bg-[#FFF0F2]"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF0F2] text-[#D62842] transition group-hover:bg-[#D62842] group-hover:text-white">
                        <LogOut size={16} />
                      </span>
                      <span>Logout from HarEvent</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : onLoginClick ? (
            <motion.button
              type="button"
              onClick={onLoginClick}
              className={loginClass}
              {...loginMotionProps}
            >
              {loginContent(16)}
            </motion.button>
          ) : (
            <Link to="/?form=customer" className={loginClassBase}>
              {loginContent(14)}
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#F0DDE5] text-[#D4145A] xl:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* SIMPLE ICON-FREE DESKTOP MEGA MENU DROPDOWN */}
      {activeMegaMenu && currentMegaData && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
          onMouseLeave={handleMouseLeave}
          className="absolute left-0 top-[68px] z-50 w-full border-t border-[#F2DCE4] bg-white shadow-xl"
        >
          <div className="mx-auto max-w-[1440px]">
            {/* Clean Top Text Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto border-b border-[#F4E6EC] bg-[#FFF9FB] px-6 sm:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {currentMegaData.tabs.map((tab) => {
                const isActive = tab.id === activeTabObj.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onMouseEnter={() => {
                      if (activeMegaMenu === "events") {
                        setActiveEventTab(tab.id);
                      } else {
                        setActiveVendorTab(tab.id);
                      }
                    }}
                    onClick={() => {
                      if (activeMegaMenu === "events") {
                        setActiveEventTab(tab.id);
                      } else {
                        setActiveVendorTab(tab.id);
                      }
                    }}
                    className={`relative cursor-pointer whitespace-nowrap px-4 py-3 text-[14px] font-semibold transition-colors ${
                      isActive
                        ? "text-[#D4145A]"
                        : "text-[#584852] hover:text-[#D4145A]"
                    }`}
                  >
                    <span>{tab.name}</span>

                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-[2.5px] rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Clean 4-Column Plain Text Links */}
            <div className="bg-white px-6 py-6 sm:px-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {activeTabObj.columns.map((col, cIdx) => (
                  <div
                    key={col.title || cIdx}
                    className="flex flex-col border-b border-[#F8EDF1] pb-4 last:border-b-0 lg:border-b-0 lg:pb-0"
                  >
                    <h4 className="mb-3 border-b border-[#F6E7ED] pb-1.5 text-[14px] font-bold tracking-wide text-[#292327]">
                      {col.title}
                    </h4>

                    <ul className="m-0 flex list-none flex-col gap-2 p-0">
                      {col.items.map((item) => (
                        <li key={item}>
                          <Link
                            to={`/search?query=${encodeURIComponent(item)}`}
                            onClick={closeMenu}
                            className="inline-block text-[14px] font-normal text-[#5A4B54] transition-colors duration-150 hover:text-[#D4145A]"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Clean Footer Link */}
              <div className="mt-6 flex items-center justify-between border-t border-[#F4E6EC] pt-3.5 text-[13px]">
                <span className="text-[#7A6C75]">
                  Explore categories tailored for your event
                </span>

                <Link
                  to={currentMegaData.path}
                  onClick={closeMenu}
                  className="group inline-flex items-center gap-1.5 font-semibold text-[#D4145A] transition hover:text-[#A80F46]"
                >
                  <span>View all {currentMegaData.label}</span>

                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* MOBILE NAVIGATION DRAWER WITH ACCORDION */}
      {open && (
        <div className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-[#F0DDE5] bg-white px-4 pb-6 pt-4 shadow-xl xl:hidden">
          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="mb-4 flex h-11 items-center gap-2 rounded-full border border-[#F0DDE5] bg-[#fef0e1] px-3"
          >
            <Search size={17} className="text-[#D4145A]" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events, vendors..."
              aria-label="Search events, vendors or locations"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9A8992]"
            />
          </form>

          {/* Mobile Links */}
          <nav
            className="flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2.5 text-[16px] font-medium ${
                  isActive
                    ? "text-[#D4145A]"
                    : "text-[#51434B] hover:bg-[#FFF7FA]"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/event-planners"
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2.5 text-[16px] font-medium ${
                  isActive
                    ? "text-[#D4145A]"
                    : "text-[#51434B] hover:bg-[#FFF7FA]"
                }`
              }
            >
              Event Planner
            </NavLink>

            {/* Event Category Accordion */}
            <div className="rounded-lg border border-rose-100/60 bg-[#fffbfc] p-2">
              <button
                type="button"
                onClick={() => setMobileEventOpen(!mobileEventOpen)}
                className="flex w-full items-center justify-between px-2 py-1.5 text-left text-[14px] font-semibold text-[#D4145A]"
              >
                <span>Event Category</span>

                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    mobileEventOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileEventOpen && (
                <div className="mt-2 flex flex-col gap-3 border-t border-rose-100/50 pl-3 pr-2 pt-2">
                  {EVENT_MEGA_MENU.tabs.map((tab) => (
                    <div key={tab.id}>
                      <p className="text-[12px] font-bold uppercase tracking-wide text-[#D4145A]">
                        {tab.name}
                      </p>

                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {tab.columns
                          .flatMap((c) => c.items)
                          .slice(0, 6)
                          .map((item) => (
                            <Link
                              key={item}
                              to={`/search?query=${encodeURIComponent(item)}`}
                              onClick={closeMenu}
                              className="rounded-md border border-rose-100 bg-white px-2 py-1 text-[11px] text-[#4d3e47] hover:text-[#D4145A]"
                            >
                              {item}
                            </Link>
                          ))}
                      </div>
                    </div>
                  ))}

                  <Link
                    to="/event-categories"
                    onClick={closeMenu}
                    className="inline-flex items-center gap-1 pt-1 text-[12px] font-bold text-[#D4145A]"
                  >
                    <span>View all event categories →</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Vendor Category Accordion */}
            <div className="rounded-lg border border-rose-100/60 bg-[#fef0e1] p-2">
              <button
                type="button"
                onClick={() => setMobileVendorOpen(!mobileVendorOpen)}
                className="flex w-full items-center justify-between px-2 py-1.5 text-left text-[14px] font-semibold text-[#D4145A]"
              >
                <span>Vendor Category</span>

                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    mobileVendorOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileVendorOpen && (
                <div className="mt-2 flex flex-col gap-3 border-t border-rose-100/50 pl-3 pr-2 pt-2">
                  {VENDOR_MEGA_MENU.tabs.map((tab) => (
                    <div key={tab.id}>
                      <p className="text-[12px] font-bold uppercase tracking-wide text-[#D4145A]">
                        {tab.name}
                      </p>

                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {tab.columns
                          .flatMap((c) => c.items)
                          .slice(0, 6)
                          .map((item) => (
                            <Link
                              key={item}
                              to={`/search?query=${encodeURIComponent(item)}`}
                              onClick={closeMenu}
                              className="rounded-md border border-rose-100 bg-white px-2 py-1 text-[11px] text-[#4d3e47] hover:text-[#D4145A]"
                            >
                              {item}
                            </Link>
                          ))}
                      </div>
                    </div>
                  ))}

                  <Link
                    to="/vendor-categories"
                    onClick={closeMenu}
                    className="inline-flex items-center gap-1 pt-1 text-[12px] font-bold text-[#D4145A]"
                  >
                    <span>View all vendor categories →</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Login / User Profile */}
          <div className="mt-4 grid grid-cols-1 gap-3 border-t border-[#F0DDE5] pt-4">
            {user ? (
              <div className="rounded-2xl border border-[#F1DDE5] bg-gradient-to-br from-[#FFF8FA] to-[#FFF1EC] p-3.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#D4145A] to-[#FF7628] p-0.5 shadow-sm">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-[#D4145A]">
                        <UserRound size={20} className="text-[#D4145A]" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#30232B]">
                        {user.fullName || (user.role === "vendor" ? "Vendor Partner" : "HarEvent User")}
                      </p>
                      <span className="text-[11px] font-semibold text-[#D4145A] uppercase tracking-wider">
                        {user.role === "vendor" ? "Vendor" : "Customer"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      handleLogout();
                    }}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={13} />
                    <span>Logout</span>
                  </button>
                </div>

                <div className="mt-3 border-t border-[#F0DDE5]/80 pt-2.5">
                  <Link
                    to="/vendor-dashboard"
                    onClick={closeMenu}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2.5 text-xs font-bold text-[#D4145A] shadow-sm ring-1 ring-[#F0DDE5]"
                  >
                    <Calendar size={14} />
                    Vendor Dashboard
                  </Link>
                </div>
              </div>
            ) : onLoginClick ? (
              <motion.button
                type="button"
                onClick={() => {
                  closeMenu();
                  onLoginClick();
                }}
                className={`press-off ${mobileLoginClass}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                transition={loginSpring}
              >
                {loginContent(16)}
              </motion.button>
            ) : (
              <Link
                to="/?form=customer"
                onClick={closeMenu}
                className={mobileLoginClass}
              >
                {loginContent(16)}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;