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

const TEN_MINS_IN_SECONDS = 10 * 60;
export const revalidate = TEN_MINS_IN_SECONDS;
