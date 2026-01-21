/**
 * Utilidad para trackear visitas a las páginas
 */

export type PageType = 'intro' | 'rector' | 'credits';

interface VisitData {
  rectorId?: string | null;
  pageType: PageType;
  sessionId: string;
}

// Obtener o crear session ID
export const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('usac-session-id');
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('usac-session-id', sessionId);
  }
  return sessionId;
};

// Obtener la URL base de la API
const getApiBaseUrl = (): string => {
  // Use the base URL if available, stripping trailing slash to clean up
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? base.slice(0, -1) : base;
};

// Registrar una visita
export const trackVisit = async (rectorId: string | null, pageType: PageType): Promise<void> => {
  try {
    const sessionId = getSessionId();
    const userAgent = navigator.userAgent;

    const apiUrl = `${getApiBaseUrl()}/api/visits`;

    console.log('[TrackVisit] Registrando visita:', { rectorId, pageType, sessionId });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rectorId,
        pageType,
        sessionId,
        userAgent,
      }),
    });

    if (response.ok) {
      console.log('[TrackVisit] Visita registrada exitosamente');
    } else {
      const errorText = await response.text();
      console.error('[TrackVisit] Error en respuesta:', response.status, errorText);
    }
  } catch (error) {
    console.error('[TrackVisit] Error tracking visit:', error);
  }
};

// Hook para trackear visitas automáticamente
export const useVisitTracker = (rectorId: string | null, pageType: PageType) => {
  if (typeof window === 'undefined') return;

  // Trackear al montar el componente
  const trackOnce = () => {
    trackVisit(rectorId, pageType);
  };

  // Usar un flag para evitar múltiples tracks en el mismo render
  const key = `${rectorId}-${pageType}`;
  if (!sessionStorage.getItem(`tracked-${key}`)) {
    trackOnce();
    sessionStorage.setItem(`tracked-${key}`, 'true');

    // Limpiar el flag después de 30 segundos para permitir nuevas visitas
    setTimeout(() => {
      sessionStorage.removeItem(`tracked-${key}`);
    }, 30000);
  }
};
