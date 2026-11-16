import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check, Terminal } from 'lucide-react';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { Chip } from '../components/Chip/Chip';
import { THEMES, useColorScheme } from './theme';

const meta: Meta = {
  title: 'Overview/Colorschemes',
};

export default meta;
type Story = StoryObj;

export const EditorPalettes: Story = {
  render: () => {
    const { theme, setTheme } = useColorScheme();

    return (
      <div style={{ width: '560px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={18} style={{ color: 'var(--accent-primary)' }} />
            <span style={{ fontWeight: 600, fontSize: '15px' }}>:colorscheme {theme}</span>
          </div>
          <Chip color="accent" mono>
            Zero-FOUC CSS Variables
          </Chip>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {THEMES.map((item) => {
            const active = item.id === theme;
            return (
              <Card.Root
                key={item.id}
                padding="md"
                onClick={() => setTheme(item.id)}
                style={{
                  cursor: 'pointer',
                  borderColor: active ? 'var(--accent-primary)' : 'var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: '13px' }}>{item.name}</span>
                  {active ? <Check size={14} style={{ color: 'var(--accent-primary)' }} /> : null}
                </div>
                <p
                  style={{
                    margin: '0 0 12px',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {item.subtitle}
                </p>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[
                    item.canvasColor,
                    item.surfaceColor,
                    item.accentColor,
                    ...item.secondaryColors,
                  ].map((swatch) => (
                    <span
                      key={swatch}
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: swatch,
                        border: '1px solid var(--border-default)',
                      }}
                    />
                  ))}
                </div>
              </Card.Root>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="secondary" size="sm">
            Preview Surface
          </Button>
          <Button variant="primary" size="sm">
            Active Accent
          </Button>
        </div>
      </div>
    );
  },
};
