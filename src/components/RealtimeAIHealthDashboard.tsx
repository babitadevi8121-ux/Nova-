import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Activity,
  Zap,
  Server,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  Clock,
  Globe,
  Radio,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Cpu,
  Search,
  Filter,
  Download,
  Share2,
  Terminal,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Play,
  Pause,
  Sliders,
  Check,
  Copy,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import { User } from '../types';

export interface ProviderHealth {
  id: string;
  name: string;
  category: 'Frontier LLM' | 'Fast Inference' | 'Multimodal & Media' | 'Search & Code';
  website: string;
  apiDocs: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  uptimePercentage: number; // e.g., 99.98
  currentLatency: number; // ms
  baseLatency: number; // ms
  p50Latency: number;
  p90Latency: number;
  p99Latency: number;
  ttft: number; // Time to First Token in ms
  tps: number; // Tokens per second
  errorRate: number; // Percentage e.g. 0.02%
  latencyHistory: number[]; // 16 recent latency records
  models: {
    name: string;
    status: 'operational' | 'degraded' | 'outage';
    latency: number;
    tps: number;
  }[];
  regions: {
    region: string;
    latency: number;
    status: 'operational' | 'degraded' | 'outage';
  }[];
  uptimeDays: {
    day: number; // 1 to 30
    status: 'operational' | 'degraded' | 'outage' | 'maintenance';
    uptime: number;
    date: string;
  }[];
  lastIncident?: {
    date: string;
    title: string;
    resolved: boolean;
    duration: string;
  };
}

interface IncidentItem {
  id: string;
  providerId: string;
  providerName: string;
  title: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: 'minor' | 'major' | 'critical';
  timestamp: string;
  impactedServices: string[];
  updates: {
    time: string;
    message: string;
    status: string;
  }[];
}

interface RealtimeAIHealthDashboardProps {
  user?: User | null;
  onOpenAuth?: () => void;
  onOpenPricing?: () => void;
}

