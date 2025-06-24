import { FC } from "react";
import { FileInputProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";
import { SVGSprite } from "./SVGSprite";
import { hints } from "../../constants";

export const FileInput: FC<FileInputProps> = ({
  id,
  labelText = hints.Global.UploadFile,
  disabled = false,
  accept,
  handleChange,
}) => {
  return (
    <>
      <label htmlFor={id} className={styles.fileInputLabel} tabIndex={0}>
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
