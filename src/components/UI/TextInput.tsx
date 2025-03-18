import React, { useState } from "react";
import styles from "./styles.module.scss";

interface TextInputProps {
  placeholder?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ placeholder }) => {
  const [text, setText] = useState<string>("");
  const handleChange = (text: string) => {
    setText(text);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={() => handleChange}
      value={text}
    ></input>
  );
};
