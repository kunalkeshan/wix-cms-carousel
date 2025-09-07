import { Suspense } from 'react';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import TestimonialsCarousel from '@/components/testimonials-carousel';

function getBaseUrl() {
	if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
		return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
	}
	return 'http://localhost:3000';
}

async function getTestimonials(limit = 10, offset = 0, tags = '') {
	const baseUrl = getBaseUrl();
	const searchParams = new URLSearchParams({
		limit: limit.toString(),
		offset: offset.toString(),
		...(tags && { tags }),
	});
	
	const response = await fetch(`${baseUrl}/api/testimonials?${searchParams}`, {
		next: { revalidate: 600 }, // 10 minutes cache
	});
	
	if (!response.ok) {
		throw new Error('Failed to fetch testimonials');
	}
	
	return response.json();
}

export default async function Home() {
	const queryClient = new QueryClient();
	const limit = 10;

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['testimonials', { tags: '', limit }],
		queryFn: () => getTestimonials(limit, 0, ''),
		initialPageParam: 0,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<main className='bg-transparent'>
				<Suspense fallback={<div>Loading...</div>}>
					<TestimonialsCarousel />
				</Suspense>
			</main>
		</HydrationBoundary>
	);
}

const TEN_MINS_IN_SECONDS = 10 * 60;
export const revalidate = TEN_MINS_IN_SECONDS;
