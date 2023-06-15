import { Draggable as DraggableOrig, DraggableProps as DraggablePropsOrig } from 'react-beautiful-dnd';
import React, { ReactNode } from 'react';

interface DraggableProps extends Omit<DraggablePropsOrig, 'children'> {
  children: ReactNode;
}

/**
 * App-styled draggable element with reduced boilerplate.
 */
export const Draggable = ({ children, ...draggableProps }: DraggableProps) =>
  <DraggableOrig {...draggableProps}>
    {(provided) => {
      return (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      );
    }}
  </DraggableOrig>;
