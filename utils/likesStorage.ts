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
  // Use the base URL if available, stripping trailing slash to clean up
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? base.slice(0, -1) : base;
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
    console.log(`[Frontend] Cargando likes para ${rectorId} desde: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      cache: 'no-cache',
    });

    console.log(`[Frontend] Respuesta status: ${response.status} para ${rectorId}`);

    if (response.ok) {
      const data = await response.json();
      console.log(`[Frontend] Likes recibidos para ${rectorId}:`, data);
      return data.count || 0;
    } else {
      const errorText = await response.text();
      console.error(`[Frontend] Error en respuesta para ${rectorId}:`, errorText);
    }
  } catch (error) {
    console.error(`[Frontend] Error loading rector likes para ${rectorId}:`, error);
  }

  return 0;
};

// Verificar si un usuario ya dio like
export const checkUserLiked = async (rectorId: string, userId: string): Promise<boolean> => {
  try {
    const apiUrl = `${getApiBaseUrl()}/api/likes/${rectorId}/check/${userId}`;
    console.log(`[Frontend] Verificando like para ${rectorId}, userId: ${userId}, URL: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      cache: 'no-cache',
    });

    console.log(`[Frontend] Respuesta check status: ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      console.log(`[Frontend] Check like resultado para ${rectorId}:`, data);
      return data.isLiked || false;
    } else {
      const errorText = await response.text();
      console.error(`[Frontend] Error en check like para ${rectorId}:`, errorText);
    }
  } catch (error) {
    console.error(`[Frontend] Error checking like para ${rectorId}:`, error);
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
    console.log(`[Frontend] Toggle like para ${rectorId}, userId: ${userId}, URL: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    console.log(`[Frontend] Respuesta toggle status: ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      console.log(`[Frontend] Toggle like exitoso para ${rectorId}:`, data);
      return {
        isLiked: data.isLiked,
        count: data.count,
      };
    } else {
      const errorText = await response.text();
      console.error(`[Frontend] Error en toggle like para ${String(rectorId).replace(/\n|\r/g, ``)}:`, errorText);
      throw new Error(`Failed to toggle like: ${errorText}`);
    }
  } catch (error) {
    console.error(`[Frontend] Error toggling like para ${rectorId}:`, error);
    throw error;
  }
};


// Mobb security fix applied: LOG_FORGING https://mobb.ai/organization/dd378e88-da0e-4bff-b4fc-a76162045684/project/9362d7fb-a070-4444-9de2-a649c56da21c/report/9691a04a-59e6-4539-bf38-76955c4892a4/fix/8b87f8f2-d6fb-4f31-a241-39624da259d8