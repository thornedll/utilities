import { Dispatch, SetStateAction } from "react";
import _ from "lodash";
import { BtnType, Option } from "../ts/types/types";

export {
  randomIntFromInterval,
  randomFractionFromInterval,
  rndRegNumber,
  rndUuid,
} from "./randoms";

export const copy = async (
  text: string | null,
  changeBtnType: Dispatch<SetStateAction<BtnType>>
) => {
  if (text) {
    await navigator.clipboard.writeText(text);
    changeBtnType("success");
    setTimeout(() => changeBtnType("copy"), 1500);
  } else return;
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
    case "rndRuGrz":
      return value;
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
  const timezoneInt = Number(timezone.value);
  const newTimezone = timezone.label === "+00:00" ? "Z" : timezone.label;
  let modifiedIsoDateString = isoDateString;

  modifiedIsoDateString = (
    (new Date(isoDateString).getTime() + timezoneInt * 60 * 60 * 1000) /
    1000
  ).toString();
  const result =
    new Date(Number(modifiedIsoDateString) * 1000).toISOString().split("Z")[0] +
    newTimezone;

  timezoneSetter(timezone);
  dateSetter(result);
};
