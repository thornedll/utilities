import React from "react";
import { TextInputProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  disabled = false,
  id,
  labelText,
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value)
        }
        value={value}
        className={styles.textInput}
        disabled={disabled}
        id={id}
      />
    </>
  );
};
