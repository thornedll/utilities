import React from "react";
import { DoubleInputProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const DoubleInput: React.FC<DoubleInputProps> = ({
  key,
  inputValue,
  secondInputValue,
  placeholder,
  secondPlaceholder,
  disabled = false,
  handleChange,
}) => {
  return (
    <div className={styles.doubleInputWrapper} key={key}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={() => handleChange}
        value={inputValue}
        className={styles.doubleInput}
        disabled={disabled}
      />
      <input
        type="text"
        placeholder={secondPlaceholder}
        onChange={() => handleChange}
        value={secondInputValue}
        className={styles.doubleInput}
        disabled={disabled}
      />
      <button>+</button>
      <button>-</button>
    </div>
  );
};
