import React, { useState, ChangeEvent, useEffect } from "react";
import { BtnType, KeyValueChange } from "../../ts/types/types";
import { Button, Check, DoubleInput, FileInput, TextArea } from "../UI";
import { convertToUpper, copy } from "../../utils";
import styles from "./styles.module.scss";

const emptyKeyValueObject = { key: "", value: "" };

export const JsonConverter = () => {
  const [file, setFile] = useState<File>();
  const [isCaseChange, setIsCaseChange] = useState<boolean>(false);
  const [isKeyValuesChange, setIsKeyValuesChange] = useState<boolean>(false);
  const [keyValuesChanges, setKeyValuesChanges] = useState<
    KeyValueChange[] | []
  >([]);
  const [inputs, setInputs] = useState<React.ReactNode[]>();
  const [jsonString, setJsonString] = useState<string>("");
  const [btnType, setBtnType] = useState<BtnType>("copy");

  const handleCaseChange = (state: boolean) => {
    setIsCaseChange(state);
  };

  const toggleKeyValuesChange = (state: boolean) => {
    setIsKeyValuesChange(state);
    if (state === false) {
      setKeyValuesChanges([]);
    } else if (state === true) {
      setKeyValuesChanges([emptyKeyValueObject]);
    }
  };

  const addKeyValuesChange = () => {
    setKeyValuesChanges([...keyValuesChanges, emptyKeyValueObject]);
  };

  const removeKeyValuesChange = (idx: number) => {
    setKeyValuesChanges(
      keyValuesChanges.filter((i, index) => i && index !== idx)
    );
  };

  const handleKeyValuesChange = (
    itemKey: number,
    key?: string,
    value?: string
  ) => {
    if (keyValuesChanges.length > 0) {
      if (key) {
        let newKeyValuesChanges = keyValuesChanges;
        newKeyValuesChanges[itemKey].key = key;
        setKeyValuesChanges(newKeyValuesChanges);
      }
      if (value) {
        let newKeyValuesChanges = keyValuesChanges;
        newKeyValuesChanges[itemKey].value = value;
        setKeyValuesChanges(newKeyValuesChanges);
      }
    }
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

  const convertFile = (
    isConvertCaseChange: boolean,
    file: File | undefined
  ) => {
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
            setJsonString(jsonStr);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    let newInputs = [];
    for (let i = 0; i < keyValuesChanges.length; i++) {
      newInputs.push(
        <li key={"key" + (i + 1)}>
          <DoubleInput
            numberKey={i + 1}
            inputValue={keyValuesChanges[i].key}
            secondInputValue={keyValuesChanges[i].value}
            placeholder="Key"
            secondPlaceholder="New value"
            handleInputsChange={handleKeyValuesChange}
            addInputs={addKeyValuesChange}
            removeInputs={removeKeyValuesChange}
          />
        </li>
      );
    }
    setInputs(newInputs);
  }, [keyValuesChanges]);

  const copyText = () => {
    copy(jsonString, setBtnType);
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
        <div className={styles.checksWrapper}>
          <Check
            labelText="camelCase -> UpperCamelCase"
            checked={isCaseChange}
            handleChange={handleCaseChange}
          />
          <Check
            labelText="Change key values"
            checked={isKeyValuesChange}
            handleChange={toggleKeyValuesChange}
          />
          <ul className={styles.keyValueInputs}>{inputs}</ul>
        </div>
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
          onClick={copyText}
          type={btnType}
          disabled={jsonString === "" ? true : false}
        />
      </div>
    </div>
  );
};