// 12 Major AI API Providers Initial Master Dataset
const INITIAL_PROVIDERS: ProviderHealth[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'Frontier LLM',
    website: 'https://openai.com',
    apiDocs: 'https://platform.openai.com/docs',
    status: 'operational',
    uptimePercentage: 99.95,
    baseLatency: 220,
    currentLatency: 224,
    p50Latency: 210,
    p90Latency: 380,
    p99Latency: 640,
    ttft: 185,
    tps: 84,
    errorRate: 0.04,
    latencyHistory: [210, 218, 225, 230, 222, 215, 228, 240, 232, 220, 215, 224, 230, 226, 219, 224],
    models: [
      { name: 'GPT-4o (Omni)', status: 'operational', latency: 195, tps: 92 },
      { name: 'GPT-4o mini', status: 'operational', latency: 110, tps: 135 },
      { name: 'o1 Reasoning', status: 'operational', latency: 450, tps: 45 },
      { name: 'o3-mini Fast', status: 'operational', latency: 180, tps: 110 },
      { name: 'DALL-E 3', status: 'operational', latency: 2800, tps: 1 },
      { name: 'Whisper Large v3', status: 'operational', latency: 310, tps: 40 }
    ],
    regions: [
      { region: 'US-East (N. Virginia)', latency: 180, status: 'operational' },
      { region: 'US-West (Oregon)', latency: 210, status: 'operational' },
      { region: 'EU-West (Ireland)', latency: 245, status: 'operational' },
      { region: 'AP-Southeast (Tokyo)', latency: 310, status: 'operational' }
    ],
    uptimeDays: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      status: i === 14 ? 'degraded' : 'operational',
      uptime: i === 14 ? 98.8 : 100,
      date: `Day ${30 - i} ago`
    })),
    lastIncident: {
      date: '5 days ago',
      title: 'Elevated latency on o1 reasoning API endpoint',
      resolved: true,
      duration: '42 mins'
    }
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    category: 'Frontier LLM',
    website: 'https://anthropic.com',
    apiDocs: 'https://docs.anthropic.com',
    status: 'operational',
    uptimePercentage: 99.98,
    baseLatency: 240,
    currentLatency: 248,
    p50Latency: 235,
    p90Latency: 395,
    p99Latency: 590,
    ttft: 205,
    tps: 76,
    errorRate: 0.02,
    latencyHistory: [230, 242, 238, 245, 252, 240, 235, 244, 250, 246, 239, 248, 255, 241, 238, 248],
    models: [
      { name: 'Claude 3.7 Sonnet (Thinking)', status: 'operational', latency: 260, tps: 78 },
      { name: 'Claude 3.5 Sonnet v2', status: 'operational', latency: 220, tps: 82 },
      { name: 'Claude 3.5 Haiku', status: 'operational', latency: 115, tps: 140 },
      { name: 'Claude 3 Opus', status: 'operational', latency: 420, tps: 48 }
    ],
    regions: [
      { region: 'US-East (AWS us-east-1)', latency: 190, status: 'operational' },
      { region: 'US-West (Oregon)', latency: 225, status: 'operational' },
      { region: 'EU-Central (Frankfurt)', latency: 260, status: 'operational' },
      { region: 'AP-East (Singapore)', latency: 320, status: 'operational' }
    ],
    uptimeDays: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      status: 'operational',
      uptime: 100,
      date: `Day ${30 - i} ago`
    })),
    lastIncident: {
      date: '12 days ago',
      title: 'Transient 529 over capacity errors during peak burst',
      resolved: true,
      duration: '18 mins'
    }
  },
  {
    id: 'google-deepmind',
    name: 'Google Vertex & DeepMind',
    category: 'Frontier LLM',
    website: 'https://ai.google.dev',
    apiDocs: 'https://cloud.google.com/vertex-ai/docs',
    status: 'operational',
    uptimePercentage: 99.99,
    baseLatency: 160,
    currentLatency: 165,
    p50Latency: 155,
    p90Latency: 260,
    p99Latency: 410,
    ttft: 130,
    tps: 115,
    errorRate: 0.01,
    latencyHistory: [155, 162, 158, 164, 170, 161, 159, 168, 163, 157, 165, 160, 172, 166, 158, 165],
    models: [
      { name: 'Gemini 2.5 Pro', status: 'operational', latency: 210, tps: 85 },
      { name: 'Gemini 2.0 Flash', status: 'operational', latency: 95, tps: 175 },
      { name: 'Gemini 1.5 Flash 8B', status: 'operational', latency: 75, tps: 210 },
      { name: 'Imagen 3 HD', status: 'operational', latency: 1850, tps: 1 },
      { name: 'Lyria Audio Synth', status: 'operational', latency: 450, tps: 30 }
    ],
    regions: [
      { region: 'US-Central (Iowa)', latency: 140, status: 'operational' },
      { region: 'US-East (N. Virginia)', latency: 155, status: 'operational' },
      { region: 'EU-West (Belgium)', latency: 215, status: 'operational' },
      { region: 'Asia-South (Mumbai)', latency: 260, status: 'operational' }
    ],
    uptimeDays: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      status: 'operational',
      uptime: 100,
      date: `Day ${30 - i} ago`
    }))
  },
  {
    id: 'groq',
    name: 'Groq Cloud (LPU Inference)',
    category: 'Fast Inference',
    website: 'https://groq.com',
    apiDocs: 'https://console.groq.com/docs',
    status: 'operational',
    uptimePercentage: 99.97,
    baseLatency: 48,
    currentLatency: 46,
    p50Latency: 42,
    p90Latency: 78,
    p99Latency: 125,
    ttft: 38,
    tps: 385,
    errorRate: 0.02,
    latencyHistory: [45, 48, 44, 46, 50, 43, 47, 49, 45, 42, 46, 48, 44, 47, 45, 46],
    models: [
      { name: 'Llama 3.3 70B Versatile', status: 'operational', latency: 45, tps: 390 },
      { name: 'DeepSeek R1 Distill 70B', status: 'operational', latency: 65, tps: 280 },
      { name: 'Mixtral 8x7B 32k', status: 'operational', latency: 40, tps: 450 },
      { name: 'Whisper Large v3 Turbo', status: 'operational', latency: 95, tps: 60 }
    ],
    regions: [
      { region: 'US-West (San Jose)', latency: 42, status: 'operational' },
      { region: 'US-East (Ashburn)', latency: 55, status: 'operational' },
      { region: 'EU-West (London)', latency: 120, status: 'operational' }
    ],
    uptimeDays: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      status: 'operational',
      uptime: 100,
      date: `Day ${30 - i} ago`
    }))
  },
  {
    id: 'deepseek',
    name: 'DeepSeek AI',
    category: 'Frontier LLM',
    website: 'https://deepseek.com',
    apiDocs: 'https://platform.deepseek.com/api-docs',
    status: 'operational',
    uptimePercentage: 99.88,
    baseLatency: 310,
    currentLatency: 325,
    p50Latency: 290,
    p90Latency: 540,
    p99Latency: 820,
    ttft: 260,
    tps: 64,
    errorRate: 0.08,
    latencyHistory: [290, 310, 325, 340, 315, 305, 330, 345, 320, 310, 335, 325, 350, 315, 320, 325],
    models: [
      { name: 'DeepSeek-V3 671B', status: 'operational', latency: 280, tps: 72 },
      { name: 'DeepSeek-R1 (Full Reasoning)', status: 'operational', latency: 390, tps: 48 },
      { name: 'DeepSeek Coder V2', status: 'operational', latency: 220, tps: 88 }
    ],
    regions: [
      { region: 'AP-East (Hong Kong)', latency: 160, status: 'operational' },
      { region: 'US-West (Silicon Valley)', latency: 290, status: 'operational' },
      { region: 'EU-Central (Frankfurt)', latency: 340, status: 'operational' }
    ],
    uptimeDays: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      status: i === 6 ? 'degraded' : 'operational',
      uptime: i === 6 ? 96.5 : 100,
      date: `Day ${30 - i} ago`
    })),
    lastIncident: {
      date: '3 weeks ago',
      title: 'Global traffic surge triggered dynamic queue throttles',
      resolved: true,
      duration: '1h 14m'
    }
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    category: 'Frontier LLM',
    website: 'https://mistral.ai',
    apiDocs: 'https://docs.mistral.ai',
    status: 'operational',
    uptimePercentage: 99.96,
    baseLatency: 190,
    currentLatency: 194,
    p50Latency: 185,
    p90Latency: 310,
    p99Latency: 520,
    ttft: 160,
    tps: 88,
    errorRate: 0.03,
    latencyHistory: [180, 192, 188, 195, 201, 189, 185, 198, 204, 192, 187, 194, 200, 191, 186, 194],
    models: [
      { name: 'Mistral Large 2', status: 'operational', latency: 215, tps: 76 },
      { name: 'Codestral 2501', status: 'operational', latency: 140, tps: 112 },
      { name: 'Pixtral 12B Vision', status: 'operational', latency: 175, tps: 94 },
      { name: 'Mistral NeMo 12B', status: 'operational', latency: 105, tps: 145 }
    ],
    regions: [
      { region: 'EU-West (Paris)', latency: 130, status: 'operational' },
      { region: 'EU-Central (Frankfurt)', latency: 145, status: 'operational' },
      { region: 'US-East (Virginia)', latency: 220, status: 'operational' }
    ],
    uptimeDays: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      status: 'operational',
      uptime: 100,
      date: `Day ${30 - i} ago`
    }))
  },
  {
    id: 'xai',
    name: 'xAI (Grok API)',
    category: 'Frontier LLM',
    website: 'https://x.ai',
    apiDocs: 'https://docs.x.ai',
    status: 'operational',
    uptimePercentage: 99.93,
    baseLatency: 255,
    currentLatency: 262,
    p50Latency: 245,
    p90Latency: 410,
    p99Latency: 680,
    ttft: 220,
    tps: 74,
    errorRate: 0.05,
    latencyHistory: [250, 260, 255, 268, 275, 258, 252, 265, 270, 262, 254, 262, 271, 264, 256, 262],
    models: [
      { name: 'Grok 3 (Colossus Cluster)', status: 'operational', latency: 270, tps: 80 },
      { name: 'Grok 2 Vision', status: 'operational', latency: 240, tps: 85 },
      { name: 'Grok 2 mini', status: 'operational', latency: 145, tps: 125 }
    ],
    regions: [
      { region: 'US-South (Memphis Cluster)', latency: 175, status: 'operational' },
      { region: 'US-East (N. Virginia)', latency: 215, status: 'operational' },
      { region: 'EU-West (Ireland)', latency: 285, status: 'operational' }
    ],
    uptimeDays: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      status: i === 22 ? 'degraded' : 'operational',
      uptime: i === 22 ? 98.2 : 100,
      date: `Day ${30 - i} ago`
    }))
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    category: 'Search & Code',
    website: 'https://perplexity.ai',
    apiDocs: 'https://docs.perplexity.ai',
    status: 'operational',
    uptimePercentage: 99.97,
    baseLatency: 320,
    currentLatency: 315,
    p50Latency: 295,
    p90Latency: 510,
    p99Latency: 790,
    ttft: 250,
    tps: 68,
    errorRate: 0.03,
    latencyHistory: [310, 325, 318, 330, 340, 322, 315, 328, 335, 320, 312, 315, 330, 324, 316, 315],
    models: [
      { name: 'Sonar Pro (Online Search)', status: 'operational', latency: 340, tps: 65 },
      { name: 'Sonar Reasoning Pro', status: 'operational', latency: 480, tps: 42 },
      { name: 'Sonar Fast Search', status: 'operational', latency: 210, tps: 105 }
    ],
    regions: [
      { region: 'US-East (Virginia)', latency: 210, status: 'operational' },
      { region: 'US-West (California)', latency: 235, status: 'operational' },
      { region: 'EU-West (Ireland)', latency: 290, status: 'operational' }
    ],
    uptimeDays: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      status: 'operational',
      uptime: 100,
      date: `Day ${30 - i} ago`
    }))
  },
  {
    id: 'together',
    name: 'Together AI (Serverless)',
    category: 'Fast Inference',
    website: 'https://together.ai',
    apiDocs: 'https://docs.together.ai',
    status: 'operational',
    uptimePercentage: 99.96,
    baseLatency: 110,
    currentLatency: 114,
    p50Latency: 105,
    p90Latency: 195,
    p99Latency: 320,
    ttft: 92,
    tps: 165,
    errorRate: 0.02,
    latencyHistory: [108, 115, 112, 118, 122, 114, 110, 119, 124, 116, 111, 114, 121, 115, 109, 114],
    models: [
      { name: 'Llama 3.3 70B Turbo', status: 'operational', latency: 110, tps: 170 },
      { name: 'DeepSeek V3 Turbo', status: 'operational', latency: 125, tps: 145 },
      { name: 'Qwen 2.5 72B Instruct', status: 'operational', latency: 130, tps: 140 },
      { name: 'FLUX.1 [schnell] Image', status: 'operational', latency: 1200, tps: 1 }
    ],
    regions: [
      { region: 'US-East (Northern Virginia)', latency: 95, status: 'operational' },
      { region: 'US-West (Oregon)', latency: 115, status: 'operational' },
      { region: 'EU-Central (Frankfurt)', latency: 185, status: 'operational' }
    ],
    uptimeDays: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      status: 'operational',
      uptime: 100,
      date: `Day ${30 - i} ago`
    }))
  },
  {
    id: 'cohere',
    name: 'Cohere',
    category: 'Frontier LLM',
    website: 'https://cohere.com',
    apiDocs: 'https://docs.cohere.com',
    status: 'operational',
    uptimePercentage: 99.98,
    baseLatency: 175,
    currentLatency: 178,
    p50Latency: 170,
    p90Latency: 280,
    p99Latency: 450,
    ttft: 145,
    tps: 96,
    errorRate: 0.01,
    latencyHistory: [170, 182, 176, 184, 189, 178, 173, 185, 188, 179, 172, 178, 185, 177, 171, 178],
    models: [
      { name: 'Command R+ 08-2024', status: 'operational', latency: 190, tps: 88 },
      { name: 'Embed v3 Multilingual', status: 'operational', latency: 45, tps: 320 },
      { name: 'Rerank v3.5 Enterprise', status: 'operational', latency: 65, tps: 260 }
    ],
    regions: [
      { region: 'US-East (AWS us-east-1)', latency: 145, status: 'operational' },
      { region: 'Canada-Central (Montreal)', latency: 160, status: 'operational' },
      { region: 'EU-West (Ireland)', latency: 230, status: 'operational' }
    ],
    uptimeDays: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      status: 'operational',
      uptime: 100,
      date: `Day ${30 - i} ago`
    }))
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs Voice AI',
    category: 'Multimodal & Media',
    website: 'https://elevenlabs.io',
    apiDocs: 'https://elevenlabs.io/docs',
    status: 'operational',
    uptimePercentage: 99.94,
    baseLatency: 215,
    currentLatency: 218,
    p50Latency: 205,
    p90Latency: 360,
    p99Latency: 580,
    ttft: 175,
    tps: 52,
    errorRate: 0.03,
    latencyHistory: [210, 222, 218, 225, 231, 220, 214, 226, 230, 221, 215, 218, 227, 219, 212, 218],
    models: [
      { name: 'Turbo v2.5 Voice Stream', status: 'operational', latency: 165, tps: 65 },
      { name: 'Multilingual v2 Ultra', status: 'operational', latency: 240, tps: 45 },
      { name: 'Voice Isolator & SFX', status: 'operational', latency: 520, tps: 20 }
    ],
    regions: [
      { region: 'US-East (N. Virginia)', latency: 160, status: 'operational' },
      { region: 'EU-Central (Frankfurt)', latency: 210, status: 'operational' },
      { region: 'AP-Southeast (Singapore)', latency: 295, status: 'operational' }
    ],
    uptimeDays: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      status: 'operational',
      uptime: 100,
      date: `Day ${30 - i} ago`
    }))
  },
  {
    id: 'runway',
    name: 'Runway AI Video',
    category: 'Multimodal & Media',
    website: 'https://runwayml.com',
    apiDocs: 'https://docs.runwayml.com',
    status: 'operational',
    uptimePercentage: 99.91,
    baseLatency: 580,
    currentLatency: 595,
    p50Latency: 560,
    p90Latency: 920,
    p99Latency: 1540,
    ttft: 480,
    tps: 12,
    errorRate: 0.07,
    latencyHistory: [570, 595, 582, 610, 625, 590, 580, 615, 620, 600, 585, 595, 610, 598, 575, 595],
    models: [
      { name: 'Gen-3 Alpha Turbo API', status: 'operational', latency: 2400, tps: 1 },
      { name: 'Camera Motion Vector Controller', status: 'operational', latency: 380, tps: 24 },
      { name: 'Act-One Facial Performance', status: 'operational', latency: 1650, tps: 1 }
    ],
    regions: [
      { region: 'US-East (Virginia)', latency: 490, status: 'operational' },
      { region: 'US-West (Oregon)', latency: 540, status: 'operational' },
      { region: 'EU-West (Ireland)', latency: 680, status: 'operational' }
    ],
    uptimeDays: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      status: i === 18 ? 'degraded' : 'operational',
      uptime: i === 18 ? 97.4 : 100,
      date: `Day ${30 - i} ago`
    }))
  }
];

