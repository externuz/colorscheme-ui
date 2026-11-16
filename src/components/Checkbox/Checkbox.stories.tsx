import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    children: 'Format buffer on save',
    defaultChecked: true,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};
