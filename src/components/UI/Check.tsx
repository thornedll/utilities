import React from "react";
import styles from "./styles.module.scss";

interface CheckProps {
  checked: boolean;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  handleChange: (state: boolean) => void;
}

export const Check: React.FC<CheckProps> = ({
  checked,
  disabled = false,
  id,
  labelText,
  handleChange,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        style={labelText ? { display: "flex" } : { display: "none" }}
        className={styles.check}
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          id={id}
          onChange={() => handleChange(!checked)}
        />
        {labelText}
      </label>
    </>
  );
};
