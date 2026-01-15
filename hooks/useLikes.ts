import { useState, useEffect, useCallback } from 'react';
import { loadRectorLikes, checkUserLiked, toggleLike as toggleLikeAPI, getUserId } from '../utils/likesStorage';

export const useLikes = (rectorId: string, initialCount: number = 0) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(true);

  const userId = getUserId();

  // Cargar likes al montar el componente
  useEffect(() => {
    const fetchLikes = async () => {
      setIsLoading(true);
      try {
        // Cargar conteo de likes
        const count = await loadRectorLikes(rectorId);
        setLikeCount(count || initialCount);
        
        // Verificar si el usuario ya dio like
        const liked = await checkUserLiked(rectorId, userId);
        setIsLiked(liked);
      } catch (error) {
        console.error('Error fetching likes:', error);
        // Usar valores iniciales si falla
        setLikeCount(initialCount);
        setIsLiked(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikes();
  }, [rectorId, initialCount, userId]);

  const toggleLike = useCallback(async () => {
    try {
      // Actualización optimista
      const wasLiked = isLiked;
      const newIsLiked = !wasLiked;
      const newCount = wasLiked ? Math.max(0, likeCount - 1) : likeCount + 1;
      
      setIsLiked(newIsLiked);
      setLikeCount(newCount);

      // Llamar a la API
      const result = await toggleLikeAPI(rectorId, userId);
      
      // Actualizar con los valores reales del servidor
      setIsLiked(result.isLiked);
      setLikeCount(result.count);
      
      return result.isLiked; // Retorna true si se agregó like, false si se quitó
    } catch (error) {
      // Revertir en caso de error
      setIsLiked(!isLiked);
      setLikeCount(likeCount);
      console.error('Error toggling like:', error);
      throw error;
    }
  }, [rectorId, userId, isLiked, likeCount]);

  // Sincronizar periódicamente (cada 60 segundos)
  useEffect(() => {
    const syncInterval = setInterval(async () => {
      try {
        const count = await loadRectorLikes(rectorId);
        setLikeCount(count);
        
        const liked = await checkUserLiked(rectorId, userId);
        setIsLiked(liked);
      } catch (error) {
        console.warn('Error syncing likes:', error);
      }
    }, 60000); // 60 segundos

    return () => clearInterval(syncInterval);
  }, [rectorId, userId]);

  return {
    likeCount,
    isLiked,
    toggleLike,
    isLoading,
  };
};
