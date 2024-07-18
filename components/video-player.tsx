import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause } from 'lucide-react';

interface Props extends React.VideoHTMLAttributes<HTMLVideoElement> {
	videoUrl: string;
}

const VideoPlayer: React.FC<Props> = ({ videoUrl, className, ...props }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = useState(false);

	const handleTogglePlay = (control: 'play' | 'pause') => {
		if (!videoRef.current) return;
		if (control === 'play') {
			videoRef.current.play();
			setPlaying(true);
		} else if (control === 'pause') {
			videoRef.current.pause();
			setPlaying(false);
		}
	};

	return (
		<div className='relative aspect-[9_/_16] rounded-t-lg overflow-hidden bg-gradient-to-b from-transparent to-black'>
			<video
				ref={videoRef}
				{...props}
				className={cn('w-full h-auto', className)}
				width='100%'
				height='570'
				// controls
				preload='metadata'
				playsInline
			>
				<source src={`${videoUrl}#t=0.5`} type='video/mp4' />
			</video>
			<button
				onClick={() => {
					const control = playing ? 'pause' : 'play';
					handleTogglePlay(control);
				}}
				className='h-fit absolute bottom-4 right-4 p-1 rounded-md hover:bg-white/40 transition-all duration-300'
			>
				{playing ? (
					<Pause
						size={20}
						fill='#ffffff'
						stroke='#ffffff'
						className='shrink-0'
					/>
				) : (
					<Play
						size={20}
						fill='#ffffff'
						stroke='#ffffff'
						className='shrink-0'
					/>
				)}
			</button>
		</div>
	);
};

export default VideoPlayer;
