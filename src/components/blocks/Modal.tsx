import { FC, useEffect, useRef } from "react";
import { ReactPortal } from ".";
import { Button } from "../UI";
import { ModalProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  headerText,
  handleClose,
}) => {
  const modalContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);

    const handler = (event: any) => {
      if (!modalContent.current) {
        return;
      }
      if (!modalContent.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener("click", handler, true);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
      document.removeEventListener("click", handler);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div className={styles.modal}>
        <div className={styles.modalContent} ref={modalContent}>
          <div className={styles.modalHeader}>
            <h3>{headerText}</h3>
            <div className={styles.closeButtonWrapper}>
              <Button type="delete" isTooltip={false} onClick={handleClose} />
            </div>
          </div>
          <div className={styles.modalBody}>{children}</div>
        </div>
      </div>
    </ReactPortal>
  );
};
