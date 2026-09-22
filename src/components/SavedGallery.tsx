import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Download, Trash2, Eye, Printer, Search, Sparkles, 
  Receipt, Image as ImageIcon, Filter, Plus, CheckCircle, ExternalLink, 
  Clock, ArrowDown, FolderOpen, RefreshCw, Bookmark, Share2, Copy, Check
} from 'lucide-react';
import { User, GalleryItem, GalleryItemType } from '../types';
import { getSavedGalleryItems, removeGalleryItem, downloadPdfDoc, generateInvoicePDF } from '../utils/pdfGenerator';

interface SavedGalleryProps {
  user: User | null;
  onOpenAuth?: () => void;
  onOpenPricing?: () => void;
  onSelectChat?: (chatId: string) => void;
}

export default function SavedGallery({ user, onOpenAuth, onOpenPricing, onSelectChat }: SavedGalleryProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    loadItems();
  }, [user?.id]);

  const loadItems = () => {
    const loaded = getSavedGalleryItems(user?.id);
    setItems(loaded);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this item from your Gallery?')) {
      const updated = removeGalleryItem(id);
      setItems(updated);
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
      showToast('Item removed from Gallery');
    }
  };

  const handleDownload = (item: GalleryItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (item.dataUrl) {
      const a = document.createElement('a');
      a.href = item.dataUrl;
      a.download = `${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.${item.type.includes('image') ? 'png' : 'pdf'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(`Downloading ${item.title}...`);
      return;
    }

    // If it's an invoice without dataUrl, dynamically generate the PDF
    if (item.type === 'invoice_pdf' && item.metadata?.invoiceNumber) {
      const invData: any = {
        id: item.id,
        userId: item.userId || (user?.id || 'guest'),
        invoiceNumber: item.metadata.invoiceNumber,
        paidAt: item.createdAt,
        tier: item.metadata.tier || 'Pro',
        billingCycle: 'monthly',
        amount: item.metadata.amount || 15,
        totalAmount: item.metadata.amount || 15,
        currency: item.metadata.currency || 'USD',
        paymentMethod: 'Verified Payment Gateway',
        userName: item.metadata.author || (user?.name || 'User'),
        userEmail: user?.email || 'user@example.com',
        validUntil: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString()
      };
      const doc = generateInvoicePDF(invData);
      downloadPdfDoc(doc, `${item.metadata.invoiceNumber}.pdf`);
      showToast(`Downloaded Invoice PDF ${item.metadata.invoiceNumber}`);
      return;
    }

    if (item.thumbnailUrl) {
      const a = document.createElement('a');
      a.href = item.thumbnailUrl;
      a.download = `${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(`Downloading file...`);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesFilter = filterType === 'all' || 
      (filterType === 'pdf' && (item.type === 'pdf' || item.type === 'invoice_pdf' || item.type === 'chat_pdf' || item.type === 'report_pdf')) ||
      (filterType === 'invoices' && item.type === 'invoice_pdf') ||
      (filterType === 'chats' && item.type === 'chat_pdf') ||
      (filterType === 'images' && item.type === 'image');

    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.metadata?.description && item.metadata.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.metadata?.prompt && item.metadata.prompt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.metadata?.invoiceNumber && item.metadata.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/30 dark:bg-slate-950/20 text-slate-800 dark:text-slate-100">
      {/* Gallery Header */}
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/80 glass shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight flex items-center gap-2">
                PDF & Visual Gallery
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20">
                  {items.length} Saved
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Manage, view, and 1-click download your official tax invoices, generated art PDFs, and chat transcripts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadItems}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 transition-colors"
              title="Refresh Gallery"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            {onOpenPricing && (
              <button
                onClick={onOpenPricing}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Receipt className="w-3.5 h-3.5" />
                View Invoices & Pay Bill
              </button>
            )}
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="max-w-6xl mx-auto mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PDF or document title..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Files', icon: FolderOpen },
              { id: 'pdf', label: 'All PDFs', icon: FileText },
              { id: 'invoices', label: 'Invoices & Tax Receipts', icon: Receipt },
              { id: 'chats', label: 'Chat Transcripts', icon: Bookmark },
              { id: 'images', label: 'Artworks', icon: ImageIcon }
            ].map(f => {
              const Icon = f.icon;
              const isActive = filterType === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gallery Grid Display */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">No Saved Gallery Items</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                  Export conversations as PDF, save image artworks, or generate membership bills to populate your gallery.
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-2">
                {onOpenPricing && (
                  <button
                    onClick={onOpenPricing}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-sm"
                  >
                    Go to Billing & Invoices
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map(item => {
                const isPdf = item.type.includes('pdf');
                const isInvoice = item.type === 'invoice_pdf';
                const isChat = item.type === 'chat_pdf';

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group rounded-2xl glass border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/60 p-4 transition-all duration-200 hover:shadow-lg cursor-pointer flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Item Thumbnail / Icon Box */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isInvoice 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : isChat
                            ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                            : isPdf
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                            : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                        }`}>
                          {isInvoice ? <Receipt className="w-5 h-5" /> : isPdf ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                        </div>

                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                          <button
                            onClick={(e) => handleDownload(item, e)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white transition-colors"
                            title="Download PDF / File"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(item.id, e)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-600 hover:text-white transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Image Thumbnail Preview if available */}
                      {item.thumbnailUrl && (
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 relative">
                          <img 
                            src={item.thumbnailUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                        </div>
                      )}

                      {/* Title & Info */}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            isInvoice 
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                              : isChat
                              ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          }`}>
                            {isInvoice ? 'Invoice PDF' : isChat ? 'Chat Transcript' : isPdf ? 'Document PDF' : 'Artwork'}
                          </span>
                          {item.fileSize && (
                            <span className="text-[10px] text-slate-400 font-mono">{item.fileSize}</span>
                          )}
                        </div>
                        <h3 className="font-bold text-xs mt-1.5 text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {item.title}
                        </h3>
                        {item.metadata?.description && (
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                            {item.metadata.description}
                          </p>
                        )}
                        {item.metadata?.prompt && (
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed italic">
                            "{item.metadata.prompt}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card Footer Meta */}
                    <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-mono">{new Date(item.createdAt).toLocaleDateString()}</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        View Details
                        <Eye className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ITEM PREVIEW & DOWNLOAD MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 text-slate-800 dark:text-slate-100 relative max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b pb-4 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base font-display">{selectedItem.title}</h2>
                    <p className="text-xs text-slate-500 font-mono">
                      Type: {selectedItem.type.toUpperCase()} • Saved on {new Date(selectedItem.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              {/* Body Content */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {selectedItem.thumbnailUrl && (
                  <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-video flex items-center justify-center">
                    <img src={selectedItem.thumbnailUrl} alt={selectedItem.title} className="max-h-full object-contain" />
                  </div>
                )}

                {/* Metadata Details */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                  <div className="font-bold uppercase tracking-wider text-[10px] text-slate-400">Document Metadata</div>
                  {selectedItem.metadata?.invoiceNumber && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Invoice Number:</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{selectedItem.metadata.invoiceNumber}</span>
                    </div>
                  )}
                  {selectedItem.metadata?.amount && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Amount Paid:</span>
                      <span className="font-mono font-bold">{selectedItem.metadata.currency || 'USD'} {selectedItem.metadata.amount.toFixed(2)}</span>
                    </div>
                  )}
                  {selectedItem.metadata?.tier && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Membership Tier:</span>
                      <span className="font-bold">{selectedItem.metadata.tier}</span>
                    </div>
                  )}
                  {selectedItem.metadata?.prompt && (
                    <div className="space-y-1 pt-1">
                      <span className="text-slate-500">Generation Prompt:</span>
                      <p className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border font-mono text-[11px] leading-relaxed">
                        {selectedItem.metadata.prompt}
                      </p>
                    </div>
                  )}
                  {selectedItem.metadata?.description && (
                    <div className="space-y-1 pt-1">
                      <span className="text-slate-500">Summary:</span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300">
                        {selectedItem.metadata.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={(e) => handleDelete(selectedItem.id, e)}
                  className="px-3.5 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print
                  </button>

                  <button
                    onClick={() => handleDownload(selectedItem)}
                    className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF File
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-70 bg-slate-900 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
