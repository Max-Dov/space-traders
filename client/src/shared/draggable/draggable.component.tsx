import { Draggable as DraggableOrig, DraggableProps as DraggablePropsOrig } from 'react-beautiful-dnd';
import React, { ReactNode } from 'react';
import './draggable.styles.scss';
import classNames from 'classnames';

interface DraggableProps extends Omit<DraggablePropsOrig, 'children'> {
  children: ReactNode;
  className?: string;
}

/**
 * App-styled draggable element with reduced boilerplate.
 */
export const Draggable = ({ children, className, ...draggableProps }: DraggableProps) =>
  <DraggableOrig {...draggableProps}>
    {(provided, snapshot) => {
      return (
        <div
          ref={provided.innerRef}
          className={classNames('draggable', className, {
            'is-being-dragged': snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      );
    }}
  </DraggableOrig>;
