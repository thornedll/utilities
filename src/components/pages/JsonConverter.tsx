import { useState, ChangeEvent } from "react";
import { FileInput, Check } from "../UI";
import styles from "./styles.module.scss";

export const JsonConverter = () => {
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      e.target.files[0].name.split(".").at(-1) === "json"
        ? setFile(e.target.files[0])
        : window.alert(`File does not support. File type must be JSON`);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <h2>JSON Converter</h2>
      <div className={styles.optionsWrapper}>
        <FileInput handleChange={handleFileChange} accept="application/json" />
        <div>Current file: {file && `${file.name}`}</div>
      </div>
      <div className={styles.optionsWrapper}>
        <Check labelText="camelCase -> UpperCamelCase" />
      </div>
    </div>
  );
};
