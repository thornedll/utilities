import { Dispatch, SetStateAction } from "react";
import _ from "lodash";
import { Option } from "../ts/types/types";
import { months, daysOfWeek } from "../constants";

export {
  randomIntFromInterval,
  randomFractionFromInterval,
  rndRegNumber,
  rndUuid,
} from "./randoms";

export const copy = async (text: string | null) => {
  if (text) {
    await navigator.clipboard.writeText(text);
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
  dateSetter: Dispatch<SetStateAction<string>>,
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

export const getNumberStringWithZero = (numberString: string): string => {
  return Number(numberString) < 10 ? "0" + numberString : numberString;
};

export const parseCronDetail = (cronValue: string, type: string) => {
  const parseText = (value: string): string => {
    if (/^\d{1,2}$/gi.test(value)) {
      if (type === "month") {
        return months[Number(value) - 1].slice(0, 3);
      } else if (type === "dayOfWeek") {
        return daysOfWeek[Number(value) - 1].slice(0, 3);
      } else
        return (
          value +
          (Number(value) === 1
            ? "st"
            : Number(value) === 2
            ? "nd"
            : Number(value) === 3
            ? "rd"
            : "th")
        );
    } else if (/^\*$/gi.test(value)) {
      return "every";
    } else if (/^\*\/\d{1,2}$/gi.test(value)) {
      return (
        "every " +
        value.slice(2) +
        (Number(value.slice(2)) === 1
          ? "st"
          : Number(value.slice(2)) === 2
          ? "nd"
          : Number(value.slice(2)) === 3
          ? "rd"
          : "th")
      );
    } else return "";
  };
  return {
    value: cronValue,
    text: parseText(cronValue),
    type: type.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase(),
  };
};

export const cronTimeReducer = (
  previousValue: string,
  currentValue: string,
  currentIndex: number,
  array: string[]
): string => {
  if (
    /^\d{1,2}$/gi.test(array[0]) &&
    /^\d{1,2}$/gi.test(array[1]) &&
    /^\d{1,2}$/gi.test(array[2])
  ) {
    return (
      "At " +
      getNumberStringWithZero(array[2]) +
      ":" +
      getNumberStringWithZero(array[1]) +
      ":" +
      getNumberStringWithZero(array[0]) +
      ", "
    );
  } else {
    if (/^\d{1,2}$/gi.test(currentValue)) {
      return (
        previousValue +
        `${
          currentIndex === 0
            ? "At " + currentValue + " seconds past the minute, "
            : currentIndex === 1
            ? "at " + currentValue + " minutes past the hour, "
            : "between " +
              getNumberStringWithZero(currentValue) +
              ":00 and " +
              getNumberStringWithZero(currentValue) +
              ":59, "
        }`
      );
    } else if (/^\*$/gi.test(currentValue)) {
      return (
        previousValue +
        `every ${
          currentIndex === 0 ? "second" : currentIndex === 1 ? "minute" : "hour"
        }, `
      );
    } else if (/^\*\/\d{1,2}$/gi.test(currentValue)) {
      return (
        previousValue +
        `every ${currentValue.slice(2)} ${
          currentIndex === 0 ? "second" : currentIndex === 1 ? "minute" : "hour"
        }s, `
      );
    } else return "";
  }
};

export const cronDateReducer = (
  previousValue: string,
  currentValue: string,
  currentIndex: number
): string => {
  const month = months[Number(currentValue) - 1];
  const dayOfWeek = daysOfWeek[Number(currentValue) - 1];

  if (/^\d{1,2}$/gi.test(currentValue)) {
    return (
      previousValue +
      `${
        currentIndex === 0
          ? `on day ${currentValue} of the month, `
          : currentIndex === 1
          ? `only in ${month ? month : "unknown month"}, `
          : currentIndex === 2
          ? `and on ${dayOfWeek ? dayOfWeek : "unknown day of week"}, `
          : `only in ${1900 + Number(currentValue)}`
      }`
    );
  } else if (/^\*$/gi.test(currentValue)) {
    return (
      previousValue +
      `every ${
        currentIndex === 0 || currentIndex === 2
          ? "day"
          : currentIndex === 1
          ? "month"
          : "year"
      }, `
    );
  } else if (/^\*\/\d{1,2}$/gi.test(currentValue)) {
    return (
      previousValue +
      `every ${currentValue.slice(2)} ${
        currentIndex === 0 || currentIndex === 2
          ? "day"
          : currentIndex === 1
          ? "month"
          : "year"
      }s, `
    );
  } else return "";
};
