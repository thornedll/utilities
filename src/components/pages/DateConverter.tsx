import { DateTimePicker, BaseSelect } from "../UI";
import styles from "./styles.module.scss";

const timezones = [
  { label: "+00:00", value: "00" },
  { label: "+01:00", value: "01" },
  { label: "+02:00", value: "02" },
  { label: "+03:00", value: "03" },
];

export const DateConverter = () => {
  return (
    <>
      <h2>Конвертер дат UNIX-ISO</h2>
      <div className={styles.optionsWrapper}>
        <DateTimePicker />
        <BaseSelect options={timezones} />
      </div>
    </>
  );
};
