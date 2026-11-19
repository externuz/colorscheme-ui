import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '../Field/Field';
import { Input } from '../Input/Input';
import { Switch } from '../Switch/Switch';
import { Fieldset } from './Fieldset';

const meta: Meta<typeof Fieldset.Root> = {
  title: 'Forms/Fieldset',
  component: Fieldset.Root,
};

export default meta;
type Story = StoryObj<typeof Fieldset.Root>;

export const Default: Story = {
  render: () => (
    <Fieldset.Root style={{ width: '360px' }}>
      <Fieldset.Legend>Connection</Fieldset.Legend>
      <Field.Root>
        <Field.Label>Host</Field.Label>
        <Input defaultValue="127.0.0.1" />
      </Field.Root>
      <Field.Root>
        <Field.Label>Port</Field.Label>
        <Input defaultValue="5432" />
      </Field.Root>
    </Fieldset.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Fieldset.Root disabled style={{ width: '360px' }}>
      <Fieldset.Legend>Read-only Settings</Fieldset.Legend>
      <Field.Root>
        <Field.Label>Cluster ID</Field.Label>
        <Input defaultValue="prod-eu-central-1" />
      </Field.Root>
      <Switch defaultChecked>Auto-failover</Switch>
    </Fieldset.Root>
  ),
};
