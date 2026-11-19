import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'Surfaces & Data/Separator',
  component: Separator,
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <span>Section One</span>
      <Separator />
      <span>Section Two</span>
    </div>
  ),
};
