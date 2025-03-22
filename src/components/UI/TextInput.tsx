import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface TextInputProps {
  inputValue?: string | (() => string);
  placeholder?: string;
  disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  inputValue = "",
  disabled = false,
}) => {
  //TODO useState вынести на верхний уровень
  const [text, setText] = useState<string>(inputValue);
  const handleChange = (text: string) => {
    setText(text);
  };

  useEffect(() => {
    setText(inputValue);
  }, [inputValue]);

  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={() => handleChange}
      value={text}
      className={styles.textInput}
      disabled={disabled}
    ></input>
  );
};
