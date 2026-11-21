const eventSampleServices = {
  "baby-shower": {
    name: "Baby Shower",
    services: [
      ["Venues", "/baby shower venues.jpg"],
      ["Decorators", "/baby shower decorators.jpg"],
      ["Caterers", "/baby shower caterers.jpg"],
      ["Makeup Artists", "/baby shower makeup artist.jpg"],
      ["Photographers", "/baby shower photographers.jpg"],
      ["Mehndi Artists", "/baby shower mehndi artist.jpg"],
      ["Rangoli Artists", "/baby shower rangoli.jpg"],
      ["Jewellery on Rent", "/baby shower jwellery on rent.jpg"],
      ["Invitation Cards / Designers", "/baby shower invitation cards.jpg"],
      ["Entertainment", "/baby shower entertainment.jpg"],
    ],
  },
  reception: {
    name: "Reception",
    services: [
      ["Venues", "/reception venues.jpg"],
      ["Decorators", "/reception decorators.jpg"],
      ["Caterers", "/reception caterers.jpg"],
      ["Makeup Artists", "/reception makeup artist.jpg"],
      ["Photographers", "/reception photographers.jpg"],
      ["Mehndi Artists", "/reception mehndi artist.jpg"],
      ["DJ'S", "/reception dj.jpg"],
      ["Jewellery on Rent", "/reception jwellery on rent.jpg"],
      ["Invitation Cards / Designers", "/reception invitation cards.jpg"],
      ["Choreographers", "/reception choreographers.jpg"],
      ["Groom Wear", "/reception groom wear.jpg"],
      ["Bridal Wear", "/reception bridal wear.jpg"],
      ["Gifts", "/reception gifts.jpg"],
      ["Pandits", "/reception pandits.jpg"],
      ["Rangoli Artists", "/reception rangoli artist.jpg"],
      ["Entertainment", "/reception entertainment.jpg"],
    ],
  },
  "corporate-events": {
    name: "Corporate Events",
    services: [
      ["Corporate Event Planners", "/corporate event planner.jpg"],
      ["Corporate Venues", "/corporate venues.jpg"],
      ["Conference & Meeting Halls", "/conference meeting halls.jpg"],
      ["Hotels & Resorts", "/corporate hotels and resorts.jpg"],
      ["Decorators", "/corporate decorators.jpg"],
      ["Corporate Caterers", "/corporate caterers.jpg"],
      ["Photographers", "/corporate photographers.jpg"],
      ["Videographers", "/corporate videographers.jpg"],
      ["DJs & Music", "/corporate dj and music.jpg"],
      ["Live Bands & Singers", "/corporates live bands and singers.jpg"],
      ["Anchors & Emcees", "/corporates anchors.jpg"],
      ["Entertainment Artists", "/corporate entertainment artist.jpg"],
      ["Stage Setup", "/corporate stage setup.jpg"],
      ["Sound & Lighting", "/corporate sound and lighting.jpg"],
      ["LED Wall & Screen Rentals", "/corporates led walls and screen rentals.jpg"],
    ],
  },
  "conferences-seminars": {
    name: "Conferences & Seminars",
    services: [
      ["Conference Event Planners", "/conference event planner.jpg"],
      ["Conference & Meeting Halls", "/conference meeting halls.jpg"],
      ["Hotels & Resorts", "/conference hotels.jpg"],
      ["Decorators", "/conference decorators.jpg"],
      ["Corporate Caterers", "/conference caterers.jpg"],
      ["Photographers", "/conference photographers.jpg"],
      ["Videographers", "/conference videographers.jpg"],
      ["Anchors & Emcees", "/conference anchors.jpg"],
      ["DJs & Music", "/conference dj.jpg"],
      ["Live Bands & Singers", "/conference singers.jpg"],
    ],
  },
  engagement: {
    name: "Engagement",
    services: [
      ["Venues", "/wedding venues.jpg"],
      ["Decorators", "/wedding decorators.jpg"],
      ["Caterers", "/wedding caterers.jpg"],
      ["Makeup Artists", "/wedding makeup artist.jpg"],
      ["Photographers", "/wedding photographers.jpg"],
      ["Mehndi Artists", "/wedding mehndi artist.jpg"],
      ["DJ'S", "/wedding dj.jpg"],
      ["Jewellery on Rent", "/wedding jwellery on rent.jpg"],
      ["Invitation Cards / Designers", "/wedding invitation card.jpg"],
      ["Choreographers", "/wedding choreographers.jpg"],
      ["Gifts", "/wedding gifts.jpg"],
      ["Pandits", "/wedding pandits.jpg"],
      ["Entertainment", "/wedding entertainment.jpg"],
      ["Rangoli Artists", "/wedding rangoli artist.jpg"],
    ],
  },
  "sangeet-ceremony": {
    name: "Sangeet Ceremony",
    services: [
      ["Venues", "/sangeet venues.jpg"],
      ["Decorators", "/sangeet decorators.jpg"],
      ["Caterers", "/sangeet caterers.jpg"],
      ["Makeup Artists", "/sangeet makeup artist.jpg"],
      ["Photographers", "/wedding photographers.jpg"],
      ["Mehndi Artists", "/wedding mehndi artist.jpg"],
      ["DJ'S", "/wedding dj.jpg"],
      ["Jewellery on Rent", "/wedding jwellery on rent.jpg"],
      ["Invitation Cards / Designers", "/wedding invitation card.jpg"],
      ["Choreographers", "/sangeet choreographers.jpg"],
      ["Groom Wear", "/sangeet groom wear.jpg"],
      ["Bridal Wear", "/sangeet bridal wear.jpg"],
      ["Entertainment", "/sangeet entertainment.jpg"],
    ],
  },
};

const slugify = (value) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const eventVendorSamples = Object.entries(eventSampleServices).flatMap(
  ([eventSlug, event]) =>
    event.services.map(([serviceType, portfolioImage], index) => {
      const priceValue = 12000 + (index % 8) * 3500;
      const city = index % 2 === 0 ? "Pune" : "Mumbai";
      const slug = `sample-${eventSlug}-${slugify(serviceType)}`;

      return {
        id: slug,
        slug,
        eventSlugs: [eventSlug],
        serviceType,
        category: serviceType,
        cities: [city],
        businessName: `Sample ${event.name} ${serviceType}`,
        description: `Sample ${serviceType.toLowerCase()} profile for ${event.name} events.`,
        location: city,
        priceValue,
        priceFrom: `₹${priceValue.toLocaleString("en-IN")}`,
        priceNote: "sample rate",
        portfolioImage,
        imageAlt: `Sample ${serviceType.toLowerCase()} for ${event.name}`,
        services: [serviceType],
        isDemo: true,
      };
    }),
);
