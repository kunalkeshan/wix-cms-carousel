import React from 'react';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

interface Props
	extends React.HTMLAttributes<React.ComponentPropsWithoutRef<'div'>> {
	testimonials: ReadonlyArray<Testimonial>;
}

const TestimonialsCarousel: React.FC<Props> = ({ testimonials }) => {
	return <div>TestimonialsCarousel</div>;
};

export default TestimonialsCarousel;
