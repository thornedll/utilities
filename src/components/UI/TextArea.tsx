import React from "react";
import { TextAreaProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  value,
  disabled = false,
  id,
  labelText,
  readOnly = false,
  handleChange = () => {},
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
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleChange(e.target.value)
        }
        value={value}
        className={styles.textArea}
        disabled={disabled}
        id={id}
        readOnly={readOnly}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault()
          };
        }}
      />
    </>
  );
};
