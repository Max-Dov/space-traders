import { DroppableProps as DroppablePropsOrig, Droppable as DroppableOrig } from 'react-beautiful-dnd';
import React, { ReactNode } from 'react';

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
        style={{ backgroundColor: snapshot.isDraggingOver ? '#353535' : 'transparent' }}
        {...provided.droppableProps}
      >
        {children}
        {provided.placeholder}
      </div>
    )}
  </DroppableOrig>;
};