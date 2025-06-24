import { FC } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { hints } from "../../constants";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const NotFound: FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <h2>{hints.NotFound.Header}</h2>
      <p className={cx({ linkContainer: 1, "mt-12": 1 })}>
        <Link to="/">{hints.NotFound.BackToIndex}</Link>
      </p>
    </div>
  );
};
