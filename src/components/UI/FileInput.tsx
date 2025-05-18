import { FC } from "react";
import { IFileInputProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";
import { SVGSprite } from "./SVGSprite";
import { hints } from "../../constants";

export const FileInput: FC<IFileInputProps> = ({
  id,
  labelText = hints.Global.UploadFile,
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
