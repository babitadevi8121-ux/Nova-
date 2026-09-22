import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Sparkles, CheckCircle2, Key, ShieldAlert, ShieldCheck, Eye, EyeOff, GraduationCap, Zap } from 'lucide-react';
import { User as UserType } from '../types';
import { auth, loginWithGoogle, loginAnonymously } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserType, token: string) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'special' | 'student'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isStudentRegistration, setIsStudentRegistration] = useState(false);
  const [specialAdminCode, setSpecialAdminCode] = useState('');
  const [studentPassCode, setStudentPassCode] = useState('');
  const [showSpecialCode, setShowSpecialCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleAuthCompleted = (userData: UserType, tokenStr: string) => {
    const finalUser = { ...userData };
    if (isStudentRegistration || (finalUser.email && (finalUser.email.includes('.edu') || finalUser.email.includes('.ac.') || finalUser.email.toLowerCase().includes('student')))) {
      finalUser.isStudent = true;
      finalUser.studentVerified = true;
      localStorage.setItem('nova_student_pass', 'active');
    }
    // Initialize 5-day trial start time if not stored
    const trialKey = `nova_trial_start_${finalUser.id}`;
    if (!localStorage.getItem(trialKey)) {
      localStorage.setItem(trialKey, new Date().toISOString());
    }
    onAuthSuccess(finalUser, tokenStr);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Student Passcode Direct Redemption & Login
      if (authMode === 'student') {
        if (!studentPassCode.trim()) {
          throw new Error('Please enter your Student Passcode');
        }

        const response = await fetch('/api/student-passes/redeem', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: studentPassCode.trim(),
            name: name.trim() || 'Verified Student Scholar',
            email: email.trim() || `student_${Math.random().toString(36).substring(7)}@academic.edu`
          })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Student passcode verification failed');
        }

        localStorage.setItem('nova_student_pass', 'active');
        setSuccessMsg('🎓 Student Pass Verified! 100% Free Lifetime Access Activated.');
        
        // Construct verified user object
        const studentUser: UserType = {
          id: data.pass?.redeemedBy?.userId || `stu-user-${Date.now()}`,
          email: email.trim() || 'student@academic.edu',
          name: name.trim() || data.pass?.studentName || 'Student Scholar',
          role: 'User',
          subscriptionTier: 'Ultra Premium',
          isUnlimited: true,
          isStudent: true,
          studentVerified: true,
          createdAt: new Date().toISOString()
        };

        setTimeout(() => {
          handleAuthCompleted(studentUser, studentUser.id);
        }, 1200);
        return;
      }

      // Special Admin Code Direct Login
      if (authMode === 'special') {
        if (!specialAdminCode.trim()) {
          throw new Error('Please enter your Special Admin Access Code');
        }

        const response = await fetch('/api/auth/special-admin-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: specialAdminCode.trim(),
            email: email.trim() || 'admin@nova.ai',
            name: name.trim() || 'System Administrator'
          })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Special admin access code verification failed');
        }

        setSuccessMsg('👑 Special Admin Access Verified! Root Privileges Granted.');
        setTimeout(() => {
          handleAuthCompleted(data.user, data.token);
        }, 1200);
        return;
      }

      let targetEmail = email;
      let targetPassword = password;
      let targetName = name;
      let targetPhone = '';

      // 1. Check if utilizing standard demo/admin credentials for quick local developer test
      const isDemo = targetEmail.toLowerCase() === 'demo@nova.ai' || targetEmail.toLowerCase() === 'admin@nova.ai';

      if (isDemo && authMode === 'login') {
        targetPassword = targetEmail.toLowerCase() === 'admin@nova.ai' ? 'admin123' : 'demo123';
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: targetEmail, password: targetPassword })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Something went wrong');
        }

        handleAuthCompleted(data.user, data.token);
        return;
      }

      // 2. Otherwise, use real Firebase Authentication with graceful fallback to local secure database
      if (authMode === 'login') {
        // Firebase Login
        try {
          const credential = await signInWithEmailAndPassword(auth, targetEmail, targetPassword);
          const fbUser = credential.user;

          // Sync with backend local ServerDb
          const response = await fetch('/api/auth/firebase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uid: fbUser.uid,
              email: fbUser.email,
              name: fbUser.displayName || targetName,
              phone: targetPhone,
              password: targetPassword
            })
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || 'Server database synchronization failed');
          }

          handleAuthCompleted(data.user, data.token);
        } catch (fbErr: any) {
          console.warn('Firebase login failed or disabled, falling back to local database authentication...', fbErr);
          // Try to log in against the local secure database
          try {
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: targetEmail, password: targetPassword })
            });

            const data = await response.json();
            if (!response.ok) {
              throw new Error(data.error || 'Invalid email or password');
            }

            handleAuthCompleted(data.user, data.token);
          } catch (localErr: any) {
            throw new Error(localErr.message || 'Invalid email or password');
          }
        }
      } else {
        // Firebase Signup (authMode === 'signup')
        try {
          const credential = await createUserWithEmailAndPassword(auth, targetEmail, targetPassword);
          const fbUser = credential.user;

          // Update profile displayName
          await updateProfile(fbUser, { displayName: name });

          // Sync with backend local ServerDb
          const response = await fetch('/api/auth/firebase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uid: fbUser.uid,
              email: fbUser.email,
              name: name,
              phone: targetPhone,
              password: targetPassword
            })
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || 'Server database synchronization failed');
          }

          setSuccessMsg('Firebase account created and synced successfully!');
          setTimeout(() => {
            handleAuthCompleted(data.user, data.token);
          }, 1500);
        } catch (fbErr: any) {
          console.warn('Firebase signup failed or disabled, falling back to local database signup...', fbErr);
          // Fallback to local secure database signup directly
          try {
            const response = await fetch('/api/auth/signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: targetEmail,
                password: targetPassword,
                name: name
              })
            });

            const data = await response.json();
            if (!response.ok) {
              throw new Error(data.error || 'Signup failed');
            }

            setSuccessMsg('Account created successfully (Local secure database synced)!');
            setTimeout(() => {
              handleAuthCompleted(data.user, data.token);
            }, 1500);
          } catch (localErr: any) {
            throw new Error(localErr.message || 'Signup failed');
          }
        }
      }
    } catch (err: any) {
      console.error(err);
      let errMsg = err.message || 'Authentication failed';
      if (err.code === 'auth/invalid-credential') {
        errMsg = 'Invalid email or password.';
      } else if (err.code === 'auth/email-already-in-use') {
        errMsg = 'This email is already in use.';
      } else if (err.code === 'auth/weak-password') {
        errMsg = 'Password is too weak. Must be at least 6 characters.';
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);
    try {
      const fbUser = await loginWithGoogle();
      if (!fbUser) throw new Error('Google sign-in cancelled or failed');

      // Sync with backend local ServerDb
      const response = await fetch('/api/auth/firebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: fbUser.uid,
          email: fbUser.email,
          name: fbUser.displayName || 'Google User',
          photoURL: fbUser.photoURL || '',
          password: `google-auth-${fbUser.uid}`
        })
      });

      const data = await response.json();
      if (response.ok) {
        handleAuthCompleted(data.user, data.token);
      } else {
        // Fallback user object
        const fallbackUser: UserType = {
          id: fbUser.uid,
          email: fbUser.email || 'user@google.com',
          name: fbUser.displayName || 'Google User',
          role: fbUser.email === 'babitadevi8121@gmail.com' ? 'Admin' : 'User',
          subscriptionTier: fbUser.email === 'babitadevi8121@gmail.com' ? 'Super AI' : 'Pro',
          isUnlimited: true,
          createdAt: new Date().toISOString()
        };
        handleAuthCompleted(fallbackUser, fbUser.uid);
      }
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setError(err.message || 'Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAuth = async () => {
    setError('');
    setLoading(true);
    try {
      const fbUser = await loginAnonymously();
      const guestUser: UserType = {
        id: fbUser.uid,
        email: `guest_${fbUser.uid.substring(0, 6)}@nova.ai`,
        name: 'Guest Analyst ♾️',
        role: 'User',
        subscriptionTier: 'Free',
        isUnlimited: false,
        createdAt: new Date().toISOString()
      };
      handleAuthCompleted(guestUser, fbUser.uid);
    } catch (err: any) {
      console.error('Guest Auth Error:', err);
      // Fallback guest user
      const guestId = 'guest_' + Math.random().toString(36).substring(2, 9);
      const guestUser: UserType = {
        id: guestId,
        email: `${guestId}@nova.ai`,
        name: 'Guest Analyst ♾️',
        role: 'User',
        subscriptionTier: 'Free',
        isUnlimited: false,
        createdAt: new Date().toISOString()
      };
      handleAuthCompleted(guestUser, guestId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="auth-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl glass p-8 shadow-2xl border border-white/20 dark:border-white/10 text-slate-800 dark:text-slate-100"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-md mb-2">
            {authMode === 'special' ? (
              <ShieldAlert className="w-6 h-6 text-white animate-pulse" />
            ) : (
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            )}
          </div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            {authMode === 'login' ? 'Welcome Back' : authMode === 'signup' ? 'Create Nova Account' : 'Special Admin Access'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 text-center">
            {authMode === 'login' 
              ? 'Access your intelligent workspace (5 Days Free AI Access)' 
              : authMode === 'signup' 
              ? 'Start your journey with 5 days of free full AI access'
              : 'Enter authorized administrative code for root elevation'}
          </p>
        </div>

        {/* 5-Day Free Trial Notice Banner */}
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-emerald-500/10 border border-indigo-500/20 text-xs flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
          <div className="space-y-0.5 text-slate-700 dark:text-slate-200">
            <div className="font-bold flex items-center gap-1.5">
              <span>✨ 5-Day Free AI Trial on Login</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-extrabold">All 70+ Models</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Every account receives 5 days of unrestricted access. Verified students and educators receive <strong>100% Free Lifetime Access</strong> ($0 forever).
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex p-1 bg-slate-200/60 dark:bg-slate-900/40 rounded-lg mb-6 gap-1">
          <button
            onClick={() => { setAuthMode('login'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setAuthMode('signup'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              authMode === 'signup'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => { setAuthMode('student'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center justify-center gap-1 ${
              authMode === 'student'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm font-bold'
                : 'text-emerald-500 hover:text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/10'
            }`}
          >
            <GraduationCap className="w-3 h-3" />
            <span>Student Pass</span>
          </button>
          <button
            onClick={() => { setAuthMode('special'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center justify-center gap-1 ${
              authMode === 'special'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-sm font-bold'
                : 'text-red-500 hover:text-red-700 dark:text-red-400 hover:bg-red-500/10'
            }`}
          >
            <Key className="w-3 h-3" />
            <span>Admin Code</span>
          </button>
        </div>

        {/* Forms */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {authMode === 'student' ? (
              <motion.div
                key="student-mode"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-3.5"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-bold tracking-wide text-emerald-600 dark:text-emerald-400 uppercase flex items-center justify-between">
                    <span>Student / Educator Passcode</span>
                    <span className="text-[9px] font-mono lowercase">100% Free Lifetime ($0)</span>
                  </label>
                  <div className="relative flex items-center">
                    <GraduationCap className="absolute left-3 w-4 h-4 text-emerald-500" />
                    <input
                      type="text"
                      required
                      value={studentPassCode}
                      onChange={(e) => setStudentPassCode(e.target.value.toUpperCase())}
                      placeholder="Enter pass code issued by administrator..."
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-100 dark:bg-slate-900/80 border border-emerald-500/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tracking-wider uppercase font-bold text-slate-800 dark:text-slate-100 placeholder:normal-case placeholder:font-normal placeholder:tracking-normal"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">
                    Your Name (Optional)
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">
                    Student Email (Optional)
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@academic.edu"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Passes grant 100% Free Lifetime access across all 70+ AI models and IDE tools.</span>
                </div>
              </motion.div>
            ) : authMode === 'special' ? (
              <motion.div
                key="special-mode"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-3.5"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-bold tracking-wide text-red-500 dark:text-red-400 uppercase flex items-center justify-between">
                    <span>Special Admin Access Code</span>
                    <span className="text-[9px] font-mono lowercase">case-insensitive</span>
                  </label>
                  <div className="relative flex items-center">
                    <Key className="absolute left-3 w-4 h-4 text-red-400" />
                    <input
                      type={showSpecialCode ? 'text' : 'password'}
                      required
                      value={specialAdminCode}
                      onChange={(e) => setSpecialAdminCode(e.target.value)}
                      placeholder="Enter authorized special admin passcode..."
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-100 dark:bg-slate-900/80 border border-red-500/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-mono tracking-wider uppercase font-bold text-slate-800 dark:text-slate-100 placeholder:normal-case placeholder:font-normal placeholder:tracking-normal"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSpecialCode(!showSpecialCode)}
                      className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      title={showSpecialCode ? 'Hide passcode' : 'Show passcode'}
                    >
                      {showSpecialCode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">
                    Admin Email (Optional)
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@nova.ai"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="standard-mode"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-3.5"
              >
                {authMode === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">
                      Full Name
                    </label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required={authMode === 'signup'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500/50 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500/50 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500/50 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                {/* Student / Educator 100% Free Access Checkbox */}
                <div 
                  onClick={() => setIsStudentRegistration(!isStudentRegistration)}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isStudentRegistration
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-900 dark:text-emerald-200'
                      : 'bg-slate-100 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                      isStudentRegistration ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-400 dark:border-slate-600'
                    }`}>
                      {isStudentRegistration && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div className="text-xs">
                      <div className="font-bold flex items-center gap-1.5 text-slate-800 dark:text-slate-100">
                        <GraduationCap className="w-4 h-4 text-emerald-500" />
                        <span>I am a Student / Educator</span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Unlocks permanent 100% Free Lifetime Access ($0 forever)
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold">
                    $0 Pass
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          {error && (
            <div className="p-3 text-xs font-medium text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-900/50">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="flex items-center gap-2 p-3 text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 rounded-lg border border-emerald-200 dark:border-emerald-900/50">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {successMsg}
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-bold rounded-lg text-xs transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 cursor-pointer ${
              authMode === 'special'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 shadow-red-600/20'
                : authMode === 'student'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/20'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-600/10'
            }`}
          >
            {loading 
              ? 'Processing...' 
              : authMode === 'special'
              ? '👑 Unlock Root & Elevate to Admin'
              : authMode === 'student'
              ? '🎓 Redeem Student Pass & Activate $0 Lifetime Free'
              : authMode === 'login' 
              ? 'Login to Nova' 
              : 'Create Account'}
          </button>

          {/* Social / Universal Firebase Logins */}
          {authMode !== 'special' && (
            <>
              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
                <span className="bg-white dark:bg-slate-900 px-2 text-[10px] text-slate-400 font-mono uppercase tracking-wider absolute">
                  or continue with Firebase ♾️
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  className="py-2.5 px-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 disabled:opacity-50"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleGuestAuth}
                  disabled={loading}
                  className="py-2.5 px-3 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800/60 rounded-xl text-xs font-semibold text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95 disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Instant Guest</span>
                </button>
              </div>
            </>
          )}
        </form>

        {/* Company & Founder Footer Note */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-center text-[10px] text-slate-400 dark:text-slate-500 font-mono">
          <span>Powered by <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">Shelby.ai</strong> • Founder: <strong className="text-slate-700 dark:text-slate-300 font-semibold font-sans">Shivam Kumar</strong></span>
        </div>

      </motion.div>
    </div>
  );
}
