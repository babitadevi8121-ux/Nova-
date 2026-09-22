import fs from 'fs';
import path from 'path';
import { 
  User, Chat, Message, SystemNotification, SystemStats, UsageAnalytics,
  LibraryBook, BookAnnotation, BookBookmark, UserLearningPath, SharedChat,
  PaymentMethod, BillingInvoice, StudentPass 
} from './src/types';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Interface for DB Structure
interface DatabaseSchema {
  users: Record<string, User & { passwordHash: string }>;
  chats: Record<string, Chat>;
  shares?: Record<string, SharedChat>;
  notifications: Record<string, SystemNotification[]>; // Key is userId
  systemLogs: Array<{ id: string; timestamp: string; level: 'info' | 'warn' | 'error'; message: string }>;
  analytics: Record<string, UsageAnalytics>;
  
  // Billing & Account Payments Collections
  invoices?: Record<string, BillingInvoice[]>;
  paymentMethods?: Record<string, PaymentMethod[]>;

  // Digital Library Support Collections
  userBooks?: Record<string, LibraryBook[]>;
  annotations?: Record<string, BookAnnotation[]>;
  bookmarks?: Record<string, BookBookmark[]>;
  learningPaths?: Record<string, UserLearningPath[]>;

  // Student Free Access Passes
  studentPasses?: Record<string, StudentPass>;
}

// Ensure database directory and file exist
function initDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  let dbExists = fs.existsSync(DB_FILE);
  if (!dbExists) {
    const defaultDb: DatabaseSchema = {
      users: {
        'admin-id': {
          id: 'admin-id',
          email: 'admin@nova.ai',
          name: 'Nova Administrator',
          passwordHash: 'admin123', // Simple plain hash for demo ease, or simple string match
          role: 'Admin',
          subscriptionTier: 'Premium',
          isUnlimited: false,
          createdAt: new Date().toISOString()
        },
        'demo-id': {
          id: 'demo-id',
          email: 'demo@nova.ai',
          name: 'Demo User',
          passwordHash: 'demo123',
          role: 'User',
          subscriptionTier: 'Pro',
          isUnlimited: false,
          createdAt: new Date().toISOString()
        }
      },
      chats: {
        'welcome-chat': {
          id: 'welcome-chat',
          userId: 'demo-id',
          title: 'Welcome to Nova AI',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          model: 'gemini-3.8-flash',
          messages: [
            {
              id: 'm1',
              role: 'user',
              content: 'What is Nova AI?',
              createdAt: new Date().toISOString()
            },
            {
              id: 'm2',
              role: 'assistant',
              content: 'Welcome! **Nova AI** is a cutting-edge, glassmorphic artificial intelligence assistant. I can help you with language translation, advanced code generation with syntax highlighting, complex reasoning, and image generation. Feel free to ask me anything or upload text/image files to get started!',
              createdAt: new Date().toISOString()
            }
          ]
        }
      },
      notifications: {
        'demo-id': [
          {
            id: 'n1',
            title: 'Welcome to Nova Pro',
            content: 'Your account has been successfully upgraded to the Pro tier. Enjoy unlimited high-speed generations and code suggestions!',
            type: 'success',
            createdAt: new Date().toISOString(),
            isRead: false
          }
        ],
        'admin-id': [
          {
            id: 'n2',
            title: 'System Operational',
            content: 'All API nodes are functioning at 100% capacity.',
            type: 'info',
            createdAt: new Date().toISOString(),
            isRead: false
          }
        ]
      },
      systemLogs: [
        {
          id: 'l1',
          timestamp: new Date().toISOString(),
          level: 'info',
          message: 'Database initialized successfully.'
        },
        {
          id: 'l2',
          timestamp: new Date().toISOString(),
          level: 'info',
          message: 'Admin and Demo accounts seeded.'
        }
      ],
      analytics: {
        'demo-id': {
          userId: 'demo-id',
          userEmail: 'demo@nova.ai',
          chatsCount: 1,
          messagesCount: 2,
          imagesGenerated: 4,
          tokensUsed: 1540
        }
      }
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2), 'utf-8');
  }
}

