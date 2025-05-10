import { FC, useRef, ChangeEvent, KeyboardEvent } from "react";
import { TextAreaProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const TextArea: FC<TextAreaProps> = ({
  placeholder,
  value,
  disabled = false,
  id,
  labelText,
  readOnly = false,
  handleChange = () => {},
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue =
        value?.toString().substring(0, start) +
        "  " +
        value?.toString().substring(end);
      handleChange(newValue);
      setTimeout(() => {
        if (textarea) {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  return (
    <>
      <label
        htmlFor={id}
        style={
          labelText && id ? { display: "inline-block" } : { display: "none" }
        }
      >
        {labelText}
      </label>
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          handleChange(e.target.value)
        }
        value={value}
        className={styles.textArea}
        disabled={disabled}
        id={id}
        readOnly={readOnly}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};
