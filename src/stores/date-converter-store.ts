import { create } from "zustand";
import { Option } from "../ts/types/types";
import { timezones } from "../constants";

type DateConverterStates = {
  toUnix: boolean;
  isoToUnix: {
    date: Date;
    timezone: Option;
    result: string;
  };
  unixToIso: {
    date: string;
    timezone: Option;
    result: string;
  };
};

type DateConverterActions = {
  toggleToUnix: () => void;
  isoToUnix: {
    setDate: (date: Date) => void;
    setTimezone: (timezone: Option) => void;
    setResult: (result: string) => void;
  };
  unixToIso: {
    setDate: (date: string) => void;
    setTimezone: (timezone: Option) => void;
    setResult: (result: string) => void;
  };
};

export const useDateConverterStore = create<
  DateConverterStates & DateConverterActions
>((set) => ({
  toUnix: true,
  toggleToUnix: () => set((state) => ({ toUnix: !state.toUnix })),
  isoToUnix: {
    date: new Date(new Date().setMilliseconds(0)),
    timezone: timezones[3],
    result: "",
    setDate: (date) =>
      set((state) => ({
        ...state,
        isoToUnix: { ...state.isoToUnix, date: date },
      })),
    setTimezone: (timezone) =>
      set((state) => ({
        ...state,
        isoToUnix: { ...state.isoToUnix, timezone: timezone },
      })),
    setResult: (result) =>
      set((state) => ({
        ...state,
        isoToUnix: { ...state.isoToUnix, result: result },
      })),
  },
  unixToIso: {
    date: "",
    timezone: timezones[0],
    result: "",
    setDate: (date) =>
      set((state) => ({
        ...state,
        unixToIso: { ...state.unixToIso, date: date },
      })),
    setTimezone: (timezone) =>
      set((state) => ({
        ...state,
        unixToIso: { ...state.unixToIso, timezone: timezone },
      })),
    setResult: (result) =>
      set((state) => ({
        ...state,
        unixToIso: { ...state.unixToIso, result: result },
      })),
  },
}));
