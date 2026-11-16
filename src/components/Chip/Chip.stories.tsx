import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Palette: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chip color="neutral">Idle</Chip>
      <Chip color="accent">LSP</Chip>
      <Chip color="green">Healthy</Chip>
      <Chip color="yellow" mono>
        14 ms
      </Chip>
      <Chip color="orange" mono>
        v0.1.0
      </Chip>
      <Chip color="red">Error</Chip>
      <Chip color="blue">TSX</Chip>
      <Chip color="purple">AST</Chip>
      <Chip color="cyan">UTF-8</Chip>
    </div>
  ),
};
