import { NextRequest, NextResponse } from 'next/server';
import { createClient, ApiKeyStrategy, media } from '@wix/sdk';
import { collections, items } from '@wix/data';

const wix = createClient({
	modules: { collections, items },
	auth: ApiKeyStrategy({
		apiKey: process.env.WIX_API_KEY!,
		siteId: process.env.WIX_SITE_ID!,
	}),
});

function getBaseUrl() {
	if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
		return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
	}
	return 'http://localhost:3000';
}

function corsHeaders() {
	const allowedOrigins = [
		'https://www.junglithenomad.com',
		'https://junglithenomad.com',
		'https://wix.com',
		'https://editor.wix.com',
		'https://manage.wix.com',
		'https://premium.wix.com',
		'https://users.wix.com',
		'https://www.wix.com',
		getBaseUrl(),
	];

	const corsHeaders = {
		'Access-Control-Allow-Origin': allowedOrigins.join(','),
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		'Access-Control-Allow-Credentials': 'true',
	};

	return corsHeaders;
}

export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: corsHeaders(),
	});
}

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const limit = Number(searchParams.get('limit')) || 10;
	const offset = Number(searchParams.get('offset')) || 0;
	const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];

	try {
		let query = wix.items
			.queryDataItems({
				dataCollectionId: process.env.WIX_COLLECTION_ID!,
				consistentRead: true,
			})
			.ascending('order')
			.skip(offset)
			.limit(limit);

		const data = await query.find();

		if (!data.items) {
			return NextResponse.json(
				{ testimonials: [], hasMore: false, total: 0 },
				{ headers: corsHeaders() }
			);
		}

		const testimonials = data.items
			.map((testimonial: any) => {
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
			})
			.filter((testimonial: Testimonial) => {
				if (tags.length === 0) return true;
				return tags.some((tag) => testimonial.tags?.includes(tag as TestimonialTags));
			});

		const hasMore = testimonials.length === limit;

		return NextResponse.json(
			{
				testimonials,
				hasMore,
				total: data.totalCount || 0,
			},
			{ headers: corsHeaders() }
		);
	} catch (error) {
		console.error('API Error:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch testimonials' },
			{ status: 500, headers: corsHeaders() }
		);
	}
}