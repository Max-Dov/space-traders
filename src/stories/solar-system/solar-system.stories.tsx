import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SolarSystem } from '@features';
import { Panel } from '@shared';
import { solarSystemMock } from '../mocks';
import './solar-system.stories-styles.scss';

const meta = {
  title: 'SolarSystem',
  component: SolarSystem,
  parameters: {},
} satisfies Meta<typeof SolarSystem>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Story['args'] = {
  solarSystem: solarSystemMock,
};

export const SolarSystemDefault: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) =>
    <div style={{ height: '50em', width: '50em', margin: 'auto' }}>
      <Panel panelTitle={`${solarSystemMock.symbol} [${solarSystemMock.type}]`}>
        <SolarSystem {...args} />
      </Panel>
    </div>
};