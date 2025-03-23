import React, { useState } from "react";
import { DateTimePicker, BaseSelect, Button, TextInput } from "../UI";
import styles from "./styles.module.scss";
import { getUnixTimeString } from "../../utils";
import { timezones } from "../../constants";

type Option = {
  label: string;
  value: string;
};

export const DateConverter: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [timezone, setTimezone] = useState<Option>(timezones[3]);

  const handleChange = (text: string) => {
    setText(text);
  };
  const changeDate = (startDate: Date | null) => {
    setStartDate(startDate);
  };
  const changeTimezone = (timezone: Option) => {
    setTimezone(timezone);
  };

  return (
    <>
      <h2>Конвертер дат ISO-UNIX</h2>
      <div className={styles.optionsWrapper}>
        <DateTimePicker
          startDate={startDate}
          changeDate={(date: Date | null) => changeDate(date)}
        />
        <BaseSelect
          options={timezones}
          value={timezone}
          changeTimezone={(timezone: Option) => changeTimezone(timezone)}
        />
        <Button
          text="Конвертировать"
          onClick={() =>
            handleChange(startDate ? getUnixTimeString(startDate, timezone.value) : "")
          }
        />
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
