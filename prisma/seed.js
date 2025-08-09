// ✅ Full code for prisma/seed.js — Seeds Categories, Locations, Tags, and example Profiles
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // ----- 1) Categories -----
  const categoriesData = [
    'Arts & Entertainment',
    'Trades & Services',
    'Food & Drink',
    'Real Estate',
    'Health & Wellness',
  ].map((name) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
  }));

  for (const category of categoriesData) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
  console.log(`✅ Seeded ${categoriesData.length} categories`);

  // ----- 2) Locations -----
  const countries = [
    { name: 'United Kingdom', slug: 'united-kingdom' },
    { name: 'United States', slug: 'united-states' },
  ];

  const regions = [
    { name: 'England', slug: 'england', parentSlug: 'united-kingdom' },
    { name: 'California', slug: 'california', parentSlug: 'united-states' },
  ];

  const cities = [
    { name: 'Birmingham', slug: 'birmingham', parentSlug: 'england' },
    { name: 'Los Angeles', slug: 'los-angeles', parentSlug: 'california' },
  ];

  for (const country of countries) {
    await prisma.location.upsert({
      where: { slug: country.slug },
      update: {},
      create: { ...country, level: 'country' },
    });
  }

  for (const region of regions) {
    const parent = await prisma.location.findUnique({
      where: { slug: region.parentSlug },
    });
    await prisma.location.upsert({
      where: { slug: region.slug },
      update: {},
      create: { name: region.name, slug: region.slug, level: 'region', parentId: parent.id },
    });
  }

  for (const city of cities) {
    const parent = await prisma.location.findUnique({
      where: { slug: city.parentSlug },
    });
    await prisma.location.upsert({
      where: { slug: city.slug },
      update: {},
      create: { name: city.name, slug: city.slug, level: 'city', parentId: parent.id },
    });
  }
  console.log(`✅ Seeded locations: ${countries.length} countries, ${regions.length} regions, ${cities.length} cities`);

  // ----- 3) Tags -----
  const tagsData = [
    'fence-installation',
    'garden-design',
    'vegan-food',
    'property-sales',
    'yoga-classes',
  ].map((name) => ({ name: name.replace(/-/g, ' '), slug: name }));

  for (const tag of tagsData) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }
  console.log(`✅ Seeded ${tagsData.length} tags`);

  // ----- 4) Profiles -----
  const categoryTrades = await prisma.category.findUnique({ where: { slug: 'trades-and-services' } });
  const categoryFood = await prisma.category.findUnique({ where: { slug: 'food-and-drink' } });

  const cityBirmingham = await prisma.location.findUnique({ where: { slug: 'birmingham' } });
  const cityLA = await prisma.location.findUnique({ where: { slug: 'los-angeles' } });

  const tagFence = await prisma.tag.findUnique({ where: { slug: 'fence-installation' } });
  const tagVegan = await prisma.tag.findUnique({ where: { slug: 'vegan-food' } });

  await prisma.profile.createMany({
    data: [
      {
        name: 'ABC Fencing',
        slug: 'abc-fencing',
        description: 'Expert fence installation and repairs in Birmingham.',
        categoryId: categoryTrades.id,
        locationId: cityBirmingham.id,
      },
      {
        name: 'Green Garden Cafe',
        slug: 'green-garden-cafe',
        description: 'Serving fresh vegan meals in Los Angeles.',
        categoryId: categoryFood.id,
        locationId: cityLA.id,
      },
    ],
  });

  // Link Tags to Profiles
  const abcFencing = await prisma.profile.findUnique({ where: { slug: 'abc-fencing' } });
  const greenGardenCafe = await prisma.profile.findUnique({ where: { slug: 'green-garden-cafe' } });

  await prisma.profileTag.createMany({
    data: [
      { profileId: abcFencing.id, tagId: tagFence.id },
      { profileId: greenGardenCafe.id, tagId: tagVegan.id },
    ],
  });

  console.log(`✅ Seeded 2 example profiles with tags`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
