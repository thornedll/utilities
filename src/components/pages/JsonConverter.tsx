import { useState, ChangeEvent } from "react";
import { Button, Check, FileInput, TextArea } from "../UI";
import { convertToUpper } from "../../utils";
import styles from "./styles.module.scss";

type BtnType = "copy" | "success" | "primary";

export const JsonConverter = () => {
  const [file, setFile] = useState<File>();
  const [isCaseChange, setIsCaseChange] = useState<boolean>(false);
  const [jsonString, setJsonString] = useState<string>("");
  const [btnType, setBtnType] = useState<BtnType>("copy");

  const handleCaseChange = (state: boolean) => {
    setIsCaseChange(state);
  };

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.name.split(".").at(-1) === "json") {
        setFile(file);
      } else {
        window.alert(`File does not support. File type must be JSON`);
      }
    }
  };

  const convertFile = (isConvertCaseChange: boolean, file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onerror = () => {
        alert("Error reading the file. Please try again.");
      };
      reader.onload = () => {
        const rawText = reader.result;
        if (rawText && typeof rawText === "string") {
          if (isConvertCaseChange) {
            const result = convertToUpper(JSON.parse(rawText));
            const jsonStr = JSON.stringify(result, null, 2);
            console.log(jsonStr);
            setJsonString(jsonStr);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(jsonString);
    setBtnType("success");
    setTimeout(() => setBtnType("copy"), 1000);
  };

  return (
    <div className={styles.pageWrapper}>
      <h2>JSON Converter</h2>
      <h4>1. Upload file</h4>
      <div className={styles.optionsWrapper}>
        <FileInput handleChange={uploadFile} accept="application/json" />
        <div>{file && `Current file: ${file.name}`}</div>
      </div>
      <h4>2. Choose settings</h4>
      <div className={styles.optionsWrapper}>
        <Check
          labelText="camelCase -> UpperCamelCase"
          checked={isCaseChange}
          handleChange={handleCaseChange}
        />
      </div>
      <div className={styles.optionsWrapper}>
        <Button
          text="Convert"
          onClick={() => convertFile(isCaseChange, file)}
          type="primary"
        />
      </div>
      <h4>Result</h4>
      <div className={styles.resultWrapper}>
        <TextArea value={jsonString} readOnly={true}></TextArea>
        <Button
          onClick={copy}
          type={btnType}
          disabled={jsonString === "" ? true : false}
        />
      </div>
    </div>
  );
};
