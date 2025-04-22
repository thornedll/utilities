import { KeyValueChange, Option } from "../ts/types/types";

export const emptyKeyValueObject: KeyValueChange = {
  key: "",
  value: "",
  type: "string",
};

export const timezones: Option[] = [
  { label: "+00:00", value: "+00" },
  { label: "+01:00", value: "+01" },
  { label: "+02:00", value: "+02" },
  { label: "+03:00", value: "+03" },
  { label: "+04:00", value: "+04" },
  { label: "+05:00", value: "+05" },
  { label: "+06:00", value: "+06" },
  { label: "+07:00", value: "+07" },
  { label: "+08:00", value: "+08" },
  { label: "+09:00", value: "+09" },
  { label: "+10:00", value: "+10" },
  { label: "+11:00", value: "+11" },
  { label: "+12:00", value: "+12" },
];

export const valueTypes: Option[] = [
  { label: "string", value: "string" },
  { label: "number", value: "number" },
  { label: "boolean", value: "boolean" },
];

export const placeholders = {
  DateConverterUNIXTextInput: "Enter UNIX date",
  JsonConverterTextarea: "Enter JSON to convert",
  JsonDiffTextarea: "Enter JSON to compare",
};
