import TestimonialsCarousel from '@/components/testimonials-carousel';
import { getTestimonials } from '@/lib/wix';

export default async function Home() {
	const testimonials = await getTestimonials();
	return (
		<main>
			<TestimonialsCarousel testimonials={testimonials} />
		</main>
	);
}
