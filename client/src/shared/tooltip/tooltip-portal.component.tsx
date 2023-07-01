import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import React from 'react';

interface PortalProps {
  children: ReactNode;
}

/**
 * Portal for a single tooltip to be rendered at document.body.
 */
export const TooltipPortal = ({ children }: PortalProps) => {
  return createPortal(
    children,
    document.body,
  );
};