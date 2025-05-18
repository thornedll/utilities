import {
  ChangeEvent,
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { BtnSubType, BtnType, Option, ValueType } from "../types/types";
import { PlacesType } from "react-tooltip";

export interface IBaseSelectProps {
  disabled?: boolean;
  options: Option[];
  value?: Option;
  width?: string | number;
  handleChange: (value: Option) => void;
}

export interface IButtonProps {
  text?: string;
  disabled?: boolean;
  type: BtnType;
  subType?: BtnSubType[];
  isTooltip?: boolean;
  tooltipText?: string | ReactNode;
  tooltipPlace?: PlacesType;
  onClick: () => void;
}

export interface ICheckProps {
  checked: boolean;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  style?: CSSProperties;
  type?: "switch" | "arrows";
  handleChange: (state: boolean) => void;
}

export interface IDatePickerProps {
  startDate: Date | null;
  changeDate: (date: Date) => void;
}

export interface IDiffResult {
  key: string;
  value1: string | number | boolean | undefined;
  value2: string | number | boolean | undefined;
}

export interface IFileInputProps {
  id?: string;
  labelText?: string;
  disabled?: boolean;
  accept?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ITextAreaProps {
  value: InputHTMLAttributes<HTMLInputElement>["value"];
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  readOnly: boolean;
  handleChange?: (e: string) => void;
}

export interface ITextInputProps {
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  value: InputHTMLAttributes<HTMLInputElement>["value"];
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  pattern?: InputHTMLAttributes<HTMLInputElement>["pattern"];
  max?: InputHTMLAttributes<HTMLInputElement>["max"];
  style?: CSSProperties;
  handleChange?: (e: string) => void;
}

export interface IDoubleInputProps extends ITextInputProps {
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

export interface IBaseTooltipProps {
  id: string;
  place?: PlacesType;
  children: ReactNode;
}

export interface IOptionsWrapperProps {
  headerText?: string;
  helpText?: string;
  children?: ReactNode;
}

export interface ISVGSpriteProps {
  id: string;
  viewBox?: string;
  width?: string;
  height?: string;
  fill?: string;
}
