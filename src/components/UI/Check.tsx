import { FC, useRef, KeyboardEvent } from "react";
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

  const checkLabelRef = useRef<HTMLLabelElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const checkLabel = checkLabelRef.current;
      if (!checkLabel) return;
      handleChange(!checked);
    }
  };

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
        <label
          htmlFor={id}
          className={labelClasses}
          tabIndex={0}
          ref={checkLabelRef}
          onKeyDown={handleKeyDown}
        >
          <span className={buttonClasses} />
          <div className={styles.checkboxLabelText}>{labelText}</div>
        </label>
      </div>
    </>
  );
};
