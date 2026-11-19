import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { ToastProvider, toast } from './Toast';

const meta: Meta<typeof ToastProvider> = {
  title: 'Feedback/Toast',
  component: ToastProvider,
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

export const InteractiveTriggers: Story = {
  render: () => (
    <ToastProvider position="bottom-right">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '480px' }}>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => toast('Buffer saved to disk', { description: 'init.lua (142 lines)' })}
        >
          Default
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => toast.info('LSP workspace indexed', { description: '482 symbols ready' })}
        >
          Info
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => toast.success('Configuration reloaded')}
        >
          Success
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            toast.warning('Deprecated option detected', {
              description: 'Migrate termguicolors before v1.0',
            })
          }
        >
          Warning
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() =>
            toast.error('Connection refused', {
              description: 'Broker 10.10.141.12:1883 unreachable',
              action: { label: 'Retry', onClick: () => toast.info('Reconnecting...') },
            })
          }
        >
          Error + Action
        </Button>
      </div>
    </ToastProvider>
  ),
};
