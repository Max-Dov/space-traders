import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '@shared';

const meta = {
  title: 'Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Story['args'] = {
  tooltipText: 'The missile knows where it is at all times.',
};

export const defaultTooltip: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => <Tooltip {...args}>Hover me?</Tooltip>
};

export const tooltipWithImage: Story = {
  args: {
    ...defaultArgs,
    tooltipImgName: 'network-panel-tooltip',
    isFancyTooltip: true,
  },
  render: (args) => <Tooltip {...args}>Hover me?</Tooltip>
};