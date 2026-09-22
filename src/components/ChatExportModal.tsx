import React, { useState } from 'react';
import { 
  Download, FileText, Image as ImageIcon, Video, FolderArchive, 
  Check, X, FileSpreadsheet, FileCode, Bookmark, Sparkles, 
  ExternalLink, Layers, Eye, CheckCircle2, File, Film
} from 'lucide-react';
import JSZip from 'jszip';
import { Chat, User, Attachment } from '../types';
import { generateChatPDF, downloadPdfDoc, saveItemToGallery } from '../utils/pdfGenerator';

interface ChatExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  chat: Chat;
  user: User | null;
  onSaveToGallery?: () => void;
  initialTab?: 'all' | 'pdf' | 'photos' | 'videos' | 'documents' | 'raw';
}

export interface ExtractedMediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'pdf' | 'document' | 'other';
  mimeType: string;
  size: string;
  dataUrlOrContent: string;
  sourceMsgIndex: number;
  sourceRole: 'user' | 'assistant';
  createdAt: string;
}

export default function ChatExportModal({
  isOpen,
  onClose,
  chat,
  user,
  onSaveToGallery,
  initialTab = 'all'
}: ChatExportModalProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'pdf' | 'photos' | 'videos' | 'documents' | 'raw'>(initialTab);
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(new Set());
  const [previewItem, setPreviewItem] = useState<ExtractedMediaItem | null>(null);

  if (!isOpen || !chat) return null;

  // Extract all media, photos, videos, PDFs and attachments across all messages in the chat
  const mediaItems: ExtractedMediaItem[] = [];

  chat.messages.forEach((msg, msgIdx) => {
    // 1. Process attachments
    if (msg.attachments && msg.attachments.length > 0) {
      msg.attachments.forEach((att, attIdx) => {
        const isImg = att.type.startsWith('image/') || /\.(png|jpe?g|webp|gif|svg)$/i.test(att.name);
        const isVid = att.type.startsWith('video/') || /\.(mp4|webm|mov|mkv|avi)$/i.test(att.name);
        const isPdf = att.type === 'application/pdf' || /\.pdf$/i.test(att.name);
        
        let mediaType: ExtractedMediaItem['type'] = 'document';
        if (isImg) mediaType = 'image';
        else if (isVid) mediaType = 'video';
        else if (isPdf) mediaType = 'pdf';

        mediaItems.push({
          id: `att-${msg.id || msgIdx}-${attIdx}`,
          name: att.name,
          type: mediaType,
          mimeType: att.type || (isImg ? 'image/png' : isPdf ? 'application/pdf' : 'application/octet-stream'),
          size: att.size || 'Unknown size',
          dataUrlOrContent: att.content || '',
          sourceMsgIndex: msgIdx + 1,
          sourceRole: msg.role,
          createdAt: msg.createdAt
        });
      });
    }

    // 2. Process msg.imageUrls (generated images)
    if (msg.imageUrls && msg.imageUrls.length > 0) {
      msg.imageUrls.forEach((url, urlIdx) => {
        mediaItems.push({
          id: `img-${msg.id || msgIdx}-${urlIdx}`,
          name: `generated-photo-${msgIdx + 1}-${urlIdx + 1}.png`,
          type: 'image',
          mimeType: 'image/png',
          size: 'AI Generated',
          dataUrlOrContent: url,
          sourceMsgIndex: msgIdx + 1,
          sourceRole: msg.role,
          createdAt: msg.createdAt
        });
      });
    }

    // 3. Extract markdown image URLs: ![alt](url)
    const imgRegex = /!\[(.*?)\]\((data:image\/[^;]+;base64,[^)]+|https?:\/\/[^)]+)\)/g;
    let match;
    let mdImgIdx = 0;
    while ((match = imgRegex.exec(msg.content)) !== null) {
      const alt = match[1] || `image-${msgIdx + 1}-${mdImgIdx + 1}`;
      const url = match[2];
      // Avoid duplicate if already tracked
      if (!mediaItems.some(item => item.dataUrlOrContent === url)) {
        mediaItems.push({
          id: `md-img-${msg.id || msgIdx}-${mdImgIdx}`,
          name: alt.endsWith('.png') || alt.endsWith('.jpg') ? alt : `${alt.replace(/[^a-z0-9_-]/gi, '_')}.png`,
          type: 'image',
          mimeType: 'image/png',
          size: 'Inline Image',
          dataUrlOrContent: url,
          sourceMsgIndex: msgIdx + 1,
          sourceRole: msg.role,
          createdAt: msg.createdAt
        });
        mdImgIdx++;
      }
    }
  });

  const photoItems = mediaItems.filter(m => m.type === 'image');
  const videoItems = mediaItems.filter(m => m.type === 'video');
  const pdfItems = mediaItems.filter(m => m.type === 'pdf');
  const docItems = mediaItems.filter(m => m.type === 'document' || m.type === 'other');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper to trigger single file download
  const downloadSingleFile = (name: string, contentOrUrl: string, mimeType: string = 'application/octet-stream') => {
    if (!contentOrUrl) {
      showToast('File content unavailable for direct download.');
      return;
    }

    // If it's already a data URL or blob URL
    if (contentOrUrl.startsWith('data:') || contentOrUrl.startsWith('blob:') || contentOrUrl.startsWith('http')) {
      const a = document.createElement('a');
      a.href = contentOrUrl;
      a.download = name;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(`Downloaded ${name}`);
      return;
    }

    // Otherwise create blob from text
    const blob = new Blob([contentOrUrl], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${name}`);
  };

  // Export full chat transcript as PDF
  const handleExportPDF = () => {
    try {
      const doc = generateChatPDF(chat, user);
      const filename = `${chat.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-transcript.pdf`;
      downloadPdfDoc(doc, filename);
      showToast(`Downloaded PDF: ${filename}`);
    } catch (err) {
      console.error('PDF export error:', err);
      showToast('Failed to generate PDF document.');
    }
  };

  // Export transcript as Markdown (.md)
  const handleExportMarkdown = () => {
    let mdContent = `# ${chat.title}\n`;
    mdContent += `*Created: ${new Date(chat.createdAt).toLocaleString()} | Model: ${chat.model || 'Gemini 3.5'} | Total Messages: ${chat.messages.length}*\n\n---\n\n`;

    chat.messages.forEach((msg, idx) => {
      const role = msg.role === 'user' ? `🧑 **${user?.name || 'User'}**` : `✨ **Nova AI (${chat.model || 'Assistant'})**`;
      const time = new Date(msg.createdAt).toLocaleTimeString();
      mdContent += `### ${role} \`${time}\`\n\n${msg.content}\n\n`;

      if (msg.attachments && msg.attachments.length > 0) {
        mdContent += `*Attachments:*\n`;
        msg.attachments.forEach(att => {
          mdContent += `- 📎 ${att.name} (${att.size})\n`;
        });
        mdContent += `\n`;
      }
      mdContent += `---\n\n`;
    });

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chat.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded Markdown (.md) file');
  };

  // Export transcript as Plain Text (.txt)
  const handleExportText = () => {
    let txt = `CONVERSATION: ${chat.title}\n`;
    txt += `DATE: ${new Date(chat.createdAt).toLocaleString()}\n`;
    txt += `MODEL: ${chat.model || 'Gemini 3.5'}\n`;
    txt += `TOTAL MESSAGES: ${chat.messages.length}\n`;
    txt += `======================================================\n\n`;

    chat.messages.forEach((msg, idx) => {
      const sender = msg.role === 'user' ? (user?.name || 'USER') : 'NOVA AI';
      txt += `[${idx + 1}] ${sender} (${new Date(msg.createdAt).toLocaleTimeString()}):\n`;
      txt += `${msg.content}\n\n`;
      if (msg.attachments && msg.attachments.length > 0) {
        txt += `   ATTACHED FILES: ${msg.attachments.map(a => a.name).join(', ')}\n\n`;
      }
      txt += `------------------------------------------------------\n\n`;
    });

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chat.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded Plain Text (.txt) file');
  };

  // Export JSON raw data
  const handleExportJSON = () => {
    const data = JSON.stringify(chat, null, 2);
    const blob = new Blob([data], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chat.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded JSON (.json) archive');
  };

  // Save to PDF & Media Gallery
  const handleSaveToGallery = () => {
    if (onSaveToGallery) {
      onSaveToGallery();
    } else {
      saveItemToGallery({
        id: `chat-${chat.id}`,
        userId: user?.id || 'guest',
        title: `Transcript: ${chat.title}`,
        type: 'chat_pdf',
        createdAt: new Date().toISOString(),
        fileSize: `${(chat.messages.length * 1.8 + 12).toFixed(1)} KB`,
        metadata: {
          description: `Exported conversation with ${chat.messages.length} messages using ${chat.model || 'Gemini 3.5'}.`,
          author: user?.name || 'User'
        }
      });
    }
    showToast('Saved Chat Transcript to your PDF Gallery!');
  };

  // Batch Export Everything / Filtered Items in a single organized ZIP Archive
  const handleExportZipPackage = async (typeFilter?: 'all' | 'photos' | 'videos' | 'documents') => {
    try {
      setIsZipping(true);
      setZipProgress('Initializing ZIP package...');

      const zip = new JSZip();
      const folderName = chat.title.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const rootFolder = zip.folder(folderName) || zip;

      // 1. Add Chat Transcript Documents
      if (!typeFilter || typeFilter === 'all') {
        setZipProgress('Generating PDF & Markdown transcripts...');
        
        // Add PDF
        try {
          const doc = generateChatPDF(chat, user);
          const pdfBlob = doc.output('blob');
          rootFolder.file('conversation-transcript.pdf', pdfBlob);
        } catch (e) {
          console.warn('PDF zip error:', e);
        }

        // Add Markdown
        let md = `# ${chat.title}\n\n`;
        chat.messages.forEach(msg => {
          md += `### ${msg.role.toUpperCase()} (${new Date(msg.createdAt).toLocaleTimeString()})\n\n${msg.content}\n\n---\n\n`;
        });
        rootFolder.file('conversation-transcript.md', md);

        // Add JSON
        rootFolder.file('conversation-data.json', JSON.stringify(chat, null, 2));
      }

      // 2. Add Media items
      const itemsToInclude = mediaItems.filter(item => {
        if (!typeFilter || typeFilter === 'all') return true;
        if (typeFilter === 'photos') return item.type === 'image';
        if (typeFilter === 'videos') return item.type === 'video';
        if (typeFilter === 'documents') return item.type === 'pdf' || item.type === 'document';
        return true;
      });

      const photosFolder = rootFolder.folder('photos');
      const videosFolder = rootFolder.folder('videos');
      const documentsFolder = rootFolder.folder('documents');

      for (let i = 0; i < itemsToInclude.length; i++) {
        const item = itemsToInclude[i];
        setZipProgress(`Adding file (${i + 1}/${itemsToInclude.length}): ${item.name}...`);

        let targetFolder = documentsFolder;
        if (item.type === 'image') targetFolder = photosFolder;
        else if (item.type === 'video') targetFolder = videosFolder;

        if (item.dataUrlOrContent) {
          if (item.dataUrlOrContent.startsWith('data:')) {
            // Extract base64 part
            const base64Data = item.dataUrlOrContent.split(',')[1];
            if (base64Data && targetFolder) {
              targetFolder.file(item.name, base64Data, { base64: true });
            }
          } else if (item.dataUrlOrContent.startsWith('http')) {
            // Try fetching external URL if possible
            try {
              const res = await fetch(item.dataUrlOrContent);
              const blob = await res.blob();
              if (targetFolder) {
                targetFolder.file(item.name, blob);
              }
            } catch (err) {
              // If CORS blocks fetch, save URL as a shortcut reference
              if (targetFolder) {
                targetFolder.file(`${item.name}.url.txt`, `Source URL: ${item.dataUrlOrContent}`);
              }
            }
          } else {
            // Plain text content
            if (targetFolder) {
              targetFolder.file(item.name, item.dataUrlOrContent);
            }
          }
        }
      }

      setZipProgress('Compressing archive...');
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${folderName}_export_bundle.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsZipping(false);
      setZipProgress('');
      showToast('Successfully exported ZIP package!');
    } catch (err) {
      console.error('ZIP export error:', err);
      setIsZipping(false);
      setZipProgress('');
      showToast('Error packaging files into ZIP.');
    }
  };

  // Toggle selection
  const toggleSelectItem = (id: string) => {
    setSelectedItemIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedItemIds.size === mediaItems.length) {
      setSelectedItemIds(new Set());
    } else {
      setSelectedItemIds(new Set(mediaItems.map(m => m.id)));
    }
  };

  // Download selected individual items
  const downloadSelectedItems = () => {
    const selected = mediaItems.filter(m => selectedItemIds.has(m.id));
    if (selected.length === 0) {
      showToast('Select at least one file to export.');
      return;
    }
    selected.forEach(item => {
      downloadSingleFile(item.name, item.dataUrlOrContent, item.mimeType);
    });
  };

  const getFilteredItems = () => {
    if (activeTab === 'photos') return photoItems;
    if (activeTab === 'videos') return videoItems;
    if (activeTab === 'documents') return [...pdfItems, ...docItems];
    return mediaItems;
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white font-display">
                  Export Chat & Media Files
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {mediaItems.length} Attachments Found
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-md">
                Thread: <strong className="text-slate-700 dark:text-slate-300">{chat.title}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Two Columns (Left Quick Packages, Right Files Explorer) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Quick 1-Click Export Cards */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Full Conversation Export Presets</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* Preset 1: PDF Document */}
              <div 
                onClick={handleExportPDF}
                className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-blue-50/50 dark:from-indigo-950/30 dark:to-blue-950/20 border border-indigo-200/80 dark:border-indigo-800/60 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer group shadow-sm hover:shadow-md"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-md shadow-indigo-600/20">
                  <FileText className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  PDF Transcript
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Vector formatted document with timestamps, headers & styling.
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                  <span>Download .PDF</span>
                  <Download className="w-3 h-3" />
                </div>
              </div>

              {/* Preset 2: Complete ZIP Bundle */}
              <div 
                onClick={() => handleExportZipPackage('all')}
                className="p-4 rounded-2xl bg-gradient-to-br from-purple-50/80 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/20 border border-purple-200/80 dark:border-purple-800/60 hover:border-purple-400 dark:hover:border-purple-600 transition-all cursor-pointer group shadow-sm hover:shadow-md"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-md shadow-purple-600/20">
                  <FolderArchive className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Export All (ZIP)
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  All Photos, Videos, PDFs, Documents, & Transcripts in 1 archive.
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-purple-600 dark:text-purple-400">
                  <span>Download .ZIP</span>
                  <Download className="w-3 h-3" />
                </div>
              </div>

              {/* Preset 3: Markdown & Plain Text */}
              <div 
                onClick={handleExportMarkdown}
                className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200/80 dark:border-emerald-800/60 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all cursor-pointer group shadow-sm hover:shadow-md"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-md shadow-emerald-600/20">
                  <FileCode className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Markdown & Raw
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Clean GitHub-flavored Markdown document with code blocks.
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span>Download .MD</span>
                  <Download className="w-3 h-3" />
                </div>
              </div>

              {/* Preset 4: Save to PDF Gallery */}
              <div 
                onClick={handleSaveToGallery}
                className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200/80 dark:border-amber-800/60 hover:border-amber-400 dark:hover:border-amber-600 transition-all cursor-pointer group shadow-sm hover:shadow-md"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-md shadow-amber-600/20">
                  <Bookmark className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Save to Gallery
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Store PDF transcript into your persistent Nova PDF & Media Library.
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  <span>Save to Cloud</span>
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              </div>

            </div>
          </div>

          {/* Media & Files Filter Tabs */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>All Media & Files</span>
                  <span className="text-[10px] opacity-80">({mediaItems.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('photos')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'photos'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Photos & Images</span>
                  <span className="text-[10px] opacity-80">({photoItems.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('videos')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'videos'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Videos</span>
                  <span className="text-[10px] opacity-80">({videoItems.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('documents')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'documents'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>PDFs & Docs</span>
                  <span className="text-[10px] opacity-80">({pdfItems.length + docItems.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('raw')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'raw'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Raw Text / JSON</span>
                </button>
              </div>

              {/* Bulk actions */}
              <div className="flex items-center gap-2">
                {activeTab === 'photos' && photoItems.length > 0 && (
                  <button
                    onClick={() => handleExportZipPackage('photos')}
                    className="px-3 py-1.5 rounded-xl bg-purple-600/10 hover:bg-purple-600/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <FolderArchive className="w-3.5 h-3.5" />
                    <span>Download All Photos (.ZIP)</span>
                  </button>
                )}

                {activeTab === 'documents' && (pdfItems.length > 0 || docItems.length > 0) && (
                  <button
                    onClick={() => handleExportZipPackage('documents')}
                    className="px-3 py-1.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <FolderArchive className="w-3.5 h-3.5" />
                    <span>Download All Docs (.ZIP)</span>
                  </button>
                )}

                {selectedItemIds.size > 0 && (
                  <button
                    onClick={downloadSelectedItems}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Selected ({selectedItemIds.size})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Content view based on active tab */}
            {activeTab === 'raw' ? (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Export the conversation transcript in developer-friendly plaintext formats or machine-readable JSON structure.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleExportText}
                    className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span>Plain Text (.TXT)</span>
                  </button>
                  <button
                    onClick={handleExportMarkdown}
                    className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 hover:text-emerald-600 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <FileCode className="w-4 h-4 text-emerald-500" />
                    <span>Markdown Document (.MD)</span>
                  </button>
                  <button
                    onClick={handleExportJSON}
                    className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-purple-50 dark:hover:bg-purple-950/40 text-slate-700 dark:text-slate-200 hover:text-purple-600 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Layers className="w-4 h-4 text-purple-500" />
                    <span>Raw JSON Data (.JSON)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-3">
                {getFilteredItems().length === 0 ? (
                  <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center text-slate-400 space-y-2">
                    <div className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-slate-800/50 flex items-center justify-center mx-auto text-slate-400">
                      <FolderArchive className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                      No matching {activeTab === 'all' ? 'files or media' : activeTab} found in this thread
                    </p>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      You can attach photos, documents, or generate AI imagery and videos to export them here at any time.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getFilteredItems().map((item) => {
                      const isSelected = selectedItemIds.has(item.id);
                      const isImage = item.type === 'image';
                      const isVideo = item.type === 'video';
                      const isPdf = item.type === 'pdf';

                      return (
                        <div
                          key={item.id}
                          className={`p-3 rounded-2xl border transition-all flex items-center gap-3 relative group ${
                            isSelected
                              ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500/80 shadow-sm'
                              : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          {/* Selection Checkbox */}
                          <button
                            onClick={() => toggleSelectItem(item.id)}
                            className={`w-5 h-5 rounded-lg border flex items-center justify-center text-xs transition-colors shrink-0 cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-600 border-indigo-600 text-white'
                                : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>

                          {/* Thumbnail / Icon preview */}
                          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden relative">
                            {isImage && item.dataUrlOrContent ? (
                              <img
                                src={item.dataUrlOrContent}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : isVideo ? (
                              <Video className="w-6 h-6 text-pink-500" />
                            ) : isPdf ? (
                              <FileText className="w-6 h-6 text-indigo-500" />
                            ) : (
                              <File className="w-6 h-6 text-slate-400" />
                            )}
                          </div>

                          {/* Meta Details */}
                          <div className="flex-1 min-w-0">
                            <h6 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate" title={item.name}>
                              {item.name}
                            </h6>
                            <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400 font-mono">
                              <span className="uppercase">{item.type}</span>
                              <span>•</span>
                              <span>{item.size}</span>
                              <span>•</span>
                              <span>Msg #{item.sourceMsgIndex}</span>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center gap-1 shrink-0">
                            {isImage && item.dataUrlOrContent && (
                              <button
                                onClick={() => setPreviewItem(item)}
                                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                                title="Preview Image"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => downloadSingleFile(item.name, item.dataUrlOrContent, item.mimeType)}
                              className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 transition-colors cursor-pointer"
                              title="Download File"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {isZipping ? (
              <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-2 animate-pulse">
                <FolderArchive className="w-4 h-4 animate-spin" />
                {zipProgress}
              </span>
            ) : (
              <span>Export options support high-resolution photos, MP4 clips, PDFs, and formatted transcripts.</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => handleExportZipPackage('all')}
              disabled={isZipping}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Export All Files (.ZIP)</span>
            </button>
          </div>
        </div>

      </div>

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white font-semibold text-xs py-2.5 px-4 rounded-2xl shadow-2xl border border-slate-700 z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewItem && (
        <div 
          onClick={() => setPreviewItem(null)}
          className="fixed inset-0 bg-slate-950/90 z-60 flex flex-col items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl max-h-[85vh] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 p-2 shadow-2xl flex flex-col items-center"
          >
            <div className="w-full flex items-center justify-between p-3 border-b border-slate-800 text-white">
              <span className="text-xs font-bold truncate max-w-md">{previewItem.name}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadSingleFile(previewItem.name, previewItem.dataUrlOrContent, previewItem.mimeType)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 flex items-center justify-center max-h-[70vh] overflow-auto">
              <img
                src={previewItem.dataUrlOrContent}
                alt={previewItem.name}
                className="max-h-[65vh] object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
