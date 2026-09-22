import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, Link as LinkIcon, Download, Copy, Check, Sparkles, RefreshCw, 
  ExternalLink, Share2, Eye, ShieldCheck, Wifi, User, Mail, MessageSquare, 
  CreditCard, Coins, Sliders, Palette, Image as ImageIcon, FileText, 
  Layers, CheckCircle2, AlertCircle, ArrowRight, Trash2, History,
  Upload, X, HelpCircle, Smartphone, Globe, Sparkle
} from 'lucide-react';
import { User as UserType } from '../types';
import jsPDF from 'jspdf';

interface QRGeneratorProps {
  user: UserType | null;
  onOpenAuth?: () => void;
  onOpenPricing?: () => void;
  initialUrl?: string;
}

type QRType = 'url' | 'text' | 'wifi' | 'vcard' | 'whatsapp' | 'email' | 'upi' | 'crypto';
type FrameStyle = 'none' | 'scan-me' | 'card' | 'badge' | 'glass';
type ErrorCorrection = 'L' | 'M' | 'Q' | 'H';

interface SavedQRCode {
  id: string;
  type: QRType;
  title: string;
  payload: string;
  createdAt: string;
  fgColor: string;
  bgColor: string;
}

const COLOR_PRESETS = [
  { name: 'Classic Dark', fg: '#0f172a', bg: '#ffffff' },
  { name: 'Indigo Neural', fg: '#4f46e5', bg: '#ffffff' },
  { name: 'Cosmic Purple', fg: '#7c3aed', bg: '#ffffff' },
  { name: 'Cyber Emerald', fg: '#059669', bg: '#ffffff' },
  { name: 'Crimson Ember', fg: '#dc2626', bg: '#ffffff' },
  { name: 'Sunset Amber', fg: '#d97706', bg: '#ffffff' },
  { name: 'Midnight Neon', fg: '#38bdf8', bg: '#090d16' },
  { name: 'Luxury Gold', fg: '#ca8a04', bg: '#18181b' },
];

