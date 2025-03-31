import React, { ChangeEvent } from "react";
import styles from "./styles.module.scss";

interface FileInputProps {
  id?: string;
  labelText?: string;
  disabled?: boolean;
  accept?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

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
