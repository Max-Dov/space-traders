import React, { ReactNode, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './window.styles.scss';

interface WindowProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
}

/**
 * Simple wrapper component representing window on screen.
 */
export const Window = ({ children, className, header, ...wrapperProps }: WindowProps) => {

  return <div
    className="window"
    {...wrapperProps}
  >
    {header && <div className='header'>{header}</div>}
    <section className={classNames(className, 'content')}>
      {children}
    </section>
  </div>;
};