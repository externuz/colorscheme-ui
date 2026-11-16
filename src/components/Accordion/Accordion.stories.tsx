import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion.Root> = {
  title: 'Components/Accordion',
  component: Accordion.Root,
};

export default meta;
type Story = StoryObj<typeof Accordion.Root>;

export const Variants: Story = {
  render: () => (
    <div style={{ width: '420px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Accordion.Root defaultValue={['tokens']} variant="bordered">
        <Accordion.Item value="tokens">
          <Accordion.Trigger>Zero Runtime CSS-in-JS</Accordion.Trigger>
          <Accordion.Panel>
            All styles compile statically via CSS Modules and switch palettes instantaneously via a
            single data-theme attribute.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="a11y">
          <Accordion.Trigger>WAI-ARIA Headless Primitives</Accordion.Trigger>
          <Accordion.Panel>
            Built on Base UI for keyboard navigation, focus restoration, and screen-reader roles.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>

      <Accordion.Root variant="separated" multiple>
        <Accordion.Item value="mqtt">
          <Accordion.Trigger>MQTT Broker Bridge</Accordion.Trigger>
          <Accordion.Panel>Connected to 10.10.141.12:1883 with QoS 1 retention.</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="tts">
          <Accordion.Trigger>Streaming Voice Pipeline</Accordion.Trigger>
          <Accordion.Panel>Low-latency PCM synthesis with sentence pre-buffering.</Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
};
