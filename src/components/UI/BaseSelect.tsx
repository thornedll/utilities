import React from "react";
import Select from "react-select";
import styles from "./styles.module.scss";

type Options = {
  label: String;
  value: String;
};

interface BaseSelectProps {
  options: Options[];
}

export const BaseSelect: React.FC<BaseSelectProps> = ({ options }) => {
  return (
    <Select
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          minHeight: "30px",
          maxHeight: "30px",
          alignContent: "center",
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
        indicatorsContainer: (baseStyles) => ({
          ...baseStyles,
          // padding: "0 8px",
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          padding: "0 8px",
        }),
      }}
      options={options}
      className={styles.select}
    ></Select>
  );
};
