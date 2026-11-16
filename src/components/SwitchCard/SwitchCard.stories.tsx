import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cpu, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Chip } from '../Chip/Chip';
import { SwitchCard } from './SwitchCard';

const meta: Meta<typeof SwitchCard> = {
  title: 'Components/SwitchCard',
  component: SwitchCard,
};

export default meta;
type Story = StoryObj<typeof SwitchCard>;

export const Default: Story = {
  render: () => {
    const [lsp, setLsp] = useState(true);
    const [inlay, setInlay] = useState(false);

    return (
      <div style={{ width: '360px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <SwitchCard
          checked={lsp}
          onCheckedChange={setLsp}
          color="accent"
          icon={<Cpu size={16} />}
          title="Tree-sitter Highlighting"
          description="Incremental syntax tree parsing"
          addon={
            <Chip size="sm" color="accent">
              Recommended
            </Chip>
          }
        />
        <SwitchCard
          checked={inlay}
          onCheckedChange={setInlay}
          color="yellow"
          icon={<Sparkles size={16} />}
          title="Inlay Type Hints"
          description="Show inferred return types inline"
        />
      </div>
    );
  },
};
