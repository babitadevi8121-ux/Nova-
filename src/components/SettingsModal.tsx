import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, User, Mail, Shield, Keyboard, Volume2, Moon, Sun, Sparkles, Check, Monitor, Copy, Key, Laptop, Info, Building2, Award, CreditCard, Receipt, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { User as UserType } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  onProfileUpdate: (updatedUser: UserType) => void;
  themeMode: 'light' | 'dark' | 'auto';
  onChangeThemeMode: (mode: 'light' | 'dark' | 'auto') => void;
  selectedModel: string;
  onChangeModel: (model: string) => void;
  onOpenPricing?: (tab?: 'plans' | 'checkout' | 'account', tier?: 'Pro' | 'Premium' | 'Ultra Premium') => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  user,
  onProfileUpdate,
  themeMode,
  onChangeThemeMode,
  selectedModel,
  onChangeModel,
  onOpenPricing
}: SettingsModalProps) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [selectedVoice, setSelectedVoice] = useState('Zephyr');
  const [updating, setUpdating] = useState(false);
  const [msg, setMsg] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [copiedKey, setCopiedKey] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [showAdminCode, setShowAdminCode] = useState(false);
  const [adminStatus, setAdminStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [adminError, setAdminError] = useState('');

  const handleCopyLicense = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleVerifyAdminCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setAdminStatus('loading');
    setAdminError('');

    try {
      const response = await fetch('/api/auth/promote-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify({ code: adminCode })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Invalid passcode');
      }

      onProfileUpdate(data.user);
      setAdminStatus('success');
      setAdminCode('');
    } catch (err: any) {
      setAdminStatus('error');
      setAdminError(err.message || 'Passcode verification failed');
    }
  };

  if (!isOpen) return null;

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);
    setMsg('');

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify({ name, email })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      onProfileUpdate(data.user);
      setMsg('Profile updated successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err: any) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-2xl rounded-2xl glass p-6 shadow-2xl border border-white/20 dark:border-white/10 text-slate-800 dark:text-slate-100 flex flex-col md:flex-row gap-6 relative max-h-[90vh] overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sidebar Tabs */}
        <div className="w-full md:w-48 flex flex-row md:flex-col gap-1 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-850 pb-4 md:pb-0 pr-0 md:pr-4 shrink-0">
          <div className="hidden md:flex items-center gap-2 mb-4 px-2">
            <User className="w-4 h-4 text-indigo-500" />
            <h2 className="font-bold font-display text-sm">Settings</h2>
          </div>

          {[
            { id: 'profile', label: 'My Profile', icon: User },
            { id: 'billing', label: 'Billing & Invoices', icon: Receipt },
            { id: 'preferences', label: 'Preferences', icon: Volume2 },
            { id: 'shortcuts', label: 'Shortcuts', icon: Keyboard },
            { id: 'admin', label: 'Admin Access', icon: Shield },
            { id: 'about', label: 'About & Company', icon: Info }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-left transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-200 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="flex-1 overflow-y-auto pr-1">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-base font-display">Profile Settings</h3>
                <p className="text-xs text-slate-500">Update your account identity and login email details.</p>
              </div>

              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Display Name</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your Name"
                      className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Email Address</label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email Address"
                      className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>



                {/* Subscription Tier display */}
                <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Plan Membership</span>
                    <p className="text-sm font-bold mt-0.5">Nova {user?.subscriptionTier || 'Free'}</p>
                  </div>
                  <span className="text-xs py-1 px-2.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wide">Active</span>
                </div>

                {/* Windows 11 Pro Lifetime License Section */}
                {user?.subscriptionTier === 'Ultra Premium' ? (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-500/30 dark:border-amber-500/20 relative overflow-hidden">
                    <div className="absolute right-0 top-0 -mr-6 -mt-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
                        <Laptop className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded">Ultra Exclusive Benefit</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1">Windows 11 Pro Lifetime Edition</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Your official retail activation product license key:</p>
                        
                        <div className="mt-2.5 flex items-center gap-2 bg-slate-200/60 dark:bg-slate-900/80 p-2 rounded-lg border border-slate-300 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 select-all justify-between">
                          <span className="tracking-widest font-bold">W269N-WFGWX-YVC9B-4J6C9-T83GX</span>
                          <button
                            type="button"
                            onClick={() => handleCopyLicense('W269N-WFGWX-YVC9B-4J6C9-T83GX')}
                            className="p-1 rounded hover:bg-slate-300 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0"
                            title="Copy License Key"
                          >
                            {copiedKey ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1">
                          <Key className="w-3 h-3 text-amber-500" />
                          <span>Guaranteed lifetime activation on 1 PC. Genuine retail key.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/40 relative overflow-hidden">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 shrink-0">
                        <Laptop className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Locked Benefit</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-450 dark:text-slate-500 mt-1">Windows 11 Pro Lifetime License</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Upgrade to <span className="text-amber-500 font-semibold">Ultra Premium</span> to receive a genuine, lifetime retail Windows 11 Pro product key instantly.</p>
                      </div>
                    </div>
                  </div>
                )}

                {msg && (
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-500" />
                    {msg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={updating}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs transition-all disabled:opacity-50"
                >
                  {updating ? 'Saving...' : 'Save Profile Details'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-base font-display">Billing & Subscription Account</h3>
                <p className="text-xs text-slate-500">Manage your active membership bills, payment accounts, and tax receipts.</p>
              </div>

              {/* Current Tier Box */}
              <div className="p-4 rounded-xl glass border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Current Active Membership</span>
                  <div className="text-lg font-bold font-display text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {user?.subscriptionTier || 'Free'} Member
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Account: {user?.email}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenPricing?.('plans');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg text-xs hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/15"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Upgrade Plan
                </button>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div 
                  onClick={() => {
                    onClose();
                    onOpenPricing?.('checkout');
                  }}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 cursor-pointer bg-slate-50/50 dark:bg-slate-900/40 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <h4 className="font-bold text-xs mt-3 text-slate-800 dark:text-slate-200">Pay Subscription Bill</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Process payment for Pro ($15), Premium ($30), or Ultra High ($500) via Card, UPI, PayPal, or Crypto.
                  </p>
                </div>

                <div 
                  onClick={() => {
                    onClose();
                    onOpenPricing?.('account');
                  }}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 cursor-pointer bg-slate-50/50 dark:bg-slate-900/40 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Receipt className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <h4 className="font-bold text-xs mt-3 text-slate-800 dark:text-slate-200">Payment Accounts & Invoices</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    View official tax invoices, download PDF receipts, and manage saved billing accounts.
                  </p>
                </div>
              </div>

              {/* Security Banner */}
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>All billing transactions and payment methods are protected by PCI-DSS Level 1 enterprise encryption.</span>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-base font-display">System Preferences</h3>
                <p className="text-xs text-slate-500">Configure default voice interfaces and client-side visualization.</p>
              </div>

              {/* Theme Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500">Visual Aesthetic Theme</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => onChangeThemeMode('dark')}
                    className={`py-3 px-3 rounded-xl border flex items-center justify-between gap-2 text-xs font-bold transition-all cursor-pointer ${
                      themeMode === 'dark'
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                        : 'border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Moon className="w-4 h-4 shrink-0" />
                      Dark Cosmic
                    </span>
                    {themeMode === 'dark' && <Check className="w-4 h-4 text-indigo-500 shrink-0" />}
                  </button>

                  <button
                    onClick={() => onChangeThemeMode('light')}
                    className={`py-3 px-3 rounded-xl border flex items-center justify-between gap-2 text-xs font-bold transition-all cursor-pointer ${
                      themeMode === 'light'
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                        : 'border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Sun className="w-4 h-4 shrink-0" />
                      Solar Light
                    </span>
                    {themeMode === 'light' && <Check className="w-4 h-4 text-indigo-500 shrink-0" />}
                  </button>

                  <button
                    onClick={() => onChangeThemeMode('auto')}
                    className={`py-3 px-3 rounded-xl border flex items-center justify-between gap-2 text-xs font-bold transition-all cursor-pointer ${
                      themeMode === 'auto'
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                        : 'border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 shrink-0" />
                      System Auto
                    </span>
                    {themeMode === 'auto' && <Check className="w-4 h-4 text-indigo-500 shrink-0" />}
                  </button>
                </div>
              </div>

              {/* Text to Speech Preferred voice */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500">Preferred AI Speech Voice (TTS)</label>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold focus:outline-none"
                >
                  <option value="Zephyr">🌪️ Zephyr (Default Male, Crisp & Professional)</option>
                  <option value="Kore">🌟 Kore (Sincere & Cheerful Female)</option>
                  <option value="Puck">⚡ Puck (High Energy Dramatic Speaker)</option>
                  <option value="Charon">🪐 Charon (Calm, Warm & Deep Narrator)</option>
                </select>
              </div>

              {/* Default Chat Model */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500">Preferred Conversation Intelligence</label>
                <select
                  value={selectedModel}
                  onChange={(e) => onChangeModel(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold focus:outline-none"
                >
                  <option value="chatgpt-6-astra">✨ ChatGPT-6 Astra (Omnimodal Quantum Reasoning)</option>
                  <option value="gemini-3.8-flash">💡 Gemini 3.8 Flash (Instant Speed)</option>
                  <option value="gemini-3.1-pro-preview">🧠 Gemini 3.1 Pro Preview (In-depth Reasoning)</option>
                  <option value="claude-3-7-sonnet">🎭 Claude 3.7 Sonnet (Hybrid Reasoning & Code)</option>
                  <option value="claude-3-5-sonnet">⚡ Claude 3.5 Sonnet (Artifacts & Precision)</option>
                  <option value="grok-ai">🤖 Grok AI (Witty & Sarcastic Mode)</option>
                  <option value="gork-ai">🤖 Gork AI (Chaos & Rebellious Mode)</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'shortcuts' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-base font-display">Keyboard Shortcuts</h3>
                <p className="text-xs text-slate-500">Boost your operational speed using optimized system triggers.</p>
              </div>

              <div className="space-y-3">
                {[
                  { trigger: '⌘ + N', action: 'Spawn a clean conversation thread' },
                  { trigger: 'Enter', action: 'Submit active prompt content' },
                  { trigger: 'Shift + Enter', action: 'Create a paragraph break line' },
                  { trigger: 'Esc', action: 'Dismiss any active popup or utility card' }
                ].map((shortcut, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-150 dark:border-slate-850 text-xs">
                    <span className="text-slate-500 dark:text-slate-400">{shortcut.action}</span>
                    <kbd className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold border border-slate-300 dark:border-slate-700">
                      {shortcut.trigger}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-base font-display flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-500" />
                  <span>Administrative System Access</span>
                </h3>
                <p className="text-xs text-slate-500">Elevate your node credentials with authorized Special Admin Access Codes.</p>
              </div>

              {user?.role === 'Admin' ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">Special Admin Access Active</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Account Role: <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">Administrator (Super AI Unlimited)</span></p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    You have unlocked the full **Admin System Terminal** and root capabilities. You can monitor live node activity, adjust member tiers, and review core service metrics via the **Workspace Analytics** tab in your sidebar.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleVerifyAdminCode} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">Special Admin Access Code</label>
                    <div className="relative flex items-center">
                      <Key className="absolute left-3 w-4 h-4 text-slate-400" />
                      <input
                        type={showAdminCode ? 'text' : 'password'}
                        value={adminCode}
                        onChange={(e) => setAdminCode(e.target.value)}
                        placeholder="Enter authorized special admin passcode..."
                        required
                        className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 font-mono tracking-wider uppercase font-bold"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAdminCode(!showAdminCode)}
                        className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                        title={showAdminCode ? 'Hide passcode' : 'Show passcode'}
                      >
                        {showAdminCode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {adminStatus === 'error' && (
                    <div className="p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      {adminError}
                    </div>
                  )}

                  {adminStatus === 'success' && (
                    <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      Special Admin Access verified! Elevated to Administrator with Super AI Unlimited.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={adminStatus === 'loading'}
                    className="w-full py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-lg text-xs transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-red-600/10"
                  >
                    {adminStatus === 'loading' ? 'Verifying Credentials...' : 'Verify Special Admin Code & Elevate'}
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-base font-display">About Nova AI</h3>
                <p className="text-xs text-slate-500">Corporate identity, founder credentials, and core engine specifications.</p>
              </div>

              {/* Founder & Company Profile Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base font-display text-slate-800 dark:text-slate-100">Nova AI Platform</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-mono">v2.5 Pro</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Developed & Operated by Shelby.ai</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/60 dark:border-white/10">
                  <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-white/5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Founder & Creator</span>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-indigo-500" />
                      Shivam Kumar
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-white/5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Parent Organization</span>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-purple-500" />
                      Shelby.ai
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Founded by <strong className="font-semibold text-indigo-600 dark:text-indigo-400">Shivam Kumar</strong>, <strong className="font-semibold text-slate-800 dark:text-slate-200">Shelby.ai</strong> is dedicated to delivering state-of-the-art superintelligence tools, real-time multimodal conversational agents, digital synthesis engines, and developer ecosystems.
                </p>
              </div>

              {/* System Specs */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Platform Specifications</h4>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400">Core Neural Stack</span>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">Gemini 3.5 & 3.1 Pro Engines</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400">Voice Synthesis</span>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">Google Cloud TTS & Web Speech</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400">Architecture</span>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">High-Concurrency Cloud Runtime</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Organization</span>
                    <span className="text-indigo-500 font-semibold">Shelby.ai • Shivam Kumar</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
