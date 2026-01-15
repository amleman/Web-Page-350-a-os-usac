import { useEffect, useRef } from 'react';
import { preloadAdjacentImages } from '../utils/imagePreloader';

/**
 * Hook para precargar imágenes adyacentes cuando cambia el índice actual
 */
export const useImagePreloader = <T>(
  currentIndex: number,
  items: T[],
  getImageUrl: (item: T, index: number) => string
) => {
  const prevIndexRef = useRef<number>(currentIndex);

  useEffect(() => {
    // Solo precargar si el índice cambió
    if (prevIndexRef.current !== currentIndex) {
      preloadAdjacentImages(
        currentIndex,
        items.length,
        (index) => getImageUrl(items[index], index)
      );
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex, items, getImageUrl]);
};
