import { ReactNode } from "react";
import { cronValueTypes } from "../../constants";

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

export type BtnSubType = "outline" | "clear" | `outline-${string}` | "icon";

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

export type CronValueType = (typeof cronValueTypes)[number];

export type CronTypeDetail = {
  [value: string]: string;
  text: string;
  type: CronValueType;
};

export type CronDetails = CronTypeDetail[];

export type RandomIntSettings = {
  min: number;
  max: number;
};

export type RandomDecimalSettings = RandomIntSettings & {
  digits: number;
};
