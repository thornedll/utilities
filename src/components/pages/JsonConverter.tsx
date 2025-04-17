import { useState, ChangeEvent } from "react";
import { BtnType, KeyValueChange, ValueType } from "../../ts/types/types";
import { Button, Check, DoubleInput, FileInput, TextArea } from "../UI";
import {
  convertToUpper,
  copy,
  downloadFile,
  updateNestedKey,
  convertValueToType,
} from "../../utils";
import { emptyKeyValueObject } from "../../constants";
import styles from "./styles.module.scss";

export const JsonConverter = () => {
  const [file, setFile] = useState<File>();
  const [isCaseChange, setIsCaseChange] = useState<boolean>(false);
  const [isKeyValueChange, setIsKeyValueChange] = useState<boolean>(false);
  const [keyValueChanges, setKeyValueChanges] = useState<KeyValueChange[] | []>(
    []
  );
  const [fileString, setFileString] = useState<string>("");
  const [jsonString, setJsonString] = useState<string>("");
  const [btnType, setBtnType] = useState<BtnType>("copy");

  const handleCaseChange = (state: boolean) => {
    setIsCaseChange(state);
  };

  const toggleKeyValueChange = (state: boolean) => {
    setIsKeyValueChange(state);
    state ? setKeyValueChanges([emptyKeyValueObject]) : setKeyValueChanges([]);
  };

  const addKeyValueChange = () => {
    setKeyValueChanges([...keyValueChanges, emptyKeyValueObject]);
  };

  const removeKeyValueChange = (idx: number) => {
    if (keyValueChanges.length > 1) {
      setKeyValueChanges(
        keyValueChanges.filter((i, index) => i && index !== idx)
      );
    }
  };

  const handleKeyChange = (itemKey: number, key: string) => {
    if (keyValueChanges.length > 0) {
      const newKeyValueChanges = keyValueChanges.map((i, k) => {
        if (k === itemKey) {
          return {
            ...i,
            key: key,
          };
        } else return i;
      });
      setKeyValueChanges(newKeyValueChanges);
    }
  };

  const handleValueChange = (itemKey: number, value: string) => {
    if (keyValueChanges.length > 0) {
      const newKeyValueChanges = keyValueChanges.map((i, k) => {
        if (k === itemKey) {
          return {
            ...i,
            value: value,
          };
        } else return i;
      });
      setKeyValueChanges(newKeyValueChanges);
    }
  };

  const handleTypeChange = (itemKey: number, type: ValueType) => {
    if (keyValueChanges.length > 0) {
      const newKeyValueChanges = keyValueChanges.map((i, k) => {
        if (k === itemKey) {
          return {
            ...i,
            type: type,
          };
        } else return i;
      });
      setKeyValueChanges(newKeyValueChanges);
    }
  };

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.name.split(".").at(-1) === "json") {
        setFile(file);
        const reader = new FileReader();
        reader.onerror = () => {
          alert("Error uploading the file. Please try again.");
        };
        reader.onload = () => {
          const rawText = reader.result;
          if (rawText && typeof rawText === "string") {
            let res = JSON.parse(rawText);
            setFileString(JSON.stringify(res, null, 2));
          }
        };
        reader.readAsText(file);
      } else {
        window.alert("File does not support. File type must be JSON");
      }
    }
  };

  const convertFile = (
    isConvertCaseChange: boolean,
    isConvertKeyValueChange: boolean,
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
          const result = JSON.parse(rawText);
          let res = result;

          const convertCaseChange = () => {
            res = convertToUpper(result);
          };
          const convertKeyValueChange = () => {
            keyValueChanges.forEach((change) => {
              updateNestedKey(
                res,
                change.key,
                convertValueToType(change.value, change.type)
              );
            });
          };

          if (isConvertCaseChange && !isConvertKeyValueChange) {
            convertCaseChange();
          }
          if (!isConvertCaseChange && isConvertKeyValueChange) {
            convertKeyValueChange();
          }
          if (isConvertCaseChange && isConvertKeyValueChange) {
            convertCaseChange();
            convertKeyValueChange();
          }
          const jsonStr = JSON.stringify(res, null, 2);
          setJsonString(jsonStr);
        }
      };
      reader.readAsText(file);
    }
  };

  const copyText = () => {
    copy(jsonString, setBtnType);
  };

  const isDisplay = file ? {} : { display: "none" };

  return (
    <div className={styles.pageWrapper}>
      <h2>JSON Converter</h2>
      <h4>1. Upload file</h4>
      <div className={styles.optionsWrapper}>
        <FileInput handleChange={uploadFile} accept="application/json" />
        <div>{file && `Current file: ${file.name}`}</div>
      </div>
      <h4 style={isDisplay}>2. Choose settings</h4>
      <div className={styles.optionsWrapper} style={isDisplay}>
        <div className={styles.checksWrapper}>
          <Check
            labelText="camelCase -> UpperCamelCase"
            checked={isCaseChange}
            handleChange={handleCaseChange}
          />
          <Check
            labelText="Change key values"
            checked={isKeyValueChange}
            handleChange={toggleKeyValueChange}
          />
          <ul className={styles.keyValueInputs}>
            {keyValueChanges.map((element, key) => (
              <li key={key}>
                <DoubleInput
                  numberKey={key + 1}
                  inputValue={element.key}
                  secondInputValue={element.value}
                  selectValue={element.type}
                  placeholder="Key (full path)"
                  secondPlaceholder="New value"
                  handleKeyChange={handleKeyChange}
                  handleValueChange={handleValueChange}
                  handleTypeChange={handleTypeChange}
                  addInputs={addKeyValueChange}
                  removeInputs={removeKeyValueChange}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.optionsWrapper} style={isDisplay}>
        <Button
          text="Convert"
          onClick={() => convertFile(isCaseChange, isKeyValueChange, file)}
          type="primary"
          disabled={file && (isCaseChange || isKeyValueChange) ? false : true}
        />
      </div>
      <h4
        style={{
          width: "508px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        Current file<span>Result</span>
      </h4>
      <div className={styles.resultWrapper}>
        <TextArea value={fileString} readOnly={true}></TextArea>
        <TextArea value={jsonString} readOnly={true}></TextArea>
        <div className={styles.buttonsWrapper}>
          <Button
            onClick={copyText}
            type={btnType}
            disabled={jsonString === "" ? true : false}
          />
          <Button
            onClick={() => downloadFile(jsonString, "json")}
            type="download"
            disabled={jsonString === "" ? true : false}
          />
        </div>
      </div>
    </div>
  );
};
