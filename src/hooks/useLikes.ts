import { useState, useEffect, useCallback } from 'react';
import { loadRectorLikes, checkUserLiked, toggleLike as toggleLikeAPI, getUserId } from '../utils/likesStorage';

export const useLikes = (rectorId: string) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const userId = getUserId();

  // Cargar likes al montar el componente
  useEffect(() => {
    const fetchLikes = async () => {
      console.log(`[Hook] useLikes - Iniciando carga para rector: ${rectorId}, userId: ${userId}`);
      setIsLoading(true);
      try {
        // Cargar conteo de likes desde la base de datos
        const count = await loadRectorLikes(rectorId);
        console.log(`[Hook] useLikes - Count recibido para ${rectorId}: ${count}`);
        setLikeCount(count || 0);
        
        // Verificar si el usuario ya dio like
        const liked = await checkUserLiked(rectorId, userId);
        console.log(`[Hook] useLikes - Usuario ${userId} ha dado like a ${rectorId}: ${liked}`);
        setIsLiked(liked);
      } catch (error) {
        console.error(`[Hook] Error fetching likes para ${rectorId}:`, error);
        // Si falla, usar 0
        setLikeCount(0);
        setIsLiked(false);
      } finally {
        setIsLoading(false);
        console.log(`[Hook] useLikes - Carga completada para ${rectorId}`);
      }
    };

    fetchLikes();
  }, [rectorId, userId]);

  const toggleLike = useCallback(async () => {
    console.log(`[Hook] toggleLike - Iniciando para ${rectorId}, estado actual: isLiked=${isLiked}, count=${likeCount}`);
    try {
      // Actualización optimista
      const wasLiked = isLiked;
      const newIsLiked = !wasLiked;
      const newCount = wasLiked ? Math.max(0, likeCount - 1) : likeCount + 1;
      
      console.log(`[Hook] toggleLike - Actualización optimista: newIsLiked=${newIsLiked}, newCount=${newCount}`);
      setIsLiked(newIsLiked);
      setLikeCount(newCount);

      // Llamar a la API
      console.log(`[Hook] toggleLike - Llamando API para ${rectorId}`);
      const result = await toggleLikeAPI(rectorId, userId);
      console.log(`[Hook] toggleLike - Resultado de API para ${rectorId}:`, result);
      
      // Actualizar con los valores reales del servidor
      setIsLiked(result.isLiked);
      setLikeCount(result.count);
      console.log(`[Hook] toggleLike - Estado actualizado: isLiked=${result.isLiked}, count=${result.count}`);
      
      return result.isLiked; // Retorna true si se agregó like, false si se quitó
    } catch (error) {
      // Revertir en caso de error
      console.error(`[Hook] toggleLike - Error para ${rectorId}, revirtiendo cambios:`, error);
      setIsLiked(!isLiked);
      setLikeCount(likeCount);
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
