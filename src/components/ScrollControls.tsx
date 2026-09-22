import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Maximize2, Minimize2 } from 'lucide-react';

interface ScrollControlsProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  showProgress?: boolean;
  onMaximizeToggle?: () => void;
  isMaximized?: boolean;
  className?: string;
}

export default function ScrollControls({
  containerRef,
  showProgress = true,
  onMaximizeToggle,
  isMaximized = false,
  className = ''
}: ScrollControlsProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef?.current) {
        const el = containerRef.current;
        const totalHeight = el.scrollHeight - el.clientHeight;
        if (totalHeight > 0) {
          const progress = Math.min(100, Math.max(0, (el.scrollTop / totalHeight) * 100));
          setScrollProgress(progress);
          setIsAtTop(el.scrollTop < 20);
          setIsAtBottom(el.scrollTop >= totalHeight - 20);
        } else {
          setScrollProgress(0);
          setIsAtTop(true);
          setIsAtBottom(true);
        }
      } else {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
          setScrollProgress(progress);
          setIsAtTop(window.scrollY < 20);
          setIsAtBottom(window.scrollY >= totalHeight - 20);
        }
      }
    };

    if (containerRef?.current) {
      const el = containerRef.current;
      el.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => el.removeEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [containerRef]);

  const scrollToTop = () => {
    if (containerRef?.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (containerRef?.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 flex flex-col items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 dark:bg-slate-950/90 border border-slate-700/80 dark:border-slate-800 shadow-2xl backdrop-blur-xl transition-all duration-300 ${className}`}
    >
      {/* Scroll to Top */}
      <button
        type="button"
        onClick={scrollToTop}
        title="Scroll to Top"
        className={`p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all cursor-pointer ${
          isAtTop ? 'opacity-50 hover:opacity-100' : 'opacity-100 text-indigo-400'
        }`}
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Progress Indicator */}
      {showProgress && (
        <div className="flex flex-col items-center justify-center my-0.5" title={`Scroll position: ${Math.round(scrollProgress)}%`}>
          <div className="w-6 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          <span className="text-[9px] font-mono text-slate-400 mt-0.5">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      )}

      {/* Scroll to Bottom */}
      <button
        type="button"
        onClick={scrollToBottom}
        title="Scroll to Bottom"
        className={`p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all cursor-pointer ${
          isAtBottom ? 'opacity-50 hover:opacity-100' : 'opacity-100 text-indigo-400'
        }`}
      >
        <ArrowDown className="w-4 h-4" />
      </button>

      {/* Optional Maximize Area Button */}
      {onMaximizeToggle && (
        <>
          <div className="w-4 h-px bg-slate-800 my-0.5" />
          <button
            type="button"
            onClick={onMaximizeToggle}
            title={isMaximized ? 'Restore Viewport' : 'Expand Area (Full Canvas)'}
            className="p-2 rounded-xl text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 transition-all cursor-pointer"
          >
            {isMaximized ? (
              <Minimize2 className="w-4 h-4 text-amber-400" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </>
      )}
    </div>
  );
}