initDb();

export class ServerDb {
  private static read(): DatabaseSchema {
    initDb();
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  }

  private static write(data: DatabaseSchema) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }

  // LOGS
  static addLog(level: 'info' | 'warn' | 'error', message: string) {
    const db = this.read();
    db.systemLogs.unshift({
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      level,
      message
    });
    // Keep last 100 logs
    if (db.systemLogs.length > 100) {
      db.systemLogs = db.systemLogs.slice(0, 100);
    }
    this.write(db);
  }

  // USERS
  static findUserByEmail(email: string) {
    const db = this.read();
    return Object.values(db.users).find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  static findUserById(id: string) {
    const db = this.read();
    return db.users[id];
  }

  static createUser(email: string, name: string, passwordHash: string, phone?: string): User {
    const db = this.read();
    const id = 'user-' + Math.random().toString(36).substring(2, 11);
    const newUser: User = {
      id,
      email,
      name,
      phone,
      role: 'User',
      subscriptionTier: 'Free',
      isUnlimited: false,
      createdAt: new Date().toISOString()
    };
    
    db.users[id] = {
      ...newUser,
      passwordHash
    };

    // Initialize analytics & notifications
    db.analytics[id] = {
      userId: id,
      userEmail: email,
      chatsCount: 0,
      messagesCount: 0,
      imagesGenerated: 0,
      tokensUsed: 0
    };

    db.notifications[id] = [
      {
        id: 'welcome-' + id,
        title: 'Welcome to Nova AI!',
        content: 'Your account is active. Explore our modern chat workspace, image generators, and text-to-speech tools.',
        type: 'info',
        createdAt: new Date().toISOString(),
        isRead: false
      }
    ];

    this.write(db);
    this.addLog('info', `New user registered: ${email} (${id})`);
    return newUser;
  }

  static syncFirebaseUser(uid: string, email: string, name: string, phone?: string, password?: string): User {
    const db = this.read();
    
    let existingUser = db.users[uid];
    if (!existingUser) {
      existingUser = Object.values(db.users).find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    if (existingUser) {
      if (phone) {
        existingUser.phone = phone;
      }
      if (password) {
        existingUser.passwordHash = password;
      }
      if (existingUser.id === uid) {
        this.write(db);
        return {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          phone: existingUser.phone,
          role: existingUser.role,
          subscriptionTier: existingUser.subscriptionTier,
          isUnlimited: existingUser.isUnlimited,
          createdAt: existingUser.createdAt
        };
      }
      
      const oldId = existingUser.id;
      existingUser.id = uid;
      if (password) {
        existingUser.passwordHash = password;
      }
      db.users[uid] = existingUser;
      delete db.users[oldId];
      
      if (db.analytics[oldId]) {
        db.analytics[uid] = { ...db.analytics[oldId], userId: uid };
        delete db.analytics[oldId];
      }
      if (db.notifications[oldId]) {
        db.notifications[uid] = db.notifications[oldId];
        delete db.notifications[oldId];
      }
      Object.keys(db.chats).forEach(chatId => {
        if (db.chats[chatId].userId === oldId) {
          db.chats[chatId].userId = uid;
        }
      });
      
      this.write(db);
      this.addLog('info', `Firebase user synced with existing account: ${email} (${uid})`);
      return {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        phone: existingUser.phone,
        role: existingUser.role,
        subscriptionTier: existingUser.subscriptionTier,
        isUnlimited: existingUser.isUnlimited,
        createdAt: existingUser.createdAt
      };
    }

    const newUser: User = {
      id: uid,
      email,
      name,
      phone,
      role: 'User',
      subscriptionTier: 'Free',
      isUnlimited: false,
      createdAt: new Date().toISOString()
    };

    db.users[uid] = {
      ...newUser,
      passwordHash: password || 'firebase-auth'
    };

    db.analytics[uid] = {
      userId: uid,
      userEmail: email,
      chatsCount: 0,
      messagesCount: 0,
      imagesGenerated: 0,
      tokensUsed: 0
    };

    db.notifications[uid] = [
      {
        id: 'welcome-' + uid,
        title: 'Welcome to Nova AI via Firebase!',
        content: 'Your account is active and secured by Firebase Authentication. Enjoy modern AI generation and analytics!',
        type: 'info',
        createdAt: new Date().toISOString(),
        isRead: false
      }
    ];

    this.write(db);
    this.addLog('info', `New Firebase user registered and synced: ${email} (${uid})`);
    return newUser;
  }

  static updateUserTier(userId: string, tier: 'Free' | 'Pro' | 'Premium' | 'Ultra Premium' | 'Super AI') {
    const db = this.read();
    if (db.users[userId]) {
      db.users[userId].subscriptionTier = tier;
      db.users[userId].isUnlimited = tier === 'Ultra Premium' || tier === 'Super AI';
      this.write(db);
      this.addLog('info', `User ${db.users[userId].email} upgraded to ${tier}`);
      
      // Notify user
      if (!db.notifications[userId]) db.notifications[userId] = [];
      db.notifications[userId].unshift({
        id: 'tier-up-' + Math.random().toString(36).substring(7),
        title: `Subscription Active: Nova ${tier}`,
        content: `Your subscription tier has been set to ${tier}. Enjoy your new privileges!`,
        type: 'success',
        createdAt: new Date().toISOString(),
        isRead: false
      });
      this.write(db);
      return db.users[userId];
    }
    return null;
  }

  static updateProfile(userId: string, name: string, email: string, phone?: string) {
    const db = this.read();
    if (db.users[userId]) {
      db.users[userId].name = name;
      db.users[userId].email = email;
      if (phone !== undefined) {
        db.users[userId].phone = phone;
      }
      this.write(db);
      this.addLog('info', `User ${userId} updated profile to Name: ${name}, Email: ${email}, Phone: ${phone || 'none'}`);
      return db.users[userId];
    }
    return null;
  }

  static updateRole(userId: string, role: 'User' | 'Admin') {
    const db = this.read();
    if (db.users[userId]) {
      db.users[userId].role = role;
      this.write(db);
      this.addLog('info', `User ${db.users[userId].email} role updated to ${role}`);
      return db.users[userId];
    }
    return null;
  }

  static getUsers(): User[] {
    const db = this.read();
    return Object.values(db.users).map(({ passwordHash, ...user }) => user);
  }

  // CHATS
  static getChatsByUser(userId: string): Chat[] {
    const db = this.read();
    return Object.values(db.chats)
      .filter(chat => chat.userId === userId)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  static createChat(userId: string, title: string, model: string): Chat {
    const db = this.read();
    const id = 'chat-' + Math.random().toString(36).substring(2, 11);
    const newChat: Chat = {
      id,
      userId,
      title: title || 'New Conversation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      model,
      messages: []
    };
    db.chats[id] = newChat;

    // Increment analytics
    if (db.analytics[userId]) {
      db.analytics[userId].chatsCount++;
    }

    this.write(db);
    return newChat;
  }

  static getChat(chatId: string): Chat | null {
    const db = this.read();
    return db.chats[chatId] || null;
  }

  static renameChat(chatId: string, title: string): Chat | null {
    const db = this.read();
    if (db.chats[chatId]) {
      db.chats[chatId].title = title;
      db.chats[chatId].updatedAt = new Date().toISOString();
      this.write(db);
      return db.chats[chatId];
    }
    return null;
  }

  static deleteChat(chatId: string): boolean {
    const db = this.read();
    if (db.chats[chatId]) {
      delete db.chats[chatId];
      this.write(db);
      return true;
    }
    return false;
  }

  static saveMessage(chatId: string, message: Message): Chat | null {
    const db = this.read();
    if (db.chats[chatId]) {
      db.chats[chatId].messages.push(message);
      db.chats[chatId].updatedAt = new Date().toISOString();
      
      const userId = db.chats[chatId].userId;
      if (db.analytics[userId]) {
        db.analytics[userId].messagesCount++;
        // Approximate token count based on characters (e.g. 1 word ~ 1.3 tokens, 1 char ~ 0.3 tokens)
        db.analytics[userId].tokensUsed += Math.ceil(message.content.length * 0.35);
      }

      this.write(db);
      return db.chats[chatId];
    }
    return null;
  }

  // SHARE MANAGEMENT
  static createOrGetShare(chatId: string, userId: string, youtubeVideoUrl?: string): SharedChat | null {
    const db = this.read();
    const chat = db.chats[chatId];
    if (!chat || chat.userId !== userId) {
      return null;
    }

    if (!db.shares) db.shares = {};

    const user = db.users[userId];
    const authorName = user ? user.name : 'Nova User';
    const videoUrl = youtubeVideoUrl || chat.youtubeVideoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    chat.youtubeVideoUrl = videoUrl;

    // If chat already has a shareId and share entry exists, update snapshot
    let shareId = chat.shareId;
    if (shareId && db.shares[shareId]) {
      db.shares[shareId] = {
        ...db.shares[shareId],
        title: chat.title,
        model: chat.model,
        messages: chat.messages,
        authorName,
        youtubeVideoUrl: videoUrl,
        sharedAt: new Date().toISOString()
      };
      chat.isShared = true;
      chat.sharedAt = db.shares[shareId].sharedAt;
      this.write(db);
      return db.shares[shareId];
    }

    // Generate new shareId
    shareId = 'share-' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    const sharedAt = new Date().toISOString();

    chat.isShared = true;
    chat.shareId = shareId;
    chat.sharedAt = sharedAt;

    const newSharedChat: SharedChat = {
      shareId,
      chatId: chat.id,
      title: chat.title,
      model: chat.model,
      createdAt: chat.createdAt,
      sharedAt,
      authorName,
      messages: chat.messages,
      viewsCount: 0,
      youtubeVideoUrl: videoUrl
    };

    db.shares[shareId] = newSharedChat;
    this.write(db);
    this.addLog('info', `User ${userId} created shareable link for chat "${chat.title}" (${shareId})`);
    return newSharedChat;
  }

  static getSharedChat(shareId: string): SharedChat | null {
    const db = this.read();
    if (!db.shares || !db.shares[shareId]) {
      return null;
    }

    const sharedChat = db.shares[shareId];
    sharedChat.viewsCount = (sharedChat.viewsCount || 0) + 1;
    this.write(db);
    return sharedChat;
  }

  static revokeShare(chatId: string, userId: string): boolean {
    const db = this.read();
    const chat = db.chats[chatId];
    if (!chat || chat.userId !== userId) {
      return false;
    }

    if (chat.shareId && db.shares && db.shares[chat.shareId]) {
      delete db.shares[chat.shareId];
    }

    chat.isShared = false;
    delete chat.shareId;
    delete chat.sharedAt;

    this.write(db);
    this.addLog('info', `User ${userId} revoked share for chat "${chat.title}"`);
    return true;
  }

  static importSharedChat(shareId: string, targetUserId: string): Chat | null {
    const db = this.read();
    if (!db.shares || !db.shares[shareId]) {
      return null;
    }

    const shared = db.shares[shareId];
    const newChatId = 'chat-' + Math.random().toString(36).substring(2, 11);
    
    // Clone messages with new message IDs
    const clonedMessages: Message[] = shared.messages.map(m => ({
      ...m,
      id: 'msg-' + Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString()
    }));

    const importedChat: Chat = {
      id: newChatId,
      userId: targetUserId,
      title: `${shared.title} (Imported)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      model: shared.model,
      messages: clonedMessages
    };

    db.chats[newChatId] = importedChat;
    if (db.analytics[targetUserId]) {
      db.analytics[targetUserId].chatsCount++;
    }

    this.write(db);
    this.addLog('info', `User ${targetUserId} imported shared chat "${shared.title}" (${shareId})`);
    return importedChat;
  }

  // NOTIFICATIONS
  static getNotifications(userId: string): SystemNotification[] {
    const db = this.read();
    return db.notifications[userId] || [];
  }

  static addNotification(userId: string, title: string, content: string, type: 'info' | 'success' | 'warning' | 'error' = 'info'): SystemNotification {
    const db = this.read();
    if (!db.notifications[userId]) {
      db.notifications[userId] = [];
    }
    const notif: SystemNotification = {
      id: 'notif-' + Math.random().toString(36).substring(2, 9),
      title,
      content,
      type,
      createdAt: new Date().toISOString(),
      isRead: false
    };
    db.notifications[userId].unshift(notif);
    this.write(db);
    return notif;
  }

  static markNotificationsAsRead(userId: string): boolean {
    const db = this.read();
    if (db.notifications[userId]) {
      db.notifications[userId].forEach(n => n.isRead = true);
      this.write(db);
      return true;
    }
    return false;
  }

  // ANALYTICS & STATS
  static getStats(): SystemStats {
    const db = this.read();
    const users = Object.values(db.users);
    const chats = Object.values(db.chats);
    
    let totalMessages = 0;
    let totalImagesGenerated = 0;
    Object.values(db.analytics).forEach(a => {
      totalMessages += a.messagesCount;
      totalImagesGenerated += a.imagesGenerated;
    });

    const tierCounts = { Free: 0, Pro: 0, Premium: 0, 'Ultra Premium': 0, 'Super AI': 0 };
    users.forEach(u => {
      const tier = u.subscriptionTier || 'Free';
      if (tierCounts[tier] !== undefined) {
        tierCounts[tier]++;
      } else {
        tierCounts[tier] = 1;
      }
    });

    // Revenue calculation: Free = 0, Pro = $15/mo, Premium = $30/mo, Ultra Premium = $100/mo, Super AI = $500/mo
    const revenue = (tierCounts.Pro * 15) + (tierCounts.Premium * 30) + (tierCounts['Ultra Premium'] * 100) + (tierCounts['Super AI'] * 500);

    return {
      totalUsers: users.length,
      totalChats: chats.length,
      totalMessages,
      totalImagesGenerated,
      revenue,
      usersByTier: tierCounts,
      monthlySignups: [
        { month: 'Feb', count: 12 },
        { month: 'Mar', count: 28 },
        { month: 'Apr', count: 45 },
        { month: 'May', count: 72 },
        { month: 'Jun', count: users.length * 2 },
        { month: 'Jul', count: users.length }
      ],
      recentLogs: db.systemLogs.slice(0, 8)
    };
  }

  static incrementImageCount(userId: string) {
    const db = this.read();
    if (db.analytics[userId]) {
      db.analytics[userId].imagesGenerated++;
      this.write(db);
    }
  }

  static checkUserQuota(userId: string, type: 'message' | 'image'): { allowed: boolean; max: number; current: number } {
    const db = this.read();
    const user = db.users[userId];
    const tier = user?.subscriptionTier || 'Free';
    const isUnlimited = user?.isUnlimited || (tier === 'Ultra Premium' || tier === 'Super AI');

    if (isUnlimited) {
      return { allowed: true, max: Infinity, current: 0 };
    }

    const analytics = db.analytics[userId] || { messagesCount: 0, imagesGenerated: 0 };
    const current = type === 'message' ? (analytics.messagesCount || 0) : (analytics.imagesGenerated || 0);

    let max = 15; // default Free message limit
    if (type === 'message') {
      if (tier === 'Pro') max = 100;
      else if (tier === 'Premium') max = 300;
    } else { // image
      max = 3; // default Free image limit
      if (tier === 'Pro') max = 20;
      else if (tier === 'Premium') max = 50;
    }

    return {
      allowed: current < max,
      max,
      current
    };
  }

  // DIGITAL LIBRARY PERSISTENCE METHODS
  static getUserBooks(userId: string): LibraryBook[] {
    const db = this.read();
    if (!db.userBooks) db.userBooks = {};
    return db.userBooks[userId] || [];
  }

  static addUserBook(userId: string, bookData: {
    title: string;
    author: string;
    description: string;
    content: string;
    category: string;
    gradeLevel: string;
    difficulty: string;
  }): LibraryBook {
    const db = this.read();
    if (!db.userBooks) db.userBooks = {};
    if (!db.userBooks[userId]) db.userBooks[userId] = [];

    // Split content into chapters if possible. If no chapters are found, split by chunks or create one main chapter.
    const hasChapters = /(Chapter\s+\d+|CHAPTER\s+\d+|Section\s+\d+|SECTION\s+\d+)/i.test(bookData.content);
    let chapters: Array<{ id: string; title: string; content: string }> = [];

    if (hasChapters) {
      const sections = bookData.content.split(/(?=Chapter\s+\d+|CHAPTER\s+\d+|Section\s+\d+|SECTION\s+\d+)/i);
      chapters = sections
        .filter(sec => sec.trim().length > 0)
        .map((sec, index) => {
          const cleanSec = sec.trim();
          const firstLine = cleanSec.split('\n')[0] || '';
          const title = firstLine.length < 50 && firstLine.trim() ? firstLine.trim() : `Part ${index + 1}`;
          return {
            id: `user-ch-${Math.random().toString(36).substring(7)}`,
            title,
            content: cleanSec
          };
        });
    } else {
      // Split into ~1500 word chapters or keep as single block
      const words = bookData.content.split(/\s+/);
      const chunkSize = 1500;
      if (words.length > chunkSize) {
        let chunkIndex = 1;
        for (let i = 0; i < words.length; i += chunkSize) {
          const chunkWords = words.slice(i, i + chunkSize);
          chapters.push({
            id: `user-ch-${Math.random().toString(36).substring(7)}`,
            title: `Chapter ${chunkIndex}`,
            content: chunkWords.join(' ')
          });
          chunkIndex++;
        }
      } else {
        chapters.push({
          id: `user-ch-single`,
          title: "Full Text",
          content: bookData.content
        });
      }
    }

    const newBook: LibraryBook = {
      id: `user-bk-${Math.random().toString(36).substring(7)}`,
      title: bookData.title,
      author: bookData.author || 'User Upload',
      description: bookData.description || 'Uploaded document',
      category: bookData.category || 'Literature',
      language: 'English',
      gradeLevel: bookData.gradeLevel || 'College',
      difficulty: bookData.difficulty || 'Intermediate',
      isUserUploaded: true,
      chapters
    };

    db.userBooks[userId].push(newBook);
    this.write(db);
    this.addLog('info', `User ${userId} uploaded custom book "${bookData.title}" with ${chapters.length} parts.`);
    return newBook;
  }

  static getAnnotations(userId: string): BookAnnotation[] {
    const db = this.read();
    if (!db.annotations) db.annotations = {};
    return db.annotations[userId] || [];
  }

  static getBookmarks(userId: string): BookBookmark[] {
    const db = this.read();
    if (!db.bookmarks) db.bookmarks = {};
    return db.bookmarks[userId] || [];
  }

  static saveSyncData(userId: string, annotations: BookAnnotation[], bookmarks: BookBookmark[]) {
    const db = this.read();
    if (!db.annotations) db.annotations = {};
    if (!db.bookmarks) db.bookmarks = {};

    db.annotations[userId] = annotations;
    db.bookmarks[userId] = bookmarks;
    this.write(db);
  }

  // --- Billing & Payment Invoices ---

  static getInvoices(userId: string): BillingInvoice[] {
    const db = this.read();
    if (!db.invoices) db.invoices = {};
    return db.invoices[userId] || [];
  }

  static createInvoice(userId: string, invoiceData: Omit<BillingInvoice, 'id' | 'paidAt'>): BillingInvoice {
    const db = this.read();
    if (!db.invoices) db.invoices = {};
    if (!db.invoices[userId]) db.invoices[userId] = [];

    const newInvoice: BillingInvoice = {
      id: `inv-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      paidAt: new Date().toISOString(),
      ...invoiceData
    };

    db.invoices[userId].unshift(newInvoice);
    this.write(db);
    this.addLog('info', `Bill payment processed for user ${userId}: Invoice #${newInvoice.invoiceNumber}, Amount: ${newInvoice.currency} ${newInvoice.totalAmount}`);
    return newInvoice;
  }

  static getPaymentMethods(userId: string): PaymentMethod[] {
    const db = this.read();
    if (!db.paymentMethods) db.paymentMethods = {};
    return db.paymentMethods[userId] || [];
  }

  static addPaymentMethod(userId: string, methodData: Omit<PaymentMethod, 'id' | 'createdAt'>): PaymentMethod {
    const db = this.read();
    if (!db.paymentMethods) db.paymentMethods = {};
    if (!db.paymentMethods[userId]) db.paymentMethods[userId] = [];

    // If this is set as default, unset others
    if (methodData.isDefault) {
      db.paymentMethods[userId].forEach(m => m.isDefault = false);
    }

    const newMethod: PaymentMethod = {
      id: `pm-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      createdAt: new Date().toISOString(),
      ...methodData
    };

    db.paymentMethods[userId].push(newMethod);
    this.write(db);
    return newMethod;
  }

  static deletePaymentMethod(userId: string, methodId: string): boolean {
    const db = this.read();
    if (!db.paymentMethods || !db.paymentMethods[userId]) return false;

    db.paymentMethods[userId] = db.paymentMethods[userId].filter(m => m.id !== methodId);
    this.write(db);
    return true;
  }

  // ==================== Student Free Access Passes ====================
  static getAllStudentPasses(): StudentPass[] {
    const db = this.read();
    if (!db.studentPasses) {
      db.studentPasses = {};
      // Seed an initial official pass
      const initialPass: StudentPass = {
        id: 'stu-pass-init-1',
        code: 'STU-FREE-2026-8121',
        studentName: 'Verified Student / Educator',
        institution: 'Global Academic & Research Network',
        issuedBy: 'Shivam Kumar (Founder & CEO)',
        createdAt: new Date().toISOString(),
        expiresAt: 'Lifetime Free ($0)',
        status: 'active',
        passType: 'Scholarship',
        notes: 'Official 100% Free Lifetime Access Grant across all 70+ AI models & GPU clusters.'
      };
      db.studentPasses[initialPass.id] = initialPass;
      this.write(db);
    }
    return Object.values(db.studentPasses).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static createStudentPass(passData: Omit<StudentPass, 'id' | 'createdAt'>): StudentPass {
    const db = this.read();
    if (!db.studentPasses) db.studentPasses = {};

    const cleanCode = (passData.code || `STU-NOVA-${Date.now().toString(36).toUpperCase()}`).trim().toUpperCase();

    const newPass: StudentPass = {
      id: `stu-pass-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      createdAt: new Date().toISOString(),
      ...passData,
      code: cleanCode
    };

    db.studentPasses[newPass.id] = newPass;
    this.write(db);
    this.addLog('info', `Admin issued new Student Access Passcode: ${cleanCode} for ${passData.studentName || 'Student'}`);
    return newPass;
  }

  static getStudentPassByCode(code: string): StudentPass | null {
    if (!code) return null;
    const clean = code.trim().toUpperCase().replace(/[\s\-_]/g, '');
    const passes = this.getAllStudentPasses();
    return passes.find(p => p.code.toUpperCase().replace(/[\s\-_]/g, '') === clean) || null;
  }

  static redeemStudentPass(code: string, userData: { id: string; name: string; email: string }): { success: boolean; pass?: StudentPass; message: string } {
    const db = this.read();
    if (!db.studentPasses) db.studentPasses = {};

    const cleanCode = (code || '').trim().toUpperCase().replace(/[\s\-_]/g, '');
    
    // Check if matching any created pass
    let foundPass = Object.values(db.studentPasses).find(
      p => p.code.toUpperCase().replace(/[\s\-_]/g, '') === cleanCode
    );

    // If matching a generic student wildcard prefix or standard master code (e.g. STUDENT2026, SCHOLARSHIP, FREEAI)
    const validStudentWildcards = ['STUDENT', 'SCHOLARSHIP', 'EDU', 'FREEPASS', 'STUDENT2026', 'STUDENTFREE', 'NOVASTUDENT', 'BABITASTUDENT', 'SHELBYSTUDENT'];
    const isWildcardValid = validStudentWildcards.some(w => cleanCode.includes(w)) || cleanCode.startsWith('STU');

    if (!foundPass && isWildcardValid) {
      // Auto-generate registered pass for this valid code
      foundPass = {
        id: `stu-pass-auto-${Date.now()}`,
        code: code.trim().toUpperCase(),
        studentName: userData.name || 'Verified Scholar',
        studentEmail: userData.email,
        institution: 'Academic Verification Network',
        issuedBy: 'Shelby.ai Academic Grant Registry',
        createdAt: new Date().toISOString(),
        expiresAt: 'Lifetime Free ($0)',
        status: 'active',
        passType: 'Scholarship',
        notes: 'Auto-verified Academic Scholarship Pass'
      };
      db.studentPasses[foundPass.id] = foundPass;
    }

    if (!foundPass) {
      return {
        success: false,
        message: 'Invalid Student Pass Code. Please check the code or contact the administrator.'
      };
    }

    if (foundPass.status === 'revoked') {
      return {
        success: false,
        message: 'This Student Pass Code has been revoked by the administrator.'
      };
    }

    // Mark pass as redeemed (and track who redeemed it)
    foundPass.status = 'redeemed';
    foundPass.redeemedBy = {
      userId: userData.id,
      userName: userData.name,
      userEmail: userData.email,
      redeemedAt: new Date().toISOString()
    };
    db.studentPasses[foundPass.id] = foundPass;

    // Elevate the user's account to Ultra Premium / Super AI Student Lifetime Free
    const user = this.findUserById(userData.id);
    if (user) {
      user.subscriptionTier = 'Ultra Premium';
      user.isUnlimited = true;
      (user as any).isStudent = true;
      (user as any).studentVerified = true;
      db.users[user.id] = { ...db.users[user.id], ...user };
    }

    this.write(db);

    this.addNotification(
      userData.id,
      '🎓 Student Lifetime Free Pass Activated!',
      `Congratulations! Passcode ${foundPass.code} was successfully redeemed. You now have permanent 100% Free Lifetime Access ($0) across all 70+ AI models, GPU compute, and specialized IDEs.`,
      'success'
    );

    this.addLog('info', `Student Passcode ${foundPass.code} redeemed by ${userData.email} (${userData.id}). Lifetime Free AI Access activated.`);

    return {
      success: true,
      pass: foundPass,
      message: '🎓 100% Free Student Lifetime Pass verified and activated successfully!'
    };
  }

  static deleteStudentPass(id: string): boolean {
    const db = this.read();
    if (!db.studentPasses || !db.studentPasses[id]) return false;
    delete db.studentPasses[id];
    this.write(db);
    return true;
  }
}

