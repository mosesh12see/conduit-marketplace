import Icon from './Icon';
import type { Toast } from '../types';

interface Props {
  toasts: Toast[];
}

const variantIcon: Record<string, string> = {
  default: 'zap',
  win: 'check',
  warn: 'arrowUp',
};

export default function ToastStack({ toasts }: Props) {
  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.variant}`}>
          <div className="toast-icon">
            <Icon name={variantIcon[toast.variant] || 'zap'} size={14} />
          </div>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
