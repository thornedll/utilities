export type BtnType =
  | "copy"
  | "download"
  | "success"
  | "primary"
  | "add"
  | "remove"
  | "format"
  | "delete"
  | "help";

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
