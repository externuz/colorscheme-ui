import { Menu } from '@base-ui/react/menu';
import { isValidElement, type ReactElement, type ReactNode } from 'react';
import styles from './Dropdown.module.css';

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
    <Menu.Root open={open} defaultOpen={defaultOpen} onOpenChange={(val) => onOpenChange?.(val)}>
      {children}
    </Menu.Root>
  );
}

function Trigger({
  render,
  disabled,
  className = '',
  children,
}: {
  render?: ReactElement;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  if (render) {
    return <Menu.Trigger render={render} disabled={disabled} className={className} />;
  }

  if (isValidElement(children)) {
    return (
      <Menu.Trigger render={children as ReactElement} disabled={disabled} className={className} />
    );
  }

  return (
    <Menu.Trigger disabled={disabled} className={className}>
      {children}
    </Menu.Trigger>
  );
}

function Content({
  side = 'bottom',
  align = 'end',
  sideOffset = 6,
  className = '',
  children,
}: {
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Menu.Portal>
      <Menu.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={styles.positioner}
      >
        <Menu.Popup className={[styles.popup, className].filter(Boolean).join(' ')}>
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

function Item({
  variant = 'default',
  disabled = false,
  closeOnClick = true,
  onClick,
  className = '',
  children,
}: {
  variant?: 'default' | 'danger';
  disabled?: boolean;
  closeOnClick?: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}) {
  const classes = [styles.item, variant === 'danger' ? styles.danger : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Menu.Item
      disabled={disabled}
      closeOnClick={closeOnClick}
      onClick={() => onClick?.()}
      className={classes}
    >
      {children}
    </Menu.Item>
  );
}

function Separator({ className = '' }: { className?: string }) {
  return <Menu.Separator className={[styles.separator, className].filter(Boolean).join(' ')} />;
}

function Label({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={[styles.label, className].filter(Boolean).join(' ')}>{children}</div>;
}

export const Dropdown = {
  Root,
  Trigger,
  Content,
  Item,
  Separator,
  Label,
};
