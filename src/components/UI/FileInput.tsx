import { FC } from "react";
import { FileInputProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";
import { SVGSprite } from "./SVGSprite";

export const FileInput: FC<FileInputProps> = ({
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
        {accept === "application/json" && <SVGSprite id="json" />}
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
