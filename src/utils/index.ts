import { Dispatch, SetStateAction } from "react";
import _ from "lodash";
import { BtnType, Option } from "../ts/types/types";

export const copy = async (
  text: string,
  changeBtnType: Dispatch<SetStateAction<BtnType>>
) => {
  await navigator.clipboard.writeText(text);
  changeBtnType("success");
  setTimeout(() => changeBtnType("copy"), 1500);
};

const generateFileName = () => {
  return new Date().toISOString().replace(/[:.]/g, "-");
};

export const downloadFile = (fileString: string, extension: string) => {
  const fileName = generateFileName();
  const blob = new Blob([fileString], {
    type: extension === "json" ? "application/json" : undefined,
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.${extension}`;
  a.click();
  URL.revokeObjectURL(url);
};

export const getUnixTimeString = (date: Date, timezone: string) => {
  const timezoneInt = Number(timezone);
  const localTimezoneOffset = new Date().getTimezoneOffset();
  const negativeLocalTimezoneOffset =
    localTimezoneOffset >= 0
      ? -Math.abs(localTimezoneOffset)
      : Math.abs(localTimezoneOffset);

  return Math.round(
    (date.getTime() +
      negativeLocalTimezoneOffset * 60 * 1000 +
      -timezoneInt * 60 * 60 * 1000) /
      1000
  ).toString();
};

export const convertToUpper = (obj: string): Object => {
  if (_.isArray(obj)) {
    return obj.map(convertToUpper);
  } else if (_.isObject(obj)) {
    return _.mapKeys(_.mapValues(obj, convertToUpper), (value, key) =>
      _.upperFirst(_.camelCase(key))
    );
  }
  return obj;
};

export const updateNestedKey = (
  obj: any,
  keyPath: string,
  newValue: string | number | boolean
): void => {
  const keys = keyPath.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) {
      return; // If key doesn't exist do nothing
    }
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  if (current[lastKey] !== undefined) {
    current[lastKey] = newValue;
  }
};

export const convertValueToType = (value: string, type: string) => {
  switch (type) {
    case "string":
      return value;
    case "number":
      return Number(value);
    case "boolean":
      return value === "true"
        ? true
        : value === "false"
        ? false
        : Boolean(value);
    default:
      return value;
  }
};

export const setFormattedJson = (
  jsonString: string,
  jsonSetter: Dispatch<SetStateAction<string>>
) => {
  jsonSetter(JSON.stringify(JSON.parse(jsonString), null, 2));
};

export const changeIsoFromUnixDateTimezone = (
  isoDateString: string,
  timezone: Option,
  dateSetter: Dispatch<SetStateAction<string | null>>,
  timezoneSetter: Dispatch<SetStateAction<Option>>
): void => {
  timezoneSetter(timezone);
  //! TO DO: Change hours in date with changing timezone
  if (isoDateString.charAt(isoDateString.length - 1) === "Z") {
    if (timezone.label !== "+00:00") {
      dateSetter(isoDateString.split("Z")[0] + timezone.label);
    } else return;
  } else {
    if (timezone.label !== "+00:00") {
      dateSetter(isoDateString.split("+")[0] + timezone.label);
    } else {
      dateSetter(isoDateString.split("+")[0] + "Z");
    }
  }
};
