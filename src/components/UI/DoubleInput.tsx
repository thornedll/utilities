import { FC } from "react";
import { BaseSelect, Button } from "./";
import { DoubleInputProps } from "../../ts/interfaces/interfaces";
import { valueTypes, baseValueTypes } from "../../constants";
import styles from "./styles.module.scss";
import { Option } from "../../ts/types/types";

export const DoubleInput: FC<DoubleInputProps> = ({
  numberKey,
  value,
  secondValue,
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

  const handleSelectChange = (valueType: any) => {
    handleTypeChange(numberKey - 1, valueType.value);
  };

  const getValue = (): Option | undefined => {
    return valueTypes.find((i) => i.value === selectValue);
  };

  return (
    <div className={styles.doubleInputWrapper}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleKeyChange(numberKey - 1, e.target.value)}
        className={styles.doubleInput}
        disabled={disabled}
      />
      <input
        type={inputType}
        placeholder={secondPlaceholder}
        value={secondValue}
        onChange={(e) => handleValueChange(numberKey - 1, e.target.value)}
        className={styles.doubleInput}
        disabled={disabled || !baseValueTypes.includes(selectValue)}
      />
      <BaseSelect
        options={valueTypes}
        value={getValue()}
        width="180px"
        handleChange={handleSelectChange}
      />
      <Button type="add" onClick={addInputs} />
      <Button type="remove" onClick={() => removeInputs(numberKey - 1)} />
    </div>
  );
};
