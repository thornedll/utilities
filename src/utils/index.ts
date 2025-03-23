export const getUnixTimeString = (date: Date, timezone: string) => {
  return Math.round(date.getTime() / 1000).toString();
};
