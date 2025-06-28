import { useState, useLayoutEffect, FC } from "react";
import { createPortal } from "react-dom";
import { ReactPortalProps } from "../../ts/interfaces/interfaces";

export const ReactPortal: FC<ReactPortalProps> = ({
  children,
  wrapperId = "react-portal-wrapper",
}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  const createWrapperAndAppendToBody = (wrapperId: string) => {
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  };

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if (element)
        if (systemCreated && element.parentNode) {
          element.parentNode.removeChild(element);
        }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};
