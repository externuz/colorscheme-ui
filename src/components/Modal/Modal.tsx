import { Dialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import {
  type ComponentPropsWithRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import styles from './Modal.module.css';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

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
  size = 'md',
  className = '',
  children,
}: {
  size?: ModalSize;
  className?: string;
  children: ReactNode;
}) {
  const popupClasses = [styles.popup, styles[size], className].filter(Boolean).join(' ');

  return (
    <Dialog.Portal>
      <Dialog.Backdrop className={styles.backdrop} />
      <Dialog.Viewport className={styles.viewport}>
        <Dialog.Popup className={popupClasses}>{children}</Dialog.Popup>
      </Dialog.Viewport>
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

function Description({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <Dialog.Description className={[styles.description, className].filter(Boolean).join(' ')}>
      {children}
    </Dialog.Description>
  );
}

function Body({ className = '', children, ...rest }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={[styles.body, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}

function Footer({ className = '', children, ...rest }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={[styles.footer, className].filter(Boolean).join(' ')} {...rest}>
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

export const Modal = {
  Root,
  Trigger,
  Content,
  Header,
  Title,
  Description,
  Body,
  Footer,
  Close,
};
