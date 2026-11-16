import { Toast as BaseToast } from '@base-ui/react/toast';
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { Spinner } from '../Spinner/Spinner';
import styles from './Toast.module.css';

export type ToastType = 'default' | 'info' | 'success' | 'warning' | 'error' | 'loading';

export type ToastPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'top-right'
  | 'top-left'
  | 'top-center';

export interface ToastActionOption {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  id?: string;
  description?: ReactNode;
  duration?: number;
  action?: ToastActionOption;
}

interface InternalToastData {
  action?: ToastActionOption;
}

export const toastManager = BaseToast.createToastManager<InternalToastData>();

function dispatchToast(type: ToastType, title: ReactNode, options?: ToastOptions): string {
  const defaultTimeout = type === 'loading' ? 0 : 4500;
  return toastManager.add({
    id: options?.id,
    title,
    description: options?.description,
    type,
    timeout: options?.duration ?? defaultTimeout,
    priority: type === 'error' ? 'high' : 'low',
    data: options?.action ? { action: options.action } : undefined,
  });
}

export interface ToastCallable {
  (title: ReactNode, options?: ToastOptions): string;
  message: (title: ReactNode, options?: ToastOptions) => string;
  info: (title: ReactNode, options?: ToastOptions) => string;
  success: (title: ReactNode, options?: ToastOptions) => string;
  warning: (title: ReactNode, options?: ToastOptions) => string;
  error: (title: ReactNode, options?: ToastOptions) => string;
  loading: (title: ReactNode, options?: ToastOptions) => string;
  dismiss: (id?: string) => void;
}

export const toast: ToastCallable = Object.assign(
  (title: ReactNode, options?: ToastOptions) => dispatchToast('default', title, options),
  {
    message: (title: ReactNode, options?: ToastOptions) => dispatchToast('default', title, options),
    info: (title: ReactNode, options?: ToastOptions) => dispatchToast('info', title, options),
    success: (title: ReactNode, options?: ToastOptions) => dispatchToast('success', title, options),
    warning: (title: ReactNode, options?: ToastOptions) => dispatchToast('warning', title, options),
    error: (title: ReactNode, options?: ToastOptions) => dispatchToast('error', title, options),
    loading: (title: ReactNode, options?: ToastOptions) => dispatchToast('loading', title, options),
    dismiss: (id?: string) => toastManager.close(id),
  },
);

function renderToastIcon(type?: string): ReactNode {
  switch (type) {
    case 'success':
      return <CircleCheck size={16} />;
    case 'error':
      return <CircleAlert size={16} />;
    case 'warning':
      return <TriangleAlert size={16} />;
    case 'info':
      return <Info size={16} />;
    case 'loading':
      return <Spinner size="sm" decorative />;
    default:
      return null;
  }
}

interface ToastViewportListProps {
  position: ToastPosition;
  closeLabel: string;
}

function ToastViewportList({ position, closeLabel }: ToastViewportListProps) {
  const { toasts } = BaseToast.useToastManager<InternalToastData>();

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport className={[styles.viewport, styles[position]].join(' ')}>
        {toasts.map((item) => {
          const typeClass = item.type && styles[item.type] ? styles[item.type] : '';
          const icon = renderToastIcon(item.type);
          const action = item.data?.action;

          return (
            <BaseToast.Root
              key={item.id}
              toast={item}
              className={[styles.toast, typeClass].filter(Boolean).join(' ')}
            >
              {icon ? (
                <span className={styles.icon} aria-hidden="true">
                  {icon}
                </span>
              ) : null}
              <BaseToast.Content className={styles.content}>
                {item.title ? (
                  <BaseToast.Title className={styles.title}>{item.title}</BaseToast.Title>
                ) : null}
                {item.description ? (
                  <BaseToast.Description className={styles.description}>
                    {item.description}
                  </BaseToast.Description>
                ) : null}
              </BaseToast.Content>
              {action ? (
                <BaseToast.Action className={styles.actionBtn} onClick={action.onClick}>
                  {action.label}
                </BaseToast.Action>
              ) : null}
              <BaseToast.Close className={styles.closeBtn} aria-label={closeLabel}>
                <X size={14} />
              </BaseToast.Close>
            </BaseToast.Root>
          );
        })}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}

export interface ToastProviderProps {
  children?: ReactNode;
  position?: ToastPosition;
  limit?: number;
  timeout?: number;
  closeLabel?: string;
}

export function ToastProvider({
  children,
  position = 'bottom-right',
  limit = 4,
  timeout = 4500,
  closeLabel = 'Dismiss notification',
}: ToastProviderProps) {
  return (
    <BaseToast.Provider toastManager={toastManager} limit={limit} timeout={timeout}>
      {children}
      <ToastViewportList position={position} closeLabel={closeLabel} />
    </BaseToast.Provider>
  );
}

export const useToast = () => BaseToast.useToastManager<InternalToastData>();
