import { FC, useEffect } from "react";
import { ModalProps } from "../../ts/interfaces/interfaces";
import { Button } from "../UI";
import styles from "./styles.module.scss";
import { ReactPortal } from ".";

export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  headerText,
  handleClose,
}) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div className={styles.modal}>
        <div className={styles.modalContent}>
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
