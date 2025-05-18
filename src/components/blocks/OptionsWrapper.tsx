import { FC } from "react";
import { IOptionsWrapperProps } from "../../ts/interfaces/interfaces";
import { Button } from "../UI";
import styles from "./styles.module.scss";

export const OptionsWrapper: FC<IOptionsWrapperProps> = ({
  headerText = "Options",
  helpText = "",
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.optionsHeader}>
        <h3>{headerText}</h3>
        <Button
          type="help"
          onClick={() => {}}
          tooltipText={
            <div
              dangerouslySetInnerHTML={{
                __html: helpText,
              }}
            ></div>
          }
        />
      </div>
      <div className={styles.options}>{children}</div>
    </div>
  );
};
