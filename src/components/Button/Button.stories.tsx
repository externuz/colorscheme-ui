import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Forms/Button',
  component: Button,
  args: {
    children: 'Save changes',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
      <Button variant="primary">
        <Plus size={15} />
        Create
      </Button>
      <Button variant="secondary">Settings</Button>
      <Button variant="subtle">Auto Mode</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="danger">
        <Trash2 size={14} />
        Delete
      </Button>
      <Button variant="primary" loading>
        Deploying
      </Button>
    </div>
  ),
};
