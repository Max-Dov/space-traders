import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Panel } from '@shared';

const meta = {
  title: 'Panel',
  component: Panel,
  parameters: {},
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PanelDefault: Story = {
  args: {
    panelTitle: <span>Tactical Panel</span>,
    children: <section>
      <h1>What is so <strong>tactical</strong> about that panel?</h1>
      <p>I don't know.</p>
    </section>
  }
}