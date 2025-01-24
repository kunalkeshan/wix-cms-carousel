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
import VideoPlayer from './video-player';
import { dateFormatter } from '@/lib/utils';

// import Autoplay from 'embla-carousel-autoplay';

interface Props
	extends React.HTMLAttributes<React.ComponentPropsWithoutRef<'div'>> {
	testimonials: ReadonlyArray<Testimonial>;
}

const MAX_RATING = 5;

const TestimonialsCarousel: React.FC<Props> = ({ testimonials }) => {
	return (
		<section className='p-4 bg-transparent'>
			<Carousel className='bg-transparent'>
				<CarouselContent className='items-stretch'>
					{testimonials.map((testimonial, idx) => (
						<CarouselItem
							key={`${testimonial._id}-${idx}`}
							className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 min-h-full rounded-lg overflow-hidden'
						>
							<div className='text-black relative'>
								<VideoPlayer videoUrl={testimonial.videoUrl} />
								<div className='absolute bottom-4 left-0 px-4'>
									<div className='flex gap-1 items-center'>
										{Array(testimonial.rating)
											.fill(0)
											.map((_, index) => {
												return (
													<span
														key={`filled-${index}`}
													>
														<StarIcon
															fill='#facc15'
															className='text-yellow-400'
															stroke='#000000'
															strokeWidth={1}
															size={12}
														/>
													</span>
												);
											})}
										{Array(MAX_RATING - testimonial.rating)
											.fill(0)
											.map((_, index) => {
												return (
													<span
														key={`unfilled-${index}`}
													>
														<StarIcon
															className='text-yellow-400'
															size={12}
														/>
													</span>
												);
											})}
									</div>
									{/* Refer to Globals CSS for more information on the "text-outline" class. */}
									<div className='text-white pt-2 text-outline max-w-[90%]'>
										<h1 className='text-sm'>
											{testimonial.title
												.split('|')
												.map((item, idx) => (
													<React.Fragment
														key={`testimonial-title-${testimonial._id}-${idx}`}
													>
														<span className='select-all'>
															{item}
														</span>
														{idx !==
															testimonial.title.split(
																'|'
															).length -
																1 && ' | '}
													</React.Fragment>
												))}
										</h1>
										<h2 className='text-xs text-white'>
											{testimonial.designation}
										</h2>
									</div>
								</div>
							</div>
							<div className='p-4 bg-white rounded-b-lg flex-1'>
								<p className='text-sm select-all'>
									&ldquo;{testimonial.testimonial}&rdquo;
								</p>
								<time
									dateTime={testimonial.date.toDateString()}
									className='text-xs text-slate-500'
								>
									{dateFormatter(testimonial.date)}
								</time>
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
