import React from "react";
import { DoubleInputProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";
import { Button } from "./";

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
        value={inputValue}
        onChange={(e) => handleKeyChange(numberKey - 1, e.target.value)}
        className={styles.doubleInput}
        disabled={disabled}
      />
      <input
        type="text"
        placeholder={secondPlaceholder}
        value={secondInputValue}
        onChange={(e) => handleValueChange(numberKey - 1, e.target.value)}
        className={styles.doubleInput}
        disabled={disabled}
      />
      <Button type="add" onClick={addInputs} />
      <Button type="remove" onClick={() => removeInputs(numberKey - 1)} />
    </div>
  );
};
