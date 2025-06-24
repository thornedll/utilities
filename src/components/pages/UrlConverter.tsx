import { FC, useState } from "react";
import classNames from "classnames/bind";
import { Button, Check, TextArea } from "../UI";
import { BtnType } from "../../ts/types/types";
import { hints, placeholders } from "../../constants";
import { copy } from "../../utils";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const UrlConverter: FC = () => {
  //* Global states
  const [decodeUrl, setDecodeUrl] = useState<boolean>(true);
  const [btnType, setBtnType] = useState<BtnType>("copy");
  //* Decode URL states
  const [stringToDecode, setStringToDecode] = useState<string>("");
  const [decodedString, setDecodedString] = useState<string>("");
  //* Encode URL states
  const [stringToEncode, setStringToEncode] = useState<string>("");
  const [encodedString, setEncodedString] = useState<string>("");

  const copyText = (text: string) => {
    copy(text);
    setBtnType("success");
    setTimeout(() => setBtnType("copy"), 1500);
  };

  const changeStringToDecode = (newString: string) => {
    setStringToDecode(newString);
  };

  const changeStringToEncode = (newString: string) => {
    setStringToEncode(newString);
  };

  const decodeString = (stringToDecode: string) => {
    const newDecodedString = decodeURIComponent(stringToDecode);
    setDecodedString(newDecodedString);
  };

  const encodeString = (stringToEncode: string) => {
    const newEncodedString = encodeURIComponent(stringToEncode);
    setEncodedString(newEncodedString);
  };

  const clearString = (decodeUrl: boolean) => {
    if (decodeUrl) {
      changeStringToDecode("");
      decodeString("");
    } else {
      changeStringToEncode("");
      encodeString("");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <h2>URL Converter</h2>
      <div className={styles.optionsWrapper}>
        <div className={cx({ hintWrapper: 1, hintWrapperWide: 1 })}>
          <p>{decodeUrl ? "Encoded Text" : "Decoded Text"}</p>
          <p className={styles.hint}>{hints.Global.Input}</p>
        </div>
        <Check
          checked={decodeUrl}
          id="decodeUrl"
          type="arrows"
          handleChange={() => setDecodeUrl(!decodeUrl)}
        />
        <div className={cx({ hintWrapper: 1, hintWrapperWide: 1 })}>
          <p style={{ fontWeight: "600" }}>
            {decodeUrl ? "Decoded Text" : "Encoded Text"}
          </p>
          <p className={styles.hint}>{hints.Global.Output}</p>
        </div>
      </div>
      <div className={styles.optionsWrapper}>
        <div className={styles.jsonInputWrapper}>
          <div className={styles.headerWrapper}>
            <h4>URL to {decodeUrl ? "decode" : "encode"}</h4>
            {decodeUrl
              ? stringToDecode && (
                  <p className={styles.hint}>{stringToDecode.length} chars</p>
                )
              : stringToEncode && (
                  <p className={styles.hint}>{stringToEncode.length} chars</p>
                )}
          </div>
          <div className={cx({ resultWrapper: 1, "mt-0": 1 })}>
            <TextArea
              placeholder={placeholders.UrlConverter.InputTextarea}
              value={decodeUrl ? stringToDecode : stringToEncode}
              readOnly={false}
              handleChange={
                decodeUrl ? changeStringToDecode : changeStringToEncode
              }
            />
          </div>
        </div>
        <div className={styles.jsonInputWrapper}>
          <div className={styles.headerWrapper}>
            <h4>Result</h4>
            {decodeUrl
              ? decodedString && (
                  <p className={styles.hint}>{decodedString.length} chars</p>
                )
              : encodedString && (
                  <p className={styles.hint}>{encodedString.length} chars</p>
                )}
          </div>
          <div className={cx({ resultWrapper: 1, "mt-0": 1 })}>
            <TextArea
              value={decodeUrl ? decodedString : encodedString}
              readOnly={true}
              placeholder={placeholders.UrlConverter.OutputTextarea}
            />
            <div className={styles.buttonsWrapper}>
              <Button
                disabled={
                  decodeUrl ? decodedString === "" : encodedString === ""
                }
                type={btnType}
                tooltipPlace="left"
                onClick={
                  decodeUrl
                    ? () => copyText(decodedString)
                    : () => copyText(encodedString)
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.optionsWrapper}>
        <Button
          text={hints.Global.ConvertFile}
          disabled={decodeUrl ? !stringToDecode : !stringToEncode}
          type="primary"
          subType={["icon"]}
          onClick={
            decodeUrl
              ? () => decodeString(stringToDecode)
              : () => encodeString(stringToEncode)
          }
        />
        <Button
          text="Clear"
          disabled={
            decodeUrl
              ? !(stringToDecode || decodedString)
              : !(stringToEncode || encodedString)
          }
          type="primary"
          subType={["clear", "outline", "outline-red"]}
          onClick={() => clearString(decodeUrl)}
        />
      </div>
    </div>
  );
};
