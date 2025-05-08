import { FC } from "react";
import { Tooltip } from "react-tooltip";
import { BaseTooltipProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const BaseTooltip: FC<BaseTooltipProps> = ({ id, place, children }) => {
  return (
    <>
      <Tooltip id={id} className={styles.tooltip} place={place} offset={5}>
        {children}
      </Tooltip>
    </>
  );
};
