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

const cx = classNames.bind(styles);

export const DateConverter: FC = () => {
  //* Global states
  const [toUnix, setToUnix] = useState<boolean>(true);
  const [btnType, setBtnType] = useState<BtnType>("copy");
  //* ISO -> UNIX states
  const [unixResult, setUnixResult] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setMilliseconds(0))
  );
  const [isoTimezone, setIsoTimezone] = useState<Option>(timezones[3]);
  //* UNIX -> ISO states
  const [unixDate, setUnixDate] = useState<string>("");
  const [isoResult, setIsoResult] = useState<string>("");
  const [unixTimezone, setUnixTimezone] = useState<Option>(timezones[0]);

  const copyText = (text: string) => {
    copy(text);
    setBtnType("success");
    setTimeout(() => setBtnType("copy"), 1500);
  };

  const handleUnixDate = (newDate: string): void => {
    setUnixDate(newDate);
  };

  const convertUnixToIsoDate = (): void => {
    if (!isNaN(Number(unixDate))) {
      setIsoResult(new Date(Number(unixDate) * 1000).toISOString());
      setUnixTimezone(timezones[0]);
    } else return;
  };

  const convertIsoToUnixDate = (): void => {
    setUnixResult(startDate && getUnixTimeString(startDate, isoTimezone.value));
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
          handleChange={() => setToUnix(!toUnix)}
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
                startDate={startDate}
                changeDate={(date: Date) => setStartDate(date)}
              />
              <BaseSelect
                options={timezones}
                value={isoTimezone}
                handleChange={(timezone: Option) => setIsoTimezone(timezone)}
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
              value={unixResult}
              disabled
              id="resultUNIX"
              labelText="Result"
            />
            <div className={styles.buttonsWrapper}>
              <Button
                type={btnType}
                disabled={unixResult === ""}
                onClick={() => copyText(unixResult)}
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
                  value={unixDate}
                  handleChange={handleUnixDate}
                />
                {unixDate && (
                  <div className={styles.buttonsWrapper}>
                    <Button type="delete" onClick={() => handleUnixDate("")} />
                  </div>
                )}
              </div>
              <Button
                text={hints.Global.ConvertFile}
                disabled={!unixDate || isNaN(Number(unixDate))}
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
                value={isoResult ? isoResult : ""}
                disabled
                id="resultISO"
                labelText="Result"
                maxLength={12}
                style={{ width: "300px" }}
              />
              <div className={styles.buttonsWrapper}>
                <Button
                  type={btnType}
                  disabled={!isoResult}
                  onClick={() => copyText(isoResult)}
                />
              </div>
            </div>
            <BaseSelect
              disabled={!isoResult}
              options={timezones}
              value={unixTimezone}
              handleChange={
                isoResult
                  ? (timezone: Option) =>
                      changeIsoFromUnixDateTimezone(
                        isoResult,
                        timezone,
                        setIsoResult,
                        setUnixTimezone
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
