import React from "react";
import styles from "./styles.module.scss";

interface CheckProps {
  disabled?: boolean;
  handleChange?: () => void;
  id?: string;
  labelText?: string;
}

export const Check: React.FC<CheckProps> = ({
  disabled = false,
  handleChange,
  id,
  labelText,
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
          onChange={() => handleChange}
          disabled={disabled}
          id={id}
        />
        {labelText}
      </label>
    </>
  );
};
