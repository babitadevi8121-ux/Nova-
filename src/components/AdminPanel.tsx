import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Users, MessageSquare, Image, DollarSign, Terminal, 
  Settings, RefreshCw, ChevronDown, Check, UserPlus, AlertCircle, Database, Flame, Eye, EyeOff, GraduationCap
} from 'lucide-react';
import { User, SystemStats } from '../types';
import UniversalDatabaseManager from './UniversalDatabaseManager';
import StudentPassManager from './StudentPassManager';
import { toast } from '../utils/toast';

interface AdminPanelProps {
  user: User | null;
  onClose: () => void;
  onProfileUpdate: (updatedUser: User) => void;
}

export default function AdminPanel({ user, onClose, onProfileUpdate }: AdminPanelProps) {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [showTierDropdown, setShowTierDropdown] = useState<string | null>(null);
  const [adminCode, setAdminCode] = useState('');
  const [showAdminCode, setShowAdminCode] = useState(false);
  const [promoStatus, setPromoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [promoError, setPromoError] = useState('');
  const [adminSubTab, setAdminSubTab] = useState<'overview' | 'student-passes' | 'firestore'>('student-passes');

  const handleVerifyAdminCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setPromoStatus('loading');
    setPromoError('');

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
      setPromoStatus('success');
      setAdminCode('');
    } catch (err: any) {
      setPromoStatus('error');
      setPromoError(err.message || 'Passcode verification failed');
    }
  };

  const fetchAdminData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Fetch Stats
      const statsRes = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${user.id}` }
      });
      const statsData = await statsRes.json();

      // Fetch Users
      const usersRes = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${user.id}` }
      });
      const usersData = await usersRes.json();

      if (statsRes.ok && usersRes.ok) {
        setStats(statsData);
        setUsers(usersData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [user]);

  const handleUpdateTier = async (targetUserId: string, tier: 'Free' | 'Pro' | 'Premium' | 'Ultra Premium') => {
    if (!user) return;
    setUpdatingUserId(targetUserId);
    try {
      const response = await fetch(`/api/admin/users/${targetUserId}/tier`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify({ tier })
      });

      if (response.ok) {
        // Update local users table
        setUsers(prev => prev.map(u => u.id === targetUserId ? { ...u, subscriptionTier: tier } : u));
        setShowTierDropdown(null);
        // Refresh statistics
        fetchAdminData();
      }
    } catch (err) {
      toast.error('Failed to update user tier: ' + err);
    } finally {
      setUpdatingUserId(null);
    }
  };

  if (user?.role !== 'Admin') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-slate-800 dark:text-slate-100 bg-slate-50/10 dark:bg-slate-950/10">
        <div className="max-w-md w-full rounded-2xl glass border border-red-500/30 dark:border-red-900/50 p-6 md:p-8 space-y-5 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute right-0 top-0 -mr-6 -mt-6 w-28 h-28 bg-red-500/15 rounded-full blur-2xl pointer-events-none animate-pulse" />
          
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-red-600 to-amber-600 border border-red-400/40 flex items-center justify-center text-white shadow-xl shadow-red-600/20">
            <ShieldAlert className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-1.5">
            <h2 className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white">
              Special Admin Access Code
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Administrative credentials are required to decrypt secure node metrics and monitor server activity in the system terminal.
            </p>
          </div>

          <form onSubmit={handleVerifyAdminCode} className="space-y-3.5 text-left">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">System Passcode</label>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showAdminCode ? 'text' : 'password'}
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder="Enter authorized special admin passcode..."
                  required
                  className="w-full pl-3.5 pr-10 py-2.5 text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 font-mono tracking-widest text-center uppercase font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminCode(!showAdminCode)}
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  title={showAdminCode ? 'Hide passcode' : 'Show passcode'}
                >
                  {showAdminCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {promoStatus === 'error' && (
              <div className="p-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-[11px] font-bold text-center border border-red-500/20">
                ⚠️ {promoError}
              </div>
            )}

            {promoStatus === 'success' && (
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold text-center border border-emerald-500/20">
                ✓ Special Admin Access Granted! Synchronizing root node state...
              </div>
            )}

            <button
              type="submit"
              disabled={promoStatus === 'loading'}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/20 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {promoStatus === 'loading' ? 'Verifying Credentials...' : '👑 Decrypt & Authorize Terminal'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 text-slate-500 dark:text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-indigo-600 mb-2" />
        <p className="text-xs font-semibold">Decrypting administrative records...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 text-slate-800 dark:text-slate-100 bg-slate-50/10 dark:bg-slate-950/10">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-850 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-xl tracking-tight">Admin System Terminal</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono">Shelby.ai</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Shelby.ai Neural Infrastructure • Founder: Shivam Kumar • System node analytics & access.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex p-1 bg-slate-200/60 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setAdminSubTab('student-passes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                adminSubTab === 'student-passes'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-500 hover:text-emerald-400'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student Passes (JPEG/PDF/PNG)</span>
            </button>
            <button
              onClick={() => setAdminSubTab('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                adminSubTab === 'overview'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              Node Overview
            </button>
            <button
              onClick={() => setAdminSubTab('firestore')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                adminSubTab === 'firestore'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-indigo-400 hover:text-indigo-300'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Universal Firestore ♾️</span>
            </button>
          </div>

          <button
            onClick={fetchAdminData}
            className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-all flex items-center gap-1 text-xs font-bold cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reload
          </button>
        </div>
      </div>

      {adminSubTab === 'student-passes' ? (
        <div className="mt-2">
          <StudentPassManager user={user} />
        </div>
      ) : adminSubTab === 'firestore' ? (
        <div className="mt-2">
          <UniversalDatabaseManager user={user} />
        </div>
      ) : (
        <>
          {/* Grid of system stats cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Registered Node Users', value: stats.totalUsers, icon: Users, color: 'text-indigo-500 bg-indigo-500/10' },
            { label: 'Chat Sessions', value: stats.totalChats, icon: MessageSquare, color: 'text-purple-500 bg-purple-500/10' },
            { label: 'Messages Sent', value: stats.totalMessages, icon: MessageSquare, color: 'text-emerald-500 bg-emerald-500/10' },
            { label: 'Paint Generations', value: stats.totalImagesGenerated, icon: Image, color: 'text-pink-500 bg-pink-500/10' },
            { label: 'Monthly Revenue Metric', value: `$${stats.revenue}`, icon: DollarSign, color: 'text-amber-500 bg-amber-500/10' }
          ].map((card, idx) => (
            <div key={idx} className="rounded-xl glass border border-slate-200/60 dark:border-white/5 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{card.label}</span>
                <div className={`p-1.5 rounded-lg ${card.color}`}>
                  <card.icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xl font-black font-display mt-3">{card.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Users Management Panel */}
        <div className="lg:col-span-2 rounded-2xl glass border border-slate-200/60 dark:border-white/5 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm font-display tracking-tight text-slate-500">Registered Accounts</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              {users.length} Active Node Users
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-2.5">User Identity</th>
                  <th className="py-2.5">Email</th>
                  <th className="py-2.5">Joined Date</th>
                  <th className="py-2.5">Active Membership</th>
                  <th className="py-2.5 text-right">Edit Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 dark:divide-slate-850">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-200/25 dark:hover:bg-slate-900/10 transition-all">
                    <td className="py-3.5 font-bold flex items-center gap-2">
                      <div className="w-7 h-7 rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-[10px] uppercase">
                        {u.name.substring(0, 2)}
                      </div>
                      <span>{u.name}</span>
                    </td>
                    <td className="py-3.5 text-slate-500 font-mono">{u.email}</td>
                    <td className="py-3.5 text-slate-400 font-mono">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        u.subscriptionTier === 'Ultra Premium'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : u.subscriptionTier === 'Premium' 
                          ? 'bg-pink-500/10 text-pink-600 dark:text-pink-400' 
                          : u.subscriptionTier === 'Pro' 
                          ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' 
                          : 'bg-slate-500/10 text-slate-600'
                      }`}>
                        {u.subscriptionTier}
                      </span>
                    </td>
                    <td className="py-3.5 text-right relative">
                      <button
                        onClick={() => setShowTierDropdown(showTierDropdown === u.id ? null : u.id)}
                        disabled={updatingUserId !== null}
                        className="px-2 py-1 border border-slate-250 dark:border-slate-800 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-[10px] font-bold flex items-center gap-1 inline-flex cursor-pointer"
                      >
                        Change
                        <ChevronDown className="w-3 h-3" />
                      </button>

                      {showTierDropdown === u.id && (
                        <div className="absolute right-0 mt-1 w-28 rounded-lg glass border border-slate-200 dark:border-slate-850 p-1 shadow-2xl z-50 text-left">
                          {['Free', 'Pro', 'Premium', 'Ultra Premium'].map(tier => (
                            <button
                              key={tier}
                              onClick={() => handleUpdateTier(u.id, tier as any)}
                              className="w-full px-2.5 py-1.5 text-[10px] font-semibold rounded hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 block text-left font-sans"
                            >
                              {tier} Plan
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time System Log Console */}
        <div className="rounded-2xl glass border border-slate-200/60 dark:border-white/5 p-5 shadow-sm space-y-4 flex flex-col h-[380px]">
          <div className="flex items-center gap-1.5 shrink-0">
            <Terminal className="w-4 h-4 text-indigo-500" />
            <h3 className="font-bold text-sm font-display tracking-tight text-slate-500">Live Server Activity Console</h3>
          </div>

          <div className="flex-1 bg-slate-950 rounded-xl p-4 font-mono text-[10px] overflow-y-auto leading-relaxed border border-white/5 shadow-inner">
            {stats && stats.recentLogs.map(log => {
              const isError = log.level === 'error';
              const isWarn = log.level === 'warn';

              return (
                <div key={log.id} className="mb-2 last:mb-0 break-all border-b border-white/5 pb-1">
                  <span className="text-slate-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>{' '}
                  <span className={`font-black uppercase ${isError ? 'text-red-500' : isWarn ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {log.level}
                  </span>:{' '}
                  <span className="text-slate-300">{log.message}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </>
      )}

    </div>
  );
}
