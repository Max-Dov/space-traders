import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StarSystem } from '@features';
import { Panel } from '@shared';
import { starSystem } from '../mocks';
import './star-system.stories-styles.scss';

const meta = {
  title: 'StarSystem',
  component: StarSystem,
  parameters: {},
} satisfies Meta<typeof StarSystem>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Story['args'] = {
  starSystem: starSystem,
  isDevMode: true,
};

export const StarSystemDefault: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) =>
    <div style={{ height: '50em', width: '50em', margin: 'auto' }}>
      <Panel className="star-system-panel" panelTitle={`${starSystem.symbol} [${starSystem.type}]`}>
        <StarSystem {...args} />
      </Panel>
    </div>
};