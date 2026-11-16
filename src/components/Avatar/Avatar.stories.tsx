import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const PaletteInitialsAndSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar name="Folke Lemaitre" />
        <Avatar name="Bram Moolenaar" />
        <Avatar name="Catppuccin Mocha" />
        <Avatar name="Pavel Pertsev" />
        <Avatar name="TJ DeVries" />
        <Avatar name="Mitchell Hashimoto" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar name="Alex Doe" size="xs" />
        <Avatar name="Alex Doe" size="sm" />
        <Avatar name="Alex Doe" size="md" />
        <Avatar name="Alex Doe" size="lg" />
        <Avatar name="Alex Doe" size="xl" shape="rounded" />
      </div>
    </div>
  ),
};
