import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Selection/Switch',
  component: Switch,
  args: {
    children: 'Format buffer on save',
    defaultChecked: true,
    size: 'md',
    color: 'accent',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const SizesAndColors: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(true);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Switch size="sm" checked={enabled} onCheckedChange={setEnabled}>
          Small inline switch
        </Switch>
        <Switch size="md" color="green" checked={enabled} onCheckedChange={setEnabled}>
          Medium green switch
        </Switch>
        <Switch size="md" color="yellow" checked={enabled} onCheckedChange={setEnabled}>
          Medium yellow switch
        </Switch>
      </div>
    );
  },
};
