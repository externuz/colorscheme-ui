import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollShadow } from './ScrollShadow';

const meta: Meta<typeof ScrollShadow> = {
  title: 'Surfaces & Data/ScrollShadow',
  component: ScrollShadow,
};

export default meta;
type Story = StoryObj<typeof ScrollShadow>;

export const Default: Story = {
  render: () => (
    <ScrollShadow
      style={{
        height: '160px',
        width: '280px',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '12px',
      }}
    >
      {Array.from({ length: 14 }, (_, idx) => `Buffer entry #${idx + 1}`).map((label) => (
        <div
          key={label}
          style={{
            padding: '6px 0',
            fontSize: '13px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {label}
        </div>
      ))}
    </ScrollShadow>
  ),
};
