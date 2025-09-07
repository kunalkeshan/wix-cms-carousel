import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorTestimonialProps {
	onRetry?: () => void;
}

const ErrorTestimonial: React.FC<ErrorTestimonialProps> = ({ onRetry }) => {
	return (
		<div className='text-black relative'>
			{/* Error video placeholder */}
			<div className='relative aspect-[9_/_16] rounded-t-lg overflow-hidden bg-gray-200 flex flex-col items-center justify-center'>
				<AlertCircle className='w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mb-2 sm:mb-4' />
				<div className='text-center px-4'>
					<h3 className='text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2'>
						Unable to load testimonials
					</h3>
					<p className='text-xs text-gray-500 mb-2 sm:mb-4'>
						Please try again later
					</p>
					{onRetry && (
						<button
							onClick={onRetry}
							className='inline-flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded text-xs sm:text-sm text-gray-700 transition-colors'
						>
							<RefreshCw className='w-3 h-3 sm:w-4 sm:h-4' />
							Retry
						</button>
					)}
				</div>
			</div>
			
			{/* Error content */}
			<div className='p-2 sm:p-4 bg-white rounded-b-lg flex-1'>
				<p className='text-xs sm:text-sm text-gray-500 text-center'>
					&ldquo;We're working to resolve this issue. Thank you for your patience.&rdquo;
				</p>
				<div className='text-xs text-gray-400 text-center mt-2'>
					Technical Support
				</div>
			</div>
		</div>
	);
};

export default ErrorTestimonial;