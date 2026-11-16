import type { ComponentPropsWithRef } from 'react';
import styles from './Card.module.css';

export interface CardRootProps extends ComponentPropsWithRef<'div'> {
  variant?: 'default' | 'sunken' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

function Root({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...rest
}: CardRootProps) {
  const classes = [styles.root, styles[variant], styles[`pad-${padding}`], className]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

function Header({ className = '', children, ...rest }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={[styles.header, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}

function Title({ className = '', children, ...rest }: ComponentPropsWithRef<'h3'>) {
  return (
    <h3 className={[styles.title, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </h3>
  );
}

function Description({ className = '', children, ...rest }: ComponentPropsWithRef<'p'>) {
  return (
    <p className={[styles.description, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </p>
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

export const Card = {
  Root,
  Header,
  Title,
  Description,
  Body,
  Content: Body,
  Footer,
};
