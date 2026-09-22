export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastEventDetail {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

export function showToast(message: string, type: ToastType = 'info', duration: number = 3200): void {
  if (typeof window === 'undefined') return;
  const detail: ToastEventDetail = {
    id: 'toast-' + Math.random().toString(36).substring(7),
    message,
    type,
    duration
  };
  window.dispatchEvent(new CustomEvent('nova-toast', { detail }));
}

export const toast = {
  info: (msg: string, duration?: number) => showToast(msg, 'info', duration),
  success: (msg: string, duration?: number) => showToast(msg, 'success', duration),
  warning: (msg: string, duration?: number) => showToast(msg, 'warning', duration),
  error: (msg: string, duration?: number) => showToast(msg, 'error', duration),
};
