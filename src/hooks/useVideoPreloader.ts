import { useEffect, useRef } from 'react';
import { preloadAdjacentVideos } from '../utils/imagePreloader';

/**
 * Hook para precargar videos adyacentes cuando cambia el índice actual
 */
export const useVideoPreloader = <T>(
  currentIndex: number,
  items: T[],
  getVideoUrl: (item: T, index: number) => string | undefined
) => {
  const prevIndexRef = useRef<number>(currentIndex);

  useEffect(() => {
    // Solo precargar si el índice cambió
    if (prevIndexRef.current !== currentIndex) {
      preloadAdjacentVideos(
        currentIndex,
        items.length,
        (index) => getVideoUrl(items[index], index)
      );
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex, items, getVideoUrl]);
};
