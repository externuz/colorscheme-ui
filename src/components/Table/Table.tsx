import type { ComponentPropsWithRef } from 'react';
import styles from './Table.module.css';

function Root({ className = '', children, ...rest }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')} {...rest}>
      <table className={styles.table}>{children}</table>
    </div>
  );
}

function Header({ className = '', children, ...rest }: ComponentPropsWithRef<'thead'>) {
  return (
    <thead className={[styles.thead, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </thead>
  );
}

function Body({ className = '', children, ...rest }: ComponentPropsWithRef<'tbody'>) {
  return (
    <tbody className={[styles.tbody, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </tbody>
  );
}

function Row({ className = '', children, ...rest }: ComponentPropsWithRef<'tr'>) {
  return (
    <tr className={[styles.tr, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </tr>
  );
}

function Column({ className = '', children, ...rest }: ComponentPropsWithRef<'th'>) {
  return (
    <th className={[styles.th, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </th>
  );
}

function Cell({ className = '', children, ...rest }: ComponentPropsWithRef<'td'>) {
  return (
    <td className={[styles.td, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </td>
  );
}

export const Table = {
  Root,
  Header,
  Body,
  Row,
  Column,
  Cell,
};
