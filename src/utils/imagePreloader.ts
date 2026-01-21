/**
 * Utilidad para precargar imágenes de forma eficiente
 */

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (sources: string[]): Promise<void> => {
  const promises = sources.map(src => preloadImage(src).catch(() => {
    // Silenciosamente ignorar errores de carga
    console.warn(`Failed to preload image: ${src}`);
  }));
  await Promise.all(promises);
};

/**
 * Precarga imágenes adyacentes (anterior y siguiente)
 */
export const preloadAdjacentImages = (
  currentIndex: number,
  totalItems: number,
  getImageUrl: (index: number) => string
): void => {
  const imagesToPreload: string[] = [];
  
  // Precargar anterior
  if (currentIndex > 0) {
    imagesToPreload.push(getImageUrl(currentIndex - 1));
  }
  
  // Precargar siguiente
  if (currentIndex < totalItems - 1) {
    imagesToPreload.push(getImageUrl(currentIndex + 1));
  }
  
  // Precargar en segundo plano sin bloquear
  preloadImages(imagesToPreload).catch(() => {
    // Ignorar errores silenciosamente
  });
};
