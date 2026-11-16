import { memo } from 'react';
import styles from './Spinner.module.css';

export interface SpinnerProps {
  /** Spinner size: sm (16px), md (24px), lg (36px) */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant: active theme accent ('accent') or inherited text color ('current') */
  color?: 'accent' | 'current';
  /** Additional CSS class names */
  className?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** Hide from screen readers (e.g. inside a button that already sets aria-busy) */
  decorative?: boolean;
}

export const Spinner = memo(
  ({
    size = 'md',
    color = 'accent',
    className = '',
    'aria-label': ariaLabel = 'Loading',
    decorative = false,
  }: SpinnerProps) => {
    const isAccent = color === 'accent';
    const rootClass = [styles.spinner, styles[size], className].filter(Boolean).join(' ');
    const svg = (
      <svg viewBox="0 0 24 24" fill="none" className={styles.svg} aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="9.5"
          strokeWidth="2.25"
          className={isAccent ? styles.track : styles.trackCurrent}
        />
        <circle
          cx="12"
          cy="12"
          r="9.5"
          strokeWidth="2.25"
          strokeLinecap="round"
          className={[styles.arc, isAccent ? styles.arcAccent : styles.arcCurrent].join(' ')}
        />
      </svg>
    );

    if (decorative) {
      return (
        <span aria-hidden="true" className={rootClass}>
          {svg}
        </span>
      );
    }

    return (
      <output aria-label={ariaLabel} className={rootClass}>
        {svg}
      </output>
    );
  },
);
