import React, { ReactNode, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './panel.styles.scss';

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  panelTitle: ReactNode;
  /**
   * Buttons positioned on the right side of a panel header.
   */
  panelButtons?: ReactNode;
}

/**
 * Simple wrapper component representing panel on screen.
 */
export const Panel = ({ children, className, panelTitle, panelButtons, ...wrapperProps }: PanelProps) => {

  return <div
    className="panel"
    {...wrapperProps}
  >
    <div className="header">
      <div>
        {panelTitle}
      </div>
      <div>
        {panelButtons}
      </div>
    </div>
    <section className={classNames(className, 'content')}>
      {children}
    </section>
  </div>;
};