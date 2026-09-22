import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  Sparkles,
  Database,
  Cpu,
  Layers,
  Cloud,
  Palette,
  ArrowRight,
  Download,
  Share2,
  Check,
  Zap,
  Globe,
  Shield,
  Activity,
  Code2,
  ExternalLink,
  Bot,
  Video,
  ScanLine,
  QrCode,
  Users,
  Network,
  Binary,
  Radio,
  Workflow,
  Eye,
  Mic,
  FileText,
  Search,
  Compass
} from 'lucide-react';

interface NovaCinematicHeroBannerProps {
  onOpenAuth?: () => void;
  onOpenPricing?: () => void;
  onSelectTab?: (tab: string) => void;
  className?: string;
}

export default function NovaCinematicHeroBanner({
  onOpenAuth,
  onOpenPricing,
  onSelectTab,
  className = ''
}: NovaCinematicHeroBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [activeVisualTab, setActiveVisualTab] = useState<'astra' | 'ecosystem' | 'database' | 'architect' | 'ai-systems' | 'creative'>('astra');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const APP_URL = 'https://nova-ai-3603.ai.studio';

  // Generate crisp, high-contrast, fully scannable QR Code
  useEffect(() => {
    QRCode.toDataURL(
      APP_URL,
      {
        width: 380,
        margin: 2,
        color: {
          dark: '#03050E',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, []);

  // Background Interactive Neural Particle & Hologram Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 1920);
    let height = (canvas.height = canvas.offsetHeight || 1080);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 1920;
      height = canvas.height = canvas.offsetHeight || 1080;
    };

    window.addEventListener('resize', handleResize);

    // Neural nodes
    const NODE_COUNT = 60;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
    }> = [];

    const colors = [
      'rgba(56, 189, 248, ',  // Cyan
      'rgba(168, 85, 247, ',  // Violet
      'rgba(236, 72, 153, ',  // Magenta
      'rgba(99, 102, 241, '   // Electric Blue
    ];

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space radial glows
      const radial1 = ctx.createRadialGradient(
        width * 0.78,
        height * 0.35,
        40,
        width * 0.78,
        height * 0.35,
        width * 0.55
      );
      radial1.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
      radial1.addColorStop(0.35, 'rgba(168, 85, 247, 0.09)');
      radial1.addColorStop(0.7, 'rgba(236, 72, 153, 0.04)');
      radial1.addColorStop(1, 'transparent');
      ctx.fillStyle = radial1;
      ctx.fillRect(0, 0, width, height);

      const radial2 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.8,
        20,
        width * 0.2,
        height * 0.8,
        width * 0.45
      );
      radial2.addColorStop(0, 'rgba(99, 102, 241, 0.09)');
      radial2.addColorStop(0.5, 'rgba(236, 72, 153, 0.03)');
      radial2.addColorStop(1, 'transparent');
      ctx.fillStyle = radial2;
      ctx.fillRect(0, 0, width, height);

      // Draw neural connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;

        a.pulse += 0.02;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 190) {
            const alpha = (1 - dist / 190) * 0.28;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Draw node
        const currentRadius = a.radius + Math.sin(a.pulse) * 0.6;
        ctx.beginPath();
        ctx.arc(a.x, a.y, Math.max(0.6, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = `${a.color}0.9)`;
        ctx.shadowColor = `${a.color}0.95)`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCopyShare = () => {
    navigator.clipboard.writeText(APP_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Ultra 4K UHD (3840×2160) Cinematic Banner Canvas Renderer & PNG Exporter
  const handleExportHighResBanner = () => {
    setIsExporting(true);
    try {
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = 3840; // 4K UHD 16:9
      exportCanvas.height = 2160;
      const c = exportCanvas.getContext('2d');
      if (!c) return;

      // Base background - Deep Black/Charcoal Foundation
      c.fillStyle = '#02040A';
      c.fillRect(0, 0, 3840, 2160);

      // Immersive glowing radial backdrops
      const bgGrad1 = c.createRadialGradient(2900, 750, 100, 2900, 750, 2100);
      bgGrad1.addColorStop(0, 'rgba(56, 189, 248, 0.32)');
      bgGrad1.addColorStop(0.35, 'rgba(147, 51, 234, 0.20)');
      bgGrad1.addColorStop(0.65, 'rgba(236, 72, 153, 0.12)');
      bgGrad1.addColorStop(1, 'rgba(2, 4, 10, 0)');
      c.fillStyle = bgGrad1;
      c.fillRect(0, 0, 3840, 2160);

      const bgGrad2 = c.createRadialGradient(600, 1600, 50, 600, 1600, 1400);
      bgGrad2.addColorStop(0, 'rgba(99, 102, 241, 0.18)');
      bgGrad2.addColorStop(0.5, 'rgba(236, 72, 153, 0.08)');
      bgGrad2.addColorStop(1, 'rgba(2, 4, 10, 0)');
      c.fillStyle = bgGrad2;
      c.fillRect(0, 0, 3840, 2160);

      // Digital futuristic grid lines
      c.strokeStyle = 'rgba(56, 189, 248, 0.05)';
      c.lineWidth = 2;
      for (let x = 0; x < 3840; x += 120) {
        c.beginPath();
        c.moveTo(x, 0);
        c.lineTo(x, 2160);
        c.stroke();
      }
      for (let y = 0; y < 2160; y += 120) {
        c.beginPath();
        c.moveTo(0, y);
        c.lineTo(3840, y);
        c.stroke();
      }

      // Quick Nav Top Bar representation
      c.fillStyle = 'rgba(7, 14, 38, 0.92)';
      c.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      c.lineWidth = 3;
      c.beginPath();
      c.roundRect(160, 90, 3520, 115, 32);
      c.fill();
      c.stroke();

      c.font = 'bold 40px "Space Grotesk", sans-serif';
      c.fillStyle = '#38BDF8';
      c.fillText('NOVA.AI', 220, 165);
      c.fillStyle = '#94A3B8';
      c.font = '32px "Space Grotesk", sans-serif';
      c.fillText('by Shelby.ai', 410, 165);

      c.font = '600 28px "Plus Jakarta Sans", sans-serif';
      c.fillStyle = '#CBD5E1';
      c.fillText('Nova Ultra Suite   |   AI Systems   |   Database Intelligence   |   Creative Studio   |   Sign In / Authenticate', 1220, 165);

      // Target audience pill
      c.fillStyle = 'rgba(15, 23, 42, 0.92)';
      c.strokeStyle = '#38BDF8';
      c.lineWidth = 2.5;
      c.beginPath();
      c.roundRect(160, 250, 1140, 68, 34);
      c.fill();
      c.stroke();

      c.font = 'bold 26px "Space Grotesk", sans-serif';
      c.fillStyle = '#38BDF8';
      c.fillText('✦  FOR STUDENTS • CREATORS • RESEARCHERS • DEVELOPERS • PROFESSIONALS', 200, 293);

      // Brand Wordmark: NOVA.AI by Shelby.ai
      c.font = '900 200px "Space Grotesk", sans-serif';
      const textGrad = c.createLinearGradient(160, 500, 1500, 500);
      textGrad.addColorStop(0, '#FFFFFF');
      textGrad.addColorStop(0.3, '#E0F2FE');
      textGrad.addColorStop(0.6, '#38BDF8');
      textGrad.addColorStop(0.85, '#A855F7');
      textGrad.addColorStop(1, '#EC4899');
      c.fillStyle = textGrad;
      c.shadowColor = 'rgba(56, 189, 248, 0.7)';
      c.shadowBlur = 60;
      c.fillText('NOVA.AI', 160, 510);
      c.shadowBlur = 0;

      c.font = 'bold 64px "Space Grotesk", sans-serif';
      c.fillStyle = '#94A3B8';
      c.fillText('by ', 1120, 505);
      const shelbyGrad = c.createLinearGradient(1200, 505, 1550, 505);
      shelbyGrad.addColorStop(0, '#EC4899');
      shelbyGrad.addColorStop(1, '#A855F7');
      c.fillStyle = shelbyGrad;
      c.fillText('Shelby.ai', 1200, 505);

      // Dominant Hero Headline: ONE PLATFORM. INFINITE POSSIBILITIES.
      c.font = '900 104px "Space Grotesk", sans-serif';
      c.fillStyle = '#FFFFFF';
      c.fillText('ONE PLATFORM. INFINITE POSSIBILITIES.', 160, 665);

      // Supporting headline
      c.font = 'bold 48px "Space Grotesk", sans-serif';
      const subGrad = c.createLinearGradient(160, 750, 1800, 750);
      subGrad.addColorStop(0, '#38BDF8');
      subGrad.addColorStop(0.5, '#818CF8');
      subGrad.addColorStop(1, '#C084FC');
      c.fillStyle = subGrad;
      c.fillText('AI Intelligence. Data Engineering. Creative Power. — Unified in Nova AI.', 160, 750);

      // Supporting description
      c.font = '500 36px "Plus Jakarta Sans", sans-serif';
      c.fillStyle = '#CBD5E1';
      c.fillText('One intelligent workspace for AI models, databases, cloud data, developer tools,', 160, 825);
      c.fillText('document intelligence, and creative workflows.', 160, 875);

      // Primary Strongest CTA: LAUNCH NOVA AI →
      const btnX = 160;
      const btnY = 945;
      const btnW = 580;
      const btnH = 120;

      // Glow backing
      c.shadowColor = 'rgba(6, 182, 212, 0.9)';
      c.shadowBlur = 65;
      c.fillStyle = 'rgba(6, 182, 212, 0.9)';
      c.beginPath();
      c.roundRect(btnX, btnY, btnW, btnH, 30);
      c.fill();
      c.shadowBlur = 0;

      // Button gradient body
      const ctaGrad = c.createLinearGradient(btnX, btnY, btnX + btnW, btnY + btnH);
      ctaGrad.addColorStop(0, '#06B6D4');
      ctaGrad.addColorStop(0.35, '#3B82F6');
      ctaGrad.addColorStop(0.75, '#8B5CF6');
      ctaGrad.addColorStop(1, '#EC4899');
      c.fillStyle = ctaGrad;
      c.beginPath();
      c.roundRect(btnX, btnY, btnW, btnH, 30);
      c.fill();

      // Button Glass reflection line
      c.fillStyle = 'rgba(255, 255, 255, 0.3)';
      c.beginPath();
      c.roundRect(btnX + 6, btnY + 6, btnW - 12, 50, 24);
      c.fill();

      // Button Text
      c.font = '900 42px "Space Grotesk", sans-serif';
      c.fillStyle = '#FFFFFF';
      c.fillText('LAUNCH NOVA AI →', btnX + 65, btnY + 76);

      // Secondary CTA: EXPLORE CAPABILITIES
      const secX = 780;
      const secY = 945;
      const secW = 540;
      const secH = 120;
      c.fillStyle = 'rgba(15, 23, 42, 0.9)';
      c.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      c.lineWidth = 3;
      c.beginPath();
      c.roundRect(secX, secY, secW, secH, 30);
      c.fill();
      c.stroke();

      c.font = 'bold 36px "Space Grotesk", sans-serif';
      c.fillStyle = '#E2E8F0';
      c.fillText('EXPLORE CAPABILITIES', secX + 50, secY + 74);

      // Microcopy beneath CTAs
      c.font = '700 28px "Space Grotesk", sans-serif';
      c.fillStyle = '#38BDF8';
      c.fillText('Build. Analyze. Create. Accelerate.', 160, 1125);

      // 9 Platform Capability Badges
      const badges = [
        '451+ AI Systems',
        '402+ Database Engines',
        'Multimodal AI',
        'Ultra High Intelligence',
        'Advanced AI-Powered Tools',
        'AI Schema Architect',
        'Cloud Data Intelligence',
        'Creative AI Studio',
        'Fast & Unified AI Experience'
      ];

      badges.forEach((text, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const bx = 160 + col * 580;
        const by = 1180 + row * 115;
        const bw = 550;
        const bh = 85;

        c.fillStyle = 'rgba(10, 18, 44, 0.88)';
        c.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        c.lineWidth = 2.5;
        c.beginPath();
        c.roundRect(bx, by, bw, bh, 22);
        c.fill();
        c.stroke();

        c.font = 'bold 28px "Space Grotesk", sans-serif';
        c.fillStyle = '#38BDF8';
        c.fillText('✦  ' + text, bx + 35, by + 53);
      });

      // Holographic Right-Side Ecosystem Display Frame
      const hx = 1960;
      const hy = 240;
      const hw = 1720;
      const hh = 1250;

      c.fillStyle = 'rgba(7, 12, 32, 0.94)';
      c.strokeStyle = 'rgba(56, 189, 248, 0.5)';
      c.lineWidth = 4;
      c.shadowColor = 'rgba(56, 189, 248, 0.35)';
      c.shadowBlur = 45;
      c.beginPath();
      c.roundRect(hx, hy, hw, hh, 40);
      c.fill();
      c.stroke();
      c.shadowBlur = 0;

      // Hologram Frame Top Bar
      c.font = 'bold 36px monospace';
      c.fillStyle = '#38BDF8';
      c.fillText('SYS://NOVA-UNIFIED-AI-ECOSYSTEM', hx + 60, hy + 75);
      c.fillStyle = '#22C55E';
      c.fillText('● 451+ AI SYSTEMS • 402+ DATABASES', hx + 950, hy + 75);

      // FEATURED AI INTELLIGENCE CARD — CHATGPT 6 ASTRA
      const ax = hx + 50;
      const ay = hy + 120;
      const aw = hw - 100;
      const ah = 440;

      c.fillStyle = 'rgba(12, 22, 54, 0.95)';
      c.strokeStyle = '#38BDF8';
      c.lineWidth = 3.5;
      c.shadowColor = 'rgba(56, 189, 248, 0.4)';
      c.shadowBlur = 30;
      c.beginPath();
      c.roundRect(ax, ay, aw, ah, 30);
      c.fill();
      c.stroke();
      c.shadowBlur = 0;

      // Astra Header & Subtitle
      c.font = '900 44px "Space Grotesk", sans-serif';
      const astraGrad = c.createLinearGradient(ax + 50, ay + 65, ax + 800, ay + 65);
      astraGrad.addColorStop(0, '#FFFFFF');
      astraGrad.addColorStop(0.4, '#38BDF8');
      astraGrad.addColorStop(0.8, '#A855F7');
      astraGrad.addColorStop(1, '#EC4899');
      c.fillStyle = astraGrad;
      c.fillText('✦ CHATGPT 6 ASTRA', ax + 50, ay + 68);

      c.font = 'bold 28px "Space Grotesk", sans-serif';
      c.fillStyle = '#38BDF8';
      c.fillText('Advanced Multimodal Intelligence & Autonomous Reasoning', ax + 50, ay + 115);

      // Abstract Futuristic Intelligence Core (Concentric Glowing Rings)
      const coreX = ax + aw - 160;
      const coreY = ay + 140;

      for (let r = 90; r >= 20; r -= 20) {
        c.beginPath();
        c.arc(coreX, coreY, r, 0, Math.PI * 2);
        c.strokeStyle = r === 50 ? '#EC4899' : (r === 90 ? '#38BDF8' : '#A855F7');
        c.lineWidth = 3;
        c.stroke();
      }
      c.beginPath();
      c.arc(coreX, coreY, 14, 0, Math.PI * 2);
      c.fillStyle = '#38BDF8';
      c.shadowColor = '#38BDF8';
      c.shadowBlur = 20;
      c.fill();
      c.shadowBlur = 0;

      // Astra 10 Visual Capabilities Grid
      const astraCaps = [
        'AI Reasoning', 'Multimodal Understanding', 'Vision Intelligence', 'Voice Interaction', 'Coding',
        'Document Intelligence', 'Data Analysis', 'Research Workflows', 'Creative Workflows', 'AI Agents'
      ];
      astraCaps.forEach((cap, idx) => {
        const col = idx % 5;
        const row = Math.floor(idx / 5);
        const cx = ax + 50 + col * 280;
        const cy = ay + 180 + row * 85;
        c.fillStyle = 'rgba(6, 12, 34, 0.9)';
        c.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        c.lineWidth = 2;
        c.beginPath();
        c.roundRect(cx, cy, 260, 65, 16);
        c.fill();
        c.stroke();

        c.font = 'bold 20px "Space Grotesk", sans-serif';
        c.fillStyle = '#E2E8F0';
        c.fillText('● ' + cap, cx + 20, cy + 40);
      });

      // DATABASE INTELLIGENCE (402+ Database Engines & 12 Architectures)
      c.font = 'bold 34px "Space Grotesk", sans-serif';
      c.fillStyle = '#F8FAFC';
      c.fillText('DATABASE INTELLIGENCE (402+ Database Engines)', hx + 60, hy + 620);
      c.font = '26px monospace';
      c.fillStyle = '#38BDF8';
      c.fillText('PostgreSQL • MySQL • Oracle • SQL Server • Snowflake • BigQuery • ClickHouse', hx + 60, hy + 670);
      c.fillText('Redis • MongoDB • Neo4j • Milvus • Pinecone • Qdrant • Distributed Vector DBs', hx + 60, hy + 715);

      // AI SCHEMA ARCHITECT & DEVELOPER TOOLS
      c.font = 'bold 34px "Space Grotesk", sans-serif';
      c.fillStyle = '#F8FAFC';
      c.fillText('AI SCHEMA ARCHITECT & DATA ENGINEERING', hx + 60, hy + 800);
      c.font = '26px monospace';
      c.fillStyle = '#A855F7';
      c.fillText('Automated DDL • Partitioning • Vector Embeddings • Migrations • Query Optimizer', hx + 60, hy + 845);

      // CREATIVE AI STUDIO
      c.font = 'bold 34px "Space Grotesk", sans-serif';
      c.fillStyle = '#F8FAFC';
      c.fillText('CREATIVE AI STUDIO & WORKFLOWS', hx + 60, hy + 930);
      c.font = '26px monospace';
      c.fillStyle = '#F472B6';
      c.fillText('AI Image Generation • Video Editing Studio • QR Studio • Media Export', hx + 60, hy + 975);

      // Telemetry Metric Blocks inside Hologram
      const metrics = [
        { label: 'AI MODELS', val: '1,970+', color: '#818CF8' },
        { label: 'DB ENGINES', val: '402+', color: '#38BDF8' },
        { label: 'LATENCY', val: '< 12ms', color: '#34D399' },
        { label: 'UPTIME', val: '99.99%', color: '#EC4899' }
      ];

      metrics.forEach((m, idx) => {
        const mx = hx + 60 + idx * 395;
        const my = hy + 1040;
        c.fillStyle = 'rgba(15, 23, 42, 0.9)';
        c.strokeStyle = m.color;
        c.lineWidth = 2.5;
        c.beginPath();
        c.roundRect(mx, my, 370, 160, 24);
        c.fill();
        c.stroke();

        c.font = 'bold 24px "Space Grotesk", sans-serif';
        c.fillStyle = '#94A3B8';
        c.fillText(m.label, mx + 30, my + 55);

        c.font = '900 52px "Space Grotesk", sans-serif';
        c.fillStyle = m.color;
        c.fillText(m.val, mx + 30, my + 125);
      });

      // Scannable QR Code Box in Lower-Right (Unobstructed & High Contrast)
      const qrx = 2780;
      const qry = 1540;
      const qrw = 900;
      const qrh = 480;

      c.fillStyle = 'rgba(7, 14, 38, 0.96)';
      c.strokeStyle = '#38BDF8';
      c.lineWidth = 4;
      c.shadowColor = 'rgba(56, 189, 248, 0.5)';
      c.shadowBlur = 35;
      c.beginPath();
      c.roundRect(qrx, qry, qrw, qrh, 36);
      c.fill();
      c.stroke();
      c.shadowBlur = 0;

      // Draw pure white quiet zone background for the QR code
      c.fillStyle = '#FFFFFF';
      c.beginPath();
      c.roundRect(qrx + 45, qry + 45, 390, 390, 24);
      c.fill();

      // If qrDataUrl image is ready, draw it onto the white pad
      if (qrDataUrl) {
        const qrImg = new Image();
        qrImg.onload = () => {
          c.drawImage(qrImg, qrx + 60, qry + 60, 360, 360);
          finishAndDownload();
        };
        qrImg.src = qrDataUrl;
      } else {
        finishAndDownload();
      }

      function finishAndDownload() {
        // QR text details beside code
        c.font = '900 38px "Space Grotesk", sans-serif';
        c.fillStyle = '#38BDF8';
        c.fillText('SCAN TO OPEN NOVA.AI', qrx + 470, qry + 130);

        c.font = '600 28px "Plus Jakarta Sans", sans-serif';
        c.fillStyle = '#F8FAFC';
        c.fillText('Explore the Future of AI', qrx + 470, qry + 190);

        c.font = '24px monospace';
        c.fillStyle = '#94A3B8';
        c.fillText('https://nova-ai-3603.ai.studio', qrx + 470, qry + 260);

        c.fillStyle = 'rgba(56, 189, 248, 0.2)';
        c.strokeStyle = 'rgba(56, 189, 248, 0.5)';
        c.lineWidth = 2;
        c.beginPath();
        c.roundRect(qrx + 470, qry + 310, 370, 70, 16);
        c.fill();
        c.stroke();

        c.font = 'bold 24px "Space Grotesk", sans-serif';
        c.fillStyle = '#38BDF8';
        c.fillText('✦ 100% INSTANT ACCESS', qrx + 500, qry + 354);

        // Founder Attribution Bar (Lower-Left)
        c.fillStyle = 'rgba(10, 18, 44, 0.92)';
        c.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        c.lineWidth = 3;
        c.beginPath();
        c.roundRect(160, 1660, 1280, 150, 30);
        c.fill();
        c.stroke();

        c.font = 'bold 36px "Space Grotesk", sans-serif';
        c.fillStyle = '#94A3B8';
        c.fillText('FOUNDER ATTRIBUTION:', 220, 1750);
        c.fillStyle = '#38BDF8';
        c.fillText('Founded by Shivam Kumar', 660, 1750);

        c.font = 'italic 44px cursive, serif';
        c.fillStyle = '#EC4899';
        c.fillText('Shivam Kumar', 1140, 1752);

        // Trigger Download
        const link = document.createElement('a');
        link.download = 'nova-ai-ultimate-master-hero-banner-16-9.png';
        link.href = exportCanvas.toDataURL('image/png');
        link.click();
        setIsExporting(false);
      }

      if (!qrDataUrl) {
        finishAndDownload();
      }
    } catch (e) {
      console.error('Export error', e);
      setIsExporting(false);
    }
  };

  return (
    <header
      id="nova-hero-banner-root"
      className={`relative w-full overflow-hidden bg-[#02040A] text-white font-sans select-none border-b border-cyan-500/30 shadow-2xl ${className}`}
    >
      {/* Dynamic Background Particle & Neural Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80 z-0"
      />

      {/* Futuristic Digital Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.035)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none z-0" />

      {/* Volumetric Neon Ambient Illumination */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[550px] h-[550px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main 16:9 Responsive Web Composition Container */}
      <div className="relative z-10 max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 flex flex-col justify-between min-h-[720px] lg:min-h-[820px] space-y-6">

        {/* ================= 1. QUICK NAVIGATION / HEADER TOP BAR ================= */}
        <nav
          id="nova-quick-navigation"
          aria-label="Nova AI Quick Navigation"
          className="flex items-center justify-between gap-4 flex-wrap bg-[#060B1E]/85 backdrop-blur-xl border border-cyan-500/30 px-4 py-2.5 rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.15)]"
        >
          {/* Brand Identity Mark: NOVA.AI by Shelby.ai */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 p-[1.5px] shadow-[0_0_15px_rgba(56,189,248,0.5)] shrink-0">
              <div className="w-full h-full bg-[#030614] rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-black font-display text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-300">
                NOVA.AI
              </span>
              <span className="text-xs font-bold text-slate-400">by</span>
              <span className="text-xs font-black font-display tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                Shelby.ai
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2 text-xs font-semibold text-slate-300">
            <button
              onClick={onOpenPricing}
              className="px-3 py-1.5 rounded-xl hover:text-cyan-300 hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/30 transition-all cursor-pointer"
            >
              Nova Ultra Suite
            </button>
            <button
              onClick={() => onSelectTab?.('ai-catalog')}
              className="px-3 py-1.5 rounded-xl hover:text-cyan-300 hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/30 transition-all cursor-pointer"
            >
              AI Systems
            </button>
            <button
              onClick={() => onSelectTab?.('universal-db')}
              className="px-3 py-1.5 rounded-xl hover:text-cyan-300 hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/30 transition-all cursor-pointer"
            >
              Database Intelligence
            </button>
            <button
              onClick={() => onSelectTab?.('image-generator')}
              className="px-3 py-1.5 rounded-xl hover:text-cyan-300 hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/30 transition-all cursor-pointer"
            >
              Creative Studio
            </button>
            {onOpenAuth && (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600/80 to-purple-600/80 hover:from-indigo-500 hover:to-purple-500 border border-purple-400/40 text-white font-bold transition-all cursor-pointer shadow-sm hover:scale-105"
              >
                Sign In / Authenticate
              </button>
            )}
          </div>

          {/* Action Toolbar (4K Download & Share) */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportHighResBanner}
              disabled={isExporting}
              title="Download 16:9 4K High-Resolution Banner PNG"
              className="px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/60 text-xs text-cyan-300 font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-cyan-300" />
              <span>{isExporting ? 'Rendering 4K...' : 'Download 4K Banner'}</span>
            </button>

            <button
              onClick={handleCopyShare}
              title="Share Nova.ai Link"
              className="p-2 rounded-xl bg-[#09112A] hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </nav>


        {/* ================= 2. MAIN HERO SECTION (2-COL CINEMATIC) ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT 7 COLS: Brand Mark, Headline, Subtext, Dominant CTAs, 9 Capability Badges */}
          <div className="xl:col-span-7 flex flex-col space-y-5">
            
            {/* Target Audience Pill & Status */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081232]/90 border border-cyan-400/50 text-[11px] font-mono tracking-wider text-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.25)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-bold text-slate-200 uppercase tracking-widest">
                  FOR STUDENTS • CREATORS • RESEARCHERS • DEVELOPERS • PROFESSIONALS
                </span>
              </div>
            </div>

            {/* Dominant Brand Typography: NOVA.AI by Shelby.ai */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-300 drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">
                  NOVA.AI
                </h2>
                <div className="flex items-baseline gap-1.5 pt-2">
                  <span className="text-sm font-semibold text-slate-400">by</span>
                  <span className="text-sm sm:text-base font-black font-display tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                    Shelby.ai
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Dominant Hero Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black font-display tracking-tight text-white leading-[1.05] drop-shadow-md">
                ONE PLATFORM.{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
                  INFINITE POSSIBILITIES.
                </span>
              </h1>

              {/* Supporting Headline */}
              <p className="text-base sm:text-xl font-bold font-display tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-300">
                AI Intelligence. Data Engineering. Creative Power. — Unified in Nova AI.
              </p>

              {/* Supporting Description */}
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
                One intelligent workspace for AI models, databases, cloud data, developer tools, document intelligence, and creative workflows.
              </p>
            </div>

            {/* ================= 3. STRONGEST PRIMARY CTA & SECONDARY CTA ================= */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-3.5 flex-wrap sm:flex-nowrap">
                
                {/* PRIMARY CTA: LAUNCH NOVA AI → (Bright futuristic glow, glass depth, neon border, 3D elevation) */}
                <button
                  id="primary-launch-nova-ai-cta"
                  onClick={onOpenAuth || onOpenPricing}
                  className="relative group w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-pink-500 text-white font-black font-display tracking-wider text-base shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:shadow-[0_0_50px_rgba(59,130,246,0.8)] border border-cyan-300/60 transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-[0.98] z-10"
                >
                  {/* Subtle 3D Glass Inner Reflection */}
                  <div className="absolute top-1 inset-x-2 h-1/2 bg-white/20 rounded-xl pointer-events-none blur-[0.5px]" />
                  
                  <span className="relative z-10 text-white tracking-widest font-black uppercase text-base">
                    LAUNCH NOVA AI →
                  </span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform" />
                </button>

                {/* SECONDARY CTA: EXPLORE CAPABILITIES */}
                <button
                  id="secondary-explore-capabilities-cta"
                  onClick={onOpenPricing}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#09112A]/90 hover:bg-[#0E1B42] border border-cyan-500/40 hover:border-cyan-400/80 text-slate-200 font-bold font-display tracking-wide text-sm transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>EXPLORE CAPABILITIES</span>
                </button>
              </div>

              {/* Subtle Microcopy Beneath CTAs */}
              <div className="text-[11px] font-mono tracking-widest text-cyan-400/90 font-bold pl-1">
                Build. Analyze. Create. Accelerate.
              </div>
            </div>

            {/* ================= 4. PLATFORM CAPABILITY BADGES (9 ALL PRESENT) ================= */}
            <div className="space-y-2 pt-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                <span>✦ UNIFIED PLATFORM CAPABILITIES</span>
                <span className="w-12 h-[1px] bg-cyan-500/40" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { title: '451+ AI Systems', desc: '1,970+ Master Hub', icon: Cpu, color: 'text-indigo-300 border-indigo-500/40 bg-[#0A102A]/80 hover:border-indigo-400', tab: 'ai-catalog' },
                  { title: '402+ Database Engines', desc: 'Polyglot Topology', icon: Database, color: 'text-cyan-300 border-cyan-500/40 bg-[#061726]/80 hover:border-cyan-400', tab: 'universal-db' },
                  { title: 'Multimodal AI', desc: 'Vision, Audio, Code', icon: Layers, color: 'text-purple-300 border-purple-500/40 bg-[#160B26]/80 hover:border-purple-400', tab: 'chat' },
                  { title: 'Ultra High Intelligence', desc: 'Autonomous Reasoning', icon: Bot, color: 'text-amber-300 border-amber-500/40 bg-[#1F1706]/80 hover:border-amber-400', tab: 'chat' },
                  { title: 'Advanced AI-Powered Tools', desc: 'Code & Doc Analysis', icon: Zap, color: 'text-blue-300 border-blue-500/40 bg-[#091533]/80 hover:border-blue-400', tab: 'cursor' },
                  { title: 'AI Schema Architect', desc: 'Instant DDL Synthesis', icon: Code2, color: 'text-emerald-300 border-emerald-500/40 bg-[#061F18]/80 hover:border-emerald-400', tab: 'universal-db' },
                  { title: 'Cloud Data Intelligence', desc: 'Data Warehouses & Lakes', icon: Cloud, color: 'text-pink-300 border-pink-500/40 bg-[#240A1A]/80 hover:border-pink-400', tab: 'universal-db' },
                  { title: 'Creative AI Studio', desc: 'Images, Media & QR', icon: Palette, color: 'text-orange-300 border-orange-500/40 bg-[#261506]/80 hover:border-orange-400', tab: 'image-generator' },
                  { title: 'Fast & Unified AI Experience', desc: 'Sub-12ms Edge Sync', icon: Globe, color: 'text-teal-300 border-teal-500/40 bg-[#062024]/80 hover:border-teal-400', tab: 'chat' }
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    onClick={() => badge.tab && onSelectTab?.(badge.tab)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 group shadow-sm hover:scale-[1.02] ${badge.color}`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-900/90 border border-current flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <badge.icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-black text-white block leading-tight truncate font-display">
                        {badge.title}
                      </span>
                      <span className="text-[9px] font-medium text-slate-400 block truncate">
                        {badge.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>


          {/* RIGHT 5 COLS: Holographic Panels, ChatGPT 6 Astra Card, Database Architecture, QR Card */}
          <div className="xl:col-span-5 flex flex-col space-y-4">
            
            {/* ================= HOLOGRAPHIC ECOSYSTEM PANEL ================= */}
            <div className="relative rounded-3xl bg-[#060A1E]/95 border border-cyan-400/40 p-5 shadow-[0_0_40px_rgba(6,182,212,0.25)] backdrop-blur-2xl">
              
              {/* Terminal Window Bar */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3.5 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-cyan-300 ml-1.5 font-bold">
                    sys://nova-core-ecosystem
                  </span>
                </div>

                {/* Interactive Category Switcher */}
                <div className="flex items-center gap-1 bg-[#030614] p-1 rounded-xl border border-slate-800 text-[10px] font-mono flex-wrap">
                  <button
                    onClick={() => setActiveVisualTab('astra')}
                    className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                      activeVisualTab === 'astra' ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-200 font-bold border border-cyan-400/40' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ✦ ASTRA
                  </button>
                  <button
                    onClick={() => setActiveVisualTab('ecosystem')}
                    className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                      activeVisualTab === 'ecosystem' ? 'bg-cyan-500/25 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    UNIFIED
                  </button>
                  <button
                    onClick={() => setActiveVisualTab('database')}
                    className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                      activeVisualTab === 'database' ? 'bg-indigo-500/25 text-indigo-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    402+ DATABASES
                  </button>
                  <button
                    onClick={() => setActiveVisualTab('architect')}
                    className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                      activeVisualTab === 'architect' ? 'bg-emerald-500/25 text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ARCHITECT
                  </button>
                  <button
                    onClick={() => setActiveVisualTab('ai-systems')}
                    className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                      activeVisualTab === 'ai-systems' ? 'bg-purple-500/25 text-purple-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    451+ AI
                  </button>
                  <button
                    onClick={() => setActiveVisualTab('creative')}
                    className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                      activeVisualTab === 'creative' ? 'bg-pink-500/25 text-pink-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    CREATIVE
                  </button>
                </div>
              </div>

              {/* TAB 0: FEATURED AI INTELLIGENCE — CHATGPT 6 ASTRA */}
              {activeVisualTab === 'astra' && (
                <div className="space-y-3 font-mono text-xs">
                  {/* Holographic Flagship Model Card */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#0B1536] to-[#040818] border-2 border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.35)] space-y-3">
                    
                    {/* Header with abstract intelligence core */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm sm:text-base font-black font-display tracking-tight text-white">
                            CHATGPT 6 ASTRA
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 text-[9px] font-bold">
                            FLAGSHIP NODE
                          </span>
                        </div>
                        <p className="text-[10px] text-cyan-300 font-medium font-display mt-0.5">
                          Advanced Multimodal Intelligence
                        </p>
                      </div>

                      {/* Abstract Futuristic Intelligence Core */}
                      <div className="relative w-12 h-12 rounded-full border border-cyan-400/60 flex items-center justify-center shrink-0">
                        <div className="absolute inset-1 rounded-full border border-purple-500/50 animate-spin" style={{ animationDuration: '6s' }} />
                        <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-pink-500 animate-pulse shadow-[0_0_15px_rgba(56,189,248,0.8)]" />
                      </div>
                    </div>

                    {/* Visually connected 10 capabilities */}
                    <div className="space-y-1">
                      <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                        Connected Capabilities:
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                        {[
                          { name: 'AI Reasoning', icon: Bot },
                          { name: 'Multimodal Understanding', icon: Layers },
                          { name: 'Vision Intelligence', icon: Eye },
                          { name: 'Voice Interaction', icon: Mic },
                          { name: 'Coding Engine', icon: Code2 },
                          { name: 'Document Intelligence', icon: FileText },
                          { name: 'Data Analysis', icon: Activity },
                          { name: 'Research Workflows', icon: Search },
                          { name: 'Creative Workflows', icon: Palette },
                          { name: 'AI Agents', icon: Workflow }
                        ].map((cap, i) => (
                          <div key={i} className="px-2 py-1 rounded-lg bg-[#07112E] border border-cyan-500/25 flex items-center gap-1.5 text-slate-200">
                            <cap.icon className="w-3 h-3 text-cyan-300 shrink-0" />
                            <span className="truncate">{cap.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick action button */}
                    <button
                      onClick={() => onSelectTab?.('openai-chat')}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-400/50 text-cyan-200 font-bold text-[11px] flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Interact with ChatGPT 6 Astra in Workspace →</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 1: UNIFIED ECOSYSTEM OVERVIEW */}
              {activeVisualTab === 'ecosystem' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-300">
                    <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                      <Activity className="w-3.5 h-3.5 animate-pulse" />
                      COGNITIVE REASONING & DATA FABRIC
                    </span>
                    <span className="text-emerald-400 font-mono font-bold">99.99% ONLINE</span>
                  </div>

                  {/* Interconnected Nodes Visualization */}
                  <div className="p-3 rounded-2xl bg-[#040816] border border-cyan-500/20 space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>ORCHESTRATION PATHWAYS</span>
                      <span className="text-cyan-400">Latency: 1.1ms</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                      <div className="p-1.5 rounded-lg bg-[#081232] border border-blue-500/30 text-blue-200">
                        LLMs & Astra Core
                      </div>
                      <div className="p-1.5 rounded-lg bg-[#140A28] border border-purple-500/30 text-purple-200">
                        Vector Embeddings
                      </div>
                      <div className="p-1.5 rounded-lg bg-[#061C14] border border-emerald-500/30 text-emerald-200">
                        Cloud Data Streams
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400 text-center pt-1 font-mono">
                      <span>⇄ Multi-Paradigm SQL / NoSQL / Graph Fabric ⇄</span>
                    </div>
                  </div>

                  {/* Telemetry Metric Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-[#08112C] border border-cyan-500/30">
                      <span className="text-slate-400 block text-[10px]">AI SYSTEM ENGINES</span>
                      <span className="text-white font-bold text-sm">1,970+ Active</span>
                      <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-cyan-400 h-full w-[94%]" />
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#08112C] border border-indigo-500/30">
                      <span className="text-slate-400 block text-[10px]">DATABASE TOPOLOGY</span>
                      <span className="text-white font-bold text-sm">402 Engines</span>
                      <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-indigo-400 h-full w-[90%]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DATABASE INTELLIGENCE (402+ Database Engines) */}
              {activeVisualTab === 'database' && (
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-cyan-300 font-bold">402+ DATABASE ENGINES CONNECTED</span>
                    <span className="text-emerald-400">ACID + EVENTUAL</span>
                  </div>

                  {/* 12 Database Architectures */}
                  <div className="p-2.5 rounded-2xl bg-[#040816] border border-slate-800 text-[10px] space-y-1.5">
                    <div className="text-slate-400 font-bold uppercase tracking-wider">
                      12 Database Architectures:
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-[9px] text-slate-300">
                      <span className="px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-500/30">Relational/SQL</span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-500/30">NoSQL Document</span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-500/30">NewSQL Distributed</span>
                      <span className="px-1.5 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/30">Key-Value In-Memory</span>
                      <span className="px-1.5 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/30">Graph Multi-Hop</span>
                      <span className="px-1.5 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/30">Vector / AI Search</span>
                      <span className="px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/30">Time-Series IoT</span>
                      <span className="px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/30">Full-Text Search</span>
                      <span className="px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/30">Embedded Low-RAM</span>
                      <span className="px-1.5 py-0.5 rounded bg-pink-950/60 border border-pink-500/30">Wide-Column Scale</span>
                      <span className="px-1.5 py-0.5 rounded bg-pink-950/60 border border-pink-500/30">Cloud Serverless</span>
                      <span className="px-1.5 py-0.5 rounded bg-pink-950/60 border border-pink-500/30">Multi-Model Hybrid</span>
                    </div>
                  </div>

                  {/* Key Subtle Technical References */}
                  <div className="flex flex-wrap gap-1 text-[9px]">
                    {[
                      'PostgreSQL', 'MySQL', 'Oracle', 'SQL Server',
                      'Snowflake', 'BigQuery', 'ClickHouse', 'Redis',
                      'MongoDB', 'Neo4j', 'Milvus', 'Pinecone', 'Qdrant'
                    ].map((db, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-[#081332] border border-cyan-500/30 text-cyan-200 font-bold">
                        {db}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: AI SCHEMA ARCHITECT */}
              {activeVisualTab === 'architect' && (
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-emerald-300 font-bold">AI SCHEMA ARCHITECT</span>
                    <span className="text-cyan-300">DDL SYNTHESIS</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#040C1A] border border-emerald-500/30 text-[10px] space-y-1 text-slate-300">
                    <p className="text-emerald-400 font-bold">CREATE TABLE <span className="text-white">nova_quantum_vectors</span> (</p>
                    <p className="pl-3 text-cyan-300">id UUID PRIMARY KEY DEFAULT gen_random_uuid(),</p>
                    <p className="pl-3 text-pink-300">embedding VECTOR(1536) NOT NULL,</p>
                    <p className="pl-3 text-purple-300">metadata JSONB DEFAULT &apos;&#123;&#125;&apos;::jsonb,</p>
                    <p className="pl-3 text-amber-300">partition_key VARCHAR(64) NOT NULL</p>
                    <p className="text-emerald-400 font-bold">) PARTITION BY LIST (partition_key);</p>
                    <p className="text-slate-400 pt-1 text-[9px]">-- AI-generated HNSW index, partitions & migrations ready</p>
                  </div>
                </div>
              )}

              {/* TAB 4: AI SYSTEM DIRECTORY (451+ AI Systems) */}
              {activeVisualTab === 'ai-systems' && (
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-purple-300 font-bold">451+ AI SYSTEMS (1,970+ MASTER HUB)</span>
                    <span className="text-cyan-400">GLOBAL MESH</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    {[
                      { cat: 'LLMs', count: 'ChatGPT 6 Astra, Claude 3.7, Gemini 2.5' },
                      { cat: 'Coding AI', count: 'Cursor, DeepSeek-V3, CodeLlama' },
                      { cat: 'Image AI', count: 'Imagen 3, Flux Pro, Midjourney' },
                      { cat: 'Video AI', count: 'Sora, Runway Gen-3, Pika 2.0' },
                      { cat: 'Voice AI', count: 'ElevenLabs, Google Live Audio TTS' },
                      { cat: 'Research AI', count: 'NotebookLM, Perplexity Deep' },
                      { cat: 'Autonomous AI', count: 'Antigravity Multi-Agent Hub' },
                      { cat: 'Multimodal AI', count: 'Vision + Audio + Code Fusion' }
                    ].map((c, i) => (
                      <div key={i} className="p-2 rounded-xl bg-[#081232] border border-purple-500/30">
                        <div className="flex justify-between items-center text-purple-200 font-bold">
                          <span>{c.cat}</span>
                        </div>
                        <span className="text-[9px] text-slate-400 block truncate mt-0.5">{c.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: CREATIVE STUDIO */}
              {activeVisualTab === 'creative' && (
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-pink-300 font-bold">CREATIVE AI STUDIO SUITE</span>
                    <span className="text-amber-400">STUDIO READY</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="p-2.5 rounded-xl bg-[#1A0A26] border border-pink-500/30 space-y-1">
                      <span className="text-pink-300 font-bold block">AI Image Generation</span>
                      <span className="text-slate-400 text-[9px] block">Photorealistic, Anime, Vector, 3D Art</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#1A0A26] border border-pink-500/30 space-y-1">
                      <span className="text-pink-300 font-bold block">Video Editing Studio</span>
                      <span className="text-slate-400 text-[9px] block">Motion Canvas & Visual Timelines</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#1A0A26] border border-pink-500/30 space-y-1">
                      <span className="text-pink-300 font-bold block">QR Studio</span>
                      <span className="text-slate-400 text-[9px] block">Precision Scannable Vector Codes</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#1A0A26] border border-pink-500/30 space-y-1">
                      <span className="text-pink-300 font-bold block">Document Intelligence</span>
                      <span className="text-slate-400 text-[9px] block">PDF, CSV, Codebase Synthesis</span>
                    </div>
                  </div>
                </div>
              )}

            </div>


            {/* ================= 5. QR CODE INTEGRATION (HIGH CONTRAST & SCANNABLE) ================= */}
            <div
              id="nova-scannable-qr-card"
              className="relative p-4 rounded-3xl bg-[#060D24]/95 border-2 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.35)] flex flex-col sm:flex-row items-center gap-4 group backdrop-blur-xl"
            >
              {/* Quiet White Space Surrounded QR Code Box */}
              <div className="p-2.5 bg-white rounded-2xl shadow-2xl flex items-center justify-center shrink-0">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Scan to Open Nova.ai"
                    className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 bg-slate-100 rounded-lg flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-slate-800" />
                  </div>
                )}
              </div>

              {/* Text Information Beside QR Code */}
              <div className="flex-1 text-center sm:text-left space-y-1.5 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/60 text-[10px] font-mono text-cyan-300 font-bold">
                  <ScanLine className="w-3 h-3 text-cyan-400" />
                  <span>DIRECT SCAN LINK</span>
                </div>

                <h3 className="text-lg sm:text-xl font-black font-display tracking-tight text-white leading-tight">
                  SCAN TO OPEN NOVA.AI
                </h3>

                <p className="text-xs font-semibold text-cyan-300 font-display">
                  Explore the Future of AI
                </p>

                <div className="pt-1 flex items-center justify-center sm:justify-start gap-2 text-[11px] font-mono text-slate-300">
                  <span className="truncate max-w-[200px] text-slate-400">
                    nova-ai-3603.ai.studio
                  </span>
                  <a
                    href={APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 font-bold"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>


            {/* ================= 6. FOUNDER ATTRIBUTION ================= */}
            <div
              id="nova-founder-attribution"
              className="flex items-center justify-between px-5 py-3 rounded-2xl bg-gradient-to-r from-[#060D24] via-[#091536] to-[#060D24] border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                  FOUNDER:
                </span>
                <span className="font-black text-white tracking-wide font-display text-xs sm:text-sm">
                  Founded by Shivam Kumar
                </span>
              </div>

              {/* Handwritten signature aesthetic */}
              <div
                className="text-sm sm:text-base italic tracking-wider text-pink-300 select-none transform -rotate-1 font-serif font-semibold"
                style={{ fontFamily: 'cursive, serif' }}
              >
                Shivam Kumar
              </div>
            </div>

          </div>

        </div>


        {/* ================= 7. FOOTER TRUST HIGHLIGHTS ================= */}
        <footer className="pt-3 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center md:justify-start">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Shield className="w-4 h-4 text-cyan-400" /> Enterprise-Grade Security
            </span>
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Zap className="w-4 h-4 text-amber-400" /> Real-time Sub-12ms Latency
            </span>
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Users className="w-4 h-4 text-purple-400" /> Built for Students, Creators & Innovators
            </span>
          </div>

          <div className="text-center md:text-right font-mono text-[11px] text-slate-400">
            Nova.ai by Shelby.ai © 2026 • The Future is Intelligent.
          </div>
        </footer>

      </div>
    </header>
  );
}
