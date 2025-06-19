import { FC, useState, useEffect } from "react";
import { BtnType } from "../../ts/types/types";
import { Button } from "../UI";
import { copy } from "../../utils";
import styles from "./styles.module.scss";

export const Header: FC = () => {
  const [btnType, setBtnType] = useState<BtnType>("copy");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 1000);
  }, []);

  const currentDate = {
    day: currentTime.getDate(),
    month: currentTime.getMonth() + 1,
    year: currentTime.getFullYear(),
  };

  const currentDateView: string =
    (currentDate.day < 10 ? "0" + currentDate.day : currentDate.day) +
    "." +
    (currentDate.month < 10 ? "0" + currentDate.month : currentDate.month) +
    "." +
    currentDate.year;

  const currentSecondsView: string = Math.round(
    new Date(currentTime.setMilliseconds(0)).valueOf() / 1000
  ).toString();

  return (
    <div className={styles.header}>
      <h1>Utilities</h1>
      <div className={styles.timeWrapper}>
        <div className={styles.wrapper}>
          <span>{currentDateView}</span> {currentTime.toLocaleTimeString()}
        </div>
        <div className={styles.wrapper}>
          {currentSecondsView}
          <div className={styles.buttonsWrapper}>
            <Button
              text="nav"
              type={btnType}
              isTooltip={false}
              onClick={() => copy(currentSecondsView, setBtnType)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
