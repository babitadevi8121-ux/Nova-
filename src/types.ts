export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
  trialStartDate?: string;
  subscriptionTier: 'Free' | 'Pro' | 'Premium' | 'Ultra Premium' | 'Super AI';
  role: 'User' | 'Admin';
  isUnlimited?: boolean;
  isStudent?: boolean;
  studentVerified?: boolean;
}

export function isStudentUser(user: User | null | undefined): boolean {
  if (typeof window !== 'undefined' && localStorage.getItem('nova_student_pass') === 'active') {
    return true;
  }
  if (!user) return false;
  if (user.isStudent || user.studentVerified) return true;
  if (user.email && (user.email.includes('.edu') || user.email.includes('.ac.') || user.email.toLowerCase().includes('student'))) {
    return true;
  }
  return false;
}

export function getTrialInfo(user: User | null | undefined): {
  isStudent: boolean;
  isPaid: boolean;
  isTrialActive: boolean;
  daysRemaining: number;
  hoursRemaining: number;
  isExpired: boolean;
} {
  const isStudent = isStudentUser(user);
  if (isStudent) {
    return {
      isStudent: true,
      isPaid: false,
      isTrialActive: true,
      daysRemaining: 9999,
      hoursRemaining: 9999,
      isExpired: false
    };
  }

  const isPaid = Boolean(
    user && (user.role === 'Admin' || user.isUnlimited || user.subscriptionTier === 'Ultra Premium' || user.subscriptionTier === 'Super AI' || user.subscriptionTier === 'Premium' || user.subscriptionTier === 'Pro')
  );

  if (isPaid) {
    return {
      isStudent: false,
      isPaid: true,
      isTrialActive: true,
      daysRemaining: 9999,
      hoursRemaining: 9999,
      isExpired: false
    };
  }

  // Calculate 5-Day Free Trial after logging in / account creation
  let startMs = Date.now();
  if (user) {
    const key = `nova_trial_start_${user.id}`;
    let savedStart = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    if (!savedStart) {
      savedStart = user.trialStartDate || user.createdAt || new Date().toISOString();
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, savedStart);
      }
    }
    const parsed = new Date(savedStart).getTime();
    if (!isNaN(parsed)) {
      startMs = parsed;
    }
  } else {
    // Guest gets active 5-day demo trial
    const guestKey = 'nova_guest_trial_start';
    let guestStart = typeof window !== 'undefined' ? localStorage.getItem(guestKey) : null;
    if (!guestStart) {
      guestStart = new Date().toISOString();
      if (typeof window !== 'undefined') {
        localStorage.setItem(guestKey, guestStart);
      }
    }
    const parsed = new Date(guestStart).getTime();
    if (!isNaN(parsed)) startMs = parsed;
  }

  const TRIAL_DURATION_MS = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
  const elapsedMs = Date.now() - startMs;
  const remainingMs = Math.max(0, TRIAL_DURATION_MS - elapsedMs);
  const daysRemaining = parseFloat((remainingMs / (1000 * 60 * 60 * 24)).toFixed(1));
  const hoursRemaining = Math.ceil(remainingMs / (1000 * 60 * 60));
  const isExpired = remainingMs <= 0;

  return {
    isStudent: false,
    isPaid: false,
    isTrialActive: !isExpired,
    daysRemaining,
    hoursRemaining,
    isExpired
  };
}

export function isUltraHighPremium(user: User | null | undefined): boolean {
  if (isStudentUser(user)) return true; // Students get 100% free unlimited access
  if (user?.role === 'Admin' || user?.isUnlimited) return true;
  if (user?.subscriptionTier === 'Ultra Premium' || user?.subscriptionTier === 'Super AI' || user?.subscriptionTier === 'Premium') return true;
  
  // 5-day trial check
  const info = getTrialInfo(user);
  return info.isTrialActive;
}

