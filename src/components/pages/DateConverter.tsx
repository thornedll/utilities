import { DateTimePicker, BaseSelect, Button, TextInput } from "../UI";
import styles from "./styles.module.scss";
import { timezones } from "../../constants";

export const DateConverter = () => {
  return (
    <>
      <h2>Конвертер дат ISO-UNIX</h2>
      <div className={styles.optionsWrapper}>
        <DateTimePicker />
        <BaseSelect options={timezones} defaultValue={timezones[3]} />
        <Button text="Конвертировать" onClick={() => {}} />
      </div>
      <div className={styles.resultWrapper}>
        <TextInput placeholder="Результат" inputValue="111233" disabled />
      </div>
    </>
  );
};
