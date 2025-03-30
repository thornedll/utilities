import React, { useState } from "react";
import { DateTimePicker, BaseSelect, Button, TextInput } from "../UI";
import { getUnixTimeString } from "../../utils";
import { timezones } from "../../constants";
import styles from "./styles.module.scss";

type Option = {
  label: string;
  value: string;
};

type BtnType = "copy" | "success" | "primary";

export const DateConverter: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [timezone, setTimezone] = useState<Option>(timezones[3]);
  const [btnType, setBtnType] = useState<BtnType>("copy");

  const handleChange = (text: string) => {
    setText(text);
  };
  const changeDate = (startDate: Date | null) => {
    setStartDate(startDate);
  };
  const changeTimezone = (timezone: Option) => {
    setTimezone(timezone);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setBtnType("success");
    setTimeout(() => setBtnType("copy"), 1000);
  };

  return (
    <div className={styles.pageWrapper}>
      <h2>Date Converter (ISO-UNIX)</h2>
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
            handleChange(
              startDate ? getUnixTimeString(startDate, timezone.value) : ""
            )
          }
          type="primary"
        />
      </div>
      <div className={styles.resultWrapper}>
        <TextInput
          placeholder=""
          inputValue={text}
          disabled
          handleChange={() => handleChange}
          id="result"
        />
        <Button
          text=""
          onClick={copy}
          type={btnType}
          disabled={text === "" ? true : false}
        />
      </div>
    </div>
  );
};