export interface StudentPass {
  id: string;
  code: string; // e.g. STU-NOVA-2026-X812
  studentName?: string;
  studentEmail?: string;
  institution?: string; // e.g. "Delhi University / MIT / High School"
  issuedBy: string; // admin user name / ID
  createdAt: string;
  expiresAt: string; // e.g. "Lifetime" or ISO string
  status: 'active' | 'redeemed' | 'revoked';
  redeemedBy?: {
    userId: string;
    userName: string;
    userEmail: string;
    redeemedAt: string;
  };
  notes?: string;
  passType: 'Full AI Access' | 'Scholarship' | 'Research Fellowship' | 'Educator Grant';
  qrCodeData?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Chat {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  model: string;
  messages: Message[];
  isPinned?: boolean;
  isShared?: boolean;
  shareId?: string;
  sharedAt?: string;
  youtubeVideoUrl?: string;
}

export interface SharedChat {
  shareId: string;
  chatId: string;
  title: string;
  model: string;
  createdAt: string;
  sharedAt: string;
  authorName: string;
  messages: Message[];
  viewsCount?: number;
  youtubeVideoUrl?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  imageUrls?: string[];
  attachments?: Attachment[];
  groundingUrls?: Array<{ uri: string; title: string }>;
  isStreaming?: boolean;
  ragCitations?: Array<{ title: string; category: string; score: number }>;
}

export interface Attachment {
  name: string;
  type: string;
  size: string;
  content?: string; // Content of text files
}

export interface SystemNotification {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
  isRead: boolean;
}

export interface UsageAnalytics {
  userId: string;
  userEmail: string;
  chatsCount: number;
  messagesCount: number;
  imagesGenerated: number;
  tokensUsed: number;
}

export interface SystemStats {
  totalUsers: number;
  totalChats: number;
  totalMessages: number;
  totalImagesGenerated: number;
  revenue: number;
  usersByTier: {
    Free: number;
    Pro: number;
    Premium: number;
    'Ultra Premium': number;
    'Super AI': number;
  };
  monthlySignups: Array<{ month: string; count: number }>;
  recentLogs: Array<{ id: string; timestamp: string; level: 'info' | 'warn' | 'error'; message: string }>;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'paypal' | 'crypto' | 'bank';
  isDefault: boolean;
  card?: {
    brand: string;
    last4: string;
    expMonth: string;
    expYear: string;
    holderName: string;
  };
  upi?: {
    vpa: string;
    provider: string;
  };
  paypal?: {
    email: string;
  };
  crypto?: {
    network: string;
    address: string;
  };
  createdAt: string;
}

export interface BillingInvoice {
  id: string;
  invoiceNumber: string;
  userId: string;
  userEmail: string;
  userName: string;
  tier: 'Pro' | 'Premium' | 'Ultra Premium';
  billingCycle: 'monthly' | 'annual';
  amount: number;
  currency: 'USD' | 'INR' | 'EUR' | 'GBP';
  taxAmount: number;
  totalAmount: number;
  status: 'paid' | 'pending' | 'failed';
  paymentMethod: string;
  paymentRef: string;
  paidAt: string;
  validUntil: string;
  items: Array<{
    description: string;
    amount: number;
  }>;
}

export interface BookChapter {
  id: string;
  title: string;
  content: string;
  summary?: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string; // "Science", "Mathematics", "Literature", "Philosophy", "Medicine", "Law", "Business", "Programming", "AI"
  language: string; // "English", "Spanish", "French", "German", "Japanese", "Chinese"
  gradeLevel: string; // "Grade 1-5", "Middle School", "High School", "College", "Professional"
  difficulty: string; // "Beginner", "Intermediate", "Advanced"
  isUserUploaded?: boolean;
  isPublicDomain?: boolean;
  downloadUrl?: string;
  chapters: BookChapter[];
  authorSourceUrl?: string; // Authorized link for copyrighted references or biography
}

export interface BookAnnotation {
  id: string;
  bookId: string;
  chapterId: string;
  text: string; // Selected text
  comment?: string; // Sticky note comment
  color: string; // "yellow" | "green" | "pink" | "blue"
  type: 'highlight' | 'note';
  createdAt: string;
}

export interface BookBookmark {
  id: string;
  bookId: string;
  chapterId: string;
  createdAt: string;
}

export interface StudyFlashcard {
  id: string;
  front: string;
  back: string;
}

export interface StudyQuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface StudyQuiz {
  id: string;
  bookId: string;
  chapterId: string;
  questions: StudyQuizQuestion[];
}

export interface LearningPathMilestone {
  id: string;
  title: string;
  description: string;
  bookId?: string;
  chapterId?: string;
  isCompleted: boolean;
}

export interface UserLearningPath {
  id: string;
  goal: string;
  gradeLevel: string;
  difficulty: string;
  milestones: LearningPathMilestone[];
  createdAt: string;
}

export interface Notebook {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
}

export interface NotebookSource {
  id: string;
  notebookId: string;
  name: string;
  content: string;
  type: 'text' | 'file' | 'url';
  wordCount: number;
  createdAt: string;
}

export interface NotebookNote {
  id: string;
  notebookId: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface NotebookChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  citations?: Array<{ sourceName: string; quote: string }>;
}

export interface CursorFile {
  path: string;
  content: string;
  language: string;
}

export interface CursorWorkspace {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  files: CursorFile[];
}

export interface CursorChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  selectedFile?: string;
  selectedCode?: string;
  createdAt: string;
}

