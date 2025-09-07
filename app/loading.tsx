import TestimonialSkeleton from '@/components/testimonial-skeleton';

export default function Loading() {
	return (
		<main className='bg-transparent'>
			<section className='p-4 bg-transparent'>
				<div className='bg-transparent'>
					<div className='items-stretch flex gap-4 overflow-hidden'>
						{Array.from({ length: 5 }).map((_, idx) => (
							<div
								key={idx}
								className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 min-h-full rounded-lg overflow-hidden flex-shrink-0'
							>
								<TestimonialSkeleton />
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}