import React from "react";
import styles from "./styles.module.scss";

interface TextInputProps {
  inputValue: React.InputHTMLAttributes<HTMLInputElement>["value"];
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  handleChange?: () => void;
}

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
