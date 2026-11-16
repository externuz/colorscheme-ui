import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  applyThemeToDom,
  Button,
  Card,
  Checkbox,
  Chip,
  configureColorScheme,
  Drawer,
  Dropdown,
  Field,
  getThemeInitScript,
  Input,
  Modal,
  ScrollShadow,
  Separator,
  Spinner,
  Switch,
  setColorScheme,
  Table,
  THEMES,
  ToggleGroup,
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

  it('Field + Input binds labels, slots, and validation alert', () => {
    const onChange = vi.fn();
    render(
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
      </Field.Root>,
    );

    expect(screen.getByTestId('prefix')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Slug is required');

    fireEvent.change(screen.getByPlaceholderText('Enter slug'), { target: { value: 'nvim' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Switch.Row and Checkbox toggle state via Base UI', () => {
    const onSwitch = vi.fn();
    const onCheck = vi.fn();

    render(
      <div>
        <Switch.Row checked={false} color="accent" onCheckedChange={onSwitch}>
          LSP Diagnostics
        </Switch.Row>
        <Checkbox checked={false} onCheckedChange={onCheck}>
          Auto-format
        </Checkbox>
      </div>,
    );

    fireEvent.click(screen.getByRole('switch'));
    expect(onSwitch).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(onCheck).toHaveBeenCalledWith(true);
  });

  it('ToggleGroup switches active item', () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup.Root value="tokyo-night" onValueChange={onValueChange} aria-label="Colorscheme">
        <ToggleGroup.Item value="tokyo-night">Tokyo</ToggleGroup.Item>
        <ToggleGroup.Item value="gruvbox-dark">Gruvbox</ToggleGroup.Item>
      </ToggleGroup.Root>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Gruvbox' }));
    expect(onValueChange).toHaveBeenCalledWith('gruvbox-dark');
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

  it('Card, Chip, Table, Separator, Spinner, and ScrollShadow render semantic structure', () => {
    render(
      <Card.Root variant="elevated" padding="md">
        <Card.Header>
          <Card.Title>Nodes</Card.Title>
          <Chip color="green">Online</Chip>
        </Card.Header>
        <Separator />
        <Card.Body>
          <ScrollShadow style={{ maxHeight: 120 }}>
            <Table.Root>
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

    expect(screen.getByText('Nodes')).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('Colorscheme store switches all 4 palettes and supports custom storageKey', () => {
    expect(THEMES).toHaveLength(4);
    act(() => {
      configureColorScheme({ storageKey: 'custom_theme_key', defaultTheme: 'tokyo-night' });
    });

    render(<ColorSchemeProbe />);
    expect(screen.getByRole('button')).toHaveTextContent(
      'Active: tokyonight'.replace('tokyonight', 'tokyo-night'),
    );

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

    expect(getThemeInitScript('custom_theme_key')).toContain('custom_theme_key');
  });
});
