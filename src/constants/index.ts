import {
  KeyValueChange,
  Option,
  RandomDecimalSettings,
  RandomIntSettings,
} from "../ts/types/types";

export { hints } from "./hints";

export const jsonQueryRegex =
  /^\$(\.{1,2}([a-z]+(\[(\d+|\*|\(@\.length-[1-9]\)|-?\d+:|:-?\d+|\d+,\d+|\?\((@\.[a-z]+((<=?|>=?|==)(\d+(\.\d+)?|".*"))?)( ?&& ?(@\.[a-z]+((<=?|>=?|==)(\d+(\.\d+)?|".*"))?))?\))\])?|\d+|\*))*$/gim;

export const emptyKeyValueObject: KeyValueChange = {
  key: "",
  value: "",
  type: "string",
};

export const defaultIntSettings: RandomIntSettings = {
  min: 0,
  max: 10,
};

export const defaultDecimalSettings: RandomDecimalSettings = {
  min: 0,
  max: 10,
  digits: 2,
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
  { label: "String", value: "string" },
  { label: "Number", value: "number" },
  { label: "Boolean", value: "boolean" },
  { label: "Random RU vehicle registration number", value: "rndRuGrz" },
];

export const baseValueTypes: string[] = ["string", "number", "boolean"];

export const placeholders = {
  Global: {
    OutputTextarea: "Result will appear here",
  },
  DateConverter: {
    UNIXTextInput: "Enter UNIX date",
  },
  JsonQuery: {
    InputTextArea: "Enter JSON to query",
    QueryTextArea: "Enter query",
  },
  JsonConverter: {
    InputTextarea: "Enter JSON to convert",
  },
  JsonDiff: {
    Textarea: "Enter JSON to compare",
  },
  UrlConverter: {
    InputTextarea: "Enter text to convert",
    OutputTextarea: "Result will appear here",
  },
};

export const countries: Option[] = [
  {
    label: "RU",
    value: "ru",
  },
  {
    label: "BY",
    value: "by",
  },
];

export const cronValueTypes: string[] = [
  "second",
  "minute",
  "hour",
  "dayOfMonth",
  "month",
  "dayOfWeek",
  "year",
];

export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const daysOfWeek: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const imageExtensions = [
  "jpg",
  "jpeg",
  "png",
  "bmp",
  "gif",
  "tiff",
  "webp",
];

export const regNumberLetters = {
  ru: ["А", "В", "Е", "К", "М", "Н", "О", "Р", "С", "Т", "У", "Х"],
  by: ["A", "B", "E", "I", "K", "M", "H", "O", "P", "C", "T", "X"],
};

export const regionCodes = [
  "75",
  "74",
  "47",
  "08",
  "161",
  "198",
  "54",
  "142",
  "163",
  "99",
  "159",
  "55",
  "154",
  "19",
  "186",
  "30",
  "44",
  "58",
  "173",
  "190",
  "86",
  "05",
  "28",
  "62",
  "72",
  "79",
  "113",
  "196",
  "49",
  "56",
  "197",
  "43",
  "52",
  "763",
  "750",
  "50",
  "68",
  "164",
  "82",
  "174",
  "725",
  "116",
  "178",
  "36",
  "83",
  "150",
  "70",
  "17",
  "31",
  "123",
  "61",
  "12",
  "59",
  "152",
  "90",
  "96",
  "66",
  "20",
  "67",
  "48",
  "93",
  "136",
  "777",
  "46",
  "15",
  "33",
  "124",
  "02",
  "60",
  "09",
  "63",
  "37",
  "177",
  "126",
  "716",
  "64",
  "77",
  "138",
  "57",
  "89",
  "97",
  "26",
  "73",
  "65",
  "51",
  "21",
  "277",
  "41",
  "199",
  "92",
  "24",
  "797",
  "799",
  "121",
  "790",
  "34",
  "03",
  "40",
  "13",
  "29",
  "98",
  "16",
  "35",
  "04",
  "134",
  "761",
  "14",
  "95",
  "53",
  "71",
  "10",
  "27",
  "69",
  "07",
  "42",
  "102",
  "76",
  "45",
  "06",
  "125",
  "78",
  "38",
  "25",
  "39",
  "87",
  "23",
  "32",
  "11",
  "299",
  "22",
  "77",
  "18",
  "94",
];
