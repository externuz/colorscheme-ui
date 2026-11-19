import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Radio, RadioGroup } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Selection/Radio',
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => {
    const [keymap, setKeymap] = useState('neovim');
    return (
      <RadioGroup value={keymap} onValueChange={setKeymap} aria-label="Editor keymap">
        <Radio value="neovim">Neovim modal bindings</Radio>
        <Radio value="emacs">Emacs chord bindings</Radio>
        <Radio value="default">Standard system shortcuts</Radio>
      </RadioGroup>
    );
  },
};
