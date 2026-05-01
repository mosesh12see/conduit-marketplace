import Icon from './Icon';
import type { Toast } from '../types';

interface ToastStackProps {
  toasts: Toast[];
}

const VARIANT_ICONS: Record<Toast['variant'], string> = {
  default: 'bell',
  win: 'check',
  warn: 'zap',
};

export default function ToastStack({ toasts }: ToastStackProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.variant}`}>
          <Icon name={toast.icon ?? VARIANT_ICONS[toast.variant]} size={16} className="toast-icon" />
          <span className="toast-message">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
