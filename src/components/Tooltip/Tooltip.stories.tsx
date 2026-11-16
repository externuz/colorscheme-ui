import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip.Root> = {
  title: 'Components/Tooltip',
  component: Tooltip.Root,
};

export default meta;
type Story = StoryObj<typeof Tooltip.Root>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button variant="secondary">Hover top</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="top">Top tooltip</Tooltip.Content>
      </Tooltip.Root>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button variant="subtle">Hover right</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="right">Sidebar navigation hint</Tooltip.Content>
      </Tooltip.Root>
    </div>
  ),
};
