import { useState, FC } from "react";
import classNames from "classnames/bind";
import { Option, BtnType } from "../../ts/types/types";
import { BaseSelect, Button, Check, DateTimePicker, TextInput } from "../UI";
import {
  changeIsoFromUnixDateTimezone,
  copy,
  getUnixTimeString,
} from "../../utils";
import { placeholders, timezones } from "../../constants";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const DateConverter: FC = () => {
  // Global states
  const [toUnix, setToUnix] = useState<boolean>(true);
  const [btnType, setBtnType] = useState<BtnType>("copy");
  // ISO -> UNIX states
  const [text, setText] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setMilliseconds(0))
  );
  const [ISOTimezone, setISOTimezone] = useState<Option>(timezones[3]);
  // UNIX -> ISO states
  const [unixDate, setUnixDate] = useState<string>("");
  const [isoFromUnixDate, setIsoFromUnixDate] = useState<string | null>(null);
  const [UNIXTimezone, setUNIXTimezone] = useState<Option>(timezones[0]);

  const convertUnixToIsoDate = (): void => {
    setIsoFromUnixDate(new Date(Number(unixDate) * 1000).toISOString());
    setUNIXTimezone(timezones[0]);
  };

  return (
    <div className={styles.pageWrapper}>
      <h2>Date Converter</h2>
      <div className={styles.optionsWrapper}>
        <div className={styles.hintWrapper}>
          <p>{toUnix ? "ISO" : "UNIX"}</p>
          <p className={styles.hint}>Input</p>
        </div>
        <Check
          checked={toUnix}
          id="toUnix"
          type="arrows"
          handleChange={() => setToUnix(!toUnix)}
        />
        <div className={styles.hintWrapper}>
          <p>{toUnix ? "UNIX" : "ISO"}</p>
          <p className={styles.hint}>Output</p>
        </div>
      </div>
      {toUnix ? (
        <>
          <div className={styles.optionsWrapper}>
            <DateTimePicker
              startDate={startDate}
              changeDate={(date: Date) => setStartDate(date)}
            />
            <BaseSelect
              options={timezones}
              value={ISOTimezone}
              handleChange={(timezone: Option) => setISOTimezone(timezone)}
            />
            <Button
              text="Convert"
              onClick={() =>
                setText(
                  startDate && getUnixTimeString(startDate, ISOTimezone.value)
                )
              }
              type="primary"
            />
          </div>
          <div
            className={styles.resultWrapper}
            style={{ width: "fit-content" }}
          >
            <TextInput
              value={text}
              disabled
              id="resultUNIX"
              labelText="Result:"
            />
            <div className={styles.buttonsWrapper}>
              <Button
                type={btnType}
                disabled={text === ""}
                onClick={() => copy(text, setBtnType)}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.optionsWrapper}>
            <div style={{ position: "relative" }}>
              <TextInput
                value={unixDate}
                handleChange={setUnixDate}
                placeholder={placeholders.DateConverterUNIXTextInput}
              />
              {unixDate && (
                <div className={styles.buttonsWrapper}>
                  <Button type="delete" onClick={() => setUnixDate("")} />
                </div>
              )}
            </div>
            <Button
              text="Convert"
              disabled={!unixDate}
              type="primary"
              onClick={() => convertUnixToIsoDate()}
            />
          </div>
          <div
            className={styles.resultWrapper}
            style={{ width: "fit-content" }}
          >
            <div className={cx({ resultWrapper: 1, "mt-0": 1 })}>
              <TextInput
                value={isoFromUnixDate ? isoFromUnixDate : ""}
                disabled
                id="resultISO"
                labelText="Result:"
                style={{ width: "300px" }}
              />
              <div className={styles.buttonsWrapper}>
                <Button
                  type={btnType}
                  disabled={!isoFromUnixDate}
                  onClick={
                    isoFromUnixDate
                      ? () => copy(isoFromUnixDate, setBtnType)
                      : () => {}
                  }
                />
              </div>
            </div>
            <BaseSelect
              options={timezones}
              value={UNIXTimezone}
              handleChange={
                isoFromUnixDate
                  ? (timezone: Option) =>
                      changeIsoFromUnixDateTimezone(
                        isoFromUnixDate,
                        timezone,
                        setIsoFromUnixDate,
                        setUNIXTimezone
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