const INITIAL_INCIDENTS: IncidentItem[] = [
  {
    id: 'inc-01',
    providerId: 'deepseek',
    providerName: 'DeepSeek AI',
    title: 'Intermittent rate-limiting on deepseek-reasoner (R1) endpoints',
    status: 'resolved',
    severity: 'minor',
    timestamp: '2 hours ago',
    impactedServices: ['DeepSeek-R1 API', 'DeepSeek Coder API'],
    updates: [
      { time: '2h ago', message: 'All queues drained and autoscaled. Latency stabilized below 350ms.', status: 'Resolved' },
      { time: '3h ago', message: 'Engineers deployed additional GPU inference nodes to absorb high global demand.', status: 'Monitoring' },
      { time: '4h ago', message: 'Investigating elevated 429 response codes on reasoning completions.', status: 'Investigating' }
    ]
  },
  {
    id: 'inc-02',
    providerId: 'openai',
    providerName: 'OpenAI',
    title: 'Elevated latency observed on US-East completions',
    status: 'resolved',
    severity: 'minor',
    timestamp: 'Yesterday at 18:40 UTC',
    impactedServices: ['Chat Completions', 'Function Calling'],
    updates: [
      { time: 'Yesterday', message: 'Upstream cloud provider resolved internal network edge packet drop.', status: 'Resolved' },
      { time: 'Yesterday', message: 'Routing traffic to alternate US-Central clusters while monitoring p99 latency.', status: 'Monitoring' }
    ]
  },
  {
    id: 'inc-03',
    providerId: 'anthropic',
    providerName: 'Anthropic',
    title: 'Scheduled Maintenance: Claude 3.7 Sonnet Model Weights Update',
    status: 'resolved',
    severity: 'minor',
    timestamp: '3 days ago',
    impactedServices: ['Anthropic Claude API'],
    updates: [
      { time: '3 days ago', message: 'Maintenance completed with zero customer downtime and verified telemetry.', status: 'Resolved' }
    ]
  }
];

