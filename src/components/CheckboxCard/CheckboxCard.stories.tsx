import type { Meta, StoryObj } from '@storybook/react-vite';
import { Database, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { CheckboxCard } from './CheckboxCard';

const meta: Meta<typeof CheckboxCard> = {
  title: 'Selection/CheckboxCard',
  component: CheckboxCard,
};

export default meta;
type Story = StoryObj<typeof CheckboxCard>;

export const Default: Story = {
  render: () => {
    const [backups, setBackups] = useState(true);
    const [audit, setAudit] = useState(true);

    return (
      <div style={{ width: '360px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <CheckboxCard
          checked={backups}
          onCheckedChange={setBackups}
          color="green"
          icon={<Database size={16} />}
          title="Automated Snapshots"
          description="Create daily point-in-time PostgreSQL backups"
        />
        <CheckboxCard
          checked={audit}
          onCheckedChange={setAudit}
          color="accent"
          icon={<ShieldCheck size={16} />}
          title="Strict Token Verification"
          description="Revoke active sessions immediately on logout"
        />
      </div>
    );
  },
};
