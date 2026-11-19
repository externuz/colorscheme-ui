import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  args: {
    placeholder: 'Type a command...',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithIconAndValidation: Story = {
  render: () => (
    <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Input startSlot={<Search size={15} />} placeholder="Search symbols..." />
      <Input invalid placeholder="Invalid value" defaultValue="bad_token" />
    </div>
  ),
};
