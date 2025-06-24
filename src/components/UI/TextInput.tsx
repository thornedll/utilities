import { FC, ChangeEvent } from "react";
import { TextInputProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const TextInput: FC<TextInputProps> = ({
  type = "text",
  value,
  placeholder = "",
  hint,
  disabled = false,
  id,
  labelText,
  pattern,
  min,
  max,
  maxLength,
  style,
  handleChange = () => {},
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  return (
    <>
      <label
        htmlFor={id}
        style={labelText && id ? {} : { display: "none" }}
        className={styles.textInputLabel}
      >
        <p>{labelText}</p>
        {hint && <span className={styles.hint}>{hint}</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={styles.textInput}
        disabled={disabled}
        id={id}
        pattern={pattern}
        min={min}
        max={max}
        maxLength={maxLength}
        style={style}
      />
    </>
  );
};
