import type { Preview } from '@storybook/react-vite';
import { useEffect } from 'react';
import { TooltipProvider } from '../src/components/Tooltip/Tooltip';
import '../src/styles/reset.css';
import '../src/styles/tokens.css';
import {
  applyThemeToDom,
  DEFAULT_THEME,
  setColorScheme,
  THEMES,
  type ThemeId,
} from '../src/theme/theme';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Editor Colorscheme',
      toolbar: {
        title: 'Colorscheme',
        icon: 'paintbrush',
        items: THEMES.map((t) => ({
          value: t.id,
          title: t.name,
          right: t.mode === 'light' ? 'Light' : 'Dark',
        })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: DEFAULT_THEME,
  },
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          'Overview',
          'Typography',
          ['Heading', 'Text', 'Code', 'Kbd'],
          'Forms',
          ['Button', 'ToggleGroup', 'Input', 'Textarea', 'Select', 'Slider', 'Field', 'Fieldset'],
          'Selection',
          ['Checkbox', 'Radio', 'Switch', 'CheckboxCard', 'RadioCard', 'SwitchCard'],
          'Surfaces & Data',
          ['Card', 'Table', 'Avatar', 'Chip', 'Separator', 'ScrollShadow'],
          'Navigation & Disclosure',
          ['Tabs', 'Accordion', 'Collapsible'],
          'Feedback',
          ['Alert', 'Toast', 'Spinner', 'Skeleton'],
          'Overlays',
          ['Modal', 'Drawer', 'Dropdown', 'Tooltip'],
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const selectedTheme = (context.globals.theme as ThemeId) || DEFAULT_THEME;

      useEffect(() => {
        setColorScheme(selectedTheme);
        applyThemeToDom(selectedTheme);
        document.body.style.overflow = 'auto';
      }, [selectedTheme]);

      return (
        <TooltipProvider>
          <div
            data-theme={selectedTheme}
            style={{
              backgroundColor: 'var(--bg-canvas)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              padding: '24px',
              borderRadius: 'var(--radius-lg)',
              minWidth: '280px',
            }}
          >
            <Story />
          </div>
        </TooltipProvider>
      );
    },
  ],
};

export default preview;
