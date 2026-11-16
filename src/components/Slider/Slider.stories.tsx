import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState(14);
    return (
      <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)' }}>Font size: {val}px</span>
        <Slider
          value={val}
          min={10}
          max={24}
          step={1}
          onValueChange={setVal}
          aria-label="Editor font size"
        />
      </div>
    );
  },
};
