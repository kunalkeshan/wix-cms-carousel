// @ts-ignore
import { createClient, ApiKeyStrategy, media } from "@wix/sdk";
import { collections, items } from "@wix/data";

const wix = createClient({
	modules: { collections, items },
	auth: ApiKeyStrategy({
		apiKey: process.env.WIX_API_KEY!,
		siteId: process.env.WIX_SITE_ID!,
	}),
});

export default wix;

export const getTestimonials = async (): Promise<
	ReadonlyArray<Testimonial>
> => {
	try {
		const data = await wix.items.aggregateDataItems({
			dataCollectionId: "Testimonials",
			consistentRead: true,
			paging: {
				limit: 1000,
				offset: 0,
			},
		});
		if (!data.results) return [];
		const testimonials = data.results.map((item: any) => {
			return {
				_id: item._id,
				createdAt: new Date(item._createdDate.$date),
				updatedAt: new Date(item._updatedDate.$date),
				date: new Date(item.date),
				rating: item.rating,
				title: item.title,
				testimonial: item.testimonial,
				videoUrl: media.getVideoUrl(item.video).url,
				designation: item.designation,
			};
		});
		return testimonials;
	} catch (error) {
		console.log(error);
		// @ts-ignore
		return [];
	}
};
