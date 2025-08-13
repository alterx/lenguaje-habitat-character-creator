import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { Character } from '../types/Character';

export async function exportWithJsPDF(state: Character): Promise<{ success: boolean; error?: string }> {
  const el = document.getElementById('sheet');
  if (!el) return { success: false, error: 'No encontré la hoja para exportar.' };
  
  try {
    // Use a fixed high scale for sharpness
    const canvas = await html2canvas(el as HTMLElement, {
      scale: 3,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
    });
    
    const imgW = canvas.width,
      imgH = canvas.height;
    const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'p' });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    // Calculate scale to fit both width and height, preserving aspect ratio
    const scale = Math.min(pageW / imgW, pageH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const offsetX = (pageW - drawW) / 2;
    const offsetY = (pageH - drawH) / 2;

    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      offsetX,
      offsetY,
      drawW,
      drawH,
      undefined,
      'FAST'
    );
    pdf.save(`${state.name || 'personaje'}.pdf`);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al generar el PDF.' };
  }
}
