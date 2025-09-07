'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { parseAsArrayOf, parseAsStringEnum, useQueryState } from 'nuqs';

function getBaseUrl() {
	if (typeof window !== 'undefined') {
		return window.location.origin;
	}
	if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
		return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
	}
	return 'http://localhost:3000';
}

async function fetchTestimonials({
	limit = 5,
	offset = 0,
	tags = '',
}: {
	limit?: number;
	offset?: number;
	tags?: string;
}) {
	const baseUrl = getBaseUrl();
	const searchParams = new URLSearchParams({
		limit: limit.toString(),
		offset: offset.toString(),
		...(tags && { tags }),
	});

	const response = await fetch(`${baseUrl}/api/testimonials?${searchParams}`);

	if (!response.ok) {
		throw new Error('Failed to fetch testimonials');
	}

	return response.json();
}

export function useTestimonials(limit = 5) {
	const [tags] = useQueryState(
		'tags',
		parseAsArrayOf(
			parseAsStringEnum<TestimonialTags>([
				'coliving',
				'independent',
				'retreats',
				'volunteering',
			])
		)
	);

	const tagsString = tags?.join(',') || '';

	return useInfiniteQuery({
		queryKey: ['testimonials', { tags: tagsString, limit }],
		queryFn: ({ pageParam = 0 }) =>
			fetchTestimonials({
				limit,
				offset: pageParam,
				tags: tagsString,
			}),
		getNextPageParam: (lastPage, allPages) => {
			if (!lastPage.hasMore) return undefined;
			return allPages.length * limit;
		},
		initialPageParam: 0,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
}