import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cpu, Zap } from 'lucide-react';
import { useState } from 'react';
import { RadioGroup } from '../Radio/Radio';
import { RadioCard } from './RadioCard';

const meta: Meta<typeof RadioCard> = {
  title: 'Selection/RadioCard',
  component: RadioCard,
};

export default meta;
type Story = StoryObj<typeof RadioCard>;

export const Default: Story = {
  render: () => {
    const [profile, setProfile] = useState('balanced');

    return (
      <RadioGroup
        value={profile}
        onValueChange={setProfile}
        aria-label="Compiler profile"
        style={{ width: '360px' }}
      >
        <RadioCard
          value="fast"
          icon={<Zap size={16} />}
          title="Incremental Dev"
          description="Skip full LTO for sub-second rebuilds"
        />
        <RadioCard
          value="balanced"
          icon={<Cpu size={16} />}
          title="Production Release"
          description="Full tree-shaking and dead-code elimination"
        />
      </RadioGroup>
    );
  },
};
