import React from "react";
import styles from "./styles.module.scss";

interface TextInputProps {
  inputValue: React.InputHTMLAttributes<HTMLInputElement>["value"];
  placeholder?: string;
  disabled?: boolean;
  handleChange?: () => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  inputValue,
  disabled = false,
  handleChange,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={() => handleChange}
      value={inputValue}
      className={styles.textInput}
      disabled={disabled}
    ></input>
  );
};
