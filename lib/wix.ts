// @ts-ignore
import { createClient, ApiKeyStrategy, media } from '@wix/sdk';
import { collections, items } from '@wix/data';
import { cache } from 'react';

const wix = createClient({
	modules: { collections, items },
	auth: ApiKeyStrategy({
		apiKey: process.env.WIX_API_KEY!,
		siteId: process.env.WIX_SITE_ID!,
	}),
});

export default wix;

export const getTestimonials = cache(
	async (): Promise<ReadonlyArray<Testimonial>> => {
		try {
			const data = await wix.items
				.queryDataItems({
					dataCollectionId: process.env.WIX_COLLECTION_ID!,
					consistentRead: true,
				})
				.ascending('order')
				.limit(999)
				.find();
			if (!data.items) return [];
			// const data = await wix.items.aggregateDataItems({
			// 	dataCollectionId: 'Testimonials',
			// 	consistentRead: true,
			// 	paging: {
			// 		limit: 1000,
			// 		offset: 0,
			// 	},
			// });
			// if (!data.results) return [];
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
			return testimonials;
		} catch (error) {
			console.log(error);
			// @ts-ignore
			return [];
		}
	}
);
