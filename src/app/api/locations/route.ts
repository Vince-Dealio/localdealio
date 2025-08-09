// ✅ Full code for GET /api/locations
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all locations (country, region, city)
    const locations = await prisma.location.findMany({
      select: {
        id: true,
        country: true,
        region: true,
        city: true,
        latitude: true,
        longitude: true,
      },
      orderBy: [
        { country: "asc" },
        { region: "asc" },
        { city: "asc" },
      ],
    });

    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}
