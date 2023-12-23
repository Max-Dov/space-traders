import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon, Panel } from '@shared';

const meta = {
  title: 'Panel',
  component: Panel,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Story['args'] = {
  panelTitle: <span>Tactical Panel</span>,
  children: <section>
    <h1>What is so <strong>tactical</strong> about that panel?</h1>
    <p>I don't know.</p>
  </section>
}

export const panelDefault: Story = {
  args: {
    ...defaultArgs,
  }
}

export const panelWithButtons: Story = {
  args: {
    ...defaultArgs,
    panelButtons: <div className="flex-row">
      <button className="inline-button">
        <Icon name="Reload" />
      </button>
      <button className="inline-button">
        <Icon name="Close" />
      </button>
    </div>
  }
}