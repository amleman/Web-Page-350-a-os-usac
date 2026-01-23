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

/**
 * Utilidad para precargar videos (solo metadatos para cache)
 */
export const preloadVideo = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.onloadeddata = () => resolve();
    video.onerror = reject;
    video.src = src;
    video.load();
  });
};

export const preloadVideos = async (sources: string[]): Promise<void> => {
  const promises = sources.map(src => preloadVideo(src).catch(() => {
    console.warn(`Failed to preload video: ${src}`);
  }));
  await Promise.all(promises);
};

/**
 * Precarga videos adyacentes
 */
export const preloadAdjacentVideos = (
  currentIndex: number,
  totalItems: number,
  getVideoUrl: (index: number) => string | undefined
): void => {
  const videosToPreload: string[] = [];

  // Precargar anterior
  if (currentIndex > 0) {
    const url = getVideoUrl(currentIndex - 1);
    if (url) videosToPreload.push(url);
  }

  // Precargar siguiente
  if (currentIndex < totalItems - 1) {
    const url = getVideoUrl(currentIndex + 1);
    if (url) videosToPreload.push(url);
  }

  preloadVideos(videosToPreload).catch(() => { });
};
