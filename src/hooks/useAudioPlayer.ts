import { useEffect, useRef, useState } from 'react';
import { Rector } from '../types';

export const useAudioPlayer = (currentRector: Rector | undefined, isMuted: boolean) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

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
        if (!currentRector?.audio_url) return;

        // Create or update audio instance
        if (audioRef.current) {
            audioRef.current.pause();
        }

        const audio = new Audio(currentRector.audio_url);
        audioRef.current = audio;
        audio.volume = 1;

        if (!isMuted) {
            // Attempt to auto-play only if not muted
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio play prevented:", error);
                });
            }
        }

        return () => {
            audio.pause();
            audio.currentTime = 0;
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

    return audioRef;
};
