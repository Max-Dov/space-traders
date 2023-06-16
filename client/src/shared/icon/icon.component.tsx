import React, { HTMLAttributes } from 'react';
import './icon.styles.scss';
import Money from '@svgs/money.icon.svg';
import Spaceship from '@svgs/spaceship.icon.svg';
import Users from '@svgs/users.icon.svg';
import ArrowRight from '@svgs/arrow-right.icon.svg';
import CircledQuestion from '@svgs/circled-question.icon.svg';
import CircledExclamation from '@svgs/circled-exclamation.icon.svg';
import Advice from '@svgs/advice.icon.svg';
import Close from '@svgs/close.icon.svg';
import Move from '@svgs/move.icon.svg';
import Reload from '@svgs/reload.icon.svg';
import Settings from '@svgs/settings.icon.svg';

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  name: keyof typeof ICONS;
}

/**
 * Svg icon provider.
 */
export const Icon = ({ name, ...containerProps }: IconProps) =>
  <div className="icon" {...containerProps}>
    {ICONS[name]}
  </div>;

/**
 * When adding icon to list, make sure:
 *   1. Icon height is 1em and width is proportional to that. That allows convenient rescale via "font-size" CSS prop.
 *   2. Parts of icon with customizable colors to be "currentColor". That value takes current CSS "color" prop.
 */
const ICONS = {
  Money: <Money />,
  Spaceship: <Spaceship />,
  Users: <Users />,
  ArrowRight: <ArrowRight />,
  CircledQuestion: <CircledQuestion />,
  CircledExclamation: <CircledExclamation />,
  Advice: <Advice />,
  Close: <Close />,
  Move: <Move />,
  Reload: <Reload />,
  Settings: <Settings />,
} as const;