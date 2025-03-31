import React from "react";
import styles from "./styles.module.scss";

interface TextInputProps {
  inputValue: React.InputHTMLAttributes<HTMLInputElement>["value"];
  placeholder?: string;
  disabled?: boolean;
  handleChange?: () => void;
  id?: string;
  labelText?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  inputValue,
  disabled = false,
  handleChange,
  id,
  labelText,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        style={labelText ? { display: "inline-block" } : { display: "none" }}
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
