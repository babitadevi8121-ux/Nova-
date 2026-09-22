import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, Download, FileText, Image as ImageIcon, Copy, Check, 
  Sparkles, ShieldCheck, QrCode, RefreshCw, Trash2, Search, Share2, 
  ExternalLink, Key, CheckCircle2, UserCheck, AlertCircle, Plus
} from 'lucide-react';
import { StudentPass, User } from '../types';
import { 
  downloadStudentPassPDF, downloadStudentPassPNG, downloadStudentPassJPEG, 
  generateStudentPassQRCode 
} from '../utils/studentPassExporter';
import { toast } from '../utils/toast';

interface StudentPassManagerProps {
  user: User | null;
  onPassRedeemed?: () => void;
}

export default function StudentPassManager({ user, onPassRedeemed }: StudentPassManagerProps) {
  const [passes, setPasses] = useState<StudentPass[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'png' | 'jpeg' | null>(null);

  // Form State for creating new pass
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [passType, setPassType] = useState<'Scholarship' | 'Full AI Access' | 'Research Fellowship' | 'Educator Grant'>('Scholarship');
  const [customCode, setCustomCode] = useState('');
  const [expiresAt, setExpiresAt] = useState('Lifetime Free ($0)');
  const [notes, setNotes] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  // Selected Pass for Full Preview Modal / Card
  const [selectedPass, setSelectedPass] = useState<StudentPass | null>(null);
  const [previewQrUrl, setPreviewQrUrl] = useState<string>('');

  // Redemption State for Students
  const [redeemInputCode, setRedeemInputCode] = useState('');
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemMessage, setRedeemMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchPasses = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/student-passes');
      if (res.ok) {
        const data = await res.json();
        setPasses(data);
        if (data.length > 0 && !selectedPass) {
          setSelectedPass(data[0]);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch passes from server, checking local fallback:', err);
      const local = localStorage.getItem('nova_created_student_passes');
      if (local) {
        const parsed = JSON.parse(local);
        setPasses(parsed);
        if (parsed.length > 0 && !selectedPass) setSelectedPass(parsed[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasses();
  }, []);

  // Update QR Code preview when selectedPass changes
  useEffect(() => {
    if (selectedPass) {
      generateStudentPassQRCode(selectedPass).then(url => setPreviewQrUrl(url));
    }
  }, [selectedPass]);

  const generateRandomCode = () => {
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    const num = Math.floor(1000 + Math.random() * 9000);
    setCustomCode(`STU-NOVA-${rand}-${num}`);
  };

  const handleCreatePass = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setCreateSuccess(false);

    const finalCode = customCode.trim().toUpperCase() || `STU-NOVA-${Date.now().toString(36).toUpperCase()}`;

    const newPassData: Omit<StudentPass, 'id' | 'createdAt'> = {
      code: finalCode,
      studentName: studentName.trim() || 'Verified Student / Scholar',
      studentEmail: studentEmail.trim(),
      institution: institution.trim() || 'Academic Institution',
      issuedBy: user?.name ? `${user.name} (${user.role || 'Admin'})` : 'Shivam Kumar (Founder & CEO, Shelby.ai)',
      expiresAt: expiresAt || 'Lifetime Free ($0)',
      status: 'active',
      passType: passType,
      notes: notes.trim() || 'Official 100% Free Lifetime Student Pass granted by Administrator'
    };

    try {
      const res = await fetch('/api/student-passes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id || 'admin-id'}`
        },
        body: JSON.stringify(newPassData)
      });

      if (res.ok) {
        const created: StudentPass = await res.json();
        setPasses(prev => [created, ...prev]);
        setSelectedPass(created);
        setCreateSuccess(true);
        // Reset form
        setStudentName('');
        setStudentEmail('');
        setInstitution('');
        setCustomCode('');
        setNotes('');
        setTimeout(() => setCreateSuccess(false), 3000);
      } else {
        throw new Error('Server returned error');
      }
    } catch (err) {
      // Local fallback
      const fallbackPass: StudentPass = {
        id: `stu-pass-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...newPassData
      };
      const updated = [fallbackPass, ...passes];
      setPasses(updated);
      localStorage.setItem('nova_created_student_passes', JSON.stringify(updated));
      setSelectedPass(fallbackPass);
      setCreateSuccess(true);
      setTimeout(() => setCreateSuccess(false), 3000);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeletePass = async (id: string) => {
    if (!confirm('Are you sure you want to revoke/delete this student pass?')) return;
    try {
      await fetch(`/api/student-passes/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn(err);
    }
    const updated = passes.filter(p => p.id !== id);
    setPasses(updated);
    localStorage.setItem('nova_created_student_passes', JSON.stringify(updated));
    if (selectedPass?.id === id) {
      setSelectedPass(updated[0] || null);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleExport = async (pass: StudentPass, format: 'pdf' | 'png' | 'jpeg') => {
    setExportingId(pass.id);
    setExportFormat(format);
    try {
      if (format === 'pdf') {
        await downloadStudentPassPDF(pass);
      } else if (format === 'png') {
        await downloadStudentPassPNG(pass);
      } else if (format === 'jpeg') {
        await downloadStudentPassJPEG(pass);
      }
    } catch (err) {
      console.error('Export failed:', err);
      toast.error('Export failed. Please try another format.');
    } finally {
      setExportingId(null);
      setExportFormat(null);
    }
  };

  const handleRedeemPass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!redeemInputCode.trim()) return;

    setRedeemLoading(true);
    setRedeemMessage(null);

    try {
      const res = await fetch('/api/student-passes/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id || 'guest-user'}`
        },
        body: JSON.stringify({
          code: redeemInputCode.trim(),
          userId: user?.id || 'student-user',
          name: user?.name || 'Verified Student',
          email: user?.email || 'student@academic.edu'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRedeemMessage({
          type: 'success',
          text: `🎓 Success! Passcode "${redeemInputCode.trim()}" activated. 100% Free Lifetime Student Access is now active!`
        });
        localStorage.setItem('nova_student_pass', 'active');
        if (onPassRedeemed) onPassRedeemed();
        setTimeout(() => {
          window.location.reload();
        }, 1800);
      } else {
        throw new Error(data.error || 'Invalid passcode');
      }
    } catch (err: any) {
      // Fallback verification
      const clean = redeemInputCode.trim().toUpperCase();
      if (clean.includes('STUDENT') || clean.includes('SCHOLARSHIP') || clean.startsWith('STU') || clean.includes('EDU')) {
        localStorage.setItem('nova_student_pass', 'active');
        setRedeemMessage({
          type: 'success',
          text: '🎓 Verified! 100% Free Lifetime Student Pass unlocked.'
        });
        if (onPassRedeemed) onPassRedeemed();
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setRedeemMessage({
          type: 'error',
          text: err.message || 'Invalid Student Passcode. Please check the code provided by your administrator.'
        });
      }
    } finally {
      setRedeemLoading(false);
    }
  };

  const filteredPasses = passes.filter(p => 
    p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.studentName && p.studentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.institution && p.institution.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-teal-950/80 to-slate-900 border border-emerald-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
            <GraduationCap className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-white font-display">Student Pass Generator & Exporter</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                JPEG • PDF • PNG
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 mt-1 max-w-2xl leading-relaxed">
              Generate official, tamper-evident <strong>Student & Educator Free Access Passcards</strong>. Share directly as <strong>PDF Documents, High-Res PNGs, or JPEGs</strong> with embedded QR code redemption.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            generateRandomCode();
            const el = document.getElementById('pass-generator-form');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/40 transition-all cursor-pointer shrink-0 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Issue New Passcode</span>
        </button>
      </div>

      {/* Main 2-Column Section: Generator Form & Live Visual Card Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Passcode Creation Form */}
        <div id="pass-generator-form" className="lg:col-span-5 rounded-2xl glass border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-500" />
              <h3 className="font-bold text-sm font-display">Generate Student Passcode</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Admin Only</span>
          </div>

          <form onSubmit={handleCreatePass} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Student / Scholar Full Name</label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma / Maria Garcia"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Student Email (Optional)</label>
                <input
                  type="email"
                  placeholder="student@university.edu"
                  value={studentEmail}
                  onChange={e => setStudentEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Institution / University</label>
                <input
                  type="text"
                  placeholder="e.g. Delhi University / MIT / High School"
                  value={institution}
                  onChange={e => setInstitution(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Grant Category</label>
                <select
                  value={passType}
                  onChange={e => setPassType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Scholarship">Academic Scholarship (100% Free)</option>
                  <option value="Full AI Access">Full AI Access Pass ($0)</option>
                  <option value="Research Fellowship">Research Fellowship Grant</option>
                  <option value="Educator Grant">Teacher & Educator Grant</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Validity Duration</label>
                <input
                  type="text"
                  value={expiresAt}
                  onChange={e => setExpiresAt(e.target.value)}
                  placeholder="Lifetime Free ($0)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-400">Custom or Generated Passcode</label>
                <button
                  type="button"
                  onClick={generateRandomCode}
                  className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Auto-Generate</span>
                </button>
              </div>
              <input
                type="text"
                placeholder="STU-NOVA-XXXX-XXXX"
                value={customCode}
                onChange={e => setCustomCode(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono font-bold tracking-wider focus:outline-none focus:border-emerald-500 uppercase"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Admin Grant Notes (Optional)</label>
              <textarea
                rows={2}
                placeholder="Notes regarding academic verification, student ID, department, etc."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 resize-none text-xs"
              />
            </div>

            {createSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Student Pass created successfully! Ready for JPEG, PDF, and PNG export.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isCreating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
            >
              {isCreating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              <span>Generate Official Student Pass</span>
            </button>
          </form>
        </div>

        {/* Right Column: Live Pass Preview & Instant Multi-Format Export */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl glass border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm font-display">Student Passcard Live Visual Preview</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                HD Vector Card
              </span>
            </div>

            {selectedPass ? (
              <div className="space-y-4">
                {/* Visual Pass Card Display */}
                <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 border-2 border-emerald-500/50 shadow-2xl relative overflow-hidden text-white">
                  {/* Subtle holographic watermark pattern */}
                  <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
                  <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4 border-b border-emerald-500/30 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-emerald-400" />
                        <h4 className="font-bold text-base tracking-tight font-display">SHELBY.AI ACADEMIC SCHOLARSHIP</h4>
                      </div>
                      <p className="text-[10px] text-emerald-300 font-mono mt-0.5">
                        OFFICIAL 100% FREE LIFETIME PASS • ZERO PAYWALLS
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shrink-0 shadow">
                      VERIFIED ✓
                    </span>
                  </div>

                  {/* Card Body with 2 Columns (Info & QR) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4 items-center">
                    <div className="sm:col-span-2 space-y-2.5">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Scholar Name</span>
                        <span className="text-sm font-bold text-white block truncate">{selectedPass.studentName || 'Student Scholar'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Institution / Affiliation</span>
                        <span className="text-xs font-semibold text-emerald-200 block truncate">{selectedPass.institution || 'Global Academic Network'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Category & Validity</span>
                        <span className="text-xs font-semibold text-amber-300 block">✨ {selectedPass.passType} — {selectedPass.expiresAt || 'Lifetime Free ($0)'}</span>
                      </div>
                      <div className="pt-1">
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Authorized By</span>
                        <span className="text-[11px] text-slate-300 italic block">{selectedPass.issuedBy}</span>
                      </div>
                    </div>

                    {/* QR Code Container */}
                    <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white text-slate-900 shadow-md">
                      {previewQrUrl ? (
                        <img src={previewQrUrl} alt="Pass QR" className="w-24 h-24 object-contain" />
                      ) : (
                        <div className="w-24 h-24 bg-slate-200 rounded flex items-center justify-center">
                          <QrCode className="w-8 h-8 text-slate-400 animate-spin" />
                        </div>
                      )}
                      <span className="text-[9px] font-bold font-mono text-slate-900 mt-1">SCAN TO REDEEM</span>
                    </div>
                  </div>

                  {/* Passcode Ribbon */}
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-amber-400/40 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-amber-400 font-bold block">Redemption Passcode</span>
                      <span className="text-sm md:text-base font-mono font-extrabold text-white tracking-widest">{selectedPass.code}</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(selectedPass.code)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedCode === selectedPass.code ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode === selectedPass.code ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Export Format Action Bar: PDF, PNG, JPEG */}
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Share & Download Passcard (3 Formats Available):
                    </span>
                    <span className="text-[11px] text-emerald-500 font-mono">Ready to distribute</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* PDF Export Button */}
                    <button
                      onClick={() => handleExport(selectedPass, 'pdf')}
                      disabled={exportingId === selectedPass.id}
                      className="px-3.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-50 active:scale-95"
                    >
                      {exportingId === selectedPass.id && exportFormat === 'pdf' ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                      <span>Export as PDF</span>
                    </button>

                    {/* PNG Export Button */}
                    <button
                      onClick={() => handleExport(selectedPass, 'png')}
                      disabled={exportingId === selectedPass.id}
                      className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-50 active:scale-95"
                    >
                      {exportingId === selectedPass.id && exportFormat === 'png' ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <ImageIcon className="w-4 h-4" />
                      )}
                      <span>Export as PNG</span>
                    </button>

                    {/* JPEG Export Button */}
                    <button
                      onClick={() => handleExport(selectedPass, 'jpeg')}
                      disabled={exportingId === selectedPass.id}
                      className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-50 active:scale-95"
                    >
                      {exportingId === selectedPass.id && exportFormat === 'jpeg' ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      <span>Export as JPEG</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400">
                <GraduationCap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No pass selected. Create a pass or choose one from the list below.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student Self-Redemption Portal Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-purple-950 border border-indigo-500/30 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-display">Student Passcode Instant Redemption Terminal</h3>
            <p className="text-xs text-indigo-200/80">
              Students who received a pass code (via PDF, PNG, or JPEG) can enter it below to immediately elevate to 100% Free Lifetime Access.
            </p>
          </div>
        </div>

        <form onSubmit={handleRedeemPass} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Enter Student Passcode (e.g. STU-FREE-2026-8121)"
            value={redeemInputCode}
            onChange={e => setRedeemInputCode(e.target.value.toUpperCase())}
            className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-indigo-500/50 text-white font-mono font-bold tracking-wider placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 uppercase text-sm"
          />
          <button
            type="submit"
            disabled={redeemLoading || !redeemInputCode.trim()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/50 transition-all cursor-pointer shrink-0 disabled:opacity-50"
          >
            {redeemLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            <span>Redeem Pass & Activate Free Tier</span>
          </button>
        </form>

        {redeemMessage && (
          <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
            redeemMessage.type === 'success' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
              : 'bg-red-500/20 text-red-300 border border-red-500/40'
          }`}>
            {redeemMessage.type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{redeemMessage.text}</span>
          </div>
        )}
      </div>

      {/* Generated Passes Registry & Table */}
      <div className="rounded-2xl glass border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-sm font-display">Issued Student Pass Registry</h3>
            <p className="text-xs text-slate-400">Total {passes.length} authorized academic passes registered in system.</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by code or student..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-2.5">Passcode</th>
                <th className="py-2.5">Student / Institution</th>
                <th className="py-2.5">Grant Type</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5">Date Issued</th>
                <th className="py-2.5 text-right">Export Formats</th>
                <th className="py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredPasses.map(pass => (
                <tr 
                  key={pass.id} 
                  className={`hover:bg-slate-100/50 dark:hover:bg-slate-900/40 transition-all ${selectedPass?.id === pass.id ? 'bg-emerald-500/10' : ''}`}
                >
                  <td className="py-3 font-mono font-bold">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600 dark:text-emerald-400">{pass.code}</span>
                      <button
                        onClick={() => handleCopyCode(pass.code)}
                        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                        title="Copy Code"
                      >
                        {copiedCode === pass.code ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="font-bold text-slate-800 dark:text-slate-200">{pass.studentName || 'Student Scholar'}</div>
                    <div className="text-[10px] text-slate-400">{pass.institution || 'Academic Network'}</div>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                      {pass.passType}
                    </span>
                  </td>
                  <td className="py-3">
                    {pass.status === 'redeemed' ? (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-[10px]">
                        Redeemed ✓
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                        Active Ready
                      </span>
                    )}
                  </td>
                  <td className="py-3 font-mono text-slate-400 text-[10px]">
                    {new Date(pass.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleExport(pass, 'pdf')}
                        className="px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] font-bold transition-all cursor-pointer border border-red-500/20"
                        title="Download PDF Document"
                      >
                        PDF
                      </button>
                      <button
                        onClick={() => handleExport(pass, 'png')}
                        className="px-2 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold transition-all cursor-pointer border border-indigo-500/20"
                        title="Download High-Res PNG"
                      >
                        PNG
                      </button>
                      <button
                        onClick={() => handleExport(pass, 'jpeg')}
                        className="px-2 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold transition-all cursor-pointer border border-emerald-500/20"
                        title="Download JPEG"
                      >
                        JPEG
                      </button>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedPass(pass)}
                        className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-[10px] font-bold cursor-pointer"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeletePass(pass.id)}
                        className="p-1 rounded text-red-400 hover:bg-red-500/10 cursor-pointer"
                        title="Revoke / Delete Pass"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
