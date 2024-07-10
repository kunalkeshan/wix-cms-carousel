'use client';
import React from 'react';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { StarIcon } from 'lucide-react';

// import Autoplay from 'embla-carousel-autoplay';

interface Props
	extends React.HTMLAttributes<React.ComponentPropsWithoutRef<'div'>> {
	testimonials: ReadonlyArray<Testimonial>;
}

const TestimonialsCarousel: React.FC<Props> = ({ testimonials }) => {
	return (
		<section className='p-6'>
			<Carousel
				// plugins={[
				// 	Autoplay({
				// 		delay: 2000,
				// 	}),
				// ]}
				className='relative'
			>
				<CarouselContent>
					{testimonials
						.concat(new Array(10).fill(testimonials[0]))
						.map((testimonial, idx) => (
							<CarouselItem
								key={`${testimonial._id}-${idx}`}
								className='md:basis-1/2 lg:basis-1/4 h-full'
							>
								<div className='text-black relative'>
									<video
										className='aspect-[9_/_16] rounded-lg'
										width='100%'
										height='570'
										controls
										preload='metadata'
									>
										<source
											src={`${testimonial.videoUrl}#t=0.5`}
											type='video/mp4'
										/>
									</video>
									<div className='absolute bottom-20 left-0 px-4'>
										<div className='flex gap-2 items-center'>
											{Array(testimonial.rating)
												.fill(0)
												.map((_, starIdx) => {
													return (
														<span
															key={`${testimonial._id}-${idx}-star-${starIdx}`}
														>
															<StarIcon
																fill='#facc15'
																className='text-yellow-400'
																size={20}
															/>
														</span>
													);
												})}
										</div>
										<div className='text-white pt-2'>
											<h1 className='text-lg'>
												{testimonial.title}
											</h1>
											<h2 className='text-sm text-slate-300'>
												{testimonial.designation}
											</h2>
										</div>
									</div>
								</div>
								<div className='px-4 mt-4'>
									<p className='text-sm text-justify'>
										&ldquo;{testimonial.testimonial}&rdquo;
									</p>
									<p className='text-xs text-slate-500'>
										{testimonial.date.toDateString()}
									</p>
								</div>
							</CarouselItem>
						))}
				</CarouselContent>
				<CarouselPrevious className='left-0' />
				<CarouselNext className='right-0' />
			</Carousel>
		</section>
	);
};

export default TestimonialsCarousel;
