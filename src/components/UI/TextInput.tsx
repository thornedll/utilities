import React from "react";
import { TextInputProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  inputValue,
  disabled = false,
  id,
  labelText,
  handleChange,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        style={
          labelText && id ? { display: "inline-block" } : { display: "none" }
        }
      >
        {labelText}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={() => handleChange}
        value={inputValue}
        className={styles.textInput}
        disabled={disabled}
        id={id}
      />
    </>
  );
};
