/**
 * Utilidad para almacenar likes usando el servidor backend con MySQL
 */

interface LikesData {
  [rectorId: string]: {
    count: number;
    likedBy?: string[]; // Opcional, no siempre se envía
  };
}

// Generar un ID único para el usuario actual
export const getUserId = (): string => {
  let userId = localStorage.getItem('usac-user-id');
  if (!userId) {
    userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('usac-user-id', userId);
  }
  return userId;
};

// Obtener la URL base de la API
const getApiBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const port = hostname === 'localhost' ? ':3001' : '';
    return `${window.location.protocol}//${hostname}${port}`;
  }
  return '';
};

// Cargar todos los likes desde el servidor
export const loadLikes = async (): Promise<LikesData> => {
  try {
    const apiUrl = `${getApiBaseUrl()}/api/likes`;
    const response = await fetch(apiUrl, {
      cache: 'no-cache',
    });

    if (response.ok) {
      const data = await response.json();
      // Guardar en localStorage como backup
      localStorage.setItem('usac-rectores-likes-backup', JSON.stringify(data));
      return data || {};
    }
  } catch (error) {
    console.warn('No se pudo cargar likes del servidor, usando localStorage:', error);
  }

  // Fallback a localStorage
  return loadLikesFromLocalStorage();
};

// Cargar likes de un rector específico
export const loadRectorLikes = async (rectorId: string): Promise<number> => {
  try {
    const apiUrl = `${getApiBaseUrl()}/api/likes/${rectorId}`;
    const response = await fetch(apiUrl, {
      cache: 'no-cache',
    });

    if (response.ok) {
      const data = await response.json();
      return data.count || 0;
    }
  } catch (error) {
    console.warn('Error loading rector likes:', error);
  }
  
  return 0;
};

// Verificar si un usuario ya dio like
export const checkUserLiked = async (rectorId: string, userId: string): Promise<boolean> => {
  try {
    const apiUrl = `${getApiBaseUrl()}/api/likes/${rectorId}/check/${userId}`;
    const response = await fetch(apiUrl, {
      cache: 'no-cache',
    });

    if (response.ok) {
      const data = await response.json();
      return data.isLiked || false;
    }
  } catch (error) {
    console.warn('Error checking like:', error);
  }
  
  return false;
};

// Cargar likes desde localStorage (fallback)
const loadLikesFromLocalStorage = (): LikesData => {
  try {
    const stored = localStorage.getItem('usac-rectores-likes-backup');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading likes from localStorage:', error);
  }
  return {};
};

// Toggle like (agregar o quitar)
export const toggleLike = async (rectorId: string, userId: string): Promise<{ isLiked: boolean; count: number }> => {
  try {
    const apiUrl = `${getApiBaseUrl()}/api/likes/${rectorId}/toggle`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        isLiked: data.isLiked,
        count: data.count,
      };
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
  
  throw new Error('Failed to toggle like');
};
