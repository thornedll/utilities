import { FC } from "react";
import classNames from "classnames/bind";
import { ButtonProps } from "../../ts/interfaces/interfaces";
import { BaseTooltip, SVGSprite } from "./";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const Button: FC<ButtonProps> = ({
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
    btnPrimaryIcon: type === "primary" && subType?.includes("icon"),
    btnIcon: type !== "primary",
    btnControl: type === "add" || type === "remove",
    btnOutline: subType?.includes("outline"),
    btnOutlineRed: subType?.includes("outline-red"),
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
        {subType?.includes("icon") && <SVGSprite id="chevron-right" />}
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
