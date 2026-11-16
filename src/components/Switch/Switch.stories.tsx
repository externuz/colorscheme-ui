import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch.Control> = {
  title: 'Components/Switch',
  component: Switch.Control,
};

export default meta;
type Story = StoryObj<typeof Switch.Control>;

export const InteractiveRow: Story = {
  render: () => {
    const [on, setOn] = useState(true);
    return (
      <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Switch.Row checked={on} onCheckedChange={setOn} color="accent">
          <span style={{ fontSize: '13px', fontWeight: 600 }}>Tree-sitter Highlighting</span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Incremental AST parser
          </span>
        </Switch.Row>
      </div>
    );
  },
};
