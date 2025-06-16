import { FC, useState, ChangeEvent } from "react";
import classNames from "classnames/bind";
import { Button, FileInput, TextInput, Loader } from "../UI";
import { BtnType, ImageDimensions } from "../../ts/types/types";
import { hints, imageExtensions } from "../../constants";
import { copy } from "../../utils";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const ImageConverter: FC = () => {
  const [btnType, setBtnType] = useState<BtnType>("copy");
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>();
  const [result, setResult] = useState<string>("");

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    setResult("");
    if (e.target.files) {
      const file = e.target.files[0];
      if (
        imageExtensions.some((extension) =>
          file.name.split(".").at(-1)?.includes(extension)
        )
      ) {
        setFile(file);
        const reader = new FileReader();
        reader.onerror = () => {
          alert(hints.Global.UploadFileError);
        };
        reader.onloadstart = () => {
          setImageLoading(true);
        };
        reader.onloadend = () => {
          setImageLoading(false);
        };
        reader.onload = () => {
          const rawText = reader.result;
          if (rawText && typeof rawText === "string") {
            setResult(rawText);
          }
        };
        const bitmap = await createImageBitmap(file);
        setImageDimensions({ height: bitmap.height, width: bitmap.width });
        reader.readAsDataURL(file);
      } else {
        window.alert("File does not support. File must be image");
      }
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <h2>Image Converter</h2>
      <div className={styles.optionsWrapper}>
        <FileInput
          handleChange={uploadFile}
          accept={imageExtensions
            .map((extension) => {
              return "." + extension;
            })
            .join(",")}
        />
      </div>
      <div className={cx({ imageHeader: 1, "mt-12": 1 })}>
        <span>{file && file.name}</span>
        <span className={styles.hint}>
          {imageDimensions
            ? imageDimensions.width + " x " + imageDimensions.height + " pixels"
            : "0 x 0 pixels"}
        </span>
      </div>
      <div className={styles.resultWrapper}>
        <div className={styles.imageWrapper}>
          {imageLoading && <Loader />}
          {result && <img src={result} alt="uploaded img" />}
        </div>
        <div className={styles.verticalWrapper}>
          <div
            className={cx({
              resultWrapper: 1,
              "w-100": 1,
              "mt-0": 1,
              "fd-column": 1,
            })}
          >
            <TextInput
              value={result}
              hint={result && result.length + " chars"}
              disabled
              id="base64"
              labelText="Base64"
              style={{ width: "calc(100% - 32px)" }}
            />
            <div className={cx({ buttonsWrapper: 1, "b-0": 1 })}>
              <Button
                type={btnType}
                disabled={result === ""}
                onClick={() => copy(result, setBtnType)}
              />
            </div>
          </div>
          <div
            className={cx({
              resultWrapper: 1,
              "w-100": 1,
              "fd-column": 1,
            })}
          >
            <TextInput
              value={result ? `<img src="${result}" />` : ""}
              disabled
              id="img"
              labelText="<img /> example"
              style={{ width: "calc(100% - 32px)" }}
            />
            <div className={cx({ buttonsWrapper: 1, "b-0": 1 })}>
              <Button
                type={btnType}
                disabled={result === ""}
                onClick={() => copy(`<img src="${result}" />`, setBtnType)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
