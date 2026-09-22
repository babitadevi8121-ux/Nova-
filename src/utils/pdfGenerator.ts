import { jsPDF } from 'jspdf';
import { BillingInvoice, Chat, GalleryItem, User } from '../types';

/**
 * High-precision vector PDF generator for Invoices, Chats, Images, and Documents.
 */

export function downloadPdfDoc(doc: jsPDF, filename: string) {
  doc.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
}

/**
 * Generate an official, professional Tax Invoice & Payment Receipt PDF
 */
export function generateInvoicePDF(invoice: BillingInvoice): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  let y = margin;

  // Header background banner
  doc.setFillColor(30, 27, 75); // Deep Indigo (#1e1b4b)
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Brand Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('Shelby.ai Technologies', margin, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(199, 210, 254); // Light indigo
  doc.text('Next-Gen AI Intelligence Platform & Services', margin, 24);
  doc.text('Founder & CEO: Shivam Kumar | Support: support@shelby.ai', margin, 29);
  doc.text('GSTIN: 07AABCS1429B1Z8 | PAN: AABCS1429B | MSME Registered', margin, 34);

  // Status Badge on Top Right
  doc.setFillColor(16, 185, 129); // Emerald (#10b981)
  doc.roundedRect(pageWidth - margin - 36, 12, 36, 9, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('PAID & ACTIVE', pageWidth - margin - 18, 18, { align: 'center' });

  // Invoice Details Ribbon
  y = 50;
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('TAX INVOICE & PAYMENT RECEIPT', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, margin, y + 5);

  // Divider line
  y += 10;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);

  // 2-Column Info Section
  y += 8;
  const col1X = margin;
  const col2X = pageWidth / 2 + 5;

  // Left column: Customer Details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(99, 102, 241); // Indigo
  doc.text('BILLED TO (CUSTOMER)', col1X, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(invoice.userName || 'Valued Subscriber', col1X, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Email: ${invoice.userEmail}`, col1X, y + 11);
  doc.text(`Account ID: ${invoice.userId}`, col1X, y + 16);

  // Right column: Invoice Metadata
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(99, 102, 241);
  doc.text('INVOICE METADATA', col2X, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Invoice No:`, col2X, y + 6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(invoice.invoiceNumber, col2X + 26, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Payment Date:`, col2X, y + 11);
  doc.text(new Date(invoice.paidAt).toLocaleString(), col2X + 26, y + 11);

  doc.text(`Payment Method:`, col2X, y + 16);
  doc.text(invoice.paymentMethod, col2X + 26, y + 16);

  doc.text(`Ref / Txn ID:`, col2X, y + 21);
  doc.text(invoice.paymentRef || 'TXN-' + Math.random().toString(36).substring(4).toUpperCase(), col2X + 26, y + 21);

  // Items Table
  y += 32;
  doc.setFillColor(241, 245, 249); // Slate-100
  doc.rect(margin, y, pageWidth - (margin * 2), 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text('ITEM DESCRIPTION', margin + 4, y + 5.5);
  doc.text('BILLING PERIOD', margin + 95, y + 5.5);
  doc.text('AMOUNT', pageWidth - margin - 4, y + 5.5, { align: 'right' });

  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);

  const subtotal = invoice.taxAmount ? invoice.totalAmount - invoice.taxAmount : invoice.totalAmount * 0.82;
  const items = invoice.items && invoice.items.length > 0 ? invoice.items : [
    { description: `${invoice.tier} Membership Tier (${invoice.billingCycle})`, amount: subtotal }
  ];

  items.forEach(it => {
    doc.text(it.description, margin + 4, y);
    doc.text(invoice.billingCycle.toUpperCase(), margin + 95, y);
    doc.text(`${invoice.currency} ${it.amount.toFixed(2)}`, pageWidth - margin - 4, y, { align: 'right' });
    y += 7;
  });

  // Table summary lines
  y += 2;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  const rightAlignCol = pageWidth - margin - 50;
  const rightAlignVal = pageWidth - margin - 4;

  // Subtotal
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Subtotal:', rightAlignCol, y);
  doc.setTextColor(15, 23, 42);
  doc.text(`${invoice.currency} ${subtotal.toFixed(2)}`, rightAlignVal, y, { align: 'right' });
  y += 6;

  // Tax (GST/VAT)
  doc.setTextColor(100, 116, 139);
  doc.text('Tax (18% GST / VAT):', rightAlignCol, y);
  doc.setTextColor(15, 23, 42);
  doc.text(`${invoice.currency} ${(invoice.taxAmount || invoice.totalAmount * 0.18).toFixed(2)}`, rightAlignVal, y, { align: 'right' });
  y += 6;

  // Total Paid box
  doc.setFillColor(238, 242, 255); // Indigo light
  doc.roundedRect(pageWidth - margin - 80, y, 80, 10, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(67, 56, 202); // Indigo-700
  doc.text('TOTAL AMOUNT PAID:', pageWidth - margin - 76, y + 6.5);
  doc.text(`${invoice.currency} ${invoice.totalAmount.toFixed(2)}`, rightAlignVal, y + 6.5, { align: 'right' });

  // Membership Validity Notice
  y += 22;
  doc.setFillColor(240, 253, 244); // Emerald light
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 16, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(21, 128, 61); // Emerald-700
  doc.text(`Active Subscription Privileges Confirmed`, margin + 5, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(22, 101, 52);
  doc.text(`Your ${invoice.tier} plan grants unlimited access to all AI tools valid through ${new Date(invoice.validUntil).toLocaleDateString()}.`, margin + 5, y + 11.5);

  // Footer & Terms
  y = doc.internal.pageSize.getHeight() - 25;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageWidth - margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('This is a computer-generated tax invoice and requires no physical signature. Registered under the Digital Services Act.', margin, y + 5);
  doc.text('Shelby.ai Cloud Platform | Global Enterprise Infrastructure | All Rights Reserved © 2026', margin, y + 9);
  doc.text(`Receipt Reference: ${invoice.invoiceNumber} | User UID: ${invoice.userId}`, margin, y + 13);

  return doc;
}

/**
 * Generate a clean, readable PDF transcript of a Chat Conversation
 */
export function generateChatPDF(chat: Chat, user?: User | null): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  let y = margin;

  // Header Banner
  doc.setFillColor(30, 27, 75);
  doc.rect(0, 0, pageWidth, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Nova AI - Conversation Transcript', margin, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(199, 210, 254);
  doc.text(`Thread: ${chat.title}`, margin, 20);
  doc.text(`Model: ${chat.model || 'Gemini 3.5 Flash'} • Date: ${new Date(chat.createdAt).toLocaleDateString()}`, margin, 25);

  y = 42;

  // Loop through messages and render with page overflow protection
  chat.messages.forEach((msg, idx) => {
    const isUser = msg.role === 'user';
    const roleTitle = isUser ? (user?.name || 'User') : 'Nova AI Assistant';
    const bubbleColor = isUser ? [238, 242, 255] : [248, 250, 252];
    const textColor = isUser ? [49, 46, 129] : [15, 23, 42];

    // Check if new page is needed
    if (y > pageHeight - 35) {
      doc.addPage();
      y = margin;
    }

    // Role Label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(isUser ? 79 : 14, isUser ? 70 : 165, isUser ? 229 : 233);
    doc.text(`[${idx + 1}] ${roleTitle} (${new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`, margin, y);
    y += 5;

    // Clean markdown text for PDF display
    const cleanContent = msg.content
      .replace(/```[\s\S]*?```/g, (match) => `\n--- Code Snippet ---\n${match.replace(/```[a-z]*\n?/g, '')}\n--- End Code ---\n`)
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/[*#_\-]/g, ' ');

    // Split text to fit page width
    const textLines = doc.splitTextToSize(cleanContent, pageWidth - (margin * 2) - 6);
    const boxHeight = (textLines.length * 4.5) + 6;

    // Check page overflow for long message
    if (y + boxHeight > pageHeight - 20) {
      doc.addPage();
      y = margin;
    }

    // Message background box
    doc.setFillColor(bubbleColor[0], bubbleColor[1], bubbleColor[2]);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, pageWidth - (margin * 2), boxHeight, 2, 2, 'FD');

    // Message text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(textLines, margin + 3, y + 4.5);

    y += boxHeight + 6;
  });

  // Footer on final page
  if (y > pageHeight - 20) {
    doc.addPage();
    y = margin;
  }
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`Exported from Nova AI Intelligence Platform (Shelby.ai) • Total Messages: ${chat.messages.length}`, margin, pageHeight - 10);

  return doc;
}

/**
 * Generate a visual Art & Prompt PDF Sheet for Image Generator creations
 */
export function generateImageArtPDF(prompt: string, imageUrl: string, metadata?: any): Promise<jsPDF> {
  return new Promise((resolve) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 18;

    // Header banner
    doc.setFillColor(15, 23, 42); // Slate-900
    doc.rect(0, 0, pageWidth, 30, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Nova AI - Generative Art Studio', margin, 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(148, 163, 184);
    doc.text(`High-Fidelity Neural Generation • Date: ${new Date().toLocaleDateString()}`, margin, 20);

    let y = 38;

    // Prompt Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(99, 102, 241);
    doc.text('ARTISTIC PROMPT', margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    const promptLines = doc.splitTextToSize(prompt, pageWidth - (margin * 2));
    doc.text(promptLines, margin, y);
    y += (promptLines.length * 4.5) + 6;

    // Try loading and embedding image into PDF canvas
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    img.onload = () => {
      try {
        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = Math.min(140, (img.height / img.width) * imgWidth);

        doc.setFillColor(241, 245, 249);
        doc.roundedRect(margin - 1, y - 1, imgWidth + 2, imgHeight + 2, 2, 2, 'F');
        doc.addImage(img, 'JPEG', margin, y, imgWidth, imgHeight);

        y += imgHeight + 8;
      } catch (e) {
        console.warn('Could not embed raw image directly into jsPDF:', e);
      }

      // Metadata Footer
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(`Aspect Ratio: ${metadata?.aspectRatio || '1:1'} • Quality: ${metadata?.quality || 'HD'} • Generated via Gemini Imagen 3 Engine`, margin, y);
      doc.text('Shelby.ai Studio • Founder: Shivam Kumar', margin, y + 5);

      resolve(doc);
    };

    img.onerror = () => {
      // Fallback if image fails crossOrigin load
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text(`Image Source URL: ${imageUrl.substring(0, 80)}...`, margin, y + 10);
      resolve(doc);
    };
  });
}

/**
 * Local & Cloud Persistence helpers for Gallery & PDF Documents
 */
const GALLERY_STORAGE_KEY = 'nova_saved_gallery';

export function getSavedGalleryItems(userId?: string): GalleryItem[] {
  try {
    const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (!raw) return [];
    const all: GalleryItem[] = JSON.parse(raw);
    if (userId) {
      return all.filter(item => item.userId === userId || !item.userId);
    }
    return all;
  } catch (e) {
    console.error('Error loading gallery items:', e);
    return [];
  }
}

export function saveItemToGallery(item: GalleryItem): GalleryItem[] {
  try {
    const existing = getSavedGalleryItems();
    // Prevent duplicate IDs
    const filtered = existing.filter(i => i.id !== item.id);
    const updated = [item, ...filtered];
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving item to gallery:', e);
    return [];
  }
}

export function removeGalleryItem(id: string): GalleryItem[] {
  try {
    const existing = getSavedGalleryItems();
    const updated = existing.filter(i => i.id !== id);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error removing gallery item:', e);
    return [];
  }
}
