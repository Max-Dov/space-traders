import React, { ReactNode, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './panel.styles.scss';

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
}

/**
 * Simple wrapper component representing panel on screen.
 */
export const Panel = ({ children, className, header, ...wrapperProps }: PanelProps) => {

  return <div
    className="panel"
    {...wrapperProps}
  >
    {header && <div className='header'>{header}</div>}
    <section className={classNames(className, 'content')}>
      {children}
    </section>
  </div>;
};