import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause } from 'lucide-react';
import { usePauseAllVideos } from '@/hooks/use-pause-all-videos';

interface Props extends React.VideoHTMLAttributes<HTMLVideoElement> {
	videoUrl: string;
}

const VideoPlayer: React.FC<Props> = ({ videoUrl, className, ...props }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const [hasLoadedMetadata, setHasLoadedMetadata] = useState(false);

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

	// Intersection Observer for lazy loading
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsInView(true);
						if (!hasLoadedMetadata && video.preload === 'none') {
							video.preload = 'metadata';
							setHasLoadedMetadata(true);
						}
					} else {
						setIsInView(false);
					}
				});
			},
			{
				threshold: 0.1, // Trigger when 10% of video is visible
				rootMargin: '100px', // Start loading 100px before entering viewport
			}
		);

		observer.observe(video);

		return () => {
			observer.unobserve(video);
		};
	}, [hasLoadedMetadata]);

	// Pause all other videos when this video is playing
	usePauseAllVideos(videoRef.current);

	// Update playing and listening states on this video
	// when other video tags are playing or paused
	// control flow comes from the above hook - usePauseAllVideos
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleEnded = () => setPlaying(false);
		const handlePlay = () => setPlaying(true);
		const handlePlaying = () => setPlaying(true);
		const handlePause = () => setPlaying(false);
		const handleLoadedMetadata = () => setHasLoadedMetadata(true);

		video.addEventListener('ended', handleEnded);
		video.addEventListener('play', handlePlay);
		video.addEventListener('playing', handlePlaying);
		video.addEventListener('pause', handlePause);
		video.addEventListener('loadedmetadata', handleLoadedMetadata);

		return () => {
			video.removeEventListener('ended', handleEnded);
			video.removeEventListener('play', handlePlay);
			video.removeEventListener('playing', handlePlaying);
			video.removeEventListener('pause', handlePause);
			video.removeEventListener('loadedmetadata', handleLoadedMetadata);
		};
	}, []);

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
				preload={isInView || hasLoadedMetadata ? 'metadata' : 'none'}
				playsInline
			>
				<source src={`${videoUrl}#t=0.001`} type='video/mp4' />
			</video>
			<div className='h-fit absolute bottom-4 right-4 p-1 rounded-md bg-white/40 transition-all duration-300'>
				{playing ? (
					<Pause
						size={32}
						fill='#ffffff'
						stroke='#ffffff'
						className='shrink-0'
					/>
				) : (
					<Play
						size={32}
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
