import { FC } from "react";
import { BaseSelect, Button } from "./";
import { Option } from "../../ts/types/types";
import { DoubleInputProps } from "../../ts/interfaces/interfaces";
import { valueTypes, baseValueTypes } from "../../constants";
import styles from "./styles.module.scss";

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
    <>
      <input
        className={styles.doubleInput}
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleKeyChange(numberKey - 1, e.target.value)}
      />
      <div className={styles.singleInputWrapper}>
        <input
          className={styles.doubleInput}
          type={inputType}
          disabled={disabled || !baseValueTypes.includes(selectValue)}
          placeholder={secondPlaceholder}
          value={secondValue}
          onChange={(e) => handleValueChange(numberKey - 1, e.target.value)}
        />
        {!baseValueTypes.includes(selectValue) && (
          <div className={styles.buttonsWrapper}>
            <Button
              type="update"
              tooltipPlace="top"
              onClick={() => handleSelectChange(value)}
            />
          </div>
        )}
      </div>
      <BaseSelect
        options={valueTypes}
        value={getValue()}
        width="180px"
        handleChange={handleSelectChange}
      />
      <Button type="add" onClick={addInputs} />
      <Button type="remove" onClick={() => removeInputs(numberKey - 1)} />
    </>
  );
};
