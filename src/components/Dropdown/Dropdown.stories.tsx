import type { Meta, StoryObj } from '@storybook/react-vite';
import { MoreHorizontal, Pencil, Pin, Trash2 } from 'lucide-react';
import { Button } from '../Button/Button';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown.Root> = {
  title: 'Overlays/Dropdown',
  component: Dropdown.Root,
};

export default meta;
type Story = StoryObj<typeof Dropdown.Root>;

export const Default: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button size="icon" variant="secondary" aria-label="Open menu">
          <MoreHorizontal size={16} />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content align="end">
        <Dropdown.Label>Buffer Actions</Dropdown.Label>
        <Dropdown.Item>
          <Pencil size={14} />
          Rename file
        </Dropdown.Item>
        <Dropdown.Item>
          <Pin size={14} />
          Pin tab
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item variant="danger">
          <Trash2 size={14} />
          Delete file
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  ),
};
