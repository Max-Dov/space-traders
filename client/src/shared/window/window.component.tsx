import React from 'react';
import { HTMLAttributes } from 'react';
import classNames from 'classnames';
import './window.styles.scss';

interface WindowProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Simple wrapper component representing window on screen.
 */
export const Window = ({ children, className, ...wrapperProps }: WindowProps) => {

  return <section className={classNames(className, 'window')} {...wrapperProps}>
    {children}
  </section>;
};