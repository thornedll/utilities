import { KeyValueChange, Option } from "../ts/types/types";

export const navigation = [
  {
    url: "utilities/",
    visibleName: "Date Converter",
  },
  {
    url: "utilities/jsonConverter",
    visibleName: "JSON Converter",
  },
  {
    url: "utilities/jsonDiff",
    visibleName: "JSON Difference",
  },
];

export const emptyKeyValueObject: KeyValueChange = {
  key: "",
  value: "",
  type: "string",
};

export const timezones: Option[] = [
  { label: "+00:00", value: "+0" },
  { label: "+01:00", value: "+1" },
  { label: "+02:00", value: "+2" },
  { label: "+03:00", value: "+3" },
  { label: "+04:00", value: "+4" },
  { label: "+05:00", value: "+5" },
  { label: "+06:00", value: "+6" },
  { label: "+07:00", value: "+7" },
  { label: "+08:00", value: "+8" },
  { label: "+09:00", value: "+9" },
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
  DateConverter: {
    UNIXTextInput: "Enter UNIX date",
  },
  JsonConverter: {
    InputTextarea: "Enter JSON to convert",
    OutputTextarea: "Here will be the result",
  },
  JsonDiff: {
    Textarea: "Enter JSON to compare",
  },
};

export const hints = {
  DateConverter: {
    Input: "Input",
    Output: "Output",
  },
  JsonConverter: {
    UploadFile: "* or fill in the field below",
  },
  JsonDiff: {
    NoDifference: "No difference yet...",
  },
};
