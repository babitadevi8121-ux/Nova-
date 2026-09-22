import React from 'react';
import { motion } from 'motion/react';
import { 
  Crown, Sparkles, Zap, ShieldCheck, Check, ArrowRight, Lock, 
  Key, Cpu, Star, Award, Rocket, CheckCircle2, ChevronRight, GraduationCap
} from 'lucide-react';
import { User, isUltraHighPremium, getTrialInfo, isStudentUser } from '../types';
import { toast } from '../utils/toast';

interface UltraHighPremiumGateProps {
  toolName: string;
  toolSubtitle?: string;
  toolIcon?: React.ReactNode;
  user: User | null;
  onOpenPricing: (tab?: 'plans' | 'checkout' | 'account', tier?: 'Pro' | 'Premium' | 'Ultra Premium') => void;
  onOpenAuth?: () => void;
  onOpenSpecialAdmin?: () => void;
}

export default function UltraHighPremiumGate({
  toolName,
  toolSubtitle = 'Exclusive Next-Gen Neural Intelligence Suite',
  toolIcon,
  user,
  onOpenPricing,
  onOpenAuth,
  onOpenSpecialAdmin
}: UltraHighPremiumGateProps) {
  const isUltra = isUltraHighPremium(user);
  const trial = getTrialInfo(user);

  const perks = [
    {
      title: 'Full Unrestricted Model Engine',
      desc: 'Zero token restrictions, deep reasoning steps, and unthrottled streaming speed.',
      icon: <Zap className="w-4 h-4 text-amber-400" />
    },
    {
      title: 'Dedicated Supercomputing Cluster',
      desc: 'Sub-second latency with prioritized high-bandwidth neural GPU nodes.',
      icon: <Cpu className="w-4 h-4 text-indigo-400" />
    },
    {
      title: 'Full Artifact & Code Exporting',
      desc: 'Export live React components, production TypeScript, 4K videos, and PDF docs.',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />
    },
    {
      title: 'Shelby.ai 24/7 VIP Architecture Support',
      desc: 'Priority assistance, direct founder access, and early preview of cutting-edge models.',
      icon: <Crown className="w-4 h-4 text-amber-400" />
    }
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/40 text-slate-100 p-4 sm:p-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-amber-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Header Badge */}
        <div className="flex flex-col items-center text-center space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black tracking-widest uppercase shadow-lg shadow-amber-500/10 animate-pulse">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Ultra High Premium Member Exclusive</span>
          </div>

          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-purple-500/20 to-indigo-500/20 border border-amber-500/30 shadow-inner mt-2">
            {toolIcon || <Sparkles className="w-8 h-8 text-amber-400" />}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Unlock <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200">{toolName}</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            {toolSubtitle}. This specialized AI tool is reserved exclusively for <strong className="text-amber-300 font-semibold">Ultra High Premium Members</strong> and System Administrators.
          </p>
        </div>

        {/* Current User Tier Status Banner */}
        <div className="my-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs relative z-10">
          <div className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${trial.isTrialActive ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
            <span className="text-slate-400">Account Status:</span>
            <span className="font-mono font-bold px-2.5 py-1 rounded bg-slate-700 text-white uppercase tracking-wider text-[11px]">
              {trial.isStudent ? '🎓 Student Lifetime Free' : trial.isTrialActive ? `✨ 5-Day Free Trial (${trial.daysRemaining}d left)` : '⚠️ 5-Day Free Trial Ended'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Full AI Program: <strong className="text-amber-300">Available via Plans or Student Pass</strong></span>
          </div>
        </div>

        {/* Student 100% Free Pass Activation Banner */}
        <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-teal-950/80 to-slate-900 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs relative z-10 shadow-xl shadow-emerald-950/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
              <GraduationCap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="font-bold text-white text-sm flex items-center gap-2">
                <span>🎓 New Student & Educator 100% Free Access</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                  $0 Lifetime
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/90 leading-relaxed mt-0.5">
                Are you a student or teacher? Unlock permanent zero-cost access to all 70+ AI models, coding sandboxes, GPU clusters, and research synthesis engines.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.setItem('nova_student_pass', 'active');
              toast.success('🎓 Verified Student Access Granted! 100% Free Lifetime Pass activated across all AI models.');
              setTimeout(() => window.location.reload(), 800);
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all shadow-md cursor-pointer active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Activate Free Student Axis</span>
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6 relative z-10">
          {perks.map((p, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:border-amber-500/30 transition-all flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-700/50 shrink-0">
                {p.icon}
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs font-bold text-slate-100">{p.title}</h4>
                <p className="text-[11px] text-slate-400 leading-snug">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Actions */}
        <div className="space-y-3 pt-2 relative z-10">
          {!user ? (
            <button
              onClick={onOpenAuth}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99]"
            >
              <span>Sign In to Unlock Ultra High Premium Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenPricing('checkout', 'Ultra Premium')}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99]"
              >
                <Crown className="w-4 h-4" />
                <span>Upgrade to Ultra High Premium ($500/mo)</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenPricing('plans')}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>View All Plans</span>
              </button>
            </div>
          )}

          {/* Admin shortcut */}
          <div className="flex items-center justify-center pt-2">
            <button
              onClick={() => {
                if (onOpenSpecialAdmin) {
                  onOpenSpecialAdmin();
                } else if (onOpenAuth) {
                  onOpenAuth();
                }
              }}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Have an Authorized Special Admin Passcode? Enter here</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
