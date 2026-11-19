import type { Meta, StoryObj } from '@storybook/react-vite';
import { Code } from '../Code/Code';
import { Text } from '../Text/Text';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Scale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '560px' }}>
      <Heading as="h1" size="3xl">
        3xl — Iconic Editor Colorschemes
      </Heading>
      <Heading as="h1">2xl (h1) — Workspace Diagnostics</Heading>
      <Heading as="h2">xl (h2) — Language Server Protocol</Heading>
      <Heading as="h3">lg (h3) — Tree-sitter Highlight Groups</Heading>
      <Heading as="h4">md (h4) — Buffer Configuration</Heading>
      <Heading as="h5">sm (h5) — Keymap Bindings</Heading>
      <Heading as="h6">xs (h6) — Statusline Segments</Heading>
    </div>
  ),
};

export const MonospaceAndAccents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '520px' }}>
      <Heading as="h2" mono>
        :colorscheme <Text color="accent">tokyo-night</Text>
      </Heading>
      <Heading as="h3" size="lg">
        Zero-FOUC bootstrap via <Code color="purple">getThemeInitScript()</Code>
      </Heading>
      <Heading as="h4" color="secondary" weight="medium">
        Decoupled semantic heading level and optical size
      </Heading>
    </div>
  ),
};
