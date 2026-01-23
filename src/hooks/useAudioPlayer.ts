import { useEffect, useRef, useState } from 'react';
import { Rector } from '../types';

export const useAudioPlayer = (currentRector: Rector | undefined, isMuted: boolean) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Cleanup function to stop audio when component unmounts or rector changes
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    useEffect(() => {
        if (!currentRector?.audio_url) {
            setIsPlaying(false);
            return;
        }

        // Create or update audio instance
        if (audioRef.current) {
            audioRef.current.pause();
        }

        const audio = new Audio(currentRector.audio_url);
        audioRef.current = audio;
        audio.volume = 1;

        // Event listeners for state
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        if (!isMuted) {
            // Attempt to auto-play only if not muted
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio play prevented:", error);
                    setIsPlaying(false);
                });
            }
        }

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
        }
    }, [currentRector?.id]); // Re-run when rector ID changes

    useEffect(() => {
        if (!audioRef.current) return;

        if (isMuted) {
            audioRef.current.pause();
        } else {
            // Resume or start playing
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio play prevented on unmute:", error);
                });
            }
        }
    }, [isMuted]);

    return { audioRef, isPlaying };
};
