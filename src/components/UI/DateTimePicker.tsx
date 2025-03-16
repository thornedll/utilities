import React, { useState } from "react";
import styles from "./styles.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {}

const DateTimePicker: React.FC<DatePickerProps> = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const handleChange = (date: Date | null) => {
    setDate(date);
  };

  return (
    <DatePicker
      locale="ru"
      // showIcon
      selected={date}
      onChange={handleChange} //only when value has changed
      timeInputLabel="Время:"
      dateFormat="dd.MM.yyyy hh:mm:ss"
      showTimeInput
    />
  );
};

export default DateTimePicker;
