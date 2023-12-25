# Template to write stories

Fill out commented lines

```typescript jsx
import type { Meta, StoryObj } from '@storybook/react';
// import { SolarSystem } from '@features';

const meta = {
  // title: 'SolarSystem',
  // component: SolarSystem,
  parameters: {
    layout: 'centered',
  },
// } satisfies Meta<typeof SolarSystem>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Story['args'] = {}

export const default: Story = {
  args: {
    ...defaultArgs,
  }
}
```