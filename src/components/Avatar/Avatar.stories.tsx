import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const makeSvgAvatar = (label: string, bg: string, fg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" fill="${bg}"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-size="34" font-weight="700" fill="${fg}">${label}</text></svg>`,
  )}`;

const EMPLOYEES = [
  {
    name: 'Ada Lovelace',
    role: 'Principal Systems Architect',
    src: makeSvgAvatar('AL', '#2e3c64', '#7aa2f7'),
  },
  {
    name: 'Linus Torvalds',
    role: 'Kernel Maintainer',
    src: makeSvgAvatar('LT', '#28453a', '#9ece6a'),
  },
  {
    name: 'Grace Hopper',
    role: 'Compiler Engineering Lead',
    src: makeSvgAvatar('GH', '#3f3058', '#bb9af7'),
  },
  {
    name: 'Ken Thompson',
    role: 'Distributed Storage Engineer',
    src: makeSvgAvatar('KT', '#4d3927', '#ff9e64'),
  },
];

export const PaletteInitialsAndSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar name="Folke Lemaitre" />
        <Avatar name="Bram Moolenaar" />
        <Avatar name="Catppuccin Mocha" />
        <Avatar name="Pavel Pertsev" />
        <Avatar name="TJ DeVries" />
        <Avatar name="Mitchell Hashimoto" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar name="Alex Doe" size="xs" />
        <Avatar name="Alex Doe" size="sm" />
        <Avatar name="Alex Doe" size="md" />
        <Avatar name="Alex Doe" size="lg" />
        <Avatar name="Alex Doe" size="xl" shape="rounded" />
      </div>
    </div>
  ),
};

export const LazyLoadedEmployeeList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '300px' }}>
      {EMPLOYEES.map((employee) => (
        <div
          key={employee.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <Avatar src={employee.src} name={employee.name} loading="lazy" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {employee.name}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {employee.role}
            </span>
          </div>
        </div>
      ))}
    </div>
  ),
};
