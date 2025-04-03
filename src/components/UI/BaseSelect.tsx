import React from "react";
import Select, { StylesConfig } from "react-select";
import { BaseSelectProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

const selectStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    minHeight: "32px",
    maxHeight: "32px",
    alignContent: "center",
    fontSize: "16px",
    fontFamily: "Inter",
    cursor: "pointer",
    borderRadius: "6px",
  }),
  menuList: (styles) => ({
    ...styles,
    fontSize: "16px",
    fontFamily: "Inter",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: "0 8px",
  }),
};

export const BaseSelect: React.FC<BaseSelectProps> = ({
  options,
  value,
  changeTimezone,
}) => {
  return (
    <Select
      styles={selectStyles}
      options={options}
      className={styles.select}
      value={value}
      onChange={(timezone: any) => changeTimezone(timezone)}
    ></Select>
  );
};
