import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../Card/Card';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const ProfileCardLoading: Story = {
  render: () => (
    <Card.Root padding="md" style={{ width: '340px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Skeleton width={40} height={40} radius="full" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <Skeleton width="55%" height={14} radius="xs" />
          <Skeleton width="35%" height={11} radius="xs" />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px' }}>
        <Skeleton height={12} radius="xs" />
        <Skeleton width="82%" height={12} radius="xs" />
      </div>
    </Card.Root>
  ),
};
