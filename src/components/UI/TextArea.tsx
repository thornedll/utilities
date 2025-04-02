import React from "react";
import styles from "./styles.module.scss";

interface TextAreaProps {
  value: React.InputHTMLAttributes<HTMLInputElement>["value"];
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  readOnly: boolean;
  handleChange?: () => void;
}

export const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  value,
  disabled = false,
  id,
  labelText,
  readOnly = false,
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
      <textarea
        placeholder={placeholder}
        onChange={() => handleChange}
        value={value}
        className={styles.textArea}
        disabled={disabled}
        id={id}
        readOnly={readOnly}
      />
    </>
  );
};
