import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../Card/Card';
import { Collapsible } from './Collapsible';

const meta: Meta<typeof Collapsible.Root> = {
  title: 'Navigation & Disclosure/Collapsible',
  component: Collapsible.Root,
};

export default meta;
type Story = StoryObj<typeof Collapsible.Root>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '380px' }}>
      <Collapsible.Root defaultOpen>
        <Collapsible.Trigger>Agent Reasoning Trace (3 steps)</Collapsible.Trigger>
        <Collapsible.Panel>
          <Card.Root padding="sm" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
            1. Read tsconfig.json{'\n'}
            2. Resolved CSS module tokens{'\n'}
            3. Verified zero runtime style injection
          </Card.Root>
        </Collapsible.Panel>
      </Collapsible.Root>
    </div>
  ),
};
