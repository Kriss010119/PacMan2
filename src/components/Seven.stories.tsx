import type { Meta, StoryObj } from '@storybook/react';
import { Seven } from './Seven';
import '../index.css';

const meta: Meta<typeof Seven> = {
  title: 'Components/Seven',
  component: Seven,
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', background: '#cdd2c0', display: 'inline-block' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    value: 0,
    digits: 6,
  },
};
export default meta;

type Story = StoryObj<typeof Seven>;

export const Score: Story = {
  args: {
    value: 12345,
    digits: 6,
  },
};

export const MaxScore: Story = {
  args: {
    value: 999999,
    digits: 6,
  },
};

export const Level: Story = {
  args: {
    value: 3,
    digits: 1,
  },
};
