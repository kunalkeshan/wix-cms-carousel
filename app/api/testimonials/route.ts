import { NextRequest, NextResponse } from "next/server";
import { createClient, ApiKeyStrategy, media } from "@wix/sdk";
import { collections, items } from "@wix/data";
import NodeCache from "node-cache";

const wix = createClient({
  modules: { collections, items },
  auth: ApiKeyStrategy({
    apiKey: process.env.WIX_API_KEY!,
    siteId: process.env.WIX_SITE_ID!,
  }),
});

// Cache with TTL of 1 hour (3600 seconds)
const cache = new NodeCache({ stdTTL: 3600 });

function getBaseUrl() {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

function corsHeaders() {
  const allowedOrigins = [
    "https://www.junglithenomad.com",
    "https://junglithenomad.com",
    "https://wix.com",
    "https://editor.wix.com",
    "https://manage.wix.com",
    "https://premium.wix.com",
    "https://users.wix.com",
    "https://www.wix.com",
    getBaseUrl(),
  ];

  const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigins.join(","),
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    "Cache-Control": "no-cache, no-store, must-revalidate",
  };

  return corsHeaders;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(),
  });
}

interface Testimonial {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
  rating: number;
  title: string;
  testimonial: string;
  videoUrl: string;
  designation: string;
  tags: string[];
}

type TestimonialTags = string;

async function fetchAllTestimonials(
  ascending: boolean = true
): Promise<Testimonial[]> {
  const cacheKey = `all_testimonials_${ascending ? "asc" : "desc"}`;
  const cached = cache.get<Testimonial[]>(cacheKey);

  if (cached) {
    return cached;
  }

  let query = wix.items
    .queryDataItems({
      dataCollectionId: process.env.WIX_COLLECTION_ID!,
      consistentRead: true,
      returnTotalCount: true,
    })
    .limit(1000); // Fetch all items

  if (ascending) {
    query = query.ascending("order");
  } else {
    query = query.descending("order");
  }

  const data = await query.find();

  if (!data.items) {
    return [];
  }

  const testimonials = data.items.map((testimonial: any) => {
    const item = testimonial.data;
    return {
      _id: item._id,
      createdAt: new Date(item._createdDate.$date),
      updatedAt: new Date(item._updatedDate.$date),
      date: new Date(item.date.$date),
      rating: item.rating,
      title: item.title,
      testimonial: item.testimonial,
      videoUrl: media.getVideoUrl(item.video).url,
      designation: item.designation,
      tags: item?.arraystring ?? [],
    };
  });

  cache.set(cacheKey, testimonials);
  return testimonials;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 5;
  const offset = Number(searchParams.get("offset")) || 0;
  const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
  const ascending = searchParams.get("order") !== "desc";

  try {
    const allTestimonials = await fetchAllTestimonials(ascending);

    // Filter by tags locally
    const filteredTestimonials = allTestimonials.filter(
      (testimonial: Testimonial) => {
        if (tags.length === 0) return true;
        return tags.some((tag) =>
          testimonial.tags?.includes(tag as TestimonialTags)
        );
      }
    );

    const total = filteredTestimonials.length;

    // Apply offset and limit locally
    const paginatedTestimonials = filteredTestimonials.slice(
      offset,
      offset + limit
    );

    const hasMore = offset + limit < total;

    return NextResponse.json(
      {
        testimonials: paginatedTestimonials,
        hasMore,
        total,
      },
      { headers: corsHeaders() }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500, headers: corsHeaders() }
    );
  }
}
