export type BtnType =
  | "primary"
  | "copy"
  | "download"
  | "success"
  | "add"
  | "remove"
  | "format"
  | "delete"
  | "help"
  | "update";

export type BtnSubType = "outline" | "clear";

export type ValueType = "string" | "number" | "boolean";

export type KeyValueChange = {
  key: string;
  value: string;
  type: ValueType;
};

export type Option = {
  label: string;
  value: string | ValueType;
};
