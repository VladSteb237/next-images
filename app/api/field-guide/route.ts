import { hasActiveSubscription } from "@/utils/data/queries";

// Foraging database - this data is provided for you
const forageDatabase = [
  {
    name: "Chanterelle",
    type: "mushroom",
    edibility: "edible",
    season: "Summer to Fall",
    habitat: "Oak and conifer forests, mossy areas",
    description:
      "Golden-yellow trumpet-shaped mushroom with a fruity, apricot-like aroma. One of the most prized edible wild mushrooms with a delicate, peppery flavor.",
    image: "/images/chanterelle.jpg",
    tips: "Look for false gills that fork and run down the stem. True chanterelles have solid flesh, while lookalikes are hollow.",
  },
  {
    name: "Ramps (Wild Leeks)",
    type: "plant",
    edibility: "edible",
    season: "Early Spring",
    habitat: "Rich, moist deciduous forests",
    description:
      "Broad, smooth green leaves with a strong garlic-onion flavor. The entire plant is edible - leaves, stems, and bulbs. A springtime delicacy.",
    image: "/images/ramps.jpg",
    tips: "Harvest sustainably by taking only one leaf per plant, leaving the bulb to regenerate. Never harvest more than 10% of a patch.",
  },
  {
    name: "Morel",
    type: "mushroom",
    edibility: "poisonous-lookalike",
    season: "Spring",
    habitat: "Burned areas, dying elms, orchards, river bottoms",
    description:
      "Honeycomb-patterned cap with a hollow interior. Highly sought after for their rich, earthy, nutty flavor. Must be cooked before eating.",
    image: "/images/morel.jpg",
    tips: "Always slice in half to verify hollow interior. False morels have brain-like caps and cottony interior. Never eat raw.",
  },
  {
    name: "Wild Blackberry",
    type: "berry",
    edibility: "edible",
    season: "Mid to Late Summer",
    habitat: "Forest edges, clearings, roadsides",
    description:
      "Aggregate berries on thorny canes. Sweet and tart when fully ripe (deep purple-black). Rich in antioxidants and vitamin C.",
    image: "/images/blackberry.jpg",
    tips: "Ripe berries fall off easily when touched. Wear long sleeves and bring a container that won't crush the delicate fruit.",
  },
  {
    name: "Chicken of the Woods",
    type: "mushroom",
    edibility: "poisonous-lookalike",
    season: "Late Summer to Fall",
    habitat: "Dead or dying hardwood trees, especially oak",
    description:
      "Bright orange and yellow shelf fungus with a meaty texture. Tastes similar to chicken when cooked. Grows in overlapping clusters.",
    image: "/images/chicken-of-woods.jpg",
    tips: "Only harvest from hardwoods - those growing on conifers or eucalyptus can cause reactions. Start with a small amount to test tolerance.",
  },
  {
    name: "Dandelion",
    type: "plant",
    edibility: "edible",
    season: "Spring to Fall",
    habitat: "Lawns, meadows, disturbed areas",
    description:
      "Common 'weed' with jagged leaves and yellow flowers. Every part is edible - leaves for salads, roots for tea, flowers for wine.",
    image: "/images/dandelion.jpg",
    tips: "Harvest young leaves before flowering for less bitterness. Avoid areas that may have been treated with pesticides or herbicides.",
  },
  {
    name: "Elderberry",
    type: "berry",
    edibility: "caution",
    season: "Late Summer",
    habitat: "Forest edges, stream banks, disturbed areas",
    description:
      "Small dark purple berries in flat-topped clusters. Used for syrups, wines, and immune support. Must be cooked before consumption.",
    image: "/images/elderberry.jpg",
    tips: "Never eat raw - contains compounds that can cause nausea. Avoid red elderberry entirely. Only harvest fully ripe, dark purple berries.",
  },
  {
    name: "Wood Sorrel",
    type: "plant",
    edibility: "edible",
    season: "Spring to Fall",
    habitat: "Shaded forests, woodland edges",
    description:
      "Clover-like leaves with heart-shaped leaflets and small yellow or white flowers. Pleasant lemony, tangy flavor. Great in salads.",
    image: "/images/wood-sorrel.jpg",
    tips: "Contains oxalic acid - enjoy in moderation. The leaves fold down at night and in rain. Often confused with clover but has distinct heart-shaped leaflets.",
  },
];

export async function POST() {
  const hasAccess = await hasActiveSubscription();

  if (!hasAccess) {
    return new Response("Membership required", { status: 403 });
  }

  // Return a random item from the database
  const randomItem =
    forageDatabase[Math.floor(Math.random() * forageDatabase.length)];

  return new Response(JSON.stringify(randomItem), {
    headers: { "Content-Type": "application/json" },
  });
}
