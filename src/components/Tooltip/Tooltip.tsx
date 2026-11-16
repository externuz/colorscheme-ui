import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { isValidElement, type ReactElement, type ReactNode } from 'react';
import styles from './Tooltip.module.css';

export function TooltipProvider({
  delay = 350,
  children,
}: {
  delay?: number;
  children: ReactNode;
}) {
  return <BaseTooltip.Provider delay={delay}>{children}</BaseTooltip.Provider>;
}

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
    <BaseTooltip.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(val) => onOpenChange?.(val)}
    >
      {children}
    </BaseTooltip.Root>
  );
}

function Trigger({
  render,
  delay,
  children,
  className = '',
}: {
  render?: ReactElement;
  delay?: number;
  children?: ReactNode;
  className?: string;
}) {
  if (render) {
    return <BaseTooltip.Trigger render={render} delay={delay} className={className} />;
  }

  if (isValidElement(children)) {
    return (
      <BaseTooltip.Trigger render={children as ReactElement} delay={delay} className={className} />
    );
  }

  return (
    <BaseTooltip.Trigger delay={delay} className={className}>
      {children}
    </BaseTooltip.Trigger>
  );
}

function Content({
  side = 'top',
  align = 'center',
  sideOffset = 8,
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
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner side={side} align={align} sideOffset={sideOffset}>
        <BaseTooltip.Popup className={[styles.popup, className].filter(Boolean).join(' ')}>
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}

export const Tooltip = {
  Provider: TooltipProvider,
  Root,
  Trigger,
  Content,
};
