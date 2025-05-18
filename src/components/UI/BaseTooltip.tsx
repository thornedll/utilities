import { FC } from "react";
import { Tooltip } from "react-tooltip";
import { IBaseTooltipProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const BaseTooltip: FC<IBaseTooltipProps> = ({ id, place, children }) => {
  return (
    <>
      <Tooltip id={id} className={styles.tooltip} place={place} offset={5}>
        {children}
      </Tooltip>
    </>
  );
};