export const RealtimeAIHealthDashboard: React.FC<RealtimeAIHealthDashboardProps> = ({
  user,
  onOpenAuth,
  onOpenPricing
}) => {
  // Master state
  const [providers, setProviders] = useState<ProviderHealth[]>(INITIAL_PROVIDERS);
  const [incidents, setIncidents] = useState<IncidentItem[]>(INITIAL_INCIDENTS);
  const [activeTab, setActiveTab] = useState<'grid' | 'matrix' | 'incidents' | 'probe'>('grid');
  
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latency' | 'uptime' | 'name'>('latency');

  // Live Auto-Refresh simulation
  const [refreshInterval, setRefreshInterval] = useState<number>(3000); // 3s, 10s, 30s, 0 (paused)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [countdown, setCountdown] = useState<number>(3);

  // Selected provider for details modal / ping probe
  const [selectedProvider, setSelectedProvider] = useState<ProviderHealth>(INITIAL_PROVIDERS[0]);
  const [isProbeRunning, setIsProbeRunning] = useState(false);
  const [probeResult, setProbeResult] = useState<{
    status: number;
    dnsTime: number;
    tcpTime: number;
    tlsTime: number;
    ttftTime: number;
    totalTime: number;
    headers: Record<string, string>;
    timestamp: string;
  } | null>(null);

  // Copied feedback
  const [copiedReport, setCopiedReport] = useState(false);

  // Simulated Live Latency Telemetry Tick
  useEffect(() => {
    if (refreshInterval === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Trigger live jitter update
          updateLiveMetrics();
          return Math.floor(refreshInterval / 1000);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [refreshInterval, providers]);

  // Jitter generator for live latency and metrics
  const updateLiveMetrics = () => {
    setIsRefreshing(true);
    setProviders((current) =>
      current.map((p) => {
        if (p.status === 'outage') return p; // Keep outage stable

        // Add small organic jitter: -8ms to +8ms
        const jitter = Math.floor(Math.random() * 17) - 8;
        const newLatency = Math.max(25, p.baseLatency + jitter);
        const newHistory = [...p.latencyHistory.slice(1), newLatency];

        // Random small TTFT and TPS shift
        const newTtft = Math.max(20, Math.round(newLatency * 0.82 + (Math.random() * 10 - 5)));
        const tpsShift = Math.floor(Math.random() * 5) - 2;
        const newTps = Math.max(10, p.tps + tpsShift);

        return {
          ...p,
          currentLatency: newLatency,
          ttft: newTtft,
          tps: newTps,
          latencyHistory: newHistory
        };
      })
    );
    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 300);
  };

  // Manual Refresh Now
  const handleManualRefresh = () => {
    updateLiveMetrics();
    setCountdown(Math.floor(refreshInterval / 1000) || 3);
  };

  // Interactive Incident Simulator (Delight feature)
  const handleSimulateIncident = (targetProviderId: string = 'openai') => {
    setProviders((current) =>
      current.map((p) => {
        if (p.id === targetProviderId) {
          const isCurrentlyOperational = p.status === 'operational';
          const newStatus = isCurrentlyOperational ? 'degraded' : 'operational';
          const newBase = isCurrentlyOperational ? p.baseLatency * 2.8 : p.baseLatency / 2.8;
          return {
            ...p,
            status: newStatus,
            baseLatency: Math.round(newBase),
            currentLatency: Math.round(newBase + 45),
            uptimePercentage: isCurrentlyOperational ? 98.42 : 99.95,
            latencyHistory: [...p.latencyHistory.slice(1), Math.round(newBase + 45)]
          };
        }
        return p;
      })
    );

    // Add or remove simulated incident notice
    const target = providers.find((p) => p.id === targetProviderId);
    if (target && target.status === 'operational') {
      const newInc: IncidentItem = {
        id: `inc-${Date.now()}`,
        providerId: target.id,
        providerName: target.name,
        title: `Simulated High Latency Spike & Queue Saturation on ${target.name}`,
        status: 'investigating',
        severity: 'major',
        timestamp: 'Just now',
        impactedServices: [`${target.name} API Endpoints`, 'Streaming Webhooks'],
        updates: [
          { time: 'Just now', message: 'Simulated alert triggered: p99 latency exceeded 1200ms.', status: 'Investigating' }
        ]
      };
      setIncidents((prev) => [newInc, ...prev]);
    } else {
      // Mark resolved
      setIncidents((prev) =>
        prev.map((inc) =>
          inc.providerId === targetProviderId
            ? { ...inc, status: 'resolved' as const }
            : inc
        )
      );
    }
  };

  // Restore All to 100% Operational
  const handleRestoreAll = () => {
    setProviders((current) =>
      current.map((p) => {
        const init = INITIAL_PROVIDERS.find((x) => x.id === p.id) || p;
        return {
          ...p,
          status: 'operational',
          baseLatency: init.baseLatency,
          currentLatency: init.baseLatency,
          uptimePercentage: init.uptimePercentage,
          latencyHistory: [...init.latencyHistory]
        };
      })
    );
    setIncidents((prev) =>
      prev.map((inc) => ({ ...inc, status: 'resolved' as const }))
    );
  };

  // Run Endpoint Live Probe Diagnostic Test
  const handleRunProbe = (provider: ProviderHealth) => {
    setSelectedProvider(provider);
    setIsProbeRunning(true);
    setProbeResult(null);

    // Realistic simulated trace sequence
    setTimeout(() => {
      const dns = Math.floor(Math.random() * 12) + 8; // 8 - 20ms
      const tcp = Math.floor(Math.random() * 18) + 14; // 14 - 32ms
      const tls = Math.floor(Math.random() * 32) + 24; // 24 - 56ms
      const ttft = provider.ttft + Math.floor(Math.random() * 20 - 10);
      const total = dns + tcp + tls + ttft;

      setProbeResult({
        status: 200,
        dnsTime: dns,
        tcpTime: tcp,
        tlsTime: tls,
        ttftTime: ttft,
        totalTime: total,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-cache, must-revalidate',
          'cf-ray': `${Math.random().toString(36).substring(2, 10)}-ORD`,
          'x-request-id': `req_${Math.random().toString(36).substring(2, 14)}`,
          'server': 'cloudflare-edge-mesh',
          'strict-transport-security': 'max-age=31536000; includeSubDomains'
        },
        timestamp: new Date().toLocaleTimeString()
      });
      setIsProbeRunning(false);
    }, 1400);
  };

  // Export JSON Report
  const handleExportJSON = () => {
    const reportData = {
      title: 'Nova AI - Real-time AI Health & Latency Telemetry Report',
      generatedAt: new Date().toISOString(),
      globalSummary: {
        totalProviders: providers.length,
        operationalCount: providers.filter((p) => p.status === 'operational').length,
        degradedCount: providers.filter((p) => p.status === 'degraded').length,
        outageCount: providers.filter((p) => p.status === 'outage').length,
        averageLatencyMs: Math.round(
          providers.reduce((acc, p) => acc + p.currentLatency, 0) / providers.length
        )
      },
      providers: providers.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        status: p.status,
        uptimePercentage: p.uptimePercentage,
        currentLatencyMs: p.currentLatency,
        ttftMs: p.ttft,
        tps: p.tps,
        p90LatencyMs: p.p90Latency,
        errorRate: `${p.errorRate}%`
      })),
      recentIncidents: incidents
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nova-ai-health-report-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy Summary to Clipboard
  const handleCopySummary = () => {
    const operationalCount = providers.filter((p) => p.status === 'operational').length;
    const avgLatency = Math.round(
      providers.reduce((acc, p) => acc + p.currentLatency, 0) / providers.length
    );
    const summary = `⚡ Nova AI - Live AI Health Status Report\n` +
      `📅 Date: ${new Date().toLocaleString()}\n` +
      `● Status: ${operationalCount}/${providers.length} Providers Fully Operational\n` +
      `● Global Mesh Mean Latency: ${avgLatency}ms\n` +
      `● Top Providers:\n` +
      providers.slice(0, 5).map((p) => `  - ${p.name}: ${p.status.toUpperCase()} (${p.currentLatency}ms, ${p.uptimePercentage}% uptime)`).join('\n');

    navigator.clipboard.writeText(summary);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  // Filtered & Sorted Providers
  const filteredProviders = useMemo(() => {
    return providers
      .filter((p) => {
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.models.some((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory =
          selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchesStatus =
          selectedStatus === 'all' || p.status.toLowerCase() === selectedStatus.toLowerCase();

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'latency') return a.currentLatency - b.currentLatency;
        if (sortBy === 'uptime') return b.uptimePercentage - a.uptimePercentage;
        return a.name.localeCompare(b.name);
      });
  }, [providers, searchQuery, selectedCategory, selectedStatus, sortBy]);

  // Global Aggregate Stats
  const globalStats = useMemo(() => {
    const total = providers.length;
    const operational = providers.filter((p) => p.status === 'operational').length;
    const degraded = providers.filter((p) => p.status === 'degraded').length;
    const outage = providers.filter((p) => p.status === 'outage').length;
    const avgLatency = Math.round(
      providers.reduce((acc, p) => acc + p.currentLatency, 0) / total
    );
    const avgUptime = (
      providers.reduce((acc, p) => acc + p.uptimePercentage, 0) / total
    ).toFixed(2);
    const activeIncidents = incidents.filter((i) => i.status !== 'resolved').length;

    return {
      total,
      operational,
      degraded,
      outage,
      avgLatency,
      avgUptime,
      activeIncidents,
      allOperational: operational === total
    };
  }, [providers, incidents]);

  // Mini SVG Sparkline Generator
  const renderSparkline = (data: number[], isDegraded: boolean = false) => {
    if (!data || data.length === 0) return null;
    const width = 120;
    const height = 32;
    const min = Math.min(...data) * 0.9;
    const max = Math.max(...data) * 1.1;
    const range = max - min || 1;

    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    const strokeColor = isDegraded ? '#F59E0B' : '#10B981';
    const fillColor = isDegraded ? 'rgba(245, 158, 11, 0.12)' : 'rgba(16, 185, 129, 0.12)';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polygon
          points={`0,${height} ${points} ${width},${height}`}
          fill={fillColor}
        />
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Breadcrumb & Status Bar */}
      <div className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                  Real-time AI Health Dashboard
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase font-mono tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Mesh
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Simulated live latency telemetry, 30-day uptime cards, and probe diagnostics across frontier AI providers
              </p>
            </div>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Auto Refresh Ticker */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/70 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[11px] font-mono">
                {refreshInterval > 0 ? (
                  <>
                    Next tick: <strong className="text-indigo-300">{countdown}s</strong>
                  </>
                ) : (
                  <span className="text-amber-400">Paused</span>
                )}
              </span>
              <button
                onClick={() => setRefreshInterval(prev => prev === 3000 ? 0 : 3000)}
                className="ml-1 p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white cursor-pointer"
                title={refreshInterval > 0 ? 'Pause Live Telemetry' : 'Resume Live Telemetry (3s)'}
              >
                {refreshInterval > 0 ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-400" />}
              </button>
            </div>

            {/* Manual Refresh Button */}
            <button
              onClick={handleManualRefresh}
              className={`p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isRefreshing ? 'opacity-70' : ''
              }`}
              title="Ping all endpoints now"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Ping Now</span>
            </button>

            {/* Simulate Degraded State / Restore */}
            {globalStats.allOperational ? (
              <button
                onClick={() => handleSimulateIncident('openai')}
                className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Simulate a real-time latency spike on OpenAI"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Simulate Spike</span>
              </button>
            ) : (
              <button
                onClick={handleRestoreAll}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Restore all providers to 100% operational status"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resolve All</span>
              </button>
            )}

            {/* Export & Copy buttons */}
            <button
              onClick={handleExportJSON}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium cursor-pointer"
              title="Export health data as JSON"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
            </button>
            <button
              onClick={handleCopySummary}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium cursor-pointer"
              title="Copy status summary to clipboard"
            >
              {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        {/* Global Operational Status Banner */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border transition-all relative overflow-hidden ${
            globalStats.allOperational
              ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-slate-900/90 border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.12)]'
              : 'bg-gradient-to-r from-amber-950/40 via-slate-900/80 to-slate-900/90 border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.12)]'
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  globalStats.allOperational
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
                }`}
              >
                {globalStats.allOperational ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <AlertTriangle className="w-6 h-6" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    {globalStats.allOperational
                      ? 'All Major AI Model APIs Operational'
                      : `${globalStats.degraded} Provider Experiencing Elevated Latency`}
                  </h2>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase ${
                      globalStats.allOperational
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {globalStats.allOperational ? 'HEALTHY' : 'ATTENTION'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Continual active health checks across {globalStats.total} providers and 48 frontier neural networks.
                  Last checked {lastUpdated.toLocaleTimeString()}.
                </p>
              </div>
            </div>

            {/* Key Telemetry Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full md:w-auto">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Active Uptime</span>
                <span className="text-sm sm:text-base font-black text-emerald-400 font-mono">
                  {globalStats.avgUptime}%
                </span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Mean Latency</span>
                <span className="text-sm sm:text-base font-black text-indigo-400 font-mono">
                  {globalStats.avgLatency} ms
                </span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Operational</span>
                <span className="text-sm sm:text-base font-black text-white font-mono">
                  {globalStats.operational} / {globalStats.total}
                </span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Active Alerts</span>
                <span
                  className={`text-sm sm:text-base font-black font-mono ${
                    globalStats.activeIncidents > 0 ? 'text-amber-400' : 'text-slate-400'
                  }`}
                >
                  {globalStats.activeIncidents}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Grid Cards / Regional Matrix / Incidents Timeline / Live Probe) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTab('grid')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'grid'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>System Uptime Cards ({providers.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Regional Latency Matrix</span>
            </button>
            <button
              onClick={() => setActiveTab('probe')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'probe'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Live Endpoint Probe</span>
            </button>
            <button
              onClick={() => setActiveTab('incidents')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'incidents'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Incident Log ({incidents.length})</span>
            </button>
          </div>

          {/* Search and Sort controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI provider, model..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="latency">Sort: Lowest Latency</option>
              <option value="uptime">Sort: Highest Uptime</option>
              <option value="name">Sort: Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filters bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3" /> Sector:
          </span>
          {['all', 'Frontier LLM', 'Fast Inference', 'Multimodal & Media', 'Search & Code'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Sectors' : cat}
            </button>
          ))}

          <div className="h-4 w-px bg-slate-800 shrink-0 mx-1" />

          <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider shrink-0">
            Status:
          </span>
          {['all', 'operational', 'degraded'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors shrink-0 capitalize cursor-pointer ${
                selectedStatus === st
                  ? 'bg-slate-800 text-white border border-slate-700 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* TAB 1: SYSTEM UPTIME CARDS & LIVE LATENCY (GRID VIEW) */}
        {activeTab === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProviders.map((provider) => {
              const isDegraded = provider.status === 'degraded';
              const isOutage = provider.status === 'outage';

              return (
                <div
                  key={provider.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between group ${
                    isDegraded
                      ? 'bg-amber-950/20 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                      : isOutage
                      ? 'bg-rose-950/20 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                      : 'bg-slate-900/70 hover:bg-slate-900/90 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {/* Card Header: Provider info + status badge */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border ${
                            isDegraded
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-slate-800 text-white border-slate-700'
                          }`}
                        >
                          {provider.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-sm text-white truncate">{provider.name}</h3>
                            <a
                              href={provider.apiDocs}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-500 hover:text-slate-300 transition-colors"
                              title="API Documentation"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <span className="text-[10px] text-slate-400 block truncate">{provider.category}</span>
                        </div>
                      </div>

                      {/* Operational Status Pill */}
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-tight uppercase flex items-center gap-1 shrink-0 ${
                          isDegraded
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : isOutage
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isDegraded ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
                          }`}
                        />
                        {provider.status}
                      </span>
                    </div>

                    {/* Latency & Metrics Row */}
                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 mb-3">
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-medium">Latency</span>
                        <div className="flex items-baseline gap-1">
                          <span
                            className={`text-sm font-black font-mono ${
                              isDegraded ? 'text-amber-400' : 'text-white'
                            }`}
                          >
                            {provider.currentLatency}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">ms</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-medium">TTFT</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-black font-mono text-indigo-300">
                            {provider.ttft}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">ms</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-medium">Speed</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-black font-mono text-teal-300">
                            {provider.tps}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">tps</span>
                        </div>
                      </div>
                    </div>

                    {/* Live Sparkline History */}
                    <div className="flex items-center justify-between gap-2 mb-3 bg-slate-950/30 p-2 rounded-xl border border-slate-800/40">
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium block">Live Sparkline (16 ticks)</span>
                        <span className="text-[9px] text-slate-500 font-mono">
                          p50: {provider.p50Latency}ms • p90: {provider.p90Latency}ms
                        </span>
                      </div>
                      <div className="shrink-0">{renderSparkline(provider.latencyHistory, isDegraded)}</div>
                    </div>

                    {/* Top Models breakdown */}
                    <div className="space-y-1 mb-3">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Monitored Models
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {provider.models.slice(0, 4).map((m) => (
                          <div
                            key={m.name}
                            className="flex items-center justify-between text-[10px] bg-slate-800/50 px-2 py-1 rounded-lg border border-slate-800"
                          >
                            <span className="text-slate-300 truncate max-w-[95px]">{m.name}</span>
                            <span className="font-mono text-emerald-400 font-bold shrink-0">{m.latency}ms</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 30-Day Uptime Bar */}
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400 font-medium">30-Day System Uptime</span>
                        <span className="text-emerald-400 font-mono font-bold">{provider.uptimePercentage}%</span>
                      </div>
                      <div className="flex items-center gap-0.5 w-full h-4 bg-slate-950 rounded-lg p-0.5 border border-slate-800/80">
                        {provider.uptimeDays.map((u, i) => (
                          <div
                            key={i}
                            className={`flex-1 h-full rounded-xs transition-transform hover:scale-125 cursor-pointer ${
                              u.status === 'operational'
                                ? 'bg-emerald-500/80 hover:bg-emerald-400'
                                : u.status === 'degraded'
                                ? 'bg-amber-500 hover:bg-amber-400'
                                : 'bg-rose-500 hover:bg-rose-400'
                            }`}
                            title={`${u.date}: ${u.uptime}% uptime (${u.status})`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                    <button
                      onClick={() => handleRunProbe(provider)}
                      className="px-2.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Terminal className="w-3 h-3" />
                      <span>Ping Probe</span>
                    </button>

                    <button
                      onClick={() => handleSimulateIncident(provider.id)}
                      className={`text-[10px] px-2 py-1 rounded-lg border transition-colors cursor-pointer ${
                        isDegraded
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                          : 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
                      }`}
                    >
                      {isDegraded ? 'Resolve' : 'Simulate Spike'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: REGIONAL LATENCY MATRIX */}
        {activeTab === 'matrix' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  Regional Edge Latency & Multi-Cloud Mesh
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time round-trip latency measured from global edge endpoints to AI cluster datacenters
                </p>
              </div>
              <button
                onClick={handleManualRefresh}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Re-measure All</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                    <th className="py-3 px-4">Provider</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">US-East (Virginia)</th>
                    <th className="py-3 px-3">US-West (Oregon)</th>
                    <th className="py-3 px-3">EU-Central (Frankfurt)</th>
                    <th className="py-3 px-3">AP-East (Singapore/Tokyo)</th>
                    <th className="py-3 px-3">Global Mean</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                  {filteredProviders.map((p) => {
                    const usEast = p.regions.find((r) => r.region.includes('US-East'))?.latency || p.currentLatency - 25;
                    const usWest = p.regions.find((r) => r.region.includes('US-West'))?.latency || p.currentLatency;
                    const eu = p.regions.find((r) => r.region.includes('EU'))?.latency || p.currentLatency + 40;
                    const ap = p.regions.find((r) => r.region.includes('AP') || r.region.includes('Asia'))?.latency || p.currentLatency + 90;

                    return (
                      <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-sans font-bold text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          {p.name}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                              p.status === 'operational'
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-emerald-400 font-bold">{usEast} ms</td>
                        <td className="py-3 px-3 text-emerald-400 font-bold">{usWest} ms</td>
                        <td className="py-3 px-3 text-teal-400 font-bold">{eu} ms</td>
                        <td className="py-3 px-3 text-indigo-400 font-bold">{ap} ms</td>
                        <td className="py-3 px-3 text-white font-bold bg-slate-800/30">
                          {p.currentLatency} ms
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE ENDPOINT PROBE & DIAGNOSTIC TESTER */}
        {activeTab === 'probe' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  Live API Endpoint Network Diagnostic Probe
                </h3>
                <p className="text-xs text-slate-400">
                  Executes actual simulated DNS, TLS handshake, TTFB, and payload ping against selected frontier API gateway.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedProvider.id}
                  onChange={(e) => {
                    const found = providers.find((p) => p.id === e.target.value);
                    if (found) setSelectedProvider(found);
                  }}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {providers.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.currentLatency}ms)
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleRunProbe(selectedProvider)}
                  disabled={isProbeRunning}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
                >
                  {isProbeRunning ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Probing...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Run Diagnostic</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Probe Visualization Stages */}
            {isProbeRunning ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mx-auto" />
                <p className="text-sm font-mono text-indigo-300 animate-pulse">
                  Tracing network route to {selectedProvider.name} API Gateway...
                </p>
                <p className="text-xs text-slate-500">Resolving DNS • TLS 1.3 Handshake • HTTP/2 Stream Connect</p>
              </div>
            ) : probeResult ? (
              <div className="space-y-4">
                {/* Result High-Level Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">HTTP Status</span>
                    <span className="text-base font-black text-emerald-400 font-mono">
                      {probeResult.status} OK
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">DNS Lookup</span>
                    <span className="text-base font-black text-white font-mono">{probeResult.dnsTime} ms</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">TCP + TLS 1.3</span>
                    <span className="text-base font-black text-indigo-400 font-mono">
                      {probeResult.tcpTime + probeResult.tlsTime} ms
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">TTFT / TTFB</span>
                    <span className="text-base font-black text-teal-400 font-mono">{probeResult.ttftTime} ms</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Total Roundtrip</span>
                    <span className="text-base font-black text-emerald-400 font-mono">
                      {probeResult.totalTime} ms
                    </span>
                  </div>
                </div>

                {/* Waterfall Stage Visualization */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-white block">Connection Latency Waterfall</span>
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-24 text-slate-400 text-[11px]">DNS Resolve</span>
                      <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-400 h-full rounded-full"
                          style={{ width: `${(probeResult.dnsTime / probeResult.totalTime) * 100}%` }}
                        />
                      </div>
                      <span className="w-14 text-right text-slate-300">{probeResult.dnsTime}ms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-24 text-slate-400 text-[11px]">TCP Connect</span>
                      <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-400 h-full rounded-full"
                          style={{ width: `${(probeResult.tcpTime / probeResult.totalTime) * 100}%` }}
                        />
                      </div>
                      <span className="w-14 text-right text-slate-300">{probeResult.tcpTime}ms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-24 text-slate-400 text-[11px]">TLS Handshake</span>
                      <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-purple-400 h-full rounded-full"
                          style={{ width: `${(probeResult.tlsTime / probeResult.totalTime) * 100}%` }}
                        />
                      </div>
                      <span className="w-14 text-right text-slate-300">{probeResult.tlsTime}ms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-24 text-slate-400 text-[11px]">TTFT First Byte</span>
                      <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full"
                          style={{ width: `${(probeResult.ttftTime / probeResult.totalTime) * 100}%` }}
                        />
                      </div>
                      <span className="w-14 text-right text-slate-300">{probeResult.ttftTime}ms</span>
                    </div>
                  </div>
                </div>

                {/* Response Headers */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-300 block mb-2 font-mono">
                    HTTP/2 Response Headers
                  </span>
                  <div className="bg-slate-900/90 p-3 rounded-lg font-mono text-[11px] text-slate-400 space-y-1 overflow-x-auto">
                    {Object.entries(probeResult.headers).map(([key, val]) => (
                      <div key={key} className="flex gap-2">
                        <span className="text-indigo-400 select-all">{key}:</span>
                        <span className="text-slate-200 select-all">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center space-y-2">
                <Terminal className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm text-slate-400">
                  Select a provider above and click <strong>"Run Diagnostic"</strong> to measure full network hop latency.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: INCIDENT NOTICEBOARD & HISTORICAL LOG */}
        {activeTab === 'incidents' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                  System Incident History & Post-Mortem Log
                </h3>
                <p className="text-xs text-slate-400">
                  Public records of API degradations, maintenance windows, and resolution timelines.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-xs font-mono font-bold text-slate-300 border border-slate-700">
                {incidents.length} Recorded
              </span>
            </div>

            <div className="space-y-4">
              {incidents.map((incident) => (
                <div
                  key={incident.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-indigo-400 font-mono">
                          [{incident.providerName}]
                        </span>
                        <h4 className="text-sm font-bold text-white">{incident.title}</h4>
                      </div>
                      <span className="text-[11px] text-slate-500">{incident.timestamp}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          incident.status === 'resolved'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
                        }`}
                      >
                        {incident.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
                        {incident.severity}
                      </span>
                    </div>
                  </div>

                  {/* Impacted services tags */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-slate-500 font-semibold">Impacted:</span>
                    {incident.impactedServices.map((svc) => (
                      <span
                        key={svc}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>

                  {/* Timeline updates */}
                  <div className="space-y-2 border-l-2 border-slate-800 pl-3 pt-1">
                    {incident.updates.map((upd, idx) => (
                      <div key={idx} className="text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-mono text-[10px]">{upd.time}</span>
                          <span className="text-[10px] font-bold text-indigo-300 uppercase">
                            [{upd.status}]
                          </span>
                        </div>
                        <p className="text-slate-300 text-xs mt-0.5">{upd.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Mesh Telemetry Footer */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2 font-mono">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Telemetry Pulse: 3,000ms Synthetic Synthetic Heartbeat Protocol</span>
          </div>
          <p>© 2026 Nova AI Health Mesh • Live Frontier AI API Reliability Telemetry</p>
        </div>
      </div>
    </div>
  );
};
