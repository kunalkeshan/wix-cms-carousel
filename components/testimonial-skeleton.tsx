import { StarIcon } from 'lucide-react';

const TestimonialSkeleton: React.FC = () => {
	return (
		<div className='text-black relative animate-pulse'>
			{/* Video skeleton */}
			<div className='relative aspect-[9_/_16] rounded-t-lg overflow-hidden bg-gray-300'>
				<div className='absolute bottom-4 left-0 px-4'>
					<div className='flex gap-1 items-center mb-2'>
						{Array(5)
							.fill(0)
							.map((_, index) => (
								<StarIcon
									key={index}
									className='text-gray-400'
									size={12}
								/>
							))}
					</div>
					<div className='space-y-2'>
						<div className='h-4 bg-gray-400 rounded w-3/4'></div>
						<div className='h-3 bg-gray-400 rounded w-1/2'></div>
					</div>
				</div>
				{/* Play button skeleton */}
				<div className='absolute bottom-4 right-4 w-10 h-10 bg-gray-400 rounded-md'></div>
			</div>
			
			{/* Content skeleton */}
			<div className='p-4 bg-white rounded-b-lg flex-1 space-y-3'>
				<div className='space-y-2'>
					<div className='h-4 bg-gray-300 rounded w-full'></div>
					<div className='h-4 bg-gray-300 rounded w-4/5'></div>
					<div className='h-4 bg-gray-300 rounded w-3/5'></div>
				</div>
				<div className='h-3 bg-gray-300 rounded w-1/3'></div>
			</div>
		</div>
	);
};

export default TestimonialSkeleton;