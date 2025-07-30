import { FC, useState } from "react";
import classNames from "classnames/bind";
import { Option, BtnType } from "../../ts/types/types";
import { BaseSelect, Button, Check, DateTimePicker, TextInput } from "../UI";
import { OptionsWrapper } from "../blocks";
import {
  changeIsoFromUnixDateTimezone,
  copy,
  getUnixTimeString,
} from "../../utils";
import { hints, placeholders, timezones } from "../../constants";
import styles from "./styles.module.scss";
import { useDateConverterStore } from "../../stores";

const cx = classNames.bind(styles);

export const DateConverter: FC = () => {
  const toUnix = useDateConverterStore((state) => state.toUnix);
  const toggleToUnix = useDateConverterStore((state) => state.toggleToUnix);
  const isoToUnix = {
    date: useDateConverterStore((state) => state.isoToUnix.date),
    timezone: useDateConverterStore((state) => state.isoToUnix.timezone),
    result: useDateConverterStore((state) => state.isoToUnix.result),
    setDate: useDateConverterStore((state) => state.isoToUnix.setDate),
    setTimezone: useDateConverterStore((state) => state.isoToUnix.setTimezone),
    setResult: useDateConverterStore((state) => state.isoToUnix.setResult),
  };
  const unixToIso = {
    date: useDateConverterStore((state) => state.unixToIso.date),
    timezone: useDateConverterStore((state) => state.unixToIso.timezone),
    result: useDateConverterStore((state) => state.unixToIso.result),
    setDate: useDateConverterStore((state) => state.unixToIso.setDate),
    setTimezone: useDateConverterStore((state) => state.unixToIso.setTimezone),
    setResult: useDateConverterStore((state) => state.unixToIso.setResult),
  };
  const [btnType, setBtnType] = useState<BtnType>("copy");

  const copyText = (text: string) => {
    copy(text);
    setBtnType("success");
    setTimeout(() => setBtnType("copy"), 1500);
  };

  const handleUnixDate = (newDate: string): void => {
    unixToIso.setDate(newDate);
  };

  const convertUnixToIsoDate = (): void => {
    if (!isNaN(Number(unixToIso.date))) {
      unixToIso.setResult(
        new Date(Number(unixToIso.date) * 1000).toISOString()
      );
      unixToIso.setTimezone(timezones[0]);
    } else return;
  };

  const convertIsoToUnixDate = (): void => {
    isoToUnix.setResult(
      isoToUnix.date &&
        getUnixTimeString(isoToUnix.date, isoToUnix.timezone.value)
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <h2>Date Converter</h2>
      <div className={styles.optionsWrapper}>
        <div className={styles.hintWrapper}>
          <p>{toUnix ? "ISO" : "UNIX"}</p>
          <p className={styles.hint}>{hints.Global.Input}</p>
        </div>
        <Check
          checked={toUnix}
          id="toUnix"
          type="arrows"
          handleChange={toggleToUnix}
        />
        <div className={styles.hintWrapper}>
          <p style={{ fontWeight: "600" }}>{toUnix ? "UNIX" : "ISO"}</p>
          <p className={styles.hint}>{hints.Global.Output}</p>
        </div>
      </div>
      {toUnix ? (
        <>
          <OptionsWrapper helpText={hints.DateConverter.ISOToUnixHelp}>
            <div className={cx({ optionsWrapper: 1, "mt-0": 1 })}>
              <DateTimePicker
                startDate={isoToUnix.date}
                changeDate={(date: Date) => isoToUnix.setDate(date)}
              />
              <BaseSelect
                options={timezones}
                value={isoToUnix.timezone}
                handleChange={isoToUnix.setTimezone}
              />
              <Button
                text={hints.Global.ConvertFile}
                type="primary"
                subType={["icon"]}
                onClick={convertIsoToUnixDate}
              />
            </div>
          </OptionsWrapper>
          <div
            className={cx({ resultWrapper: 1, "w-fc": 1, "align-center": 1 })}
          >
            <TextInput
              value={isoToUnix.result}
              disabled
              id="resultUNIX"
              labelText="Result"
            />
            <div className={styles.buttonsWrapper}>
              <Button
                type={btnType}
                disabled={isoToUnix.result === ""}
                onClick={() => copyText(isoToUnix.result)}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <OptionsWrapper helpText={hints.DateConverter.UnixToISOHelp}>
            <div className={cx({ optionsWrapper: 1, "mt-0": 1 })}>
              <div style={{ position: "relative" }}>
                <TextInput
                  placeholder={placeholders.DateConverter.UNIXTextInput}
                  value={unixToIso.date}
                  handleChange={handleUnixDate}
                />
                {unixToIso.date && (
                  <div className={styles.buttonsWrapper}>
                    <Button type="delete" onClick={() => handleUnixDate("")} />
                  </div>
                )}
              </div>
              <Button
                text={hints.Global.ConvertFile}
                disabled={!unixToIso.date || isNaN(Number(unixToIso.date))}
                type="primary"
                subType={["icon"]}
                onClick={convertUnixToIsoDate}
              />
            </div>
          </OptionsWrapper>
          <div
            className={cx({ resultWrapper: 1, "w-fc": 1, "align-center": 1 })}
          >
            <div className={cx({ resultWrapper: 1, "mt-0": 1 })}>
              <TextInput
                value={unixToIso.result ? unixToIso.result : ""}
                disabled
                id="resultISO"
                labelText="Result"
                maxLength={12}
                style={{ width: "300px" }}
              />
              <div className={styles.buttonsWrapper}>
                <Button
                  type={btnType}
                  disabled={!unixToIso.result}
                  onClick={() => copyText(unixToIso.result)}
                />
              </div>
            </div>
            <BaseSelect
              disabled={!unixToIso.result}
              options={timezones}
              value={unixToIso.timezone}
              handleChange={
                unixToIso.result
                  ? (timezone: Option) =>
                      changeIsoFromUnixDateTimezone(
                        unixToIso.result,
                        timezone,
                        unixToIso.setResult,
                        unixToIso.setTimezone
                      )
                  : () => {}
              }
            />
          </div>
        </>
      )}
    </div>
  );
};
