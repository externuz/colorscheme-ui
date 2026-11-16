import { Dialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import {
  type ComponentPropsWithRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import styles from './Drawer.module.css';

export type DrawerSide = 'right' | 'bottom';

function Root({
  open,
  defaultOpen,
  onOpenChange,
  children,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={(val) => onOpenChange?.(val)}>
      {children}
    </Dialog.Root>
  );
}

function Trigger({
  render,
  children,
  className = '',
}: {
  render?: ReactElement;
  children?: ReactNode;
  className?: string;
}) {
  if (render) {
    return <Dialog.Trigger render={render} className={className} />;
  }
  if (isValidElement(children)) {
    return <Dialog.Trigger render={children as ReactElement} className={className} />;
  }
  return <Dialog.Trigger className={className}>{children}</Dialog.Trigger>;
}

function Content({
  side = 'right',
  className = '',
  children,
}: {
  side?: DrawerSide;
  className?: string;
  children: ReactNode;
}) {
  const popupClasses = [styles.popup, styles[side], className].filter(Boolean).join(' ');
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className={styles.backdrop} />
      <Dialog.Popup className={popupClasses}>{children}</Dialog.Popup>
    </Dialog.Portal>
  );
}

function Header({ className = '', children, ...rest }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={[styles.header, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}

function Title({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <Dialog.Title className={[styles.title, className].filter(Boolean).join(' ')}>
      {children}
    </Dialog.Title>
  );
}

function Body({ className = '', children, ...rest }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={[styles.body, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}

function Close({
  className = '',
  children,
  'aria-label': ariaLabel = 'Close',
}: {
  className?: string;
  children?: ReactNode;
  'aria-label'?: string;
}) {
  if (children && isValidElement(children)) {
    return <Dialog.Close render={children as ReactElement} className={className} />;
  }
  return (
    <Dialog.Close
      aria-label={ariaLabel}
      className={[styles.closeBtn, className].filter(Boolean).join(' ')}
    >
      {children ?? <X size={16} />}
    </Dialog.Close>
  );
}

export const Drawer = {
  Root,
  Trigger,
  Content,
  Header,
  Title,
  Body,
  Close,
};
