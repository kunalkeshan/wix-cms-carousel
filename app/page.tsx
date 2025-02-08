import { Suspense } from 'react';
import TestimonialsCarousel from '@/components/testimonials-carousel';
import { getTestimonials } from '@/lib/wix';

export default async function Home() {
	const testimonials = await getTestimonials();
	return (
		<main className='bg-transparent'>
			<Suspense fallback={<div>Loading...</div>}>
				<TestimonialsCarousel testimonials={testimonials} />
			</Suspense>
		</main>
	);
}

const TEN_MINS_IN_SECONDS = 10 * 60;
export const revalidate = TEN_MINS_IN_SECONDS;
