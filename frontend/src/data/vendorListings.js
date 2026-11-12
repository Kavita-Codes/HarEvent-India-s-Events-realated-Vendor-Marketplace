export const vendorListings = [
  {
    id: "royal-moments",
    slug: "royal-moments",
    serviceType: "Photographers",
    category: "Wedding Photography",
    businessName: "Royal Moments...",
    description:
      "Specializing in cinematic wedding stories, candid moments and timeless portraits.",
    location: "Pune",
    priceValue: 85000,
    priceFrom: "₹85,000",
    priceNote: "onwards",
    portfolioImage: "/Joyful Indian Wedding Petal Shower.png",
    imageAlt: "Wedding couple celebrating with flower petals",
    services: ["Wedding photography", "Candid photography", "Cinematic films"],
  },
  {
    id: "mayur-mandap-floral",
    slug: "mayur-mandap-floral",
    serviceType: "Decorators",
    category: "Wedding Decor",
    businessName: "Mayur Mandap & Floral...",
    description:
      "Elegant mandap designs, floral installations and contemporary decor.",
    location: "Pune & Mumbai",
    priceValue: 120000,
    priceFrom: "₹1.2 Lakh",
    priceNote: "onwards",
    portfolioImage: "/Waterfront Romance Under a Floral Canopy.png",
    imageAlt: "Wedding decor with a floral canopy",
    services: ["Mandap decor", "Floral installations", "Venue styling"],
  },
  {
    id: "imperial-palace-banquets",
    slug: "imperial-palace-banquets",
    serviceType: "Venues",
    category: "Luxury Venue",
    filterCategory: "Venues",
    businessName: "Imperial Palace & Banquets",
    description:
      "Spacious luxury banquet spaces for weddings, receptions and celebrations.",
    location: "Kharadi, Pune",
    priceValue: 350000,
    priceFrom: "₹3.5 Lakh",
    priceNote: "per event",
    portfolioImage: "/Opulent Indian Garden Wedding Mandap.png",
    imageAlt: "Luxury garden wedding venue with a mandap",
    services: ["Wedding venue", "Reception venue", "Banquet facilities"],
  },
  {
    id: "saffron-spice-gourmet",
    slug: "saffron-spice-gourmet",
    serviceType: "Caterers",
    category: "Catering",
    businessName: "Saffron & Spice Gourmet...",
    description:
      "Multi-cuisine catering with regional specialties and live counters.",
    location: "Pune",
    priceValue: 950,
    priceFrom: "₹950",
    priceNote: "per plate",
    portfolioImage: "/Lavish Indian Fusion Wedding Buffet.png",
    imageAlt: "Indian fusion wedding buffet with multiple dishes",
    services: ["Multi-cuisine menus", "Regional specialties", "Live counters"],
  },
].map((vendor) => ({
  ...vendor,
  inquiryUrl: `/enquiry?vendor=${encodeURIComponent(vendor.businessName)}&category=${encodeURIComponent(vendor.category)}`,
  profileUrl: `/vendors/${vendor.slug}`,
}));

export function getVendorListingBySlug(slug) {
  return vendorListings.find((vendor) => vendor.slug === slug);
}
