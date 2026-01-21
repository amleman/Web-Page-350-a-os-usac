import { Rector } from '../types';

export const exportInteractionsToCSV = (rectors: Rector[]) => {
  // Define CSV headers
  const headers = ['ID', 'Nombre', 'Periodo', 'Likes (Base)', 'Likes (Locales)', 'Alumnos (Base)', 'Check-ins (Locales)'];
  
  // Map data to rows
  const rows = rectors.map(rector => {
    // Get local storage data to supplement base data
    const localLiked = localStorage.getItem(`like_${rector.id}`) === 'true' ? 1 : 0;
    const localCheckIn = localStorage.getItem(`checkin_${rector.id}`) === 'true' ? 1 : 0;
    
    return [
      rector.id,
      `"${rector.nombre}"`, // Quote strings to handle commas
      rector.periodo,
      rector.interacciones.likes,
      localLiked,
      rector.interacciones.alumnos,
      localCheckIn
    ].join(',');
  });

  // Combine headers and rows
  const csvContent = [headers.join(','), ...rows].join('\n');

  // Create Blob and Download Link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'interacciones_usac_350.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};