// ----------------------------------------------------
// GAMMA.AI INTERFACES
// ----------------------------------------------------
export type GammaTheme = 'charcoal' | 'elegance' | 'ocean' | 'emerald';
export type GammaType = 'presentation' | 'document' | 'webpage';

export interface GammaCard {
  id: string;
  title: string;
  icon: string;
  content: string;
  bulletPoints?: string[];
  stats?: Array<{ value: string; label: string }>;
  columns?: Array<{ title: string; content: string }>;
}

export interface GammaWorkspace {
  id: string;
  userId: string;
  name: string;
  type: GammaType;
  theme: GammaTheme;
  outline: string[];
  cards: GammaCard[];
  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------
// PERPLEXITY.AI INTERFACES
// ----------------------------------------------------
export type PerplexityFocusMode = 'all' | 'academic' | 'writing' | 'youtube' | 'reddit' | 'wolfram';

export interface PerplexitySource {
  id: string;
  title: string;
  url: string;
  domain: string;
  snippet?: string;
}

export interface PerplexitySearchStep {
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface PerplexityThread {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  queries: PerplexityQuery[];
}

export interface PerplexityQuery {
  id: string;
  question: string;
  focusMode: PerplexityFocusMode;
  proMode: boolean;
  searchSteps: PerplexitySearchStep[];
  sources: PerplexitySource[];
  answer: string;
  relatedQuestions: string[];
  createdAt: string;
}

// ----------------------------------------------------
// OPENAI.AI / CHATGPT INTERFACES
// ----------------------------------------------------
export type OpenAIModel = 'chatgpt-6-astra' | 'gpt-4o' | 'o1-pro' | 'o3-mini' | 'gpt-4-turbo';

export interface OpenAIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
  // Canvas metadata if user edits or assistant writes code in canvas
  canvasCode?: string;
  canvasLanguage?: string;
  thoughtProcess?: string; // o1/o3 reasoning thought blocks
}

export interface OpenAIChat {
  id: string;
  userId: string;
  title: string;
  model: OpenAIModel;
  messages: OpenAIMessage[];
  selectedGptId?: string; // Optional custom GPT like Tech Support, DALL-E, etc.
  createdAt: string;
  updatedAt: string;
}

export interface CustomGPT {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name or emoji
  greeting: string;
  systemPrompt: string;
}

// ----------------------------------------------------
// GROK.AI / GORK.AI INTERFACES
// ----------------------------------------------------
export type GrokModel = 'Grok-2' | 'Grok-3' | 'Grok-3-DeepSearch' | 'Grok-3-Fun';

export interface GrokMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
  thoughtProcess?: string;
  simulatedXStreamLogs?: { handle: string; text: string; timestamp: string }[];
}

