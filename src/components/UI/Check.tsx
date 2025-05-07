import { FC } from "react";
import classNames from "classnames/bind";
import { CheckProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const Check: FC<CheckProps> = ({
  checked,
  disabled = false,
  id,
  labelText,
  style,
  type = "switch",
  handleChange,
}) => {
  const containerClasses = cx({
    checkboxContainer: true,
    arrowsContainer: type === "arrows",
  });

  const checkboxClasses = cx({
    switchCheckbox: true,
    arrowsCheckbox: type === "arrows",
  });

  const labelClasses = cx({
    switchLabel: true,
    arrowsLabel: type === "arrows",
  });

  const buttonClasses = cx({
    switchButton: true,
    arrowsButton: type === "arrows",
  });

  return (
    <>
      <div className={containerClasses}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          id={id}
          style={style}
          className={checkboxClasses}
          onChange={() => handleChange(!checked)}
        />
        <label htmlFor={id} className={labelClasses}>
          <span className={buttonClasses} />
          <div className={styles.checkboxLabelText}>{labelText}</div>
        </label>
      </div>
    </>
  );
};
