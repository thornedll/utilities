import { FC, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import classNames from "classnames/bind";
import { BtnType } from "../../ts/types/types";
import { Button } from "../UI";
import { copy } from "../../utils";
import { navigation } from "../../constants";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const Navigation: FC = () => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [btnType, setBtnType] = useState<BtnType>("copy");

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
      <nav className={styles.nav}>
        {navigation.map((link, i) => (
          <div className={styles.navLinkContainer} key={i}>
            <NavLink
              to={link.url}
              className={cx({
                navLink: true,
                navLinkActive: "/" + link.url === location.pathname,
              })}
            >
              {link.visibleName}
            </NavLink>
          </div>
        ))}
      </nav>
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
