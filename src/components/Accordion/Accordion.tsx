import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './Accordion.module.css';

export type AccordionVariant = 'bordered' | 'separated' | 'plain';

export interface AccordionRootProps extends BaseAccordion.Root.Props {
  variant?: AccordionVariant;
  className?: string;
}

function Root({ variant = 'bordered', className = '', ...rest }: AccordionRootProps) {
  const classes = [styles.root, styles[variant], className].filter(Boolean).join(' ');
  return <BaseAccordion.Root className={classes} {...rest} />;
}

export interface AccordionItemProps extends BaseAccordion.Item.Props {
  className?: string;
}

function Item({ className = '', ...rest }: AccordionItemProps) {
  const classes = [styles.item, className].filter(Boolean).join(' ');
  return <BaseAccordion.Item className={classes} {...rest} />;
}

export interface AccordionTriggerProps extends BaseAccordion.Trigger.Props {
  className?: string;
  children?: ReactNode;
}

function Trigger({ className = '', children, ...rest }: AccordionTriggerProps) {
  const classes = [styles.trigger, className].filter(Boolean).join(' ');
  return (
    <BaseAccordion.Header className={styles.header}>
      <BaseAccordion.Trigger className={classes} {...rest}>
        <span>{children}</span>
        <span className={styles.chevron} aria-hidden="true">
          <ChevronDown size={15} />
        </span>
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

export interface AccordionPanelProps extends BaseAccordion.Panel.Props {
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
}

function Panel({ className = '', contentClassName = '', children, ...rest }: AccordionPanelProps) {
  const panelClasses = [styles.panel, className].filter(Boolean).join(' ');
  const innerClasses = [styles.content, contentClassName].filter(Boolean).join(' ');
  return (
    <BaseAccordion.Panel className={panelClasses} {...rest}>
      <div className={innerClasses}>{children}</div>
    </BaseAccordion.Panel>
  );
}

export const Accordion = {
  Root,
  Item,
  Trigger,
  Panel,
};
