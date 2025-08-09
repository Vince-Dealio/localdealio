import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const unslug = (s: string | null) =>
  s ? s.replace(/-/g, " ").trim() : undefined;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");     // category slug
    const country  = searchParams.get("country");      // country slug
    const region   = searchParams.get("region");       // region slug
    const city     = searchParams.get("city");         // city slug
    const tagsCSV  = searchParams.get("tags");         // comma-separated tag slugs
    const q        = searchParams.get("q");            // free-text

    const countryName = unslug(country);
    const regionName  = unslug(region);
    const cityName    = unslug(city);
    const tagSlugs    = (tagsCSV ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const AND: Prisma.ProfileWhereInput[] = [];

    // Category (exact slug on curated categories)
    if (category) {
      AND.push({
        categories: { some: { category: { slug: category } } },
      });
    }

    // Location (lenient: denormalized contains + normalized slugs via relation)
    if (country) {
      AND.push({
        OR: [
          { country: { contains: countryName!, mode: "insensitive" } },
          { location: { is: { countrySlug: country } } },
        ],
      });
    }
    if (region) {
      AND.push({
        OR: [
          { region: { contains: regionName!, mode: "insensitive" } },
          { location: { is: { regionSlug: region } } },
        ],
      });
    }
    if (city) {
      AND.push({
        OR: [
          { city: { contains: cityName!, mode: "insensitive" } },
          { location: { is: { citySlug: city } } },
        ],
      });
    }

    // Tags (any match)
    if (tagSlugs.length) {
      AND.push({
        tags: { some: { tag: { slug: { in: tagSlugs } } } },
      });
    }

    // Free text (name/bio/username)
    if (q) {
      AND.push({
        OR: [
          { displayName: { contains: q, mode: "insensitive" } },
          { bio:         { contains: q, mode: "insensitive" } },
          { username:    { contains: q, mode: "insensitive" } },
        ],
      });
    }

    const where: Prisma.ProfileWhereInput = AND.length ? { AND } : {};

    const results = await prisma.profile.findMany({
      where,
      select: {
        id: true,
        username: true,
        displayName: true,
        bio: true,
        website: true,
        country: true,
        region: true,
        city: true,
        latitude: true,
        longitude: true,
        categories: { select: { category: { select: { id: true, name: true, slug: true } } } },
        tags:       { select: { tag:       { select: { id: true, name: true, slug: true } } } },
      },
      orderBy: [{ displayName: "asc" }, { username: "asc" }],
      take: 50,
    });

    const out = results.map((p) => ({
      id: p.id,
      username: p.username,
      displayName: p.displayName ?? p.username,
      bio: p.bio ?? "",
      website: p.website ?? "",
      country: p.country ?? "",
      region: p.region ?? "",
      city: p.city ?? "",
      latitude: p.latitude,
      longitude: p.longitude,
      categories: p.categories.map((c) => c.category),
      tags: p.tags.map((t) => t.tag),
      url: `/${p.username}`,
    }));

    return NextResponse.json(out);
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
