import _ from "lodash";

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
