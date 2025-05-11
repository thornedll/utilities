import { useState, ChangeEvent, FC } from "react";
import classNames from "classnames/bind";
import { BtnType, KeyValueChange, ValueType } from "../../ts/types/types";
import { Button, Check, DoubleInput, FileInput, TextArea } from "../UI";
import {
  convertToUpper,
  copy,
  downloadFile,
  updateNestedKey,
  convertValueToType,
  setFormattedJson,
} from "../../utils";
import {
  emptyKeyValueObject,
  placeholders,
  hints,
  baseValueTypes,
} from "../../constants";
import styles from "./styles.module.scss";
import { rndRegNumber } from "../../utils/randoms";

const cx = classNames.bind(styles);

export const JsonConverter: FC = () => {
  // Global states
  const [file, setFile] = useState<File>();
  const [btnType, setBtnType] = useState<BtnType>("copy");
  // Settings states
  const [isCaseChange, setIsCaseChange] = useState<boolean>(false);
  const [isKeyValueChange, setIsKeyValueChange] = useState<boolean>(false);
  // Output states
  const [keyValueChanges, setKeyValueChanges] = useState<KeyValueChange[] | []>(
    []
  );
  const [fileString, setFileString] = useState<string>("");
  const [jsonString, setJsonString] = useState<string>("");

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
      const newKeyValueChanges = [...keyValueChanges];
      newKeyValueChanges[itemKey].key = key;
      setKeyValueChanges(newKeyValueChanges);
    }
  };

  const handleValueChange = (itemKey: number, value: string) => {
    if (keyValueChanges.length > 0) {
      const newKeyValueChanges = [...keyValueChanges];
      newKeyValueChanges[itemKey].value = value;
      setKeyValueChanges(newKeyValueChanges);
    }
  };

  const handleTypeChange = (itemKey: number, type: ValueType) => {
    if (keyValueChanges.length > 0) {
      const newKeyValueChanges = [...keyValueChanges];
      const currentType = newKeyValueChanges[itemKey].type;
      newKeyValueChanges[itemKey].type = type;
      if (!baseValueTypes.includes(type)) {
        newKeyValueChanges[itemKey].value = rndRegNumber();
      } else if (!baseValueTypes.includes(currentType)) {
        newKeyValueChanges[itemKey].value = "";
      }
      setKeyValueChanges(newKeyValueChanges);
    }
  };

  const handleFileString = (newFileString: string) => {
    setFileString(newFileString);
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
            handleFileString(JSON.stringify(res, null, 2));
          }
        };
        reader.readAsText(file);
      } else {
        window.alert("File does not support. File type must be JSON");
      }
    }
  };

  const convertFileString = (
    isConvertCaseChange: boolean,
    isConvertKeyValueChange: boolean,
    fileString: string
  ) => {
    const result = JSON.parse(fileString);
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
          convertFileString(
            isConvertCaseChange,
            isConvertKeyValueChange,
            rawText
          );
        }
      };
      reader.readAsText(file);
    }
  };

  const clearStrings = (): void => {
    if (fileString) {
      setFileString("");
      setFile(undefined);
    } else if (jsonString) {
      setJsonString("");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <h2>JSON Converter</h2>
      <h4 className={styles["mt-12"]}>1. Upload file*</h4>
      <div className={styles.optionsWrapper}>
        <FileInput handleChange={uploadFile} accept="application/json" />
        <div>{file && `Current file: ${file.name}`}</div>
      </div>
      <span className={cx({ hint: 1, "mt-6": 1 })}>
        {hints.JsonConverter.UploadFile}
      </span>
      {fileString && (
        <>
          <h4 className={styles["mt-12"]}>2. Choose settings</h4>
          <div className={styles.optionsWrapper}>
            <div className={styles.checksWrapper}>
              <Check
                checked={isCaseChange}
                id="changeCase"
                labelText="camelCase -> UpperCamelCase"
                handleChange={handleCaseChange}
              />
              <Check
                checked={isKeyValueChange}
                id="changeKeyValues"
                labelText="Change key values"
                handleChange={toggleKeyValueChange}
              />
              <ul className={styles.keyValueInputs}>
                {keyValueChanges.map((element, index) => {
                  return (
                    <li key={index}>
                      <DoubleInput
                        numberKey={index + 1}
                        value={element.key}
                        secondValue={element.value}
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
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={styles.optionsWrapper}>
            <Button
              text={hints.Global.ConvertFile}
              disabled={!(fileString && (isCaseChange || isKeyValueChange))}
              type="primary"
              onClick={
                file
                  ? () => convertFile(isCaseChange, isKeyValueChange, file)
                  : () =>
                      convertFileString(
                        isCaseChange,
                        isKeyValueChange,
                        fileString
                      )
              }
            />
            <Button
              text="Clear"
              disabled={!(fileString || jsonString)}
              type="primary"
              subType={["clear"]}
              onClick={clearStrings}
            />
          </div>
        </>
      )}
      <div className={styles.optionsWrapper}>
        <div className={styles.jsonInputWrapper}>
          <div className={styles.headerWrapper}>
            <h4>Current file</h4>
            {fileString && (
              <p className={styles.hint}>{fileString.length} chars</p>
            )}
          </div>
          <div className={cx({ resultWrapper: 1, "mt-0": 1 })}>
            <TextArea
              placeholder={placeholders.JsonConverter.InputTextarea}
              value={fileString}
              readOnly={false}
              handleChange={handleFileString}
            />
            <div className={styles.buttonsWrapper}>
              <Button
                disabled={!fileString}
                type="format"
                tooltipPlace="left"
                onClick={() => setFormattedJson(fileString, setFileString)}
              />
            </div>
          </div>
        </div>
        <div className={styles.jsonInputWrapper}>
          <div className={styles.headerWrapper}>
            <h4>Result</h4>
            {jsonString && (
              <p className={styles.hint}>{jsonString.length} chars</p>
            )}
          </div>
          <div className={cx({ resultWrapper: 1, "mt-0": 1 })}>
            <TextArea
              value={jsonString}
              readOnly={true}
              placeholder={placeholders.JsonConverter.OutputTextarea}
            />
            <div className={styles.buttonsWrapper}>
              <Button
                disabled={jsonString === ""}
                type={btnType}
                tooltipPlace="left"
                onClick={() => copy(jsonString, setBtnType)}
              />
              <Button
                disabled={jsonString === ""}
                type="download"
                tooltipPlace="left"
                onClick={() => downloadFile(jsonString, "json")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
