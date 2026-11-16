import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '../Field/Field';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    size: 'md',
    placeholder: 'Write system prompt or commit notes...',
    disabled: false,
    invalid: false,
    mono: false,
    autoResize: false,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: '360px' }}>
      <Textarea {...args} />
    </div>
  ),
};

export const WithFieldAndMono: Story = {
  render: () => (
    <div style={{ width: '380px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Field.Root>
        <Field.Label>Lua Snippet</Field.Label>
        <Textarea
          mono
          defaultValue={'vim.opt.relativenumber = true\nvim.cmd.colorscheme("tokyonight")'}
        />
        <Field.Description>Executed automatically when session starts.</Field.Description>
      </Field.Root>

      <Field.Root invalid>
        <Field.Label>Auto-Resizing Notes</Field.Label>
        <Textarea autoResize invalid placeholder="Grows automatically as you type..." />
        <Field.Error>Description cannot be empty.</Field.Error>
      </Field.Root>
    </div>
  ),
};
