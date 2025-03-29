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
