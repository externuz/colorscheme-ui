import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Card } from './Card';

const meta: Meta<typeof Card.Root> = {
  title: 'Components/Card',
  component: Card.Root,
};

export default meta;
type Story = StoryObj<typeof Card.Root>;

export const Default: Story = {
  render: () => (
    <Card.Root style={{ width: '360px' }}>
      <Card.Header>
        <div>
          <Card.Title>Language Server</Card.Title>
          <Card.Description>typescript-language-server v4.3</Card.Description>
        </div>
      </Card.Header>
      <Card.Body>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Workspace diagnostics and semantic tokens are synchronized.
        </span>
      </Card.Body>
      <Card.Footer>
        <Button size="sm" variant="ghost">
          Logs
        </Button>
        <Button size="sm" variant="primary">
          Restart LSP
        </Button>
      </Card.Footer>
    </Card.Root>
  ),
};
