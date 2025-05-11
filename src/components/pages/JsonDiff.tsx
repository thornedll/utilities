import { useState, FC, Dispatch, ChangeEvent, SetStateAction } from "react";
import classNames from "classnames/bind";
import { Button, FileInput, TextArea } from "../UI";
import { DiffResult } from "../../ts/interfaces/interfaces";
import { hints, placeholders } from "../../constants";
import { setFormattedJson } from "../../utils";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const JsonDiff: FC = () => {
  const [json1, setJson1] = useState<string>("");
  const [json2, setJson2] = useState<string>("");
  const [fileName1, setFileName1] = useState<string>("");
  const [fileName2, setFileName2] = useState<string>("");
  const [diffs, setDiffs] = useState<DiffResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const compareJson = () => {
    try {
      setError(null);
      setDiffs([]);

      const obj1 = json1 ? JSON.parse(json1) : {};
      const obj2 = json2 ? JSON.parse(json2) : {};

      const differences: DiffResult[] = [];

      const compareObjects = (obj1: any, obj2: any, path = "") => {
        const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

        allKeys.forEach((key) => {
          const currentPath = path ? `${path}.${key}` : key;
          if (key in obj1 && key in obj2) {
            if (
              typeof obj1[key] === "object" &&
              obj1[key] !== null &&
              typeof obj2[key] === "object" &&
              obj2[key] !== null
            ) {
              compareObjects(obj1[key], obj2[key], currentPath);
            } else if (
              JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])
            ) {
              differences.push({
                key: currentPath,
                value1: obj1[key],
                value2: obj2[key],
              });
            }
          } else if (key in obj1) {
            differences.push({
              key: currentPath,
              value1: obj1[key],
              value2: undefined,
            });
          } else {
            differences.push({
              key: currentPath,
              value1: undefined,
              value2: obj2[key],
            });
          }
        });
      };

      compareObjects(obj1, obj2);
      setDiffs(differences);
    } catch (err) {
      setError(hints.JsonDiff.ParsingError);
      console.error(err);
    }
  };

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    contentSetter: Dispatch<SetStateAction<string>>,
    fileNameSetter: Dispatch<SetStateAction<string>>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    fileNameSetter(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      contentSetter(content);
    };
    reader.readAsText(file);
  };

  const clearJson = (
    fileName: string,
    contentSetter: Dispatch<SetStateAction<string>>,
    fileNameSetter: Dispatch<SetStateAction<string>>
  ): void => {
    contentSetter("");
    fileName && fileNameSetter("");
  };

  return (
    <div className={styles.pageWrapper}>
      <h2>JSON Difference</h2>
      <div className={cx({ optionsWrapper: 1, "align-start": 1 })}>
        <div className={styles.jsonInputWrapper}>
          <div className={styles.headerWrapper}>
            <h4>JSON 1</h4>
            {json1 && <p className={styles.hint}>{json1.length} chars</p>}
          </div>
          <div className={cx({ resultWrapper: 1, "mt-0": 1 })}>
            <TextArea
              value={json1}
              readOnly={false}
              handleChange={setJson1}
              placeholder={placeholders.JsonDiff.Textarea}
            />
            <div className={styles.buttonsWrapper}>
              <Button
                disabled={!json1}
                type="format"
                tooltipPlace="left"
                onClick={() => setFormattedJson(json1, setJson1)}
              />
              <Button
                disabled={!json1}
                type="delete"
                tooltipPlace="left"
                onClick={() => clearJson(fileName1, setJson1, setFileName1)}
              />
            </div>
          </div>
          <div className={cx({ optionsWrapper: 1, "mt-0": 1 })}>
            <p>or </p>
            <FileInput
              handleChange={(e) => handleFileUpload(e, setJson1, setFileName1)}
              accept="application/json"
            />
            <div>{fileName1 && `Current file: ${fileName1}`}</div>
          </div>
        </div>
        <div className={styles.jsonInputWrapper}>
          <div className={styles.headerWrapper}>
            <h4>JSON 2</h4>
            {json2 && <p className={styles.hint}>{json2.length} chars</p>}
          </div>
          <div className={cx({ resultWrapper: 1, "mt-0": 1 })}>
            <TextArea
              value={json2}
              readOnly={false}
              handleChange={setJson2}
              placeholder={placeholders.JsonDiff.Textarea}
            />
            <div className={styles.buttonsWrapper}>
              <Button
                disabled={!json2}
                type="format"
                tooltipPlace="left"
                onClick={() => setFormattedJson(json2, setJson2)}
              />
              <Button
                disabled={!json2}
                type="delete"
                tooltipPlace="left"
                onClick={() => clearJson(fileName2, setJson2, setFileName2)}
              />
            </div>
          </div>
          <div className={cx({ optionsWrapper: 1, "mt-0": 1 })}>
            <p>or </p>
            <FileInput
              handleChange={(e) => handleFileUpload(e, setJson2, setFileName2)}
              accept="application/json"
            />
            <div>{fileName2 && `Current file: ${fileName2}`}</div>
          </div>
        </div>
      </div>
      <div className={styles.optionsWrapper}>
        <Button
          type="primary"
          onClick={compareJson}
          text={hints.Global.CompareFiles}
          disabled={json1 && json2 ? false : true}
        />
        {error && <div className={styles.error}>{error}</div>}
      </div>
      <div className={styles.resultWrapper}>
        <div className={styles.results}>
          <h3>Differences</h3>
          {diffs.length > 0 ? (
            <table className={styles["mt-12"]}>
              <thead>
                <tr>
                  <th>Key (full path)</th>
                  <th>JSON 1 value</th>
                  <th>JSON 2 value</th>
                </tr>
              </thead>
              <tbody>
                {diffs.map((diff, index) => (
                  <tr
                    key={index}
                    className={
                      styles[
                        diff.value1 === undefined
                          ? "added"
                          : diff.value2 === undefined
                          ? "removed"
                          : "changed"
                      ]
                    }
                  >
                    <td>{diff.key}</td>
                    <td>
                      {diff.value1 !== undefined
                        ? JSON.stringify(diff.value1)
                        : ""}
                    </td>
                    <td>
                      {diff.value2 !== undefined
                        ? JSON.stringify(diff.value2)
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={cx({ hint: 1, "mt-6": 1 })}>
              {hints.JsonDiff.NoDifference}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
