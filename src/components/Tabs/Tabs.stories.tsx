import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../Card/Card';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs.Root> = {
  title: 'Navigation & Disclosure/Tabs',
  component: Tabs.Root,
};

export default meta;
type Story = StoryObj<typeof Tabs.Root>;

export const SegmentedAndUnderline: Story = {
  render: () => (
    <div style={{ width: '440px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <Tabs.Root defaultValue="keymaps">
        <Tabs.List variant="segmented">
          <Tabs.Tab value="keymaps">Keymaps</Tabs.Tab>
          <Tabs.Tab value="lsp">LSP Servers</Tabs.Tab>
          <Tabs.Tab value="treesitter">Treesitter</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="keymaps">
          <Card.Root padding="md">Leader key bound to Space with 42 buffer mappings.</Card.Root>
        </Tabs.Panel>
        <Tabs.Panel value="lsp">
          <Card.Root padding="md">ts_ls, lua_ls, and rust_analyzer attached.</Card.Root>
        </Tabs.Panel>
        <Tabs.Panel value="treesitter">
          <Card.Root padding="md">Incremental AST highlighting active for 18 languages.</Card.Root>
        </Tabs.Panel>
      </Tabs.Root>

      <Tabs.Root defaultValue="overview">
        <Tabs.List variant="underline">
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="diagnostics">Diagnostics</Tabs.Tab>
          <Tabs.Tab value="logs">Logs</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="overview">Clean flat underline tabs with sliding indicator.</Tabs.Panel>
        <Tabs.Panel value="diagnostics">0 errors, 0 warnings across workspace.</Tabs.Panel>
        <Tabs.Panel value="logs">Streaming stdout from daemon worker...</Tabs.Panel>
      </Tabs.Root>
    </div>
  ),
};
