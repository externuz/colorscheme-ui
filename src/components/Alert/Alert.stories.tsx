import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Variants: Story = {
  render: () => (
    <div style={{ width: '440px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Alert variant="neutral" title="Workspace Indexed">
        482 TypeScript modules parsed in 190ms.
      </Alert>
      <Alert variant="info" title="New Colorscheme Available">
        Switch between Tokyo Night, Catppuccin Mocha, and Gruvbox from the toolbar.
      </Alert>
      <Alert variant="success" title="Deployment Succeeded">
        Static bundle uploaded with zero warnings.
      </Alert>
      <Alert variant="warning" title="High Memory Pressure">
        Language server heap usage exceeded 85% threshold.
      </Alert>
      <Alert
        variant="danger"
        title="Authentication Failed"
        action={
          <Button size="sm" variant="secondary">
            Retry
          </Button>
        }
      >
        Invalid SSH signature or expired session token.
      </Alert>
    </div>
  ),
};
