import React, { HTMLAttributes } from 'react';
import './icon.styles.scss';
import Money from '@svgs/money.icon.svg';
import Spaceship from '@svgs/spaceship.icon.svg';
import Users from '@svgs/users.icon.svg';
import ArrowRight from '@svgs/arrow-right.icon.svg';
import ArrowLeft from '@svgs/arrow-left.svg';
import CircledQuestion from '@svgs/circled-question.icon.svg';
import CircledExclamation from '@svgs/circled-exclamation.icon.svg';
import Advice from '@svgs/advice.icon.svg';
import Close from '@svgs/close.icon.svg';
import Move from '@svgs/move.icon.svg';
import Reload from '@svgs/reload.icon.svg';
import Settings from '@svgs/settings.icon.svg';
import CaretRight from '@svgs/caret-right.svg';
import CaretDown from '@svgs/caret-down.svg';
import Backspace from '@svgs/backspace.svg';
import Package from '@svgs/package.svg';
import Import from '@svgs/import.svg';
import Export from '@svgs/export.svg';
import ArrowElbowDownRight from '@svgs/arrow-elbow-down-right.svg';
import GasCan from '@svgs/gas-can.svg';
import Book from '@svgs/book.svg';
import ListPlus from '@svgs/list-plus.svg';
import Funnel from '@svgs/funnel.svg';
import SortAsc from '@svgs/sort-asc.svg';
import SortDesc from '@svgs/sort-desc.svg';
import SortNothing from '@svgs/sort-nothing.svg';

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
  ArrowLeft: <ArrowLeft />,
  CircledQuestion: <CircledQuestion />,
  CircledExclamation: <CircledExclamation />,
  Advice: <Advice />,
  Close: <Close />,
  Move: <Move />,
  Reload: <Reload />,
  Settings: <Settings />,
  CaretRight: <CaretRight />,
  CaretDown: <CaretDown />,
  Backspace: <Backspace />,
  Package: <Package />,
  Import: <Import />,
  Export: <Export />,
  ArrowElbowDownRight: <ArrowElbowDownRight />,
  GasCan: <GasCan />,
  Book: <Book />,
  ListPlus: <ListPlus />,
  Funnel: <Funnel />,
  SortAsc: <SortAsc />,
  SortDesc: <SortDesc />,
  SortNothing: <SortNothing />,
} as const;