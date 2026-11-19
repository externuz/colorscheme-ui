import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer.Root> = {
  title: 'Overlays/Drawer',
  component: Drawer.Root,
};

export default meta;
type Story = StoryObj<typeof Drawer.Root>;

export const RightAndBottom: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Drawer.Root>
        <Drawer.Trigger>
          <Button variant="secondary">Open Right Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content side="right">
          <Drawer.Header>
            <Drawer.Title>Session History</Drawer.Title>
            <Drawer.Close />
          </Drawer.Header>
          <Drawer.Body>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Accessible slide-over panel powered by Base UI Dialog.
            </span>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <Drawer.Root>
        <Drawer.Trigger>
          <Button variant="subtle">Open Bottom Sheet</Button>
        </Drawer.Trigger>
        <Drawer.Content side="bottom">
          <Drawer.Header>
            <Drawer.Title>Quick Actions</Drawer.Title>
            <Drawer.Close />
          </Drawer.Header>
          <Drawer.Body>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Responsive mobile bottom drawer sheet.
            </span>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </div>
  ),
};
