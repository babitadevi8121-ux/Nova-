import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, Sparkles, CheckCircle, Zap, CreditCard, QrCode, 
  Download, Printer, Shield, ShieldCheck, ArrowRight, Wallet, 
  Building, RefreshCw, Calendar, FileText, ChevronRight, Plus, 
  Trash2, Globe, Clock, Lock, Receipt, DollarSign, Percent, Copy, CheckCheck, Bookmark, GraduationCap
} from 'lucide-react';
import { User, BillingInvoice, PaymentMethod } from '../types';
import { generateInvoicePDF, downloadPdfDoc, saveItemToGallery } from '../utils/pdfGenerator';
import { toast } from '../utils/toast';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onUpgradeSuccess: (updatedUser: User) => void;
  onOpenAuth: () => void;
  initialTab?: 'plans' | 'checkout' | 'account';
  initialTier?: 'Pro' | 'Premium' | 'Ultra Premium';
}

type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP';

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  rate: number; // multiplier relative to USD
}

const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', rate: 1 },
  INR: { code: 'INR', symbol: '₹', rate: 83.5 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 }
};

export default function PricingModal({
  isOpen,
  onClose,
  user,
  onUpgradeSuccess,
  onOpenAuth,
  initialTab = 'plans',
  initialTier = 'Pro'
}: PricingModalProps) {
  const [activeTab, setActiveTab] = useState<'plans' | 'checkout' | 'account'>(initialTab);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [selectedTier, setSelectedTier] = useState<'Pro' | 'Premium' | 'Ultra Premium'>(initialTier);

  // Payment Method States
  const [paymentType, setPaymentType] = useState<'card' | 'upi' | 'paypal' | 'crypto' | 'bank'>('card');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [upiVpa, setUpiVpa] = useState('');
  const [upiProvider, setUpiProvider] = useState<'GPay' | 'PhonePe' | 'Paytm' | 'BHIM' | 'CRED'>('GPay');
  const [cryptoNetwork, setCryptoNetwork] = useState<'USDT-TRC20' | 'BTC' | 'ETH'>('USDT-TRC20');
  const [copiedCrypto, setCopiedCrypto] = useState(false);

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Student Passcode State
  const [studentPassCodeInput, setStudentPassCodeInput] = useState('');
  const [showStudentCodeInput, setShowStudentCodeInput] = useState(false);
  const [studentPassLoading, setStudentPassLoading] = useState(false);
  const [studentPassMsg, setStudentPassMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Processing & Invoices State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(1);
  const [latestInvoice, setLatestInvoice] = useState<BillingInvoice | null>(null);
  const [userInvoices, setUserInvoices] = useState<BillingInvoice[]>([]);
  const [savedPaymentMethods, setSavedPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [viewingReceipt, setViewingReceipt] = useState<BillingInvoice | null>(null);
  const [gallerySavedToast, setGallerySavedToast] = useState(false);

  const handleDownloadInvoicePDF = (inv: BillingInvoice, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const doc = generateInvoicePDF(inv);
    downloadPdfDoc(doc, `Invoice-${inv.invoiceNumber}.pdf`);
  };

  const handleSaveInvoiceToGallery = (inv: BillingInvoice, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    saveItemToGallery({
      id: `inv-gallery-${inv.id}`,
      userId: inv.userId || (user?.id || 'guest'),
      title: `Tax Invoice #${inv.invoiceNumber} (${inv.tier})`,
      type: 'invoice_pdf',
      createdAt: inv.paidAt || new Date().toISOString(),
      fileSize: '46.8 KB',
      metadata: {
        invoiceNumber: inv.invoiceNumber,
        amount: inv.totalAmount,
        currency: inv.currency,
        tier: inv.tier,
        author: inv.userName,
        description: `Official Paid Tax Receipt for ${inv.tier} Tier (${inv.billingCycle}).`
      }
    });
    setGallerySavedToast(true);
    setTimeout(() => setGallerySavedToast(false), 2500);
  };

  // New Payment Method in Account tab
  const [showAddMethodForm, setShowAddMethodForm] = useState(false);
  const [newMethodType, setNewMethodType] = useState<'card' | 'upi'>('card');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardHolder, setNewCardHolder] = useState('');
  const [newCardExp, setNewCardExp] = useState('');
  const [newUpiVpa, setNewUpiVpa] = useState('');

  // Sync initial tab when reopened
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      if (initialTier) setSelectedTier(initialTier);
      if (user) {
        setCardHolder(user.name || '');
        fetchInvoices();
        fetchPaymentMethods();
      }
    }
  }, [isOpen, initialTab, initialTier, user]);

  const fetchInvoices = async () => {
    if (!user) return;
    setLoadingInvoices(true);
    try {
      const res = await fetch('/api/billing/invoices', {
        headers: { 'Authorization': `Bearer ${user.id}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUserInvoices(data.invoices || []);
      }
    } catch (err) {
      console.error('Failed to load invoices:', err);
    } finally {
      setLoadingInvoices(false);
    }
  };

  const fetchPaymentMethods = async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/billing/payment-methods', {
        headers: { 'Authorization': `Bearer ${user.id}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSavedPaymentMethods(data.paymentMethods || []);
      }
    } catch (err) {
      console.error('Failed to load payment methods:', err);
    }
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'WELCOME20' || code === 'SHIVA2026' || code === 'SHIVA') {
      setDiscountPercent(20);
      setPromoMessage({ text: '20% Special Founder Discount applied!', type: 'success' });
    } else if (code === 'ULTRAVIP' || code === 'VIP50') {
      setDiscountPercent(50);
      setPromoMessage({ text: '50% VIP Membership voucher applied!', type: 'success' });
    } else if (code === 'NOVA10') {
      setDiscountPercent(10);
      setPromoMessage({ text: '10% promotional discount applied!', type: 'success' });
    } else {
      setDiscountPercent(0);
      setPromoMessage({ text: 'Invalid or expired promotional code', type: 'error' });
    }
  };

  // Pricing calculations
  const basePriceUSD = selectedTier === 'Pro' ? 15 : selectedTier === 'Premium' ? 30 : 500;
  const cycleMultiplier = billingCycle === 'annual' ? 12 : 1; // 12 months standard billing (no discount)
  const cur = CURRENCIES[currency];
  
  const rawSubtotal = Math.round(basePriceUSD * cycleMultiplier * cur.rate * 100) / 100;
  const discountAmount = Math.round(rawSubtotal * (discountPercent / 100) * 100) / 100;
  const discountedSubtotal = Math.max(0, rawSubtotal - discountAmount);
  const taxRate = 0.18; // 18% standard GST / VAT
  const taxAmount = Math.round(discountedSubtotal * taxRate * 100) / 100;
  const totalAmountPayable = Math.round((discountedSubtotal + taxAmount) * 100) / 100;

  // Format Card input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setCardExp(val);
  };

  // Card Brand Detection
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\s+/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(clean)) return 'MasterCard';
    if (/^3[47]/.test(clean)) return 'American Express';
    if (/^(60|65|81|82)/.test(clean)) return 'RuPay';
    return 'Credit/Debit';
  };

  // Execute Pay Bill
  const handlePayBill = async () => {
    if (!user) {
      onOpenAuth();
      return;
    }

    setIsProcessing(true);
    setProcessingStep(1);

    setTimeout(() => setProcessingStep(2), 700);
    setTimeout(() => setProcessingStep(3), 1400);

    try {
      const payload: any = {
        tier: selectedTier,
        billingCycle,
        currency,
        amount: discountedSubtotal,
        taxAmount,
        totalAmount: totalAmountPayable,
        paymentMethod: paymentType === 'card' 
          ? `${getCardBrand(cardNumber)} Card ending in ${cardNumber.slice(-4) || '4242'}`
          : paymentType === 'upi' 
          ? `UPI (${upiProvider} - ${upiVpa || 'user@upi'})`
          : paymentType === 'paypal'
          ? 'PayPal Express Checkout'
          : paymentType === 'crypto'
          ? `Crypto Settlement (${cryptoNetwork})`
          : 'Bank Wire / Corporate Invoice'
      };

      if (paymentType === 'card' && saveCard) {
        payload.cardDetails = {
          brand: getCardBrand(cardNumber),
          number: cardNumber,
          expMonth: cardExp.split('/')[0] || '12',
          expYear: cardExp.split('/')[1] || '28',
          holderName: cardHolder || user.name
        };
      } else if (paymentType === 'upi' && upiVpa) {
        payload.upiDetails = {
          vpa: upiVpa,
          provider: upiProvider
        };
      }

      const res = await fetch('/api/billing/pay-bill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      setTimeout(() => {
        setIsProcessing(false);
        setLatestInvoice(data.invoice);
        setViewingReceipt(data.invoice);
        onUpgradeSuccess(data.user);
        fetchInvoices();
        fetchPaymentMethods();
      }, 2000);
    } catch (err: any) {
      setIsProcessing(false);
      toast.error('Payment processing error: ' + (err.message || 'Unknown error'));
    }
  };

  const handleAddNewPaymentMethod = async () => {
    if (!user) return;
    try {
      const payload: any = {
        type: newMethodType,
        isDefault: savedPaymentMethods.length === 0
      };

      if (newMethodType === 'card') {
        const rawNum = newCardNumber.replace(/\s+/g, '');
        payload.card = {
          brand: getCardBrand(newCardNumber),
          last4: rawNum.slice(-4) || '4242',
          expMonth: newCardExp.split('/')[0] || '12',
          expYear: newCardExp.split('/')[1] || '28',
          holderName: newCardHolder || user.name
        };
      } else {
        payload.upi = {
          vpa: newUpiVpa || 'user@upi',
          provider: 'UPI'
        };
      }

      const res = await fetch('/api/billing/payment-methods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setShowAddMethodForm(false);
        setNewCardNumber('');
        setNewCardHolder('');
        setNewCardExp('');
        setNewUpiVpa('');
        fetchPaymentMethods();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePaymentMethod = async (id: string) => {
    if (!user) return;
    try {
      const res = await fetch(`/api/billing/payment-methods/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.id}` }
      });
      if (res.ok) {
        fetchPaymentMethods();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const tiersList = [
    {
      name: 'Free',
      price: '$0',
      description: 'Test driving foundational intelligent features.',
      features: [
        'Standard GPT response rate',
        'Gemini 3.5 Flash Model access',
        'Standard 512px image generations (5/day)',
        'Local chat history',
        'Basic Text-to-Speech'
      ],
      cta: 'Current Plan',
      accent: false,
      color: 'indigo'
    },
    {
      name: 'Pro',
      price: '$15',
      description: 'Ideal for power users, developers, and writers.',
      features: [
        'High-speed priority response rate',
        'Full Gemini 3.1 Pro model access',
        'Unlimited HD 1K image generations',
        'Advanced code generation highlighting',
        'File uploads parsing (PDF/TXT context)',
        'Custom TTS Voice selections'
      ],
      cta: 'Upgrade to Pro',
      accent: true,
      color: 'purple'
    },
    {
      name: 'Premium',
      price: '$30',
      description: 'Elite processing capability with maximum priority.',
      features: [
        'Maximum priority responses & zero queue',
        'Full Gemini 3.1 Pro + reasoning weights',
        'Ultra 4K custom image generations',
        'Infinite document context parsing',
        'Multi-speaker conversation TTS voice',
        'Dedicated administrative panel access',
        'Beta access to upcoming features'
      ],
      cta: 'Go Premium',
      accent: false,
      color: 'pink'
    },
    {
      name: 'Ultra Premium',
      price: '$500',
      description: 'Exclusive Ultra High Premium Member access. Unlocks full Ultra AI Suite (Claude, NanoBanana, Highsfield, Figma, HeyGen, Cursor, NotebookLM, Gamma, Perplexity) & raw universal database.',
      features: [
        '👑 Full Ultra AI Suite: Claude 3.7, NanoBanana, Highsfield, Figma & HeyGen',
        '⚡ Cursor Autonomous IDE, NotebookLM Research & Gamma Engine',
        '♾️ Direct Universal Firestore Database Manager ($500 VIP Cluster)',
        '🛰️ Real-time BTS cellular node & tracking telemetry stream',
        '🎨 Unlimited 8K cinematic rendering & infinite token context',
        '🔑 FREE Windows 11 Pro Lifetime Edition License Key',
        '👨‍💻 VIP 24/7 dedicated system engineering & priority GPU cluster routing',
        '♾️ Completely unlimited neural memory and export capabilities'
      ],
      cta: 'Unlock Ultra High ($500/mo)',
      accent: false,
      color: 'amber'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full max-w-6xl rounded-2xl glass p-5 sm:p-8 shadow-2xl border border-white/20 dark:border-white/10 text-slate-800 dark:text-slate-100 relative my-6 max-h-[92vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header & Navigation Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Shelby.ai Billing & Payments
              </span>
              {user && (
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Account: <strong>{user.email}</strong>
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight mt-1">
              Premium Membership & Billing Center
            </h2>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center bg-slate-200/60 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-300/40 dark:border-slate-800 text-xs font-semibold shrink-0">
            <button
              onClick={() => setActiveTab('plans')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'plans'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Membership Plans
            </button>
            <button
              onClick={() => {
                if (!user) {
                  onOpenAuth();
                  return;
                }
                setActiveTab('checkout');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'checkout'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              Pay Bill & Checkout
            </button>
            <button
              onClick={() => {
                if (!user) {
                  onOpenAuth();
                  return;
                }
                setActiveTab('account');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'account'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Receipt className="w-3.5 h-3.5" />
              Billing Invoices ({userInvoices.length})
            </button>
          </div>
        </div>

        {/* Modal Body Container with Scroll */}
        <div className="flex-1 overflow-y-auto py-4 pr-1">
          {/* TAB 1: PLANS MATRIX */}
          {activeTab === 'plans' && (
            <div className="space-y-6">
              {/* Billing Cycle & Currency Switcher Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-100/60 dark:bg-slate-900/40 rounded-xl border border-slate-200/60 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Billing Cycle:</span>
                  <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700 text-xs">
                    <button
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-3 py-1 rounded-md transition-all font-medium ${
                        billingCycle === 'monthly'
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle('annual')}
                      className={`px-3 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
                        billingCycle === 'annual'
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Annual Bill
                      <span className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded font-bold">
                        12 Months
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" />
                    Currency:
                  </span>
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 text-xs font-bold">
                    {(['USD', 'INR', 'EUR', 'GBP'] as CurrencyCode[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c)}
                        className={`px-2 py-1 rounded transition-all ${
                          currency === c
                            ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'
                            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                      >
                        {CURRENCIES[c].symbol} {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5-Day Free Trial & Student Access Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 5-Day Free Access Overview */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/70 border border-indigo-500/40 flex items-start gap-3.5 text-xs shadow-xl">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner mt-0.5">
                    <Zap className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">✨ 5-Day Free AI Trial</h4>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                        All Models Free
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      Every new logged-in user receives <strong>5 full days of unrestricted access</strong> to all 70+ AI models, specialized IDEs, and GPU clusters. After 5 days, select a premium plan below.
                    </p>
                  </div>
                </div>

                {/* Student & Educator 100% Free Lifetime Pass Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-teal-950/70 to-slate-900 border border-emerald-500/40 text-xs shadow-xl space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner mt-0.5">
                        <GraduationCap className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-sm font-bold text-white truncate">🎓 Student & Educator Free Access</h4>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                            $0 Forever
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-200/80 mt-1 leading-relaxed">
                          Students, teachers, and researchers get <strong>100% Free Lifetime Access</strong> with zero paywalls.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setShowStudentCodeInput(!showStudentCodeInput)}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold transition-all cursor-pointer"
                      >
                        {showStudentCodeInput ? 'Hide Code Input' : 'Redeem Passcode'}
                      </button>
                      <button
                        onClick={() => {
                          localStorage.setItem('nova_student_pass', 'active');
                          toast.success('🎓 Congratulations! Your 100% Free Student & Educator Lifetime Pass is now permanently active across all AI engines.');
                          setTimeout(() => window.location.reload(), 800);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1.5 transition-all shadow cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>1-Click Free Pass</span>
                      </button>
                    </div>
                  </div>

                  {showStudentCodeInput && (
                    <div className="pt-2 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter Admin Issued Student Passcode..."
                        value={studentPassCodeInput}
                        onChange={(e) => setStudentPassCodeInput(e.target.value.toUpperCase())}
                        className="flex-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-emerald-500/40 text-white font-mono uppercase text-xs focus:outline-none focus:border-emerald-400 font-bold"
                      />
                      <button
                        type="button"
                        disabled={studentPassLoading || !studentPassCodeInput.trim()}
                        onClick={async () => {
                          setStudentPassLoading(true);
                          setStudentPassMsg(null);
                          try {
                            const res = await fetch('/api/student-passes/redeem', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${user?.id || 'student'}`
                              },
                              body: JSON.stringify({
                                code: studentPassCodeInput.trim(),
                                userId: user?.id,
                                name: user?.name,
                                email: user?.email
                              })
                            });
                            const data = await res.json();
                            if (res.ok && data.success) {
                              setStudentPassMsg({ type: 'success', text: '🎓 Student Pass verified! 100% Free Lifetime Access activated.' });
                              localStorage.setItem('nova_student_pass', 'active');
                              setTimeout(() => window.location.reload(), 1500);
                            } else {
                              throw new Error(data.error || 'Invalid passcode');
                            }
                          } catch (err: any) {
                            setStudentPassMsg({ type: 'error', text: err.message || 'Passcode verification failed.' });
                          } finally {
                            setStudentPassLoading(false);
                          }
                        }}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all cursor-pointer shrink-0 disabled:opacity-50"
                      >
                        {studentPassLoading ? 'Verifying...' : 'Verify & Unlock'}
                      </button>
                    </div>
                  )}

                  {studentPassMsg && (
                    <div className={`p-2 rounded-lg text-[11px] font-bold ${
                      studentPassMsg.type === 'success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                    }`}>
                      {studentPassMsg.text}
                    </div>
                  )}
                </div>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {tiersList.map((tier, idx) => {
                  const isUserCurrent = user?.subscriptionTier === tier.name;
                  const isPro = tier.name === 'Pro';
                  const isPremium = tier.name === 'Premium';
                  const isUltra = tier.name === 'Ultra Premium';
                  const isFree = tier.name === 'Free';

                  // Dynamic calculated price (Annual: 12 months full standard billing without discount)
                  let displayPrice = tier.price;
                  if (!isFree) {
                    const baseUSD = isPro ? 15 : isPremium ? 30 : 500;
                    const fullCycleUSD = billingCycle === 'annual' ? baseUSD * 12 : baseUSD;
                    const converted = Math.round(fullCycleUSD * CURRENCIES[currency].rate);
                    displayPrice = `${CURRENCIES[currency].symbol}${converted}`;
                  }

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl p-5 flex flex-col justify-between border transition-all ${
                        isUltra
                          ? 'border-amber-400/80 dark:border-amber-500/40 relative shadow-xl scale-[1.01] hover:scale-[1.02] bg-gradient-to-b from-amber-500/10 to-purple-500/10 backdrop-blur-md'
                          : tier.accent
                          ? 'glass-premium border-indigo-400 dark:border-indigo-500/40 relative shadow-xl scale-[1.02]'
                          : 'glass border-slate-200/80 dark:border-white/5 shadow-sm'
                      }`}
                    >
                      {/* Ribbons */}
                      {isUltra && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg ring-1 ring-amber-300">
                          <Sparkles className="w-3 h-3 text-amber-200 animate-pulse fill-amber-200" />
                          Ultra High Member
                        </span>
                      )}
                      {tier.accent && !isUltra && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-300 fill-amber-300 animate-pulse" />
                          Most Popular
                        </span>
                      )}

                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold font-display">{tier.name}</h3>
                          {isUserCurrent && (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                              Current Tier
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[30px] mt-1">{tier.description}</p>
                        
                        {/* Price Display */}
                        <div className="my-4 flex items-baseline">
                          <span className="text-3xl font-extrabold font-display tracking-tight">{displayPrice}</span>
                          <span className="text-xs text-slate-400 font-semibold ml-1">
                            {isFree ? '' : billingCycle === 'annual' ? '/year (Annual Bill)' : '/month'}
                          </span>
                        </div>

                        <div className="my-2 border-t border-slate-200 dark:border-slate-800" />

                        {/* Feature bullets */}
                        <ul className="space-y-2.5 my-4">
                          {tier.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2 text-xs">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="text-slate-600 dark:text-slate-300 leading-snug">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pay Bill & Upgrade Action */}
                      <button
                        onClick={() => {
                          if (!user) {
                            onOpenAuth();
                            return;
                          }
                          if (isFree) {
                            onClose();
                            return;
                          }
                          setSelectedTier(tier.name as any);
                          setActiveTab('checkout');
                        }}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isUserCurrent
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : isUltra
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                            : tier.accent
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20 hover:from-indigo-500 hover:to-purple-500'
                            : 'border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        {isUserCurrent ? 'Current Active Tier' : isFree ? 'Continue Free' : `Pay Bill & Upgrade`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: PAY BILL & CHECKOUT */}
          {activeTab === 'checkout' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Plan selection & Payment Accounts */}
              <div className="lg:col-span-7 space-y-6">
                {/* Step 1: Select Plan to Pay Bill For */}
                <div className="p-4 rounded-xl glass border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black">1</span>
                      Select Premium Tier Bill
                    </span>
                    <div className="flex items-center gap-1 text-xs">
                      <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-2 py-0.5 rounded ${billingCycle === 'monthly' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-500'}`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setBillingCycle('annual')}
                        className={`px-2 py-0.5 rounded flex items-center gap-1 ${billingCycle === 'annual' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-500'}`}
                      >
                        Annual Bill (12 Mo)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'Pro', name: 'Nova Pro', priceUSD: 15, badge: 'Popular' },
                      { id: 'Premium', name: 'Nova Premium', priceUSD: 30, badge: 'Elite' },
                      { id: 'Ultra Premium', name: 'Ultra High $500', priceUSD: 500, badge: 'Unlimited' }
                    ].map((p) => {
                      const isSel = selectedTier === p.id;
                      const cyclePrice = billingCycle === 'annual' ? p.priceUSD * 12 : p.priceUSD;
                      const priceConverted = Math.round(cyclePrice * cur.rate);

                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedTier(p.id as any)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            isSel
                              ? p.id === 'Ultra Premium'
                                ? 'bg-amber-500/10 border-amber-400 ring-2 ring-amber-400/40 text-amber-900 dark:text-amber-200'
                                : 'bg-indigo-500/10 border-indigo-500 ring-2 ring-indigo-500/40 text-indigo-900 dark:text-indigo-200'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 opacity-80'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span>{p.name}</span>
                            <span className="text-[9px] px-1 rounded bg-slate-200 dark:bg-slate-800 font-mono">{p.badge}</span>
                          </div>
                          <div className="text-lg font-black mt-1">
                            {cur.symbol}{priceConverted}
                            <span className="text-[10px] font-normal text-slate-500">{billingCycle === 'annual' ? '/yr' : '/mo'}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Payment Account / Method Selector */}
                <div className="p-4 rounded-xl glass border border-slate-200/80 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black">2</span>
                      Choose Payment Account
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      256-bit Encrypted SSL
                    </span>
                  </div>

                  {/* Payment Types Tabs */}
                  <div className="grid grid-cols-5 gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl text-xs font-bold">
                    <button
                      onClick={() => setPaymentType('card')}
                      className={`py-2 px-1 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
                        paymentType === 'card' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Card</span>
                    </button>
                    <button
                      onClick={() => setPaymentType('upi')}
                      className={`py-2 px-1 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
                        paymentType === 'upi' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span className="text-[11px]">UPI / QR</span>
                    </button>
                    <button
                      onClick={() => setPaymentType('paypal')}
                      className={`py-2 px-1 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
                        paymentType === 'paypal' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      <Wallet className="w-3.5 h-3.5" />
                      <span className="text-[11px]">PayPal</span>
                    </button>
                    <button
                      onClick={() => setPaymentType('crypto')}
                      className={`py-2 px-1 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
                        paymentType === 'crypto' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Crypto</span>
                    </button>
                    <button
                      onClick={() => setPaymentType('bank')}
                      className={`py-2 px-1 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
                        paymentType === 'bank' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      <Building className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Bank Wire</span>
                    </button>
                  </div>

                  {/* Payment Sub-forms */}
                  {/* 1. CREDIT/DEBIT CARD */}
                  {paymentType === 'card' && (
                    <div className="space-y-3 pt-2">
                      {/* Live Card Preview */}
                      <div className="rounded-xl p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-lg border border-indigo-500/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="flex items-center justify-between text-xs font-mono text-indigo-300">
                          <span>Shelby Intelligence Card</span>
                          <span className="font-bold text-amber-300">{getCardBrand(cardNumber)}</span>
                        </div>
                        <div className="my-4 font-mono text-lg tracking-widest text-slate-100">
                          {cardNumber || '•••• •••• •••• ••••'}
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <div className="text-[9px] text-slate-400 uppercase">Cardholder</div>
                            <div className="font-semibold">{cardHolder || (user?.name || 'SHIVAM KUMAR')}</div>
                          </div>
                          <div>
                            <div className="text-[9px] text-slate-400 uppercase">Expires</div>
                            <div className="font-semibold">{cardExp || 'MM/YY'}</div>
                          </div>
                        </div>
                      </div>

                      {/* Card Inputs */}
                      <div className="space-y-2.5">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Cardholder Full Name</label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="Full name as on card"
                            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Card Number (Visa, Mastercard, Amex, RuPay)</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              placeholder="4111 2222 3333 4444"
                              maxLength={19}
                              className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Expiration Date</label>
                            <input
                              type="text"
                              value={cardExp}
                              onChange={handleExpChange}
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">CVV / CVC Security Code</label>
                            <div className="relative">
                              <input
                                type="password"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value.slice(0, 4))}
                                placeholder="123"
                                maxLength={4}
                                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                              <Lock className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                            </div>
                          </div>
                        </div>

                        <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={saveCard}
                            onChange={(e) => setSaveCard(e.target.checked)}
                            className="rounded text-indigo-600"
                          />
                          <span>Save this card securely in my account for future renewals</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* 2. UPI & INSTANT QR */}
                  {paymentType === 'upi' && (
                    <div className="space-y-3 pt-2">
                      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                        {/* Dynamic QR */}
                        <div className="w-32 h-32 bg-white p-2 rounded-xl border shadow-md shrink-0 flex flex-col items-center justify-center">
                          <div className="w-full h-full border-2 border-dashed border-indigo-400 flex flex-col items-center justify-center text-center p-1">
                            <QrCode className="w-16 h-16 text-indigo-700" />
                            <span className="text-[8px] font-mono font-bold text-slate-700 mt-1">SCAN WITH UPI</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5" />
                            Instant QR & UPI VPA Transfer
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                            Scan this dynamic code using any UPI app (Google Pay, PhonePe, Paytm, BHIM, CRED) or enter your Virtual Payment Address (VPA) below.
                          </p>
                          <div className="flex items-center gap-1.5 pt-1">
                            {(['GPay', 'PhonePe', 'Paytm', 'BHIM', 'CRED'] as const).map((app) => (
                              <button
                                key={app}
                                onClick={() => setUpiProvider(app)}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-all ${
                                  upiProvider === app ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 dark:border-slate-700'
                                }`}
                              >
                                {app}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Enter UPI ID / VPA</label>
                        <input
                          type="text"
                          value={upiVpa}
                          onChange={(e) => setUpiVpa(e.target.value)}
                          placeholder="e.g. yourname@oksbi or 9876543210@paytm"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* 3. PAYPAL */}
                  {paymentType === 'paypal' && (
                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs space-y-3">
                      <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400">
                        <Wallet className="w-4 h-4" />
                        PayPal Express Checkout
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                        You will be securely routed to PayPal to complete your subscription bill payment with your PayPal account or saved credit card balance.
                      </p>
                      <div className="p-2.5 rounded-lg bg-blue-600 text-white font-bold text-center">
                        PayPal Account Connection Active
                      </div>
                    </div>
                  )}

                  {/* 4. CRYPTO */}
                  {paymentType === 'crypto' && (
                    <div className="space-y-3 pt-2 text-xs">
                      <div className="flex items-center gap-2">
                        {(['USDT-TRC20', 'BTC', 'ETH'] as const).map((net) => (
                          <button
                            key={net}
                            onClick={() => setCryptoNetwork(net)}
                            className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${
                              cryptoNetwork === net ? 'bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-400' : 'border-slate-300 dark:border-slate-700'
                            }`}
                          >
                            {net}
                          </button>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border font-mono text-[11px] space-y-1">
                        <div className="text-slate-400 text-[9px] uppercase">Deposit {cryptoNetwork} Network Address</div>
                        <div className="flex items-center justify-between gap-2 overflow-x-auto text-slate-800 dark:text-slate-200 font-bold">
                          <span className="truncate">
                            {cryptoNetwork === 'USDT-TRC20' 
                              ? 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' 
                              : cryptoNetwork === 'BTC' 
                              ? 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' 
                              : '0x71C...8493b8E'}
                          </span>
                          <button
                            onClick={() => {
                              setCopiedCrypto(true);
                              navigator.clipboard.writeText('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');
                              setTimeout(() => setCopiedCrypto(false), 2000);
                            }}
                            className="p-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300"
                          >
                            {copiedCrypto ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. BANK WIRE */}
                  {paymentType === 'bank' && (
                    <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border text-xs space-y-2">
                      <div className="font-bold flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                        <Building className="w-4 h-4 text-indigo-500" />
                        Corporate Invoicing & Bank Wire Transfer
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 font-mono">
                        <div>Account Name: <strong>Shelby.ai Cloud Systems Pvt Ltd</strong></div>
                        <div>Bank: <strong>HDFC Bank / Silicon Valley Bank International</strong></div>
                        <div>IFSC / SWIFT: <strong>HDFC0001234 / SVBIUS6S</strong></div>
                        <div>Corporate GSTIN: <strong>07AABCS1429B1Z8</strong></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Itemized Bill Summary & Action */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl glass-premium border border-indigo-400/40 dark:border-indigo-500/30 shadow-xl space-y-4 text-slate-800 dark:text-slate-100">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <Receipt className="w-4 h-4" />
                      Itemized Bill Summary
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 font-bold">
                      {billingCycle === 'annual' ? '12 Months' : '1 Month'}
                    </span>
                  </div>

                  {/* Bill Items */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold">{selectedTier} Membership</div>
                        <div className="text-[11px] text-slate-400">
                          {billingCycle === 'annual' ? 'Annual Subscription (12 Months Standard Billing)' : 'Monthly Active Subscription'}
                        </div>
                      </div>
                      <div className="font-mono font-bold">{cur.symbol}{rawSubtotal.toFixed(2)}</div>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                        <span>Promotional Discount ({discountPercent}%)</span>
                        <span className="font-mono font-bold">-{cur.symbol}{discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span>Cloud Infrastructure & Tax (18% GST/VAT)</span>
                      <span className="font-mono">{cur.symbol}{taxAmount.toFixed(2)}</span>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-baseline justify-between text-base font-extrabold">
                      <span>Total Payable</span>
                      <div className="text-xl font-display font-black text-indigo-600 dark:text-indigo-400">
                        {cur.symbol}{totalAmountPayable.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Percent className="w-3 h-3 text-indigo-500" />
                      Add Voucher or Referral Code
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="e.g. WELCOME20, SHIVA2026"
                        className="flex-1 px-3 py-1.5 text-xs uppercase font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-xs font-bold rounded-lg transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoMessage && (
                      <p className={`text-[10px] font-bold ${promoMessage.type === 'success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {promoMessage.text}
                      </p>
                    )}
                  </div>

                  {/* Pay Bill Action Button */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={handlePayBill}
                      disabled={isProcessing}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>
                            {processingStep === 1 ? 'Securing 256-bit connection...' : processingStep === 2 ? 'Authorizing Payment Network...' : 'Generating Tax Invoice...'}
                          </span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Pay Bill • {cur.symbol}{totalAmountPayable.toFixed(2)}</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center">
                      <Lock className="w-3 h-3" />
                      <span>Instant Activation • Cancel anytime from your account</span>
                    </div>
                  </div>
                </div>

                {/* Account Details Box */}
                <div className="p-3.5 rounded-xl glass border border-slate-200/60 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                  <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-indigo-500" />
                    Billed To Account
                  </div>
                  <div>Name: <strong>{user?.name || 'Nova Member'}</strong></div>
                  <div>Email: <strong>{user?.email || 'user@nova.ai'}</strong></div>
                  <div>Status: <strong>{user?.subscriptionTier || 'Free'} (Ready for Upgrade)</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BILLING ACCOUNT & INVOICES */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              {/* Account Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl glass border border-slate-200/80 dark:border-slate-800">
                  <div className="text-xs text-slate-400">Current Subscription</div>
                  <div className="text-xl font-extrabold font-display text-indigo-600 dark:text-indigo-400 mt-1">
                    {user?.subscriptionTier || 'Free'} Member
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {user?.isUnlimited || user?.subscriptionTier === 'Ultra Premium' ? 'Unlimited High Performance' : 'Standard Quotas'}
                  </div>
                </div>

                <div className="p-4 rounded-xl glass border border-slate-200/80 dark:border-slate-800">
                  <div className="text-xs text-slate-400">Total Paid Invoices</div>
                  <div className="text-xl font-extrabold font-display text-emerald-600 dark:text-emerald-400 mt-1">
                    {userInvoices.length} Invoices
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Verified Tax Invoices On File</div>
                </div>

                <div className="p-4 rounded-xl glass border border-slate-200/80 dark:border-slate-800">
                  <div className="text-xs text-slate-400">Default Payment Account</div>
                  <div className="text-xl font-extrabold font-display text-slate-800 dark:text-slate-200 mt-1 flex items-center gap-1.5">
                    <CreditCard className="w-5 h-5 text-indigo-500" />
                    {savedPaymentMethods.length > 0 ? `${savedPaymentMethods[0].type.toUpperCase()}` : 'None Saved'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {savedPaymentMethods.length > 0 ? 'Auto-Renewal Enabled' : 'Add account below'}
                  </div>
                </div>
              </div>

              {/* Saved Payment Methods Section */}
              <div className="p-5 rounded-2xl glass border border-slate-200/80 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-indigo-500" />
                    <h3 className="text-sm font-bold">Saved Payment Accounts & Cards</h3>
                  </div>
                  <button
                    onClick={() => setShowAddMethodForm(!showAddMethodForm)}
                    className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {showAddMethodForm ? 'Cancel' : 'Add Payment Account'}
                  </button>
                </div>

                {/* Add Payment Method Form */}
                {showAddMethodForm && (
                  <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-3 animate-in fade-in duration-200">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Add New Billing Account / Card</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setNewMethodType('card')}
                        className={`px-3 py-1 text-xs font-bold rounded-lg border ${newMethodType === 'card' ? 'bg-indigo-600 text-white' : 'border-slate-300 dark:border-slate-700'}`}
                      >
                        Credit/Debit Card
                      </button>
                      <button
                        onClick={() => setNewMethodType('upi')}
                        className={`px-3 py-1 text-xs font-bold rounded-lg border ${newMethodType === 'upi' ? 'bg-indigo-600 text-white' : 'border-slate-300 dark:border-slate-700'}`}
                      >
                        UPI ID
                      </button>
                    </div>

                    {newMethodType === 'card' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={newCardHolder}
                          onChange={(e) => setNewCardHolder(e.target.value)}
                          placeholder="Cardholder Name"
                          className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                        <input
                          type="text"
                          value={newCardNumber}
                          onChange={(e) => setNewCardNumber(e.target.value)}
                          placeholder="Card Number"
                          className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newCardExp}
                            onChange={(e) => setNewCardExp(e.target.value)}
                            placeholder="MM/YY"
                            className="w-24 px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                          />
                          <button
                            onClick={handleAddNewPaymentMethod}
                            className="flex-1 px-3 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-500"
                          >
                            Save Card
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newUpiVpa}
                          onChange={(e) => setNewUpiVpa(e.target.value)}
                          placeholder="e.g. mobile@paytm or name@okhdfcbank"
                          className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                        <button
                          onClick={handleAddNewPaymentMethod}
                          className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-500"
                        >
                          Save UPI
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Saved Methods List */}
                {savedPaymentMethods.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-400 border border-dashed rounded-xl">
                    No payment accounts saved yet. Add a card or UPI ID to enable one-click bill payment renewals.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {savedPaymentMethods.map((pm) => (
                      <div key={pm.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            {pm.type === 'card' ? <CreditCard className="w-4 h-4" /> : <QrCode className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="font-bold flex items-center gap-1.5">
                              {pm.type === 'card' ? `${pm.card?.brand} •••• ${pm.card?.last4}` : `UPI (${pm.upi?.vpa})`}
                              {pm.isDefault && (
                                <span className="text-[9px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {pm.type === 'card' ? `Exp: ${pm.card?.expMonth}/${pm.card?.expYear} • ${pm.card?.holderName}` : `Provider: ${pm.upi?.provider}`}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeletePaymentMethod(pm.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Billing Invoices Table */}
              <div className="p-5 rounded-2xl glass border border-slate-200/80 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-indigo-500" />
                    <h3 className="text-sm font-bold">Past Invoices & Tax Receipts</h3>
                  </div>
                  <button
                    onClick={fetchInvoices}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingInvoices ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {userInvoices.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400 border border-dashed rounded-xl space-y-2">
                    <FileText className="w-8 h-8 mx-auto text-slate-400/50" />
                    <div>No paid invoices generated yet.</div>
                    <button
                      onClick={() => setActiveTab('checkout')}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs"
                    >
                      Pay Your First Membership Bill
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[11px]">
                          <th className="pb-2.5">Invoice #</th>
                          <th className="pb-2.5">Date</th>
                          <th className="pb-2.5">Tier Plan</th>
                          <th className="pb-2.5">Amount</th>
                          <th className="pb-2.5">Payment Method</th>
                          <th className="pb-2.5">Status</th>
                          <th className="pb-2.5 text-right">Tax Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                        {userInvoices.map((inv) => (
                          <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                            <td className="py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">{inv.invoiceNumber}</td>
                            <td className="py-3 text-slate-500">{new Date(inv.paidAt).toLocaleDateString()}</td>
                            <td className="py-3 font-semibold">{inv.tier} ({inv.billingCycle})</td>
                            <td className="py-3 font-mono font-bold">{inv.currency} {inv.totalAmount.toFixed(2)}</td>
                            <td className="py-3 text-slate-500 truncate max-w-[120px]">{inv.paymentMethod}</td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                                PAID
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleDownloadInvoicePDF(inv)}
                                  className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white transition-colors text-[10px] font-bold inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400"
                                  title="Download PDF File"
                                >
                                  <Download className="w-3 h-3" />
                                  PDF
                                </button>
                                <button
                                  onClick={() => handleSaveInvoiceToGallery(inv)}
                                  className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-purple-600 hover:text-white transition-colors text-[10px] font-bold inline-flex items-center gap-1 text-purple-600 dark:text-purple-400"
                                  title="Save to Gallery"
                                >
                                  <Bookmark className="w-3 h-3" />
                                  Gallery
                                </button>
                                <button
                                  onClick={() => setViewingReceipt(inv)}
                                  className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white transition-colors text-[11px] font-bold inline-flex items-center gap-1"
                                >
                                  <Receipt className="w-3 h-3" />
                                  View
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Attribution */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500 font-mono flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">Shelby.ai</span>
            <span>•</span>
            <span>Founder: Shivam Kumar</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3 text-emerald-500" />
            <span>PCI-DSS Level 1 Certified • 100% Guaranteed SLA</span>
          </div>
        </div>
      </motion.div>

      {/* OFFICIAL INVOICE & RECEIPT MODAL VIEWER */}
      <AnimatePresence>
        {viewingReceipt && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 text-slate-800 dark:text-slate-100 relative"
            >
              <button
                onClick={() => setViewingReceipt(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Printable Receipt Container */}
              <div id="tax-invoice-receipt" className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between border-b pb-4 dark:border-slate-800">
                  <div>
                    <div className="text-xl font-extrabold font-display tracking-tight text-indigo-600 dark:text-indigo-400">
                      Shelby.ai Technologies
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">Official Tax Invoice & Payment Receipt</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">Founder: Shivam Kumar • GSTIN: 07AABCS1429B1Z8</div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider">
                      PAID & ACTIVE
                    </span>
                    <div className="text-xs font-mono font-bold mt-2 text-slate-700 dark:text-slate-300">
                      {viewingReceipt.invoiceNumber}
                    </div>
                  </div>
                </div>

                {/* Bill Details Grid */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Billed To Customer:</span>
                    <div className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">{viewingReceipt.userName}</div>
                    <div className="text-slate-500 font-mono">{viewingReceipt.userEmail}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Payment Metadata:</span>
                    <div className="font-mono mt-0.5">Date: {new Date(viewingReceipt.paidAt).toLocaleString()}</div>
                    <div className="font-mono text-slate-500">Ref: {viewingReceipt.paymentRef}</div>
                    <div className="font-mono text-slate-500">Method: {viewingReceipt.paymentMethod}</div>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="border rounded-xl overflow-hidden dark:border-slate-800 text-xs">
                  <table className="w-full border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">
                      <tr>
                        <th className="p-3 text-left">Description</th>
                        <th className="p-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                      {viewingReceipt.items?.map((it, i) => (
                        <tr key={i}>
                          <td className="p-3 text-slate-700 dark:text-slate-300">{it.description}</td>
                          <td className="p-3 text-right font-bold">{viewingReceipt.currency} {it.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="bg-slate-50/50 dark:bg-slate-900/50 font-bold text-sm">
                        <td className="p-3 text-slate-900 dark:text-white">Total Amount Paid</td>
                        <td className="p-3 text-right text-indigo-600 dark:text-indigo-400 font-extrabold">
                          {viewingReceipt.currency} {viewingReceipt.totalAmount.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Validity Note */}
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>
                    Your <strong>{viewingReceipt.tier}</strong> privileges are confirmed active through{' '}
                    <strong>{new Date(viewingReceipt.validUntil).toLocaleDateString()}</strong>.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSaveInvoiceToGallery(viewingReceipt)}
                    className="px-3.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold flex items-center gap-1.5 transition-colors border border-purple-500/20"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    Save PDF to Gallery
                  </button>
                  <button
                    onClick={() => handleDownloadInvoicePDF(viewingReceipt)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5 transition-colors border border-emerald-500/20"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print
                  </button>
                  <button
                    onClick={() => {
                      setViewingReceipt(null);
                      onClose();
                    }}
                    className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 text-xs font-extrabold transition-colors shadow-md"
                  >
                    Start Using {viewingReceipt.tier}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gallery Saved Toast Notification */}
      {gallerySavedToast && (
        <div className="fixed bottom-6 right-6 z-70 bg-slate-900 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Invoice successfully saved to your PDF Gallery!</span>
        </div>
      )}
    </div>
  );
}
