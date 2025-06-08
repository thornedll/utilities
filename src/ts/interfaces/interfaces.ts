import {
  ChangeEvent,
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { BtnSubType, BtnType, Option, ValueType } from "../types/types";
import { PlacesType } from "react-tooltip";

export interface BaseSelectProps {
  disabled?: boolean;
  options: Option[];
  value?: Option;
  width?: string | number;
  handleChange: (value: Option) => void;
}

export interface ButtonProps {
  text?: string;
  disabled?: boolean;
  type: BtnType;
  subType?: BtnSubType[];
  isTooltip?: boolean;
  tooltipText?: string | ReactNode;
  tooltipPlace?: PlacesType;
  onClick: () => void;
}

export interface CheckProps {
  checked: boolean;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  style?: CSSProperties;
  type?: "switch" | "arrows";
  handleChange: (state: boolean) => void;
}

export interface DatePickerProps {
  startDate: Date | null;
  changeDate: (date: Date) => void;
}

export interface DiffResult {
  key: string;
  value1: string | number | boolean | undefined;
  value2: string | number | boolean | undefined;
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
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  value: InputHTMLAttributes<HTMLInputElement>["value"];
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  pattern?: InputHTMLAttributes<HTMLInputElement>["pattern"];
  max?: InputHTMLAttributes<HTMLInputElement>["max"];
  maxLength?: InputHTMLAttributes<HTMLInputElement>["maxLength"];
  style?: CSSProperties;
  handleChange?: (e: string) => void;
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
  place?: PlacesType;
  children: ReactNode;
}

export interface OptionsWrapperProps {
  headerText?: string;
  helpText?: string;
  children?: ReactNode;
}

export interface SVGSpriteProps {
  id: string;
  viewBox?: string;
  width?: string;
  height?: string;
  fill?: string;
}
