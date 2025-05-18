import { FC } from "react";
import Select, { StylesConfig } from "react-select";
import { IBaseSelectProps } from "../../ts/interfaces/interfaces";
import styles from "./styles.module.scss";

export const BaseSelect: FC<IBaseSelectProps> = ({
  disabled = false,
  options,
  value,
  width = "100%",
  handleChange,
}) => {
  const selectStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      minHeight: "32px",
      maxHeight: "32px",
      width: width,
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
    menu: (styles) => ({
      ...styles,
      margin: "4px 0",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: "0 8px",
    }),
  };

  const onChange = (value: any) => {
    handleChange(value);
  };

  return (
    <Select
      styles={selectStyles}
      options={options}
      className={styles.select}
      value={value}
      onChange={onChange}
      isDisabled={disabled}
    ></Select>
  );
};
