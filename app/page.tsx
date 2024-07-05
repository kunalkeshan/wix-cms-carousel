import { getTestimonials } from '@/lib/wix';

export default async function Home() {
	const testimonials = await getTestimonials();

	console.log(testimonials);
	return <main>Page</main>;
}
