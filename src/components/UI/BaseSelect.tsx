import React from "react";
import Select, { StylesConfig } from "react-select";
import styles from "./styles.module.scss";

type Option = {
  label: String;
  value: String;
};

interface BaseSelectProps {
  options: Option[];
  defaultValue: Option;
}

const selectStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    minHeight: "31px",
    maxHeight: "31px",
    alignContent: "center",
    fontSize: "14px",
    fontFamily: "Arial",
    cursor: "pointer",
  }),
  menuList: (styles) => ({
    ...styles,
    fontSize: "14px",
    fontFamily: "Arial",
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
  defaultValue,
}) => {
  return (
    <Select
      styles={selectStyles}
      options={options}
      className={styles.select}
      defaultValue={defaultValue}
    ></Select>
  );
};
