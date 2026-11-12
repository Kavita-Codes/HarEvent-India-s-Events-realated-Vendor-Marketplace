import {
  Building2,
  Cake,
  Camera,
  CalendarDays,
  Gift,
  Heart,
  HeartHandshake,
  Music2,
  PartyPopper,
  Sparkles,
  Users,
} from "lucide-react";
import catalog from "./categoryCatalog.json";

const imagePool = [
  "/Opulent Indian Garden Wedding Mandap.png",
  "/Golden-Hour Garden Wedding Ceremony.png",
  "/Lavish Nighttime Wedding Canopy.png",
  "/Golden Wedding Buffet Under Crystal Lights.png",
  "/Joyful Newlywed Entrance at Reception.png",
  "/Rohan and Eisha’s Floral Engagement.png",
  "/Elegant Pastel Baby Shower Celebration.png",
  "/Joyful Birthday Cake Celebration.png",
  "/Corporate Summit Networking Reception.png",
  "/Glittering Indian Wedding Dance Stage.png",
  "/Joyful Indian Family Celebration.png",
  "/Golden Hour Pre-Wedding Celebration.png",
];

const displayNames = {
  "Sangit ceremany": "Sangeet Ceremony",
};

const eventImages = {
  Wedding: "/Opulent Indian Garden Wedding Mandap.png",
  Reception: "/Joyful Newlywed Entrance at Reception.png",
  Engagement: "/Rohan and Eisha’s Floral Engagement.png",
  Anniversary: "/Romantic Anniversary Cake Cutting Celebration.png",
  "Sangit ceremany": "/Glittering Indian Wedding Dance Stage.png",
  "Naming Ceremony/Baby Shower": "/Elegant Pastel Baby Shower Celebration.png",
  Birthday: "/Joyful Birthday Cake Celebration.png",
  "Housewarming / Griha Pravesh": "/Elegant Indian Naming Ceremony Celebration.png",
  "Corporate Events": "/Corporate Summit Networking Reception.png",
  "Conferences & Seminars": "/Corporate Summit Networking Reception.png",
  "Award Ceremonies": "/Corporate Summit Networking Reception.png",
  "College Festivals": "/Glittering Indian Wedding Dance Stage.png",
  "School Events": "/Joyful Birthday Cake Celebration.png",
  "Farewell Party": "/Farewell and Retirement Celebrations.png",
  "Graduation Ceremony": "/Corporate Summit Networking Reception.png",
  "Bachelor Party": "/Glittering Indian Wedding Dance Stage.png",
  "Reunion Party": "/Joyful Indian Family Celebration.png",
  "Cocktail Party": "/Lavish Nighttime Wedding Canopy.png",
  "Private Parties": "/Joyful Birthday Cake Celebration.png",
  "Family Get-Together": "/Joyful Indian Family Celebration.png",
  "Festival Celebrations": "/Joyful Indian Family Celebration.png",
  "Religious Events": "/Elegant Indian Naming Ceremony Celebration.png",
  "Cultural Events": "/Joyful Indian Family Celebration.png",
  "Concerts & Live Shows": "/Glittering Indian Wedding Dance Stage.png",
  "Fashion Shows": "/Corporate Summit Networking Reception.png",
  "Charity & Fundraising Events": "/Corporate Summit Networking Reception.png",
  "Sports Events": "/Corporate Summit Networking Reception.png",
  "Political Events": "/Corporate Summit Networking Reception.png",
  "Community Events": "/Joyful Indian Family Celebration.png",
};

const eventDescriptions = {
  Wedding: "Bring every part of your wedding celebration together with the right people and details.",
  Reception: "Celebrate your new beginning with a reception designed around your style.",
  Engagement: "Make the first celebration of your journey together feel unforgettable.",
  Anniversary: "Celebrate the memories you have made and the milestones still to come.",
  "Sangit ceremany": "Bring family and friends together for an evening of music, dance and celebration.",
  "Naming Ceremony/Baby Shower": "Plan a warm, joyful celebration for a beautiful new beginning.",
  Birthday: "Make the day feel special with a celebration planned just the way you like.",
  "Housewarming / Griha Pravesh": "Welcome a new home with a thoughtful and memorable gathering.",
  "Corporate Events": "Plan polished corporate gatherings, celebrations and business events.",
  "Conferences & Seminars": "Bring people together for a seamless conference, seminar or workshop.",
};

