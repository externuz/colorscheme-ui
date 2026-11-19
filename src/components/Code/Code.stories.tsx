import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../Text/Text';
import { Code } from './Code';

const meta: Meta<typeof Code> = {
  title: 'Typography/Code',
  component: Code,
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Palette: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '520px' }}>
      <Code color="neutral">init.lua</Code>
      <Code color="accent">useColorScheme()</Code>
      <Code color="purple">import</Code>
      <Code color="cyan">ThemeId</Code>
      <Code color="blue">--no-emit</Code>
      <Code color="green">&quot;tokyo-night&quot;</Code>
      <Code color="yellow">WARN_DEPRECATED</Code>
      <Code color="orange">v0.5.0</Code>
      <Code color="red">ERR_CONNECTION</Code>
    </div>
  ),
};

export const InlineProse: Story = {
  render: () => (
    <Text as="p" size="md" color="secondary" style={{ maxWidth: '460px' }}>
      Import <Code color="green">colorscheme-ui/styles.css</Code> once at your entry point and call{' '}
      <Code color="purple" nowrap>
        configureColorScheme()
      </Code>{' '}
      before hydration.
    </Text>
  ),
};
