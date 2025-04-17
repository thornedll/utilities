import React, { useState } from "react";
import { Option, BtnType } from "../../ts/types/types";
import { DateTimePicker, BaseSelect, Button, TextInput } from "../UI";
import { copy, getUnixTimeString } from "../../utils";
import { timezones } from "../../constants";
import styles from "./styles.module.scss";

export const DateConverter: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(new Date().setMilliseconds(0))
  );
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

  const copyText = () => {
    copy(text, setBtnType);
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
          handleChange={(timezone: Option) => changeTimezone(timezone)}
        />
        <Button
          text="Convert"
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
          labelText="Result:"
        />
        <div className={styles.buttonsWrapper}>
          <Button
            onClick={copyText}
            type={btnType}
            disabled={text === "" ? true : false}
          />
        </div>
      </div>
    </div>
  );
};
