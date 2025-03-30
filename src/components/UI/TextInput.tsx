import React from "react";
import styles from "./styles.module.scss";

interface TextInputProps {
  inputValue: React.InputHTMLAttributes<HTMLInputElement>["value"];
  placeholder?: string;
  disabled?: boolean;
  handleChange?: () => void;
  id?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  inputValue,
  disabled = false,
  handleChange,
  id,
}) => {
  return (
    <>
      <label htmlFor={id}>Result:&nbsp;</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={() => handleChange}
        value={inputValue}
        className={styles.textInput}
        disabled={disabled}
        id={id}
      ></input>
    </>
  );
};
