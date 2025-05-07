import { FC } from "react";
import { OptionsWrapperProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const OptionsWrapper: FC<OptionsWrapperProps> = ({
  children,
  headerText = "Options",
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.optionsHeader}>{headerText}</div>
      <div className={styles.options}>{children}</div>
    </div>
  );
};
