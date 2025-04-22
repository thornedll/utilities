import { FC } from "react";
import { Tooltip } from "react-tooltip";
import { BaseTooltipProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const BaseTooltip: FC<BaseTooltipProps> = ({
  id,
  text,
  place,
}) => {
  return (
    <>
      <Tooltip
        id={id}
        content={text}
        className={styles.tooltip}
        place={place}
        offset={5}
      />
    </>
  );
};
