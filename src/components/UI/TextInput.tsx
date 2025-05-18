import { FC, ChangeEvent } from "react";
import { ITextInputProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const TextInput: FC<ITextInputProps> = ({
  type = "text",
  placeholder = "",
  value,
  disabled = false,
  id,
  labelText,
  pattern,
  max,
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
        {labelText}
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
        max={max}
        style={style}
      />
    </>
  );
};
