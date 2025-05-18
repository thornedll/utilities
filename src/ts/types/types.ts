import { ReactNode } from "react";

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

type PageData = {
  url: string;
  visibleName: string;
  component: ReactNode;
};

export type PagesData = PageData[];

export type Option = {
  label: string;
  value: string | ValueType;
};

export type RandomIntSettings = {
  min: number;
  max: number;
};

export type RandomDecimalSettings = RandomIntSettings & {
  digits: number;
};
