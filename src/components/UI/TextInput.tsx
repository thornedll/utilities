import { FC, ChangeEvent } from "react";
import { TextInputProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const TextInput: FC<TextInputProps> = ({
  placeholder = "",
  value,
  disabled = false,
  id,
  labelText,
  style,
  handleChange = () => {},
}) => {
  return (
    <>
      <label
        htmlFor={id}
        style={labelText && id ? {} : { display: "none" }}
        className={styles.textInputLabel}
      >
        {labelText}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value)
        }
        value={value}
        className={styles.textInput}
        disabled={disabled}
        id={id}
        style={style}
      />
    </>
  );
};
