import {
  Draggable as DraggableOrig,
  DraggableProps as DraggablePropsOrig,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import React, { ReactNode } from 'react';
import './draggable.styles.scss';
import classNames from 'classnames';

interface DraggableProps extends Omit<DraggablePropsOrig, 'children'> {
  children: (dragHandleProps: DraggableProvidedDragHandleProps | null | undefined) => ReactNode;
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
        >
          {children(provided.dragHandleProps)}
        </div>
      );
    }}
  </DraggableOrig>;
