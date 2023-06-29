import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const DEFAULT_WRAPPER_ID = 'react-portal-root';

interface PortalProps {
  children: React.ReactNode;
  wrapperElementId?: string;
}

export const Portal = ({ children, wrapperElementId = DEFAULT_WRAPPER_ID }: PortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperElementId);
    if (!element) {
      element = document.createElement('div');
      element.id = wrapperElementId;
      document.body.appendChild(element);
    }
    setWrapperElement(element);
  }, [wrapperElementId]);

  if (!wrapperElement) {
    return null;
  }

  return createPortal(children, wrapperElement);
};