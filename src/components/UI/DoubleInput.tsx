import React from "react";
import { DoubleInputProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const DoubleInput: React.FC<DoubleInputProps> = ({
  numberKey,
  inputValue,
  secondInputValue,
  placeholder,
  secondPlaceholder,
  disabled = false,
  handleKeyChange,
  handleValueChange,
  addInputs,
  removeInputs,
}) => {
  return (
    <div className={styles.doubleInputWrapper}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleKeyChange(numberKey - 1, e.target.value)}
        value={inputValue}
        className={styles.doubleInput}
        disabled={disabled}
      />
      <input
        type="text"
        placeholder={secondPlaceholder}
        onChange={(e) => handleValueChange(numberKey - 1, e.target.value)}
        value={secondInputValue}
        className={styles.doubleInput}
        disabled={disabled}
      />
      <button onClick={addInputs}>+</button>
      <button onClick={() => removeInputs(numberKey - 1)}>-</button>
    </div>
  );
};
