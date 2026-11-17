import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  Accordion,
  Alert,
  Avatar,
  applyThemeToDom,
  Button,
  Card,
  Checkbox,
  CheckboxCard,
  Chip,
  Collapsible,
  configureColorScheme,
  Drawer,
  Dropdown,
  Field,
  getAvatarInitials,
  getThemeInitScript,
  Input,
  Modal,
  Radio,
  RadioCard,
  RadioGroup,
  ScrollShadow,
  Select,
  Separator,
  Skeleton,
  Spinner,
  Switch,
  SwitchCard,
  setColorScheme,
  Table,
  Tabs,
  Textarea,
  THEMES,
  ToastProvider,
  ToggleGroup,
  toast,
  useColorScheme,
} from './index';

function ColorSchemeProbe() {
  const { theme, setTheme } = useColorScheme();
  return (
    <button type="button" onClick={() => setTheme('gruvbox-light')}>
      Active: {theme}
    </button>
  );
}

describe('colorscheme-ui', () => {
  it('Button handles variants, clicks, disabled, and loading state cleanly', () => {
    const onClick = vi.fn();
    const { rerender } = render(
      <Button variant="primary" onClick={onClick}>
        Save
      </Button>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(
      <Button variant="primary" loading onClick={onClick}>
        Save
      </Button>,
    );
    const loadingBtn = screen.getByRole('button', { name: 'Save' });
    expect(loadingBtn).toBeDisabled();
    expect(loadingBtn).toHaveAttribute('aria-busy', 'true');
  });

  it('Field + Input + Textarea bind labels, slots, and validation alerts', () => {
    const onChange = vi.fn();
    render(
      <div>
        <Field.Root invalid>
          <Field.Label htmlFor="slug-input">Slug</Field.Label>
          <Input
            id="slug-input"
            placeholder="Enter slug"
            startSlot={<span data-testid="prefix">~</span>}
            invalid
            onChange={onChange}
          />
          <Field.Error>Slug is required</Field.Error>
        </Field.Root>

        <Field.Root>
          <Field.Label>Init Script</Field.Label>
          <Textarea mono autoResize placeholder="Write Lua..." />
        </Field.Root>
      </div>,
    );

    expect(screen.getByTestId('prefix')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Slug is required');

    fireEvent.change(screen.getByPlaceholderText('Enter slug'), { target: { value: 'nvim' } });
    expect(onChange).toHaveBeenCalledTimes(1);

    const textarea = screen.getByPlaceholderText('Write Lua...');
    fireEvent.input(textarea, { target: { value: 'vim.opt.number = true' } });
    expect(textarea).toHaveValue('vim.opt.number = true');
  });

  it('Atomic Switch, Checkbox, and RadioGroup + Radio toggle states cleanly', () => {
    const onSwitch = vi.fn();
    const onCheck = vi.fn();
    const onRadio = vi.fn();

    render(
      <div>
        <Switch checked={false} color="accent" onCheckedChange={onSwitch}>
          LSP Diagnostics
        </Switch>
        <Checkbox checked={false} onCheckedChange={onCheck}>
          Auto-format
        </Checkbox>
        <RadioGroup value="neovim" onValueChange={onRadio} aria-label="Keymap">
          <Radio value="neovim">Neovim</Radio>
          <Radio value="emacs">Emacs</Radio>
        </RadioGroup>
      </div>,
    );

    fireEvent.click(screen.getByRole('switch'));
    expect(onSwitch).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(onCheck).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByText('Emacs'));
    expect(onRadio).toHaveBeenCalledWith('emacs');
  });

  it('SwitchCard, CheckboxCard, and RadioCard toggle via full-card label click', () => {
    const onSwitchCard = vi.fn();
    const onCheckboxCard = vi.fn();
    const onRadioCard = vi.fn();

    render(
      <div>
        <SwitchCard
          checked={false}
          color="yellow"
          title="Tree-sitter"
          description="Incremental syntax parser"
          onCheckedChange={onSwitchCard}
        />
        <CheckboxCard
          checked={false}
          color="green"
          title="Daily Snapshots"
          description="Automated backups"
          onCheckedChange={onCheckboxCard}
        />
        <RadioGroup value="fast" onValueChange={onRadioCard} aria-label="Build profile">
          <RadioCard value="fast" title="Fast Dev" description="Sub-second rebuilds" />
          <RadioCard value="release" title="Release" description="Full LTO optimization" />
        </RadioGroup>
      </div>,
    );

    fireEvent.click(screen.getByText('Tree-sitter'));
    expect(onSwitchCard).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByText('Daily Snapshots'));
    expect(onCheckboxCard).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByText('Release'));
    expect(onRadioCard).toHaveBeenCalledWith('release');
  });

  it('ToggleGroup and Tabs switch active items cleanly', () => {
    const onToggleChange = vi.fn();
    render(
      <div>
        <ToggleGroup.Root
          value="tokyo-night"
          onValueChange={onToggleChange}
          aria-label="Colorscheme"
        >
          <ToggleGroup.Item value="tokyo-night">Tokyo</ToggleGroup.Item>
          <ToggleGroup.Item value="gruvbox-dark">Gruvbox</ToggleGroup.Item>
        </ToggleGroup.Root>

        <Tabs.Root defaultValue="first">
          <Tabs.List variant="underline">
            <Tabs.Tab value="first">First Tab</Tabs.Tab>
            <Tabs.Tab value="second">Second Tab</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="first">Panel One</Tabs.Panel>
          <Tabs.Panel value="second">Panel Two</Tabs.Panel>
        </Tabs.Root>
      </div>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Gruvbox' }));
    expect(onToggleChange).toHaveBeenCalledWith('gruvbox-dark');

    expect(screen.getByText('Panel One')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Second Tab' }));
    expect(screen.getByText('Panel Two')).toBeInTheDocument();
  });

  it('Collapsible and Accordion expand and collapse panels', () => {
    render(
      <div>
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Trigger>Show Trace</Collapsible.Trigger>
          <Collapsible.Panel>Trace Details</Collapsible.Panel>
        </Collapsible.Root>

        <Accordion.Root defaultValue={['a']} variant="bordered">
          <Accordion.Item value="a">
            <Accordion.Trigger>Section A</Accordion.Trigger>
            <Accordion.Panel>Content A</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="b">
            <Accordion.Trigger>Section B</Accordion.Trigger>
            <Accordion.Panel>Content B</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      </div>,
    );

    expect(screen.queryByText('Trace Details')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Show Trace' }));
    expect(screen.getByText('Trace Details')).toBeInTheDocument();

    expect(screen.getByText('Content A')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Section B' }));
    expect(screen.getByText('Content B')).toBeInTheDocument();
  });

  it('Modal and Drawer render accessible dialogs with English Close default', () => {
    const onCloseModal = vi.fn();
    render(
      <div>
        <Modal.Root open onOpenChange={onCloseModal}>
          <Modal.Content size="sm">
            <Modal.Header>
              <Modal.Title>Confirm Delete</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Description>Permanent operation</Modal.Description>
            <Modal.Body>Body</Modal.Body>
            <Modal.Footer>Footer</Modal.Footer>
          </Modal.Content>
        </Modal.Root>

        <Drawer.Root open={false}>
          <Drawer.Content>
            <Drawer.Title>Hidden Drawer</Drawer.Title>
          </Drawer.Content>
        </Drawer.Root>
      </div>,
    );

    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
    expect(screen.queryByText('Hidden Drawer')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onCloseModal).toHaveBeenCalledWith(false);
  });

  it('Dropdown renders menu items and triggers onClick', () => {
    const onSelect = vi.fn();
    render(
      <Dropdown.Root defaultOpen>
        <Dropdown.Trigger>Menu</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Label>Actions</Dropdown.Label>
          <Dropdown.Item onClick={onSelect}>Rename</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item variant="danger">Delete</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>,
    );

    expect(screen.getByText('Actions')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Rename'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('Select resolves initial item label before opening and selects option', () => {
    const onValueChange = vi.fn();
    render(
      <Select.Root value="bun" onValueChange={onValueChange}>
        <Select.Trigger aria-label="Runtime" />
        <Select.Content>
          <Select.Group>
            <Select.GroupLabel>Runtimes</Select.GroupLabel>
            <Select.Item value="bun" description="Fast JS toolkit">
              Bun 1.4
            </Select.Item>
            <Select.Item value="deno">Deno 2.2</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>,
    );

    const trigger = screen.getByRole('combobox', { name: 'Runtime' });
    expect(trigger).toHaveTextContent('Bun 1.4');

    fireEvent.click(trigger);
    expect(screen.getByText('Runtimes')).toBeInTheDocument();

    const denoOption = screen.getByRole('option', { name: 'Deno 2.2' });
    fireEvent.pointerDown(denoOption);
    fireEvent.click(denoOption);
    expect(onValueChange).toHaveBeenCalledWith('deno');
  });

  it('Card, Chip, Table (plain), Alert, Avatar, Skeleton, Separator, Spinner, and ScrollShadow render cleanly', () => {
    expect(getAvatarInitials('Alex Doe')).toBe('AD');
    expect(getAvatarInitials('@externuz')).toBe('E');

    const { container } = render(
      <Card.Root variant="elevated" padding="md">
        <Card.Header>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar name="Alex Doe" colorKey="alex_doe" data-testid="avatar-1" />
            <Avatar name="Bob Smith" colorKey="alex_doe" data-testid="avatar-2" />
            <Card.Title>Nodes</Card.Title>
          </div>
          <Chip color="green">Online</Chip>
        </Card.Header>
        <Separator />
        <Card.Body>
          <Alert variant="danger" title="Node Offline">
            Broker unreachable
          </Alert>
          <Skeleton width={120} height={14} data-testid="skeleton-bar" />
          <ScrollShadow style={{ maxHeight: 120 }}>
            <Table.Root variant="plain">
              <Table.Header>
                <Table.Row>
                  <Table.Column>Service</Table.Column>
                  <Table.Column>State</Table.Column>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>lsp-worker</Table.Cell>
                  <Table.Cell>
                    <Spinner size="sm" />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </ScrollShadow>
        </Card.Body>
      </Card.Root>,
    );

    expect(screen.getByText('AD')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="avatar-1"]')?.getAttribute('data-palette')).toBe(
      container.querySelector('[data-testid="avatar-2"]')?.getAttribute('data-palette'),
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Node Offline');
    expect(screen.getByTestId('skeleton-bar')).toHaveStyle({ width: '120px', height: '14px' });
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('Avatar forwards loading prop to inner img element, not root, and preserves default behavior when omitted', () => {
    const OriginalImage = window.Image;
    const createdPreloadImages: HTMLImageElement[] = [];

    class MockPreloadImage extends OriginalImage {
      constructor(width?: number, height?: number) {
        super(width, height);
        createdPreloadImages.push(this);
      }
    }

    window.Image = MockPreloadImage;

    try {
      render(
        <div>
          <Avatar
            src="https://example.com/ada.png"
            name="Ada Lovelace"
            loading="lazy"
            data-testid="avatar-lazy"
          />
          <Avatar
            src="https://example.com/linus.png"
            name="Linus Torvalds"
            loading="eager"
            data-testid="avatar-eager"
          />
          <Avatar name="Grace Hopper" loading="lazy" data-testid="avatar-no-src" />
        </div>,
      );

      const lazyRoot = screen.getByTestId('avatar-lazy');
      const lazyImg = lazyRoot.querySelector('img');
      expect(lazyRoot).not.toHaveAttribute('loading');
      expect(lazyImg).not.toBeNull();
      expect(lazyImg).toHaveAttribute('loading', 'lazy');
      expect(lazyImg).toHaveAttribute('src', 'https://example.com/ada.png');
      expect(lazyImg).toHaveAttribute('alt', 'Ada Lovelace');

      const eagerRoot = screen.getByTestId('avatar-eager');
      const eagerImg = eagerRoot.querySelector('img');
      expect(eagerRoot).not.toHaveAttribute('loading');
      expect(eagerImg).not.toBeNull();
      expect(eagerImg).toHaveAttribute('loading', 'eager');

      const noSrcRoot = screen.getByTestId('avatar-no-src');
      expect(noSrcRoot).not.toHaveAttribute('loading');
      expect(noSrcRoot.querySelector('img')).toBeNull();
      expect(noSrcRoot).toHaveTextContent('GH');

      // Neither lazy nor eager avatar should trigger JS `new window.Image()` preloading
      expect(createdPreloadImages).toHaveLength(0);

      // Omitting `loading` preserves default preload behavior and omits `loading` attribute on <img>
      render(
        <Avatar
          src="https://example.com/ken.png"
          name="Ken Thompson"
          data-testid="avatar-default"
        />,
      );

      const defaultRoot = screen.getByTestId('avatar-default');
      expect(defaultRoot).not.toHaveAttribute('loading');
      expect(defaultRoot).toHaveTextContent('KT');
      expect(createdPreloadImages).toHaveLength(1);

      act(() => {
        createdPreloadImages[0].onload?.(new Event('load'));
      });

      const defaultImg = defaultRoot.querySelector('img');
      expect(defaultImg).not.toBeNull();
      expect(defaultImg).not.toHaveAttribute('loading');
      expect(defaultImg).toHaveAttribute('src', 'https://example.com/ken.png');
    } finally {
      window.Image = OriginalImage;
    }
  });

  it('ToastProvider + imperative toast render and dismiss notifications', () => {
    render(<ToastProvider position="bottom-right" />);

    let id = '';
    act(() => {
      id = toast.success('Config saved', { description: 'init.lua updated' });
    });

    expect(screen.getByText('Config saved')).toBeInTheDocument();
    expect(screen.getByText('init.lua updated')).toBeInTheDocument();

    act(() => {
      toast.dismiss(id);
    });
  });

  it('Colorscheme store switches all 5 palettes and supports custom storageKey', () => {
    expect(THEMES).toHaveLength(5);
    act(() => {
      configureColorScheme({ storageKey: 'custom_theme_key', defaultTheme: 'tokyo-night' });
    });

    render(<ColorSchemeProbe />);
    expect(screen.getByRole('button')).toHaveTextContent('Active: tokyo-night');

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent('Active: gruvbox-light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('gruvbox-light');
    expect(window.localStorage.getItem('custom_theme_key')).toBe('gruvbox-light');

    for (const meta of THEMES) {
      act(() => {
        setColorScheme(meta.id);
        applyThemeToDom(meta.id);
      });
      expect(document.documentElement.getAttribute('data-theme')).toBe(meta.id);
      expect(document.documentElement.style.colorScheme).toBe(meta.mode);
    }

    const initScript = getThemeInitScript('custom_theme_key');
    expect(initScript).toContain('custom_theme_key');
    expect(initScript).toContain('catppuccin-latte');
  });
});
