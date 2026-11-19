import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../Input/Input';
import { Text } from '../Text/Text';
import { Kbd } from './Kbd';

const meta: Meta<typeof Kbd> = {
  title: 'Typography/Kbd',
  component: Kbd,
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Shortcuts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '340px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
        <Kbd>Ctrl + P</Kbd>
        <Kbd>Esc</Kbd>
        <Kbd>:wq</Kbd>
        <Kbd variant="flat">&lt;leader&gt;ff</Kbd>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Kbd size="sm">sm</Kbd>
        <Kbd size="md">md</Kbd>
        <Kbd size="lg">lg</Kbd>
      </div>

      <Input
        placeholder="Search commands..."
        endSlot={
          <span style={{ display: 'inline-flex', gap: '4px' }}>
            <Kbd size="sm">⌘</Kbd>
            <Kbd size="sm">K</Kbd>
          </span>
        }
      />

      <Text size="xs" color="muted">
        Press <Kbd size="sm">g</Kbd> then <Kbd size="sm">d</Kbd> to jump to definition.
      </Text>
    </div>
  ),
};
