import React, { ReactNode, HTMLAttributes, RefObject } from 'react';
import classNames from 'classnames';
import './panel.styles.scss';
import { Draggable } from '@shared/draggable/draggable.component';

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  panelTitle: ReactNode;
  /**
   * Buttons positioned on the right side of a panel header.
   */
  panelButtons?: ReactNode;
  /**
   * If Panel is draggable around some droppables, following props are required.
   */
  draggableProps?: {
    index: number;
    draggableIdAndKey: string;
  };
  contentContainerRef?: RefObject<HTMLElement>;
}

/**
 * Simple wrapper component representing panel on screen.
 */
export const Panel = ({
  children,
  className,
  panelTitle,
  panelButtons,
  draggableProps,
  contentContainerRef,
  ...wrapperProps
}: PanelProps) => {

  return !draggableProps
    ? (
      <div
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
        <section className={classNames(className, 'content')} ref={contentContainerRef}>
          {children}
        </section>
      </div>
    ) : (
      <Draggable
        draggableId={draggableProps.draggableIdAndKey}
        index={draggableProps.index}
        key={draggableProps.draggableIdAndKey}
        className="draggable-panel panel"
        {...wrapperProps}
      >
        {(dragHandleProps) =>
          <>
            <div className="header" {...dragHandleProps}>
              <div>
                {panelTitle}
              </div>
              <div>
                {panelButtons}
              </div>
            </div>
            <section className={classNames(className, 'content')} ref={contentContainerRef}>
              {children}
            </section>
          </>}
      </Draggable>
    );
};