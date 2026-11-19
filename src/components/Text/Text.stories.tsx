import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../Card/Card';
import { Code } from '../Code/Code';
import { Heading } from '../Heading/Heading';
import { Kbd } from '../Kbd/Kbd';
import { Separator } from '../Separator/Separator';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const SizesAndHierarchy: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '520px' }}>
      <Text as="p" size="xl">
        xl (16px) — Lead paragraph introducing editor-grade semantic tokens.
      </Text>
      <Text as="p" size="lg">
        lg (14px) — Comfortable prose size for documentation and release notes.
      </Text>
      <Text as="p" size="md">
        md (13px) — Default application UI text aligned with inputs and buttons.
      </Text>
      <Text as="p" size="sm" color="secondary">
        sm (12px) — Secondary descriptions, metadata, and helper copy.
      </Text>
      <Text as="p" size="xs" color="muted">
        xs (11px) — Muted captions, timestamps, and fine-print annotations.
      </Text>
    </div>
  ),
};

export const SemanticPalette: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', maxWidth: '520px' }}>
      <Text weight="medium" color="primary">
        primary
      </Text>
      <Text weight="medium" color="secondary">
        secondary
      </Text>
      <Text weight="medium" color="muted">
        muted
      </Text>
      <Text weight="medium" color="accent">
        accent
      </Text>
      <Text weight="medium" color="success">
        success
      </Text>
      <Text weight="medium" color="warning">
        warning
      </Text>
      <Text weight="medium" color="danger">
        danger
      </Text>
      <Text weight="medium" color="blue">
        blue
      </Text>
      <Text weight="medium" color="purple">
        purple
      </Text>
      <Text weight="medium" color="cyan">
        cyan
      </Text>
      <Text weight="medium" color="green">
        green
      </Text>
      <Text weight="medium" color="yellow">
        yellow
      </Text>
      <Text weight="medium" color="orange">
        orange
      </Text>
      <Text weight="medium" color="red">
        red
      </Text>
    </div>
  ),
};

export const TruncationAndClamp: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '320px' }}>
      <Text truncate weight="medium">
        /srv/workspaces/colorscheme-ui/src/components/Typography/long-path-segment.tsx
      </Text>
      <Text as="p" size="sm" color="secondary" lineClamp={2}>
        Tree-sitter builds a concrete syntax tree for a source file and efficiently updates the
        syntax tree as the source file is edited in real time without blocking the main UI thread.
      </Text>
    </div>
  ),
};

export const EditorDocComposition: Story = {
  render: () => (
    <Card.Root variant="elevated" padding="lg" style={{ maxWidth: '480px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Text size="xs" mono color="accent" weight="semibold">
          KEYMAP &amp; RUNTIME
        </Text>
        <Heading as="h2" size="xl">
          Instant Palette Switching
        </Heading>
        <Text as="p" size="sm" color="secondary">
          Press <Kbd size="sm">⌘</Kbd> <Kbd size="sm">K</Kbd> to open the command bar or run{' '}
          <Code color="purple">:colorscheme</Code> in normal mode.
        </Text>
      </div>
      <Separator />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text size="xs" color="muted">
          Render latency
        </Text>
        <Text size="xs" mono tabular color="success" weight="medium">
          0.18 ms
        </Text>
      </div>
    </Card.Root>
  ),
};
