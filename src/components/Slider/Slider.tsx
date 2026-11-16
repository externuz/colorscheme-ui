import { Slider as BaseSlider } from '@base-ui/react/slider';
import styles from './Slider.module.css';

export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  hideThumb?: boolean;
  onValueChange?: (value: number) => void;
  onValueCommitted?: (value: number) => void;
  className?: string;
  'aria-label'?: string;
}

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  hideThumb = false,
  onValueChange,
  onValueCommitted,
  className = '',
  'aria-label': ariaLabel,
}: SliderProps) {
  return (
    <BaseSlider.Root
      value={value}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      aria-label={ariaLabel}
      onValueChange={(val) => {
        const numeric = Array.isArray(val) ? val[0] : val;
        if (typeof numeric === 'number') onValueChange?.(numeric);
      }}
      onValueCommitted={(val) => {
        const numeric = Array.isArray(val) ? val[0] : val;
        if (typeof numeric === 'number') onValueCommitted?.(numeric);
      }}
      className={[styles.root, className].filter(Boolean).join(' ')}
    >
      <BaseSlider.Control className={styles.control}>
        <BaseSlider.Track className={styles.track}>
          <BaseSlider.Indicator className={styles.indicator} />
          {!hideThumb ? <BaseSlider.Thumb className={styles.thumb} /> : null}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