export interface GrokChat {
  id: string;
  userId: string;
  title: string;
  model: GrokModel;
  funMode: boolean;
  messages: GrokMessage[];
  createdAt: string;
  updatedAt: string;
}// ----------------------------------------------------
// GALLERY & PDF ITEM INTERFACES
// ----------------------------------------------------
export type GalleryItemType = 'pdf' | 'invoice_pdf' | 'image' | 'chat_pdf' | 'report_pdf';

export interface GalleryItem {
  id: string;
  userId: string;
  title: string;
  type: GalleryItemType;
  fileSize?: string;
  createdAt: string;
  thumbnailUrl?: string;
  dataUrl?: string; // base64 or blob URL
  metadata?: {
    author?: string;
    invoiceNumber?: string;
    amount?: number;
    currency?: string;
    tier?: string;
    prompt?: string;
    pageCount?: number;
    description?: string;
  };
}

// ----------------------------------------------------
// CLAUDE.AI INTERFACES
// ----------------------------------------------------
export type ClaudeModel = 'claude-3-7-sonnet' | 'claude-3-5-sonnet' | 'claude-3-opus' | 'claude-3-haiku';

export interface ClaudeArtifact {
  id: string;
  type: 'code' | 'html' | 'react' | 'svg' | 'markdown';
  title: string;
  language?: string;
  content: string;
}

export interface ClaudeMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  thinkingProcess?: string;
  artifact?: ClaudeArtifact;
}

export interface ClaudeChat {
  id: string;
  title: string;
  model: ClaudeModel;
  messages: ClaudeMessage[];
  systemPrompt?: string;
  thinkingBudget?: number;
  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------
// NANOBANANA.AI IMAGE INTERFACES
// ----------------------------------------------------
export interface NanoBananaImage {
  id: string;
  prompt: string;
  negativePrompt?: string;
  style: string;
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | '21:9';
  lighting: string;
  seed: number;
  imageUrl: string;
  createdAt: string;
  likes: number;
}

// ----------------------------------------------------
// HIGHSFIELD.AI VIDEO INTERFACES
// ----------------------------------------------------
export interface HighsfieldVideo {
  id: string;
  prompt: string;
  cameraMotion: 'Pan Left' | 'Pan Right' | 'Tilt Up' | 'Tilt Down' | 'Zoom In' | 'Zoom Out' | 'Orbital Orbit' | 'Tracking FPV';
  fps: 24 | 30 | 60;
  duration: 5 | 10 | 15;
  resolution: '720p' | '1080p' | '4K';
  motionIntensity: number; // 1 to 10
  style: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: string;
  seed: number;
}

// ----------------------------------------------------
// FIGMA.AI DESIGN INTERFACES
// ----------------------------------------------------
export interface FigmaComponent {
  id: string;
  name: string;
  category: 'Navbar' | 'Hero' | 'Card' | 'Form' | 'Button' | 'Footer' | 'Modal' | 'Stats';
  jsxCode: string;
  previewSvg?: string;
}

export interface FigmaProject {
  id: string;
  name: string;
  platform: 'mobile' | 'tablet' | 'desktop';
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  components: FigmaComponent[];
  createdAt: string;
}

// ----------------------------------------------------
// HEYGEN.AI AVATAR VIDEO INTERFACES
// ----------------------------------------------------
export interface HeyGenAvatar {
  id: string;
  name: string;
  role: string;
  gender: 'female' | 'male';
  avatarUrl: string;
  previewVideoUrl: string;
  style: 'Studio 4K' | 'Casual' | 'Executive' | 'Newsroom';
}

export interface HeyGenProject {
  id: string;
  title: string;
  avatarId: string;
  voice: string;
  language: string;
  script: string;
  backdrop: 'modern-office' | 'cyberpunk-lab' | 'clean-studio' | 'neon-gradient' | 'green-screen';
  status: 'draft' | 'rendering' | 'ready';
  outputVideoUrl?: string;
  createdAt: string;
}
