import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../Card/Card';
import { Chip } from '../Chip/Chip';
import { Table } from './Table';

const meta: Meta<typeof Table.Root> = {
  title: 'Components/Table',
  component: Table.Root,
};

export default meta;
type Story = StoryObj<typeof Table.Root>;

export const Default: Story = {
  render: () => (
    <Table.Root style={{ minWidth: '420px' }}>
      <Table.Header>
        <Table.Row>
          <Table.Column>Service</Table.Column>
          <Table.Column>Endpoint</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>api-gateway</Table.Cell>
          <Table.Cell style={{ fontFamily: 'var(--font-mono)' }}>127.0.0.1:8080</Table.Cell>
          <Table.Cell>
            <Chip color="green" size="sm">
              Online
            </Chip>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>lsp-worker</Table.Cell>
          <Table.Cell style={{ fontFamily: 'var(--font-mono)' }}>127.0.0.1:9002</Table.Cell>
          <Table.Cell>
            <Chip color="green" size="sm">
              Ready
            </Chip>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  ),
};

export const PlainInsideCard: Story = {
  render: () => (
    <Card.Root padding="md" style={{ minWidth: '440px' }}>
      <Card.Header>
        <Card.Title>Active Daemons</Card.Title>
        <Card.Description>Borderless plain table embedded cleanly inside a Card</Card.Description>
      </Card.Header>
      <Card.Body>
        <Table.Root variant="plain">
          <Table.Header>
            <Table.Row>
              <Table.Column>Process</Table.Column>
              <Table.Column>PID</Table.Column>
              <Table.Column>State</Table.Column>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>nvim --headless</Table.Cell>
              <Table.Cell style={{ fontFamily: 'var(--font-mono)' }}>41208</Table.Cell>
              <Table.Cell>
                <Chip color="cyan" size="sm">
                  Attached
                </Chip>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>rust-analyzer</Table.Cell>
              <Table.Cell style={{ fontFamily: 'var(--font-mono)' }}>41294</Table.Cell>
              <Table.Cell>
                <Chip color="green" size="sm">
                  Indexing
                </Chip>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Card.Body>
    </Card.Root>
  ),
};
