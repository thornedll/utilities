import React, { useState } from "react";
import { DateTimePicker, BaseSelect, Button, TextInput } from "../UI";
import styles from "./styles.module.scss";
import { timezones } from "../../constants";

interface DateConverterProps {
  inputValue?: string | (() => string);
}

export const DateConverter: React.FC<DateConverterProps> = ({
  inputValue = "",
}) => {
  const [text, setText] = useState<string>(inputValue);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleChange = (text: string) => {
    setText(text);
  };
  const changeDate = (startDate: Date | null) => {
    setStartDate(startDate);
  };

  return (
    <>
      <h2>Конвертер дат ISO-UNIX</h2>
      <div className={styles.optionsWrapper}>
        <DateTimePicker
          startDate={startDate}
          changeDate={(date: Date | null) => changeDate(date)}
        />
        <BaseSelect options={timezones} defaultValue={timezones[3]} />
        <Button text="Конвертировать" onClick={() => handleChange("123")} />
      </div>
      <div className={styles.resultWrapper}>
        <TextInput
          placeholder="Результат"
          inputValue={text}
          disabled
          handleChange={() => handleChange}
        />
      </div>
    </>
  );
};
