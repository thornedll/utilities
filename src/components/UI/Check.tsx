import { FC } from "react";
import { CheckProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const Check: FC<CheckProps> = ({
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
        style={labelText ? {} : { display: "none" }}
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
