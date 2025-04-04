import React from "react";
import { DoubleInputProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const DoubleInput: React.FC<DoubleInputProps> = ({
  key,
  numberKey,
  inputValue,
  secondInputValue,
  placeholder,
  secondPlaceholder,
  disabled = false,
  handleInputsChange,
}) => {
  return (
    <div className={styles.doubleInputWrapper} key={key}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) =>
          handleInputsChange(numberKey - 1, e.target.value, undefined)
        }
        value={inputValue}
        className={styles.doubleInput}
        disabled={disabled}
      />
      <input
        type="text"
        placeholder={secondPlaceholder}
        onChange={(e) =>
          handleInputsChange(numberKey - 1, undefined, e.target.value)
        }
        value={secondInputValue}
        className={styles.doubleInput}
        disabled={disabled}
      />
      <button>+</button>
      <button>-</button>
    </div>
  );
};
