import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Modal } from './Modal';

const meta: Meta<typeof Modal.Root> = {
  title: 'Overlays/Modal',
  component: Modal.Root,
};

export default meta;
type Story = StoryObj<typeof Modal.Root>;

export const Default: Story = {
  render: () => (
    <Modal.Root>
      <Modal.Trigger>
        <Button variant="primary">Open Modal</Button>
      </Modal.Trigger>
      <Modal.Content size="sm">
        <Modal.Header>
          <Modal.Title>Delete Repository</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <Modal.Description>
            This action permanently removes the selected workspace and its build cache.
          </Modal.Description>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button size="sm" variant="ghost">
              Cancel
            </Button>
          </Modal.Close>
          <Button size="sm" variant="danger">
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  ),
};
