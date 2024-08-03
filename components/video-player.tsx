import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause } from 'lucide-react';
import { usePauseAllVideos } from '@/hooks/use-pause-all-videos';

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

	// Pause all other videos when this video is playing
	usePauseAllVideos(videoRef.current);

	// Update playing and listening states on this video
	// when other video tags are playing or paused
	// control flow comes from the above hook - usePauseAllVideos
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		video.addEventListener('ended', () => {
			setPlaying(false);
		});

		video.addEventListener('play', () => {
			setPlaying(true);
		});

		video.addEventListener('playing', () => {
			setPlaying(true);
		});

		video.addEventListener('pause', () => {
			setPlaying(false);
		});

		return () => {
			video.removeEventListener('ended', () => {
				setPlaying(false);
			});
			video.removeEventListener('play', () => {
				setPlaying(true);
			});
			video.removeEventListener('playing', () => {
				setPlaying(true);
			});
			video.removeEventListener('pause', () => {
				setPlaying(false);
			});
		};
	}, [videoRef]);

	return (
		<div
			role='button'
			className='relative aspect-[9_/_16] rounded-t-lg overflow-hidden bg-gradient-to-b from-transparent to-black'
			onClick={() => {
				const control = playing ? 'pause' : 'play';
				handleTogglePlay(control);
			}}
		>
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
				<source src={`${videoUrl}#t=0.1`} type='video/mp4' />
			</video>
			<div className='h-fit absolute bottom-4 right-4 p-1 rounded-md hover:bg-white/40 transition-all duration-300'>
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
			</div>
		</div>
	);
};

export default VideoPlayer;
