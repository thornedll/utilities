import { ChangeEvent, FC, useEffect, useState } from "react";
import jp from "jsonpath";
import classNames from "classnames/bind";
import { Button, FileInput, TextArea } from "../UI";
import { BtnType } from "../../ts/types/types";
import { hints, jsonQueryRegex, placeholders } from "../../constants";
import { copy, downloadFile, setFormattedJson } from "../../utils";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const JsonQuery: FC = () => {
  const [btnType, setBtnType] = useState<BtnType>("copy");
  const [file, setFile] = useState<File>();
  const [jsonQuery, setJsonQuery] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const copyText = (text: string) => {
    copy(text);
    setBtnType("success");
    setTimeout(() => setBtnType("copy"), 1500);
  };

  const changeJsonQuery = (newValue: string) => {
    setJsonQuery(newValue);
  };

  const changeQuery = (newValue: string) => {
    setQuery(newValue);
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
            changeJsonQuery(JSON.stringify(res, null, 2));
          }
        };
        reader.readAsText(file);
      } else {
        window.alert("File does not support. File type must be JSON");
      }
    }
  };

  const changeResult = (jsonQuery: string, query: string) => {
    error !== "" && setError("");
    if (jsonQuery !== "" && query !== "")
      try {
        const newValue = jp.query(JSON.parse(jsonQuery), query);
        setFormattedJson(JSON.stringify(newValue), setResult);
      } catch {
        jsonQueryRegex.test(query)
          ? setError(hints.JsonQuery.ParsingError)
          : setError(hints.JsonQuery.QueryError);
      }
  };

  useEffect(() => {
    changeResult(jsonQuery, query);
  }, [jsonQuery, query]);

  return (
    <div className={styles.pageWrapper}>
      <h2>JSON Query</h2>
      <h4 className={styles["mt-12"]}>{hints.JsonQuery.UploadHeader}</h4>
      <div className={styles.optionsWrapper}>
        <FileInput handleChange={uploadFile} accept="application/json" />
        {file ? (
          <div>{`Current file: ${file.name}`}</div>
        ) : (
          <span className={cx({ hint: 1 })}>{hints.Global.UploadFileHint}</span>
        )}
      </div>
      <div className={cx({ optionsGridWrapper: 1, "grid-3-columns": 1 })}>
        <div
          className={cx({
            jsonInputWrapper: 1,
          })}
        >
          <div className={styles.headerWrapper}>
            <h4>{hints.JsonQuery.JsonQueryHeader}</h4>
            {jsonQuery && (
              <p className={styles.hint}>{jsonQuery.length} chars</p>
            )}
          </div>
          <div className={cx({ resultWrapper: 1, "mt-0": 1 })}>
            <TextArea
              placeholder={placeholders.JsonQuery.InputTextArea}
              value={jsonQuery}
              readOnly={false}
              handleChange={changeJsonQuery}
            />
            <div className={styles.buttonsWrapper}>
              <Button
                disabled={!jsonQuery}
                type="format"
                tooltipPlace="left"
                onClick={() => setFormattedJson(jsonQuery, setJsonQuery)}
              />
            </div>
          </div>
        </div>
        <div
          className={cx({
            jsonInputWrapper: 1,
          })}
        >
          <div className={styles.headerWrapper}>
            <h4>{hints.JsonQuery.QueryHeader}</h4>
          </div>
          <TextArea
            placeholder={placeholders.JsonQuery.QueryTextArea}
            value={query}
            readOnly={false}
            handleChange={changeQuery}
          />
        </div>
        <div
          className={cx({
            jsonInputWrapper: 1,
          })}
        >
          <div className={styles.headerWrapper}>
            <h4>{hints.JsonQuery.ResultHeader}</h4>
            {result && <p className={styles.hint}>{result.length} chars</p>}
          </div>
          <div className={cx({ resultWrapper: 1, "mt-0": 1 })}>
            <TextArea
              placeholder={placeholders.Global.OutputTextarea}
              value={error === "" ? result : error}
              readOnly={true}
            />
            <div className={styles.buttonsWrapper}>
              <Button
                disabled={result === "" || error !== ""}
                type={btnType}
                tooltipPlace="left"
                onClick={() => copyText(result)}
              />
              <Button
                disabled={result === "" || error !== ""}
                type="download"
                tooltipPlace="left"
                onClick={() => downloadFile(result, "json")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
