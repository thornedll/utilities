import { ChangeEvent, InputHTMLAttributes } from "react";
import { Option } from "../types/types";

export interface BaseSelectProps {
  options: Option[];
  value: Option;
  changeTimezone: (timezone: Option) => void;
}

export interface ButtonProps {
  text?: string;
  disabled?: boolean;
  type: string;
  onClick: () => void;
}

export interface CheckProps {
  checked: boolean;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  handleChange: (state: boolean) => void;
}

export interface DatePickerProps {
  startDate: Date | null;
  changeDate: (date: Date | null) => void;
}

export interface FileInputProps {
  id?: string;
  labelText?: string;
  disabled?: boolean;
  accept?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface TextAreaProps {
  value: InputHTMLAttributes<HTMLInputElement>["value"];
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  readOnly: boolean;
  handleChange?: () => void;
}

export interface TextInputProps {
  inputValue: string; // InputHTMLAttributes<HTMLInputElement>["value"]
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  handleChange?: () => void;
}

export interface DoubleInputProps extends TextInputProps {
  key: string;
  numberKey: number;
  secondInputValue: string;
  secondPlaceholder?: string;
  handleInputsChange: (itemKey: number, key?: string, value?: string) => void;
}
