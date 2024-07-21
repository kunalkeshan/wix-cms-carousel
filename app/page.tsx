import TestimonialsCarousel from '@/components/testimonials-carousel';
import { getTestimonials } from '@/lib/wix';

export default async function Home() {
	const testimonials = await getTestimonials();
	return (
		<main className='bg-transparent'>
			<TestimonialsCarousel testimonials={testimonials} />
		</main>
	);
}

const SIX_HOURS_IN_MS = 6 * 60 * 60 * 1000;
export const revalidate = SIX_HOURS_IN_MS;
