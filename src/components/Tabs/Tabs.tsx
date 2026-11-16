import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type { ComponentPropsWithRef } from 'react';
import styles from './Tabs.module.css';

export type TabsVariant = 'segmented' | 'underline';

export interface TabsRootProps extends BaseTabs.Root.Props {
  className?: string;
}

function Root({ className = '', ...rest }: TabsRootProps) {
  const classes = [styles.root, className].filter(Boolean).join(' ');
  return <BaseTabs.Root className={classes} {...rest} />;
}

export interface TabsListProps extends BaseTabs.List.Props {
  variant?: TabsVariant;
  className?: string;
}

function List({ variant = 'segmented', className = '', children, ...rest }: TabsListProps) {
  const classes = [styles.list, styles[variant], className].filter(Boolean).join(' ');
  return (
    <BaseTabs.List className={classes} {...rest}>
      {children}
      <BaseTabs.Indicator className={styles.indicator} />
    </BaseTabs.List>
  );
}

export interface TabsTabProps extends BaseTabs.Tab.Props {
  className?: string;
}

function Tab({ className = '', ...rest }: TabsTabProps) {
  const classes = [styles.tab, className].filter(Boolean).join(' ');
  return <BaseTabs.Tab className={classes} {...rest} />;
}

export interface TabsPanelProps extends ComponentPropsWithRef<typeof BaseTabs.Panel> {
  className?: string;
}

function Panel({ className = '', ...rest }: TabsPanelProps) {
  const classes = [styles.panel, className].filter(Boolean).join(' ');
  return <BaseTabs.Panel className={classes} {...rest} />;
}

export const Tabs = {
  Root,
  List,
  Tab,
  Panel,
};