const LOGO_PRESETS = [
  { id: 'none', name: 'None', icon: null },
  { id: 'nova', name: 'Nova AI', icon: '✨' },
  { id: 'link', name: 'Link', icon: '🔗' },
  { id: 'globe', name: 'Web', icon: '🌐' },
  { id: 'wifi', name: 'Wi-Fi', icon: '📶' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬' },
  { id: 'upi', name: 'UPI Pay', icon: '💳' },
  { id: 'crypto', name: 'Crypto', icon: '⚡' },
];

export default function QRGenerator({
  user,
  onOpenAuth,
  onOpenPricing,
  initialUrl = ''
}: QRGeneratorProps) {
  // Mode selection
  const [activeType, setActiveType] = useState<QRType>('url');
  const [activeTab, setActiveTab] = useState<'studio' | 'batch' | 'history'>('studio');

  // Input states for various types
  const [urlInput, setUrlInput] = useState(initialUrl || 'https://');
  const [textInput, setTextInput] = useState('');
  
  // Wi-Fi
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);

  // vCard
  const [vcardName, setVcardName] = useState('');
  const [vcardOrg, setVcardOrg] = useState('');
  const [vcardTitle, setVcardTitle] = useState('');
  const [vcardPhone, setVcardPhone] = useState('');
  const [vcardEmail, setVcardEmail] = useState('');
  const [vcardUrl, setVcardUrl] = useState('');
  const [vcardAddress, setVcardAddress] = useState('');

  // WhatsApp
  const [waPhone, setWaPhone] = useState('');
  const [waMessage, setWaMessage] = useState('');

  // Email
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // UPI
  const [upiId, setUpiId] = useState('');
  const [upiName, setUpiName] = useState('');
  const [upiAmount, setUpiAmount] = useState('');
  const [upiNote, setUpiNote] = useState('');

  // Crypto
  const [cryptoCoin, setCryptoCoin] = useState<'bitcoin' | 'ethereum' | 'solana' | 'usdt'>('bitcoin');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');

  // UTM / Smart URL Builder toggle
  const [showUtmBuilder, setShowUtmBuilder] = useState(false);
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');

  // Styling & Customization
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrection>('H');
  const [margin, setMargin] = useState<number>(2);
  const [resolution, setResolution] = useState<number>(512);
  const [frameStyle, setFrameStyle] = useState<FrameStyle>('scan-me');
  const [frameLabel, setFrameLabel] = useState('SCAN ME');
  const [centerLogo, setCenterLogo] = useState<string>('none');
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);

  // Batch Mode
  const [batchInput, setBatchInput] = useState('');
  const [batchResults, setBatchResults] = useState<Array<{ id: string; url: string; dataUrl: string }>>([]);
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false);

  // Preview & Render state
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrSvgString, setQrSvgString] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [savedHistory, setSavedHistory] = useState<SavedQRCode[]>([]);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nova_qr_history');
      if (saved) {
        setSavedHistory(JSON.parse(saved));
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  // Compute final payload string based on active type
  const getPayload = (): string => {
    switch (activeType) {
      case 'url': {
        let finalUrl = urlInput.trim();
        if (!finalUrl) return 'https://nova.ai';
        if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://') && !finalUrl.startsWith('//')) {
          finalUrl = 'https://' + finalUrl;
        }
        if (showUtmBuilder && (utmSource || utmMedium || utmCampaign)) {
          try {
            const parsed = new URL(finalUrl);
            if (utmSource) parsed.searchParams.set('utm_source', utmSource);
            if (utmMedium) parsed.searchParams.set('utm_medium', utmMedium);
            if (utmCampaign) parsed.searchParams.set('utm_campaign', utmCampaign);
            return parsed.toString();
          } catch (e) {
            return finalUrl;
          }
        }
        return finalUrl;
      }
      case 'text':
        return textInput.trim() || 'Nova AI Platform';
      case 'wifi': {
        const ssid = wifiSsid.trim() || 'My_WiFi_Network';
        const pass = wifiPassword;
        const enc = wifiEncryption;
        const hidden = wifiHidden ? 'H:true;' : '';
        return `WIFI:T:${enc};S:${ssid};P:${pass};${hidden};`;
      }
      case 'vcard': {
        const name = vcardName.trim() || 'Shivam Kumar';
        const org = vcardOrg.trim();
        const title = vcardTitle.trim();
        const phone = vcardPhone.trim();
        const email = vcardEmail.trim();
        const url = vcardUrl.trim();
        const addr = vcardAddress.trim();
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${name}`,
          org ? `ORG:${org}` : '',
          title ? `TITLE:${title}` : '',
          phone ? `TEL:${phone}` : '',
          email ? `EMAIL:${email}` : '',
          url ? `URL:${url}` : '',
          addr ? `ADR:;;${addr};;;;` : '',
          'END:VCARD'
        ].filter(Boolean).join('\n');
      }
      case 'whatsapp': {
        const cleanPhone = waPhone.replace(/\D/g, '');
        const msg = encodeURIComponent(waMessage.trim());
        return `https://wa.me/${cleanPhone}${msg ? `?text=${msg}` : ''}`;
      }
      case 'email': {
        const to = emailTo.trim();
        const sub = encodeURIComponent(emailSubject.trim());
        const body = encodeURIComponent(emailBody.trim());
        return `mailto:${to}?subject=${sub}&body=${body}`;
      }
      case 'upi': {
        const vpa = upiId.trim() || 'nova@upi';
        const name = encodeURIComponent(upiName.trim() || 'Nova AI');
        const amt = upiAmount.trim();
        const note = encodeURIComponent(upiNote.trim() || 'Payment');
        return `upi://pay?pa=${vpa}&pn=${name}${amt ? `&am=${amt}` : ''}&tn=${note}&cu=INR`;
      }
      case 'crypto': {
        const addr = cryptoAddress.trim() || '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
        const amt = cryptoAmount.trim();
        return `${cryptoCoin}:${addr}${amt ? `?amount=${amt}` : ''}`;
      }
      default:
        return 'https://nova.ai';
    }
  };

  const payload = getPayload();

  // Generate QR Canvas & Data URL
  useEffect(() => {
    let isCancelled = false;

    const generate = async () => {
      try {
        // 1. Generate base QR Code on offscreen canvas
        const baseCanvas = document.createElement('canvas');
        await QRCode.toCanvas(baseCanvas, payload, {
          width: resolution,
          margin: margin,
          errorCorrectionLevel: errorCorrection,
          color: {
            dark: fgColor,
            light: bgColor
          }
        });

        // 2. Generate SVG string for vector exports
        const svgStr = await QRCode.toString(payload, {
          type: 'svg',
          margin: margin,
          errorCorrectionLevel: errorCorrection,
          color: {
            dark: fgColor,
            light: bgColor
          }
        });
        if (!isCancelled) {
          setQrSvgString(svgStr);
        }

        // 3. Compose final framed & branded image
        const targetCanvas = canvasRef.current;
        if (!targetCanvas) return;

        const ctx = targetCanvas.getContext('2d');
        if (!ctx) return;

        // Determine canvas dimensions based on frame style
        let finalWidth = resolution;
        let finalHeight = resolution;
        let qrOffsetY = 0;
        let cardPadding = 0;

        if (frameStyle === 'scan-me') {
          finalHeight = resolution + 70;
          qrOffsetY = 10;
        } else if (frameStyle === 'card') {
          cardPadding = Math.round(resolution * 0.08);
          finalWidth = resolution + cardPadding * 2;
          finalHeight = resolution + cardPadding * 2 + 60;
          qrOffsetY = cardPadding + 30;
        } else if (frameStyle === 'badge') {
          cardPadding = Math.round(resolution * 0.05);
          finalWidth = resolution + cardPadding * 2;
          finalHeight = resolution + cardPadding * 2;
          qrOffsetY = cardPadding;
        }

        targetCanvas.width = finalWidth;
        targetCanvas.height = finalHeight;

        // Draw background
        ctx.fillStyle = bgColor === 'transparent' ? '#ffffff' : bgColor;
        ctx.fillRect(0, 0, finalWidth, finalHeight);

        // Draw card styling
        if (frameStyle === 'card') {
          ctx.strokeStyle = fgColor;
          ctx.lineWidth = Math.max(2, Math.round(resolution / 120));
          ctx.strokeRect(10, 10, finalWidth - 20, finalHeight - 20);

          // Top Title
          ctx.fillStyle = fgColor;
          ctx.font = `bold ${Math.round(resolution * 0.045)}px system-ui, -apple-system, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText(frameLabel || 'SCAN QR CODE', finalWidth / 2, cardPadding + 15);
        }

        // Draw the QR Code image
        const qrOffsetX = (finalWidth - resolution) / 2;
        ctx.drawImage(baseCanvas, qrOffsetX, qrOffsetY, resolution, resolution);

        // Draw "SCAN ME" bottom banner
        if (frameStyle === 'scan-me') {
          const bannerY = resolution + 15;
          const bannerHeight = 44;
          const bannerWidth = Math.min(finalWidth - 40, 220);
          const bannerX = (finalWidth - bannerWidth) / 2;

          // Pill Background
          ctx.fillStyle = fgColor;
          roundRect(ctx, bannerX, bannerY, bannerWidth, bannerHeight, 22);
          ctx.fill();

          // Pill Text
          ctx.fillStyle = bgColor === 'transparent' || bgColor === '#ffffff' ? '#ffffff' : '#0f172a';
          ctx.font = `bold ${Math.round(bannerHeight * 0.42)}px system-ui, -apple-system, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(frameLabel || 'SCAN ME', finalWidth / 2, bannerY + bannerHeight / 2);
        }

        // 4. Draw Center Logo / Badge if enabled
        const logoToDraw = customLogoUrl || (centerLogo !== 'none' ? centerLogo : null);
        if (logoToDraw) {
          const logoSize = Math.round(resolution * 0.22);
          const logoX = qrOffsetX + (resolution - logoSize) / 2;
          const logoY = qrOffsetY + (resolution - logoSize) / 2;

          // Draw protective circle / rounded rect background behind logo
          const bgPadding = Math.round(logoSize * 0.18);
          ctx.fillStyle = bgColor === 'transparent' ? '#ffffff' : bgColor;
          roundRect(
            ctx, 
            logoX - bgPadding, 
            logoY - bgPadding, 
            logoSize + bgPadding * 2, 
            logoSize + bgPadding * 2, 
            Math.round(logoSize * 0.25)
          );
          ctx.fill();

          ctx.strokeStyle = fgColor;
          ctx.lineWidth = Math.max(1.5, Math.round(resolution / 200));
          ctx.stroke();

          if (customLogoUrl) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = customLogoUrl;
            img.onload = () => {
              if (isCancelled) return;
              ctx.save();
              roundRect(ctx, logoX, logoY, logoSize, logoSize, Math.round(logoSize * 0.2));
              ctx.clip();
              ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
              ctx.restore();
              setQrDataUrl(targetCanvas.toDataURL('image/png'));
            };
          } else if (centerLogo !== 'none') {
            const preset = LOGO_PRESETS.find(p => p.id === centerLogo);
            if (preset && preset.icon) {
              ctx.fillStyle = fgColor;
              ctx.font = `${Math.round(logoSize * 0.7)}px system-ui, emoji`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(preset.icon, logoX + logoSize / 2, logoY + logoSize / 2);
            }
          }
        }

        if (!isCancelled) {
          setQrDataUrl(targetCanvas.toDataURL('image/png'));
        }
      } catch (err: any) {
        console.error('QR Generation error:', err);
      }
    };

    generate();

    return () => {
      isCancelled = true;
    };
  }, [
    payload, fgColor, bgColor, errorCorrection, margin, 
    resolution, frameStyle, frameLabel, centerLogo, customLogoUrl
  ]);

  // Helper for drawing rounded rectangles in Canvas
  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // Handle Download PNG
  const handleDownloadPng = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    const sanitizedTitle = (activeType + '_qr_code').replace(/[^a-z0-9_-]/gi, '_');
    a.download = `nova_${sanitizedTitle}_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    saveToHistory();
    triggerStatus('success', 'High-res PNG downloaded successfully!');
  };

  // Handle Download SVG (Scalable Vector)
  const handleDownloadSvg = () => {
    if (!qrSvgString) return;
    const blob = new Blob([qrSvgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nova_${activeType}_vector_${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    saveToHistory();
    triggerStatus('success', 'Print-ready Vector SVG downloaded!');
  };

  // Handle Download PDF Flyer Card
  const handleDownloadPdf = () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Background accent
      doc.setFillColor(248, 250, 252);
      doc.rect(0, 0, 210, 297, 'F');

      // Card frame
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(20, 25, 170, 240, 6, 6, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(20, 25, 170, 240, 6, 6, 'S');

      // Header Brand
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(79, 70, 229);
      doc.text('Nova AI • QR Studio', 105, 45, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(100, 116, 139);
      doc.text('Scan below with your smartphone camera to connect instantly', 105, 55, { align: 'center' });

      // QR Image in PDF
      if (qrDataUrl) {
        doc.addImage(qrDataUrl, 'PNG', 45, 70, 120, 120);
      }

      // Payload Box
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(30, 205, 150, 25, 3, 3, 'F');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      doc.text('DECODED DESTINATION:', 105, 214, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      const displayPayload = payload.length > 55 ? payload.slice(0, 52) + '...' : payload;
      doc.text(displayPayload, 105, 222, { align: 'center' });

      // Footer
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text('Created with Nova AI • Powered by Shelby.ai • Founder: Shivam Kumar', 105, 255, { align: 'center' });

      doc.save(`nova_qr_flyer_${Date.now()}.pdf`);
      saveToHistory();
      triggerStatus('success', 'PDF Print Card generated and saved!');
    } catch (e: any) {
      triggerStatus('error', 'Failed to generate PDF: ' + e.message);
    }
  };

  // Copy Image to Clipboard
  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          triggerStatus('success', 'QR Image copied to clipboard!');
        } catch (err) {
          // Fallback copy payload string
          await navigator.clipboard.writeText(payload);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          triggerStatus('success', 'QR payload string copied to clipboard!');
        }
      });
    } catch (e) {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Auto-fetch Favicon from URL input
  const handleFetchFavicon = () => {
    if (activeType !== 'url') return;
    let url = urlInput.trim();
    if (!url.startsWith('http')) url = 'https://' + url;
    try {
      const parsed = new URL(url);
      const domain = parsed.hostname;
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      setCustomLogoUrl(faviconUrl);
      setCenterLogo('custom');
      triggerStatus('success', `Fetched official icon for ${domain}!`);
    } catch (e) {
      triggerStatus('error', 'Please enter a valid URL first');
    }
  };

  // Upload Custom Center Logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCustomLogoUrl(result);
      setCenterLogo('custom');
      triggerStatus('success', 'Custom logo uploaded & embedded in QR code!');
    };
    reader.readAsDataURL(file);
  };

  // Save to Local History
  const saveToHistory = () => {
    const newEntry: SavedQRCode = {
      id: 'qr_' + Date.now(),
      type: activeType,
      title: activeType === 'url' ? urlInput : `${activeType.toUpperCase()} Code`,
      payload: payload,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fgColor,
      bgColor
    };

    const updated = [newEntry, ...savedHistory.filter(h => h.payload !== payload)].slice(0, 20);
    setSavedHistory(updated);
    try {
      localStorage.setItem('nova_qr_history', JSON.stringify(updated));
    } catch (e) {
      // Ignore
    }
  };

  // Trigger temporary status banner
  const triggerStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 3500);
  };

  // Batch Generation Execution
  const handleGenerateBatch = async () => {
    const lines = batchInput.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) {
      triggerStatus('error', 'Please paste at least one URL or text item');
      return;
    }

    setIsGeneratingBatch(true);
    const results: Array<{ id: string; url: string; dataUrl: string }> = [];

    for (let i = 0; i < lines.length; i++) {
      const item = lines[i];
      let formattedUrl = item;
      if (item.includes('.') && !item.startsWith('http')) {
        formattedUrl = 'https://' + item;
      }
      try {
        const dataUrl = await QRCode.toDataURL(formattedUrl, {
          width: 512,
          margin: 2,
          color: { dark: fgColor, light: bgColor }
        });
        results.push({
          id: `batch_${i}_${Date.now()}`,
          url: formattedUrl,
          dataUrl
        });
      } catch (err) {
        console.error('Batch item error:', err);
      }
    }

    setBatchResults(results);
    setIsGeneratingBatch(false);
    triggerStatus('success', `Successfully generated ${results.length} QR codes in batch!`);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header Banner */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md px-4 sm:px-8 py-4 sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-lg tracking-tight text-slate-900 dark:text-white">
                URL to QR Generator & Studio
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                PRO STUDIO
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Convert URLs, Wi-Fi networks, business vCards, and payments into customizable high-res QR codes.
            </p>
          </div>
        </div>

        {/* Studio View Switcher */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('studio')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'studio'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Studio</span>
          </button>
          <button
            onClick={() => setActiveTab('batch')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'batch'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Batch Generator</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Recent ({savedHistory.length})</span>
          </button>
        </div>
      </div>

      {/* Floating Status Notification */}
      {statusMsg && (
        <div className="fixed top-20 right-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className={`px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold border ${
            statusMsg.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-950/80 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800'
          }`}>
            {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-red-500" />}
            <span>{statusMsg.text}</span>
          </div>
        </div>
      )}

      {/* MAIN STUDIO VIEW */}
      {activeTab === 'studio' && (
        <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Input Configuration & Styling (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* 1. Payload Type Selector */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select Content Type
                </span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                  Real-time Instant Encoding
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                {[
                  { id: 'url', label: 'URL / Web', icon: Globe },
                  { id: 'text', label: 'Plain Text', icon: FileText },
                  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
                  { id: 'vcard', label: 'vCard', icon: User },
                  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                  { id: 'email', label: 'Email', icon: Mail },
                  { id: 'upi', label: 'UPI Pay', icon: CreditCard },
                  { id: 'crypto', label: 'Crypto', icon: Coins },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeType === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveType(item.id as QRType)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-1" />
                      <span className="text-[10px] truncate max-w-full">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* DYNAMIC INPUT FORM BASED ON TYPE */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                {activeType === 'url' && (
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Website / Deep Link URL</span>
                      <button
                        type="button"
                        onClick={handleFetchFavicon}
                        className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                      >
                        <Sparkle className="w-3 h-3" />
                        Fetch Website Favicon Logo
                      </button>
                    </label>
                    <div className="relative flex items-center">
                      <Globe className="absolute left-3.5 w-4 h-4 text-indigo-500" />
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://example.com/your-page"
                        className="w-full pl-10 pr-24 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-slate-800 dark:text-slate-100"
                      />
                      <div className="absolute right-2 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setShowUtmBuilder(!showUtmBuilder)}
                          className={`px-2 py-1 text-[10px] font-bold rounded-md border transition-all cursor-pointer ${
                            showUtmBuilder
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          UTM
                        </button>
                      </div>
                    </div>

                    {/* UTM Parameters Builder */}
                    {showUtmBuilder && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-indigo-200 dark:border-indigo-900/50 space-y-2 text-xs animate-in fade-in duration-150">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-[11px]">
                          Campaign Tracking (UTM Parameters)
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="text"
                            placeholder="utm_source (e.g. flyer)"
                            value={utmSource}
                            onChange={(e) => setUtmSource(e.target.value)}
                            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                          />
                          <input
                            type="text"
                            placeholder="utm_medium (e.g. qrcode)"
                            value={utmMedium}
                            onChange={(e) => setUtmMedium(e.target.value)}
                            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                          />
                          <input
                            type="text"
                            placeholder="utm_campaign (e.g. launch)"
                            value={utmCampaign}
                            onChange={(e) => setUtmCampaign(e.target.value)}
                            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeType === 'text' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Plain Text / Code Payload</label>
                    <textarea
                      rows={3}
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Enter any text, code snippet, WiFi info, or serial number..."
                      className="w-full p-3 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                  </div>
                )}

                {activeType === 'wifi' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Network Name (SSID)</label>
                        <input
                          type="text"
                          value={wifiSsid}
                          onChange={(e) => setWifiSsid(e.target.value)}
                          placeholder="Home_WiFi_5G"
                          className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                        <input
                          type="text"
                          value={wifiPassword}
                          onChange={(e) => setWifiPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-500">Encryption:</span>
                        {(['WPA', 'WEP', 'nopass'] as const).map(enc => (
                          <button
                            key={enc}
                            type="button"
                            onClick={() => setWifiEncryption(enc)}
                            className={`px-2.5 py-1 rounded-lg border cursor-pointer font-bold ${
                              wifiEncryption === enc
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {enc === 'nopass' ? 'Open' : enc}
                          </button>
                        ))}
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={wifiHidden}
                          onChange={(e) => setWifiHidden(e.target.checked)}
                          className="rounded text-indigo-600"
                        />
                        <span>Hidden Network</span>
                      </label>
                    </div>
                  </div>
                )}

                {activeType === 'vcard' && (
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Full Name (e.g. Shivam Kumar)"
                        value={vcardName}
                        onChange={(e) => setVcardName(e.target.value)}
                        className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                      />
                      <input
                        type="text"
                        placeholder="Organization / Company"
                        value={vcardOrg}
                        onChange={(e) => setVcardOrg(e.target.value)}
                        className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="tel"
                        placeholder="Phone Number (+91...)"
                        value={vcardPhone}
                        onChange={(e) => setVcardPhone(e.target.value)}
                        className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={vcardEmail}
                        onChange={(e) => setVcardEmail(e.target.value)}
                        className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="url"
                        placeholder="Website / Portfolio URL"
                        value={vcardUrl}
                        onChange={(e) => setVcardUrl(e.target.value)}
                        className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                      />
                      <input
                        type="text"
                        placeholder="Physical Address / City"
                        value={vcardAddress}
                        onChange={(e) => setVcardAddress(e.target.value)}
                        className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                      />
                    </div>
                  </div>
                )}

                {activeType === 'whatsapp' && (
                  <div className="space-y-2">
                    <input
                      type="tel"
                      placeholder="Phone number with Country Code (e.g. 919876543210)"
                      value={waPhone}
                      onChange={(e) => setWaPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono"
                    />
                    <textarea
                      rows={2}
                      placeholder="Pre-filled message (e.g. Hi Shivam, I want to connect regarding Nova AI!)"
                      value={waMessage}
                      onChange={(e) => setWaMessage(e.target.value)}
                      className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                    />
                  </div>
                )}

                {activeType === 'upi' && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="UPI ID / VPA (e.g. name@upi or name@okaxis)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Payee Name (e.g. Shivam Kumar)"
                        value={upiName}
                        onChange={(e) => setUpiName(e.target.value)}
                        className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Amount in INR (Optional)"
                        value={upiAmount}
                        onChange={(e) => setUpiAmount(e.target.value)}
                        className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Payment Note (e.g. Subscription)"
                        value={upiNote}
                        onChange={(e) => setUpiNote(e.target.value)}
                        className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                      />
                    </div>
                  </div>
                )}

                {activeType === 'email' && (
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Recipient Email (e.g. founder@shelby.ai)"
                      value={emailTo}
                      onChange={(e) => setEmailTo(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                    />
                    <input
                      type="text"
                      placeholder="Subject Line"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                    />
                    <textarea
                      rows={2}
                      placeholder="Email Body Text"
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                    />
                  </div>
                )}

                {activeType === 'crypto' && (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      {(['bitcoin', 'ethereum', 'solana', 'usdt'] as const).map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCryptoCoin(c)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-bold uppercase cursor-pointer ${
                            cryptoCoin === c
                              ? 'bg-amber-500 text-white border-amber-500'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Wallet Address"
                      value={cryptoAddress}
                      onChange={(e) => setCryptoAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 2. Visual Styling & Color Controls */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Color Palette & Theme
              </span>

              {/* Color Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {COLOR_PRESETS.map((preset) => {
                  const isActive = fgColor === preset.fg && bgColor === preset.bg;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setFgColor(preset.fg);
                        setBgColor(preset.bg);
                      }}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isActive
                          ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 font-bold'
                          : 'border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0" style={{ backgroundColor: preset.bg }}>
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: preset.fg }} />
                      </div>
                      <span className="text-[11px] truncate">{preset.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Hex Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Foreground Color:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase">{fgColor}</span>
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-8 h-8 rounded-lg border-0 cursor-pointer p-0 bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Background Color:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase">{bgColor}</span>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded-lg border-0 cursor-pointer p-0 bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Center Logo & Branding */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Center Logo & Watermark
                </span>
                <span className="text-[10px] text-slate-400">
                  Auto High Error Correction (30%)
                </span>
              </div>

              {/* Logo presets */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {LOGO_PRESETS.map((preset) => {
                  const isSelected = centerLogo === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setCenterLogo(preset.id);
                        setCustomLogoUrl(null);
                      }}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 font-bold text-indigo-600 dark:text-indigo-400'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-sm h-5">{preset.icon || '—'}</span>
                      <span className="text-[10px] mt-1 truncate max-w-full">{preset.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Logo Upload */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500">Or upload your company/personal icon:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload Image
                  </button>
                  {customLogoUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setCustomLogoUrl(null);
                        setCenterLogo('none');
                      }}
                      className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                      title="Remove custom logo"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 4. Frame & Layout Customization */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Frame & Poster Badge Styles
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'scan-me', name: 'Scan Me Pill' },
                  { id: 'card', name: 'Card Frame' },
                  { id: 'badge', name: 'Border Badge' },
                  { id: 'none', name: 'Plain QR' }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFrameStyle(f.id as FrameStyle)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      frameStyle === f.id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>

              {frameStyle !== 'none' && (
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Custom Frame Label</label>
                  <input
                    type="text"
                    value={frameLabel}
                    onChange={(e) => setFrameLabel(e.target.value.toUpperCase())}
                    placeholder="e.g. SCAN ME or CONNECT TO WIFI"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-bold tracking-wider"
                  />
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Live Interactive QR Preview & Export (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Live Card Box */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              
              <div className="w-full flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-full border border-indigo-500/20">
                  Live Canvas Rendering
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {resolution}x{resolution}px
                </span>
              </div>

              {/* Dynamic Canvas Element */}
              <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-950/80 border border-slate-200/60 dark:border-slate-800/80 shadow-inner flex items-center justify-center min-h-[300px] w-full">
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto rounded-xl shadow-lg transition-transform hover:scale-[1.02] duration-200"
                />
              </div>

              {/* Decoded Info Box */}
              <div className="w-full mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>Encoded Destination:</span>
                  <span className="text-emerald-500 flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3 h-3" /> Safe Payload
                  </span>
                </div>
                <div className="font-mono text-xs text-slate-700 dark:text-slate-300 break-all line-clamp-2 select-all">
                  {payload}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full grid grid-cols-2 gap-2 mt-5">
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PNG</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Vector SVG</span>
                </button>
              </div>

              <div className="w-full grid grid-cols-3 gap-2 mt-2">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title="Generate printable flyer card"
                >
                  <FileText className="w-3.5 h-3.5 text-rose-500" />
                  <span>PDF Card</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyImage}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-indigo-500" />}
                  <span>{copied ? 'Copied!' : 'Copy PNG'}</span>
                </button>

                {activeType === 'url' ? (
                  <a
                    href={payload}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Test Link</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={saveToHistory}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <History className="w-3.5 h-3.5 text-amber-500" />
                    <span>Save</span>
                  </button>
                )}
              </div>

              {/* Resolution selection slider */}
              <div className="w-full mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Output Resolution:</span>
                <div className="flex gap-1">
                  {[256, 512, 1024, 2048].map(res => (
                    <button
                      key={res}
                      type="button"
                      onClick={() => setResolution(res)}
                      className={`px-2 py-1 rounded text-[10px] font-mono font-bold cursor-pointer transition-all ${
                        resolution === res
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {res}px
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* BATCH GENERATOR VIEW */}
      {activeTab === 'batch' && (
        <div className="max-w-5xl w-full mx-auto p-4 sm:p-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
            <div className="space-y-1">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                Multi-URL Batch Generator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Paste multiple links or payloads (one URL per line) to instantly generate downloadable QR codes.
              </p>
            </div>

            <textarea
              rows={6}
              value={batchInput}
              onChange={(e) => setBatchInput(e.target.value)}
              placeholder="https://example.com/item1&#10;https://example.com/item2&#10;https://example.com/item3"
              className="w-full p-4 text-sm font-mono bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Lines: {batchInput.split('\n').filter(l => l.trim()).length} URLs
              </span>
              <button
                type="button"
                disabled={isGeneratingBatch}
                onClick={handleGenerateBatch}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isGeneratingBatch ? 'Generating Batch...' : '⚡ Generate All QR Codes'}
              </button>
            </div>
          </div>

          {/* Batch Output Grid */}
          {batchResults.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                Generated QR Codes ({batchResults.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {batchResults.map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center space-y-3"
                  >
                    <img
                      src={item.dataUrl}
                      alt={`QR Code ${idx + 1}`}
                      className="w-36 h-36 rounded-lg bg-white p-1 border"
                    />
                    <div className="w-full text-center">
                      <span className="text-[10px] font-mono text-slate-400 block truncate" title={item.url}>
                        {item.url}
                      </span>
                    </div>
                    <a
                      href={item.dataUrl}
                      download={`batch_qr_${idx + 1}.png`}
                      className="w-full py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 rounded-lg text-center text-xs font-bold transition-all"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* RECENT HISTORY VIEW */}
      {activeTab === 'history' && (
        <div className="max-w-5xl w-full mx-auto p-4 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              Recently Created QR Codes
            </h2>
            {savedHistory.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSavedHistory([]);
                  localStorage.removeItem('nova_qr_history');
                  triggerStatus('success', 'History cleared');
                }}
                className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-100 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear History
              </button>
            )}
          </div>

          {savedHistory.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <QrCode className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
              <h3 className="font-bold text-base">No Saved QR Codes Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Generate and download QR codes in the interactive studio to save them for quick access anytime.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {savedHistory.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                        {item.type}
                      </span>
                      <span className="text-slate-400">{item.createdAt}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                      {item.payload}
                    </p>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveType(item.type);
                        if (item.type === 'url') setUrlInput(item.payload);
                        else setTextInput(item.payload);
                        setFgColor(item.fgColor);
                        setBgColor(item.bgColor);
                        setActiveTab('studio');
                      }}
                      className="flex-1 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-500 transition-all cursor-pointer text-center"
                    >
                      Re-Open in Studio
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer Branding */}
      <div className="mt-auto border-t border-slate-200 dark:border-slate-800/80 py-4 px-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <span>Powered by <strong className="text-indigo-600 dark:text-indigo-400">Shelby.ai</strong> • Founded by <strong className="text-slate-700 dark:text-slate-300">Shivam Kumar</strong> • URL to QR Generator Studio ♾️</span>
      </div>
    </div>
  );
}
