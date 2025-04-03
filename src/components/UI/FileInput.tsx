import React from "react";
import { FileInputProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const FileInput: React.FC<FileInputProps> = ({
  id,
  labelText = "Choose file",
  disabled = false,
  accept,
  handleChange,
}) => {
  return (
    <>
      <label htmlFor={id} className={styles.fileInputLabel}>
        {labelText}
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className={styles.fileInput}
          disabled={disabled}
          id={id}
        />
      </label>
    </>
  );
};
