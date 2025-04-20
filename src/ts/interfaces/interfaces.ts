import { ChangeEvent, InputHTMLAttributes } from "react";
import { BtnType, Option, ValueType } from "../types/types";
import { PlacesType } from "react-tooltip";

export interface BaseSelectProps {
  options: Option[];
  value: Option;
  handleChange: (value: Option) => void;
}

export interface ButtonProps {
  text?: string;
  disabled?: boolean;
  type: BtnType;
  tooltipPlace?: PlacesType;
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
  handleChange?: (e: string) => void;
}

export interface TextInputProps {
  value: InputHTMLAttributes<HTMLInputElement>["value"];
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  handleChange?: (e: any) => void;
}

export interface DoubleInputProps extends TextInputProps {
  numberKey: number;
  secondValue: string;
  selectValue: ValueType;
  secondPlaceholder?: string;
  handleKeyChange: (itemKey: number, key: string) => void;
  handleValueChange: (itemKey: number, value: string) => void;
  handleTypeChange: (itemKey: number, type: ValueType) => void;
  addInputs: () => void;
  removeInputs: (idx: number) => void;
}

export interface BaseTooltipProps {
  id: string;
  text: string;
  place?: PlacesType;
}
