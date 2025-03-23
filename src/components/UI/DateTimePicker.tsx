import React from "react";
import styles from "./styles.module.scss";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale/ru";

registerLocale("ru", ru);

interface DatePickerProps {
  startDate: Date | null;
  changeDate: (date: Date | null) => void;
}

export const DateTimePicker: React.FC<DatePickerProps> = ({
  startDate,
  changeDate,
}) => {
  return (
    <div>
      <DatePicker
        locale="ru"
        showIcon
        selected={startDate}
        onChange={(date) => changeDate(date)}
        timeInputLabel="Время:"
        dateFormat="dd.MM.yyyy hh:mm:ss"
        showTimeInput
        className={styles.datePicker}
        popperPlacement="bottom-end"
      />
    </div>
  );
};
