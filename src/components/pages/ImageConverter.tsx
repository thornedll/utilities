import { FC, useState, ChangeEvent } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import { BtnType, FileContent, ImageDimensions } from "../../ts/types/types";
import { Button, FileInput, TextInput, Loader } from "../UI";
import { Modal } from "../blocks";
import { hints, imageExtensions } from "../../constants";
import { b64toBlob, copy } from "../../utils";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const ImageConverter: FC = () => {
  const [btnType, setBtnType] = useState<BtnType>("copy");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageUrlError, setImageUrlError] = useState<string>("");
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [file, setFile] = useState<FileContent>();
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>();
  const [result, setResult] = useState<string>("");

  const copyText = (text: string) => {
    copy(text);
    setBtnType("success");
    setTimeout(() => setBtnType("copy"), 1500);
  };

  const handleModalVisibility = () => {
    setIsModalOpen(!isModalOpen);
  };

  const changeImageUrl = (newImageUrl: string) => {
    setImageUrl(newImageUrl);
  };

  const fetchImage = async (url: string) => {
    const fileType = url.split(".").at(-1);
    imageUrlError !== "" && setImageUrlError("");
    if (imageExtensions.some((extension) => fileType?.includes(extension))) {
      let b64 = "";
      setResult("");
      axios.interceptors.request.use(function (config) {
        setImageLoading(true);
        setIsModalOpen(!isModalOpen);
        return config;
      });
      await axios
        .get(url, { responseType: "arraybuffer" })
        .then(async (response) => {
          const base64 = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          b64 = base64;
          setResult(`data:image/${fileType};base64,${base64}`);
          setFile({
            name: url,
          });
          setImageUrl("");
          setImageLoading(false);
          const bitmap = await createImageBitmap(
            b64toBlob(b64, `image/${fileType}`)
          );
          setImageDimensions({ height: bitmap.height, width: bitmap.width });
        })
        .catch((error) => {
          setImageLoading(false);
          console.error(error);
          setImageUrlError(error.message);
        });
    } else {
      setImageUrlError(hints.ImageConverter.ImageUrlFormatError);
    }
  };

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    imageUrlError !== "" && setImageUrlError("");
    result !== "" && setResult("");
    if (e.target.files) {
      const file = e.target.files[0];
      if (
        imageExtensions.some((extension) =>
          file.name.split(".").at(-1)?.includes(extension)
        )
      ) {
        setFile({
          name: file.name,
          content: file,
        });
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
          accept={imageExtensions.map((extension) => "." + extension).join(",")}
        />
        or
        <Button
          text={hints.ImageConverter.ImageUrlButton}
          type="primary"
          onClick={handleModalVisibility}
        />
      </div>
      <div className={styles.resultWrapper}>
        <div className={cx({ resultWrapper: 1, "fd-column": 1, "mt-0": 1 })}>
          <div className={cx({ imageHeader: 1 })}>
            <span>{file && file.name}</span>
            <span className={styles.hint}>
              {imageDimensions
                ? imageDimensions.width +
                  " x " +
                  imageDimensions.height +
                  " pixels"
                : "0 x 0 pixels"}
            </span>
          </div>
          <div className={styles.imageWrapper}>
            {imageLoading && <Loader />}
            {result && <img src={result} alt="uploaded img" />}
          </div>
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
                onClick={() => copyText(result)}
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
                onClick={() => copyText(`<img src="${result}" />`)}
              />
            </div>
          </div>
        </div>
      </div>
      {imageUrlError && (
        <span className={styles.hintError}>{imageUrlError}</span>
      )}
      <Modal
        isOpen={isModalOpen}
        headerText={hints.ImageConverter.ModalHeader}
        handleClose={handleModalVisibility}
      >
        <div className={styles.imageConverterModalContent}>
          <TextInput value={imageUrl} handleChange={changeImageUrl} />
          <Button
            text={hints.ImageConverter.GetImageFromUrl}
            disabled={!imageUrl}
            type="primary"
            onClick={() => fetchImage(imageUrl)}
          />
        </div>
        <span className={cx({ hint: 1, hintError: 1 })}>{imageUrlError}</span>
      </Modal>
    </div>
  );
};
