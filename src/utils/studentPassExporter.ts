import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { StudentPass } from '../types';

/**
 * High-definition visual generator and exporter for Student Free Access Passes
 * Exports in PDF, PNG, and JPEG formats with embedded QR codes, holographic badge, and verification seals.
 */

// Generate QR Code data URL
export async function generateStudentPassQRCode(pass: StudentPass): Promise<string> {
  const qrPayload = JSON.stringify({
    type: 'SHELBY_STUDENT_PASS',
    passcode: pass.code,
    grantee: pass.studentName || 'Student Scholar',
    institution: pass.institution || 'Academic Institution',
    typeGrant: pass.passType,
    status: 'ACTIVE_VERIFIED',
    url: typeof window !== 'undefined' ? `${window.location.origin}/?student_code=${encodeURIComponent(pass.code)}` : `https://shelby.ai/?code=${pass.code}`
  });

  try {
    return await QRCode.toDataURL(qrPayload, {
      width: 320,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    });
  } catch (err) {
    console.error('Error generating pass QR code:', err);
    return '';
  }
}

/**
 * Render Student Pass onto an HTML5 Canvas for high-res PNG & JPEG export
 */
export async function renderStudentPassToCanvas(pass: StudentPass): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 750;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2d context');

  // Background Gradient (Luxury Academic Emerald & Deep Navy)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#064e3b'); // Emerald-900
  bgGrad.addColorStop(0.4, '#0f172a'); // Slate-900
  bgGrad.addColorStop(1, '#1e1b4b'); // Indigo-950
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Outer Gold Border & Guilloche Frame
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  ctx.strokeStyle = '#f59e0b'; // Gold accent
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  // Decorative corner brackets
  const cornerSize = 40;
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 4;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(40, 40 + cornerSize);
  ctx.lineTo(40, 40);
  ctx.lineTo(40 + cornerSize, 40);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(width - 40 - cornerSize, 40);
  ctx.lineTo(width - 40, 40);
  ctx.lineTo(width - 40, 40 + cornerSize);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(40, height - 40 - cornerSize);
  ctx.lineTo(40, height - 40);
  ctx.lineTo(40 + cornerSize, height - 40);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(width - 40 - cornerSize, height - 40);
  ctx.lineTo(width - 40, height - 40);
  ctx.lineTo(width - 40, height - 40 - cornerSize);
  ctx.stroke();

  // Top Header Banner
  ctx.fillStyle = '#065f46';
  ctx.fillRect(40, 40, width - 80, 110);

  // Institution / Platform Brand
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('🎓 SHELBY.AI ACADEMIC SCHOLARSHIP PASS', 70, 95);

  ctx.fillStyle = '#6ee7b7';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('OFFICIAL 100% FREE LIFETIME AI INTELLIGENCE GRANT • ZERO PAYWALLS', 70, 128);

  // Verified Badge in Top Right
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.roundRect(width - 240, 60, 180, 48, 12);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px system-ui, sans-serif';
  ctx.fillText('VERIFIED PASS ✓', width - 225, 90);

  // Left Details Column
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 14px system-ui, sans-serif';
  ctx.fillText('STUDENT / SCHOLAR NAME:', 70, 200);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(pass.studentName || 'Authorized Student / Educator', 70, 235);

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 14px system-ui, sans-serif';
  ctx.fillText('ACADEMIC INSTITUTION / AFFILIATION:', 70, 285);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.fillText(pass.institution || 'Global University / School Network', 70, 315);

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 14px system-ui, sans-serif';
  ctx.fillText('PASS TYPE & GRANT CATEGORY:', 70, 365);
  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.fillText(`✨ ${pass.passType} — 100% Lifetime Free ($0/mo Forever)`, 70, 395);

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 14px system-ui, sans-serif';
  ctx.fillText('ISSUED & SIGNED BY:', 70, 445);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'italic 16px system-ui, sans-serif';
  ctx.fillText(pass.issuedBy || 'Shivam Kumar (Founder & CEO)', 70, 470);

  // Passcode Box (High-Contrast Glow Container)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(70, 510, 680, 110);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.strokeRect(70, 510, 680, 110);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 13px monospace';
  ctx.fillText('SECRET REDEMPTION PASSCODE (ENTER IN APP FOR IMMEDIATE ACTIVATION):', 90, 540);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px monospace';
  ctx.fillText(pass.code, 90, 590);

  // QR Code on Right
  const qrDataUrl = await generateStudentPassQRCode(pass);
  if (qrDataUrl) {
    const qrImg = new Image();
    await new Promise<void>((resolve) => {
      qrImg.onload = () => resolve();
      qrImg.src = qrDataUrl;
    });
    // White background container for QR
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(width - 380, 190, 290, 330, 16);
    ctx.fill();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.drawImage(qrImg, width - 355, 215, 240, 240);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SCAN TO REDEEM PASS', width - 235, 485);
    ctx.fillStyle = '#059669';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('Shelby.ai Academic Grant', width - 235, 503);
    ctx.textAlign = 'left'; // Reset
  }

  // Bottom Security Ribbon
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(40, height - 90, width - 80, 50);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px monospace';
  ctx.fillText(`Pass ID: ${pass.id} | Generated: ${new Date(pass.createdAt).toLocaleDateString()} | Unlocks All 70+ AI Models & GPU IDEs | Support: support@shelby.ai`, 60, height - 60);

  return canvas;
}

