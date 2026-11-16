import type { Meta, StoryObj } from '@storybook/react-vite';
import { Globe, Terminal } from 'lucide-react';
import { useState } from 'react';
import { Field } from '../Field/Field';
import { Select } from './Select';

const meta: Meta<typeof Select.Root> = {
  title: 'Components/Select',
  component: Select.Root,
};

export default meta;
type Story = StoryObj<typeof Select.Root>;

export const Default: Story = {
  render: () => {
    const [runtime, setRuntime] = useState('bun');

    return (
      <div style={{ width: '300px' }}>
        <Field.Root>
          <Field.Label>JavaScript Runtime</Field.Label>
          <Select.Root value={runtime} onValueChange={setRuntime}>
            <Select.Trigger startSlot={<Terminal size={14} />} placeholder="Choose runtime..." />
            <Select.Content>
              <Select.Group>
                <Select.GroupLabel>Modern Runtimes</Select.GroupLabel>
                <Select.Item value="bun" description="Fast JavaScript all-in-one toolkit">
                  Bun 1.4
                </Select.Item>
                <Select.Item value="deno" description="Secure TypeScript runtime on V8">
                  Deno 2.2
                </Select.Item>
              </Select.Group>
              <Select.Separator />
              <Select.Group>
                <Select.GroupLabel>Classic</Select.GroupLabel>
                <Select.Item value="node" description="LTS server runtime">
                  Node.js 22 LTS
                </Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <Field.Description>Supports keyboard typeahead and arrow navigation.</Field.Description>
        </Field.Root>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Select.Root defaultValue="eu-central">
        <Select.Trigger size="sm" startSlot={<Globe size={13} />} />
        <Select.Content>
          <Select.Item value="eu-central">Frankfurt (eu-central-1)</Select.Item>
          <Select.Item value="us-east">Virginia (us-east-1)</Select.Item>
        </Select.Content>
      </Select.Root>

      <Select.Root defaultValue="eu-central">
        <Select.Trigger size="md" startSlot={<Globe size={14} />} />
        <Select.Content>
          <Select.Item value="eu-central">Frankfurt (eu-central-1)</Select.Item>
          <Select.Item value="us-east">Virginia (us-east-1)</Select.Item>
        </Select.Content>
      </Select.Root>

      <Select.Root defaultValue="eu-central">
        <Select.Trigger size="lg" startSlot={<Globe size={15} />} />
        <Select.Content>
          <Select.Item value="eu-central">Frankfurt (eu-central-1)</Select.Item>
          <Select.Item value="us-east">Virginia (us-east-1)</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};
