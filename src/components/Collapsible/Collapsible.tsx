import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './Collapsible.module.css';

export interface CollapsibleRootProps extends BaseCollapsible.Root.Props {
  className?: string;
}

function Root({ className = '', ...rest }: CollapsibleRootProps) {
  const classes = [styles.root, className].filter(Boolean).join(' ');
  return <BaseCollapsible.Root className={classes} {...rest} />;
}

export interface CollapsibleTriggerProps extends BaseCollapsible.Trigger.Props {
  className?: string;
  hideChevron?: boolean;
  children?: ReactNode;
}

function Trigger({
  className = '',
  hideChevron = false,
  children,
  ...rest
}: CollapsibleTriggerProps) {
  const classes = [styles.trigger, className].filter(Boolean).join(' ');
  return (
    <BaseCollapsible.Trigger className={classes} {...rest}>
      <span>{children}</span>
      {!hideChevron ? (
        <span className={styles.chevron} aria-hidden="true">
          <ChevronDown size={15} />
        </span>
      ) : null}
    </BaseCollapsible.Trigger>
  );
}

export interface CollapsiblePanelProps extends BaseCollapsible.Panel.Props {
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
}

function Panel({
  className = '',
  contentClassName = '',
  children,
  ...rest
}: CollapsiblePanelProps) {
  const panelClasses = [styles.panel, className].filter(Boolean).join(' ');
  const innerClasses = [styles.content, contentClassName].filter(Boolean).join(' ');
  return (
    <BaseCollapsible.Panel className={panelClasses} {...rest}>
      <div className={innerClasses}>{children}</div>
    </BaseCollapsible.Panel>
  );
}

export const Collapsible = {
  Root,
  Trigger,
  Panel,
};
