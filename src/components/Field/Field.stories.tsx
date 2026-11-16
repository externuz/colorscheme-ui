import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../Input/Input';
import { Field } from './Field';

const meta: Meta<typeof Field.Root> = {
  title: 'Components/Field',
  component: Field.Root,
};

export default meta;
type Story = StoryObj<typeof Field.Root>;

export const Default: Story = {
  render: () => (
    <Field.Root style={{ width: '320px' }}>
      <Field.Label>Workspace Slug</Field.Label>
      <Input placeholder="core-platform" />
      <Field.Description>Used in project URLs and CLI configuration.</Field.Description>
    </Field.Root>
  ),
};