/**
 * Export Student Pass as PNG Image
 */
export async function downloadStudentPassPNG(pass: StudentPass, filename?: string) {
  const canvas = await renderStudentPassToCanvas(pass);
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = filename || `Student_Pass_${pass.code.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
  link.href = dataUrl;
  link.click();
}

/**
 * Export Student Pass as JPEG Image
 */
export async function downloadStudentPassJPEG(pass: StudentPass, filename?: string) {
  const canvas = await renderStudentPassToCanvas(pass);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
  const link = document.createElement('a');
  link.download = filename || `Student_Pass_${pass.code.replace(/[^a-zA-Z0-9]/g, '_')}.jpeg`;
  link.href = dataUrl;
  link.click();
}

/**
 * Export Student Pass as Official Vector PDF Document
 */
export async function downloadStudentPassPDF(pass: StudentPass, filename?: string) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;

  // Background Fill (Deep Slate & Emerald)
  doc.setFillColor(15, 23, 42); // Slate-900
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Emerald & Gold Double Border
  doc.setDrawColor(16, 185, 129); // Emerald
  doc.setLineWidth(1.5);
  doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

  doc.setDrawColor(245, 158, 11); // Gold
  doc.setLineWidth(0.6);
  doc.rect(margin + 2.5, margin + 2.5, pageWidth - (margin + 2.5) * 2, pageHeight - (margin + 2.5) * 2);

  // Top Header Banner
  doc.setFillColor(6, 78, 59); // Emerald-900
  doc.rect(margin + 3, margin + 3, pageWidth - (margin + 3) * 2, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('🎓 SHELBY.AI ACADEMIC SCHOLARSHIP PASS', margin + 12, margin + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(110, 231, 183);
  doc.text('OFFICIAL 100% FREE LIFETIME AI INTELLIGENCE GRANT • ZERO PAYWALLS • UNLIMITED GPU COMPUTE', margin + 12, margin + 24);

  // Verified Status Pill on Right
  doc.setFillColor(16, 185, 129);
  doc.roundedRect(pageWidth - margin - 50, margin + 10, 38, 12, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('VERIFIED PASS ✓', pageWidth - margin - 31, margin + 18, { align: 'center' });

  // Main Content Section
  let y = margin + 48;
  const col1X = margin + 12;

  // Student Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // Slate-400
  doc.text('STUDENT / SCHOLAR NAME:', col1X, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text(pass.studentName || 'Authorized Student / Educator', col1X, y + 8);

  // Institution
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text('ACADEMIC INSTITUTION / AFFILIATION:', col1X, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(226, 232, 240);
  doc.text(pass.institution || 'Global Academic & Research Network', col1X, y + 7);

  // Grant Type & Validity
  y += 18;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text('PASS TYPE & GRANT DURATION:', col1X, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(52, 211, 153);
  doc.text(`✨ ${pass.passType} — ${pass.expiresAt || 'Lifetime Free ($0 Forever)'}`, col1X, y + 7);

  // Passcode Box
  y += 20;
  doc.setFillColor(30, 41, 59); // Slate-800
  doc.roundedRect(col1X, y, 160, 28, 3, 3, 'F');
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.8);
  doc.roundedRect(col1X, y, 160, 28, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(251, 191, 36);
  doc.text('SECRET REDEMPTION PASSCODE (ENTER IN APP TO UNLOCK):', col1X + 6, y + 8);

  doc.setFont('courier', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text(pass.code, col1X + 6, y + 21);

  // QR Code Generation & Embedding on Right
  const qrDataUrl = await generateStudentPassQRCode(pass);
  if (qrDataUrl) {
    const qrSize = 65;
    const qrX = pageWidth - margin - qrSize - 18;
    const qrY = margin + 45;

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(qrX - 4, qrY - 4, qrSize + 8, qrSize + 22, 3, 3, 'F');
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.8);
    doc.roundedRect(qrX - 4, qrY - 4, qrSize + 8, qrSize + 22, 3, 3, 'D');

    doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text('SCAN TO REDEEM', qrX + qrSize / 2, qrY + qrSize + 8, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(16, 185, 129);
    doc.text('Shelby.ai Academic Grant', qrX + qrSize / 2, qrY + qrSize + 14, { align: 'center' });
  }

  // Footer & Authorizing Signature
  const footerY = pageHeight - margin - 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Authorized by: ${pass.issuedBy || 'Shivam Kumar (Founder & CEO, Shelby.ai)'}`, col1X, footerY);
  doc.text(`Pass ID: ${pass.id} | Valid Worldwide across all 70+ AI Models, Research Engines & IDEs`, col1X, footerY + 5);

  const saveName = filename || `Student_Pass_${pass.code.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(saveName.endsWith('.pdf') ? saveName : `${saveName}.pdf`);
}
