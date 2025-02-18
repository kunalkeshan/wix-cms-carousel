interface Testimonial {
	_id: string;
	createdAt: Date;
	updatedAt: Date;
	date: Date;
	rating: number;
	title: string;
	testimonial: string;
	videoUrl: string;
	designation: string;
	tags?: TestimonialTags[];
}

type TestimonialTags = 'coliving' | 'independent' | 'retreats' | 'volunteering';
