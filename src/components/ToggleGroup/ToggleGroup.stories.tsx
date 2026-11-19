import type { Meta, StoryObj } from '@storybook/react-vite';
import { Code2, Eye } from 'lucide-react';
import { useState } from 'react';
import { ToggleGroup } from './ToggleGroup';

const meta: Meta<typeof ToggleGroup.Root> = {
  title: 'Forms/ToggleGroup',
  component: ToggleGroup.Root,
};

export default meta;
type Story = StoryObj<typeof ToggleGroup.Root>;

export const PreviewSwitch: Story = {
  render: () => {
    const [mode, setMode] = useState<'preview' | 'code'>('preview');
    return (
      <ToggleGroup.Root value={mode} onValueChange={setMode} aria-label="View mode">
        <ToggleGroup.Item value="preview">
          <Eye size={14} />
          Preview
        </ToggleGroup.Item>
        <ToggleGroup.Item value="code">
          <Code2 size={14} />
          Source
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    );
  },
};