const eventGroups = [
  {
    id: "wedding",
    label: "Weddings & milestones",
    icon: Heart,
    names: [
      "Wedding",
      "Reception",
      "Engagement",
      "Anniversary",
      "Sangit ceremany",
      "Bachelor Party",
      "Cocktail Party",
    ],
  },
  {
    id: "family",
    label: "Family celebrations",
    icon: Users,
    names: [
      "Naming Ceremony/Baby Shower",
      "Birthday",
      "Housewarming / Griha Pravesh",
      "Reunion Party",
      "Private Parties",
      "Family Get-Together",
      "Farewell Party",
    ],
  },
  {
    id: "professional",
    label: "Work & learning",
    icon: Building2,
    names: [
      "Corporate Events",
      "Conferences & Seminars",
      "Award Ceremonies",
      "College Festivals",
      "School Events",
      "Graduation Ceremony",
      "Fashion Shows",
      "Political Events",
    ],
  },
  {
    id: "culture",
    label: "Culture & community",
    icon: PartyPopper,
    names: [
      "Festival Celebrations",
      "Religious Events",
      "Cultural Events",
      "Concerts & Live Shows",
      "Charity & Fundraising Events",
      "Sports Events",
      "Community Events",
    ],
  },
];

const eventGroupByName = new Map(
  eventGroups.flatMap((group) => group.names.map((name) => [name, group])),
);

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createItems(names, { basePath, images, icons, descriptionFor }) {
  const slugCounts = new Map();

  return names.map((sourceName, index) => {
    const name = displayNames[sourceName] ?? sourceName;
    const baseSlug = slugify(name) || `category-${index + 1}`;
    const count = slugCounts.get(baseSlug) ?? 0;
    slugCounts.set(baseSlug, count + 1);
    const slug = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;

    return {
      id: `${baseSlug}-${count + 1}`,
      name,
      sourceName,
      slug,
      href: `${basePath}/${slug}`,
      image: images[index % images.length],
      Icon: icons[index % icons.length],
      description: descriptionFor(name, sourceName),
    };
  });
}

export const events = createItems(catalog.events, {
  basePath: "/event-categories",
  images: imagePool,
  icons: [Heart, CalendarDays, Cake, Sparkles, PartyPopper, HeartHandshake, Gift],
  descriptionFor: (name, sourceName) =>
    eventDescriptions[sourceName] ??
    `Create a memorable ${name.toLowerCase()} with the right people, setting and details.`,
}).map((event) => {
  const group = eventGroupByName.get(event.sourceName);
  return {
    ...event,
    image: eventImages[event.sourceName] ?? event.image,
    group: group?.id ?? "culture",
    groupLabel: group?.label ?? "Culture & community",
  };
});

export const eventFilters = [
  { id: "all", label: "All events", Icon: Sparkles },
  ...eventGroups.map(({ id, label, icon: Icon }) => ({ id, label, Icon })),
];

export const vendorTypes = createItems(catalog.vendorTypes, {
  basePath: "/vendor-categories",
  images: imagePool,
  icons: [Building2, Sparkles, Cake, Heart, Camera, Music2, Gift, Users],
  descriptionFor: (name) =>
    `Explore ${name.toLowerCase()} services and find the right fit for your event.`,
});

export function getEventVendors(sourceName) {
  const names = catalog.eventVendors[sourceName] ?? [];
  return names
    .map((name) =>
      vendorTypes.find((type) => type.sourceName === name),
    )
    .filter(Boolean);
}

const vendorTypeByKey = new Map(
  vendorTypes.map((type) => [
    type.sourceName.replace(/[^a-z0-9]/gi, "").toLowerCase(),
    type,
  ]),
);

const allVendorCategoryItems = createItems(catalog.vendorCategories, {
  basePath: "/vendor-categories/specialties",
  images: imagePool,
  icons: [Sparkles, Heart, Camera, Gift, Music2, Cake, Building2],
  descriptionFor: (name) =>
    `Discover ${name.toLowerCase()} specialists and services for your celebration.`,
});

const specialtyGroups = new Map();
let activeVendorType = null;

export const vendorSpecialties = [];

for (const item of allVendorCategoryItems) {
  const key = item.sourceName.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const matchingType = vendorTypeByKey.get(key);

  if (matchingType) {
    activeVendorType = matchingType;
    continue;
  }

  const groupName = activeVendorType?.name ?? "Other specialties";
  const specialty = { ...item, groupName };
  vendorSpecialties.push(specialty);

  if (!specialtyGroups.has(groupName)) {
    specialtyGroups.set(groupName, []);
  }
  specialtyGroups.get(groupName).push(specialty);
}

export const vendorSpecialtyGroups = [...specialtyGroups].map(
  ([name, specialties]) => ({ name, specialties }),
);

for (const type of vendorTypes) {
  type.specialties = specialtyGroups.get(type.name) ?? [];
}

export const allVendorItems = [...vendorTypes, ...vendorSpecialties];

export function getEventBySlug(slug) {
  return events.find((event) => event.slug === slug);
}

export function getVendorTypeBySlug(slug) {
  return vendorTypes.find((type) => type.slug === slug);
}

export function getVendorSpecialtyBySlug(slug) {
  return vendorSpecialties.find((specialty) => specialty.slug === slug);
}
