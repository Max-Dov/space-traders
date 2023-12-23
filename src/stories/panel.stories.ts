import type { Meta, StoryObj } from '@storybook/react';
import { Panel } from '@shared';

const meta = {
  title: 'Panel',
  component: Panel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // argTypes: {
  //   panelTitle: { control: 'string' },
  // },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PanelDefault: Story = {
  args: {
    panelTitle: 'Da heck panel'
  }
}