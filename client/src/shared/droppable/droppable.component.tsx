import { DroppableProps as DroppablePropsOrig, Droppable as DroppableOrig } from 'react-beautiful-dnd';
import React, { ReactNode } from 'react';
import classNames from 'classnames';
import './droppable.styles.scss';

interface DroppableProps extends Omit<DroppablePropsOrig, 'children'> {
  children: ReactNode;
}

/**
 * App-styled droppable container with reduced boilerplate.
 */
export const Droppable = ({ children, ...droppableProps }: DroppableProps) => {
  return <DroppableOrig {...droppableProps}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        className={
          classNames('droppable', {
            'is-dragging-over': snapshot.isDraggingOver,
          })
        }
        {...provided.droppableProps}
      >
        {children}
        {provided.placeholder}
      </div>
    )}
  </DroppableOrig>;
};