import { FC } from "react";
import classNames from "classnames/bind";
import { IButtonProps } from "../../ts/interfaces/interfaces";
import { BaseTooltip, SVGSprite } from "./";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const Button: FC<IButtonProps> = ({
  text = "",
  disabled = false,
  type,
  subType,
  isTooltip = true,
  tooltipText,
  tooltipPlace = "top",
  onClick,
}) => {
  const btnClass = cx({
    btnPrimary: type === "primary",
    btnIcon: type !== "primary",
    btnControl: type === "add" || type === "remove",
    btnOutline: subType?.includes("outline"),
    btnClear: subType?.includes("clear"),
  });

  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={btnClass}
        data-tooltip-id={type + text}
      >
        {type === "primary" && text}
        {type !== "primary" && (
          <SVGSprite
            id={type}
            fill={type === "success" ? "#4cba00" : "currentColor"}
            width={type === "help" ? "14" : "16"}
            height={type === "help" ? "14" : "16"}
          />
        )}
      </button>
      {type !== "primary" && disabled === false && isTooltip === true && (
        <BaseTooltip id={type + text} place={tooltipPlace}>
          {tooltipText ? tooltipText : type}
        </BaseTooltip>
      )}
    </>
  );
};
