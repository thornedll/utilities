import React from "react";
import { BaseSelect, Button } from "./";
import { DoubleInputProps } from "../../ts/interfaces/interfaces";
import { valueTypes } from "../../constants";
import styles from "./styles.module.scss";

export const DoubleInput: React.FC<DoubleInputProps> = ({
  numberKey,
  inputValue,
  secondInputValue,
  selectValue,
  placeholder,
  secondPlaceholder,
  disabled = false,
  handleKeyChange,
  handleValueChange,
  handleTypeChange,
  addInputs,
  removeInputs,
}) => {
  const inputType = selectValue === "number" ? selectValue : "text";

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
        type={inputType}
        placeholder={secondPlaceholder}
        value={secondInputValue}
        onChange={(e) => handleValueChange(numberKey - 1, e.target.value)}
        className={styles.doubleInput}
        disabled={disabled}
      />
      <BaseSelect
        options={valueTypes}
        value={
          valueTypes.filter((i) => (i.value === selectValue ? true : false))[0]
        }
        handleChange={(valueType: any) =>
          handleTypeChange(numberKey - 1, valueType.value)
        }
      />
      <Button type="add" onClick={addInputs} />
      <Button type="remove" onClick={() => removeInputs(numberKey - 1)} />
    </div>
  );
};
