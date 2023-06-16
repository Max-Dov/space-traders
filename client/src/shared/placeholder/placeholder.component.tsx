import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import './placeholder.styles.scss';

interface PlaceholderProps extends HTMLAttributes<HTMLDivElement> {
}

export const Placeholder = ({ children, className, ...placeholderProps }: PlaceholderProps) =>
  <div className={classNames('placeholder', className)} {...placeholderProps}>
    {children}
  </div>;