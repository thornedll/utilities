import { Dispatch, FC, SetStateAction, useState } from "react";
import classNames from "classnames/bind";
import { BaseSelect, Button, TextInput } from "../UI";
import {
  BtnType,
  Option,
  RandomDecimalSettings,
  RandomIntSettings,
} from "../../ts/types/types";
import {
  hints,
  defaultIntSettings,
  defaultDecimalSettings,
  countries,
} from "../../constants";
import {
  copy,
  randomFractionFromInterval,
  randomIntFromInterval,
  rndRegNumber,
  rndUuid,
} from "../../utils";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const RandomGenerators: FC = () => {
  //* Global
  const [grzBtnType, setGrzBtnType] = useState<BtnType>("copy");
  const [uuidBtnType, setUuidBtnType] = useState<BtnType>("copy");
  const [intBtnType, setIntBtnType] = useState<BtnType>("copy");
  const [decimalBtnType, setDecimalBtnType] = useState<BtnType>("copy");

  const copyText = (
    text: string,
    changeBtnType: Dispatch<SetStateAction<BtnType>>
  ) => {
    copy(text);
    changeBtnType("success");
    setTimeout(() => changeBtnType("copy"), 1500);
  };

  //* Strings
  const [grzCountry, setGrzCountry] = useState<Option>(countries[0]);
  const [grz, setGrz] = useState<string>(rndRegNumber("ru"));
  const [uuid, setUuid] = useState<string>(rndUuid());

  const changeGrz = (): void => {
    setGrz(rndRegNumber(grzCountry.value));
  };
  const changeCountry = (country: Option): void => {
    setGrzCountry(country);
    setGrz(rndRegNumber(country.value));
  };
  const changeUuid = (): void => {
    setUuid(rndUuid());
  };

  //* Numbers
  const [intSettings, setIntSettings] =
    useState<RandomIntSettings>(defaultIntSettings);
  const [decimalSettings, setDecimalSettings] = useState<RandomDecimalSettings>(
    defaultDecimalSettings
  );
  const [int, setInt] = useState<number>(
    randomIntFromInterval(intSettings.min, intSettings.max)
  );
  const [decimal, setDecimal] = useState<number>(
    randomFractionFromInterval(
      decimalSettings.min,
      decimalSettings.max,
      decimalSettings.digits
    )
  );

  const changeIntSettings = (min: number, max: number): void => {
    setIntSettings({ min, max });
    setInt(randomIntFromInterval(min, max));
  };
  const changeDecimalSettings = (
    min: number,
    max: number,
    digits: number
  ): void => {
    setDecimalSettings({ min, max, digits });
    setDecimal(randomFractionFromInterval(min, max, digits));
  };
  const changeInt = (): void => {
    setInt(randomIntFromInterval(intSettings.min, intSettings.max));
  };
  const changeDecimal = (): void => {
    setDecimal(
      randomFractionFromInterval(
        decimalSettings.min,
        decimalSettings.max,
        decimalSettings.digits
      )
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <h2>Random Generators</h2>
      <h4 className={styles["mt-12"]}>{hints.RandomGenerators.StringHeader}</h4>
      <div className={styles.optionsWrapper}>
        <div className={styles.singleInputWrapper}>
          <TextInput
            value={grz}
            disabled
            id="grz"
            labelText={hints.RandomGenerators.StringGenerators.Grz}
            style={{ width: "170px" }}
          />
          <div className={styles.buttonsWrapper}>
            <Button
              text="copyGrz"
              type={grzBtnType}
              tooltipPlace="top"
              onClick={() => copyText(grz, setGrzBtnType)}
            />
            <Button type="update" tooltipPlace="top" onClick={changeGrz} />
          </div>
        </div>
        <div>
          <BaseSelect
            options={countries}
            value={grzCountry}
            handleChange={changeCountry}
          />
        </div>
      </div>
      <div className={styles.optionsWrapper}>
        <div className={styles.singleInputWrapper}>
          <TextInput
            value={uuid}
            disabled
            id="uuid"
            labelText={hints.RandomGenerators.StringGenerators.Uuid}
            style={{ width: "430px" }}
          />
          <div className={styles.buttonsWrapper}>
            <Button
              text="copyUuid"
              type={uuidBtnType}
              tooltipPlace="top"
              onClick={() => copyText(uuid, setUuidBtnType)}
            />
            <Button type="update" tooltipPlace="top" onClick={changeUuid} />
          </div>
        </div>
      </div>
      <h4 className={styles["mt-12"]}>{hints.RandomGenerators.NumberHeader}</h4>
      <div className={styles.optionsGridWrapper}>
        <div className={styles.singleInputWrapper}>
          <TextInput
            type="number"
            value={int}
            disabled
            id="int"
            labelText={hints.RandomGenerators.NumberGenerators.Integer}
            style={{ width: "100%" }}
          />
          <div className={styles.buttonsWrapper}>
            <Button
              text="copyInt"
              type={intBtnType}
              tooltipPlace="top"
              onClick={() => copyText(int.toString(), setIntBtnType)}
            />
            <Button type="update" tooltipPlace="top" onClick={changeInt} />
          </div>
        </div>
        <div className={cx({ optionsWrapper: 1, "mt-0": 1 })}>
          <TextInput
            type="number"
            value={intSettings.min}
            id="intBorderMin"
            labelText="From"
            style={{ width: "90px" }}
            handleChange={(e) => changeIntSettings(Number(e), intSettings.max)}
          />
          <TextInput
            type="number"
            value={intSettings.max}
            id="intBorderMax"
            labelText="To"
            style={{ width: "90px" }}
            handleChange={(e) => changeIntSettings(intSettings.min, Number(e))}
          />
        </div>
        <div className={styles.singleInputWrapper}>
          <TextInput
            type="number"
            value={decimal}
            disabled
            id="decimal"
            labelText={hints.RandomGenerators.NumberGenerators.Decimal}
            style={{ width: "100%" }}
          />
          <div className={styles.buttonsWrapper}>
            <Button
              text="copyDecimal"
              type={decimalBtnType}
              tooltipPlace="top"
              onClick={() => copyText(decimal.toString(), setDecimalBtnType)}
            />
            <Button type="update" tooltipPlace="top" onClick={changeDecimal} />
          </div>
        </div>
        <div className={cx({ optionsWrapper: 1, "mt-0": 1 })}>
          <TextInput
            type="number"
            value={decimalSettings.min}
            id="decimalSettingMin"
            labelText="From"
            style={{ width: "90px" }}
            handleChange={(e) =>
              changeDecimalSettings(
                Number(e),
                decimalSettings.max,
                decimalSettings.digits
              )
            }
          />
          <TextInput
            type="number"
            value={decimalSettings.max}
            id="decimalSettingMax"
            labelText="To"
            style={{ width: "90px" }}
            handleChange={(e) =>
              changeDecimalSettings(
                decimalSettings.min,
                Number(e),
                decimalSettings.digits
              )
            }
          />
          <TextInput
            type="number"
            value={decimalSettings.digits}
            id="decimalSettingDigits"
            labelText="Digits after comma"
            max={99}
            style={{ width: "58px" }}
            handleChange={(e) =>
              changeDecimalSettings(
                decimalSettings.min,
                decimalSettings.max,
                Number(e)
              )
            }
          />
        </div>
      </div>
    </div>
  );
};
