import { FC, useState } from "react";
import classNames from "classnames/bind";
import { Button, TextInput } from "../UI";
import { RandomDecimalSettings, RandomIntSettings } from "../../ts/types/types";
import {
  hints,
  defaultIntSettings,
  defaultDecimalSettings,
} from "../../constants";
import {
  randomFractionFromInterval,
  randomIntFromInterval,
  rndRegNumber,
} from "../../utils";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const RandomGenerators: FC = () => {
  //* Strings
  const [ruGrz, setRuGrz] = useState<string>(rndRegNumber());

  const changeRuGrz = (): void => {
    setRuGrz(rndRegNumber());
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
  };
  const changeDecimalSettings = (
    min: number,
    max: number,
    digits: number
  ): void => {
    setDecimalSettings({ min, max, digits });
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
            value={ruGrz}
            disabled
            id="ruGrz"
            labelText="RU vehicle registration number"
          />
          <div className={styles.buttonsWrapper}>
            <Button type="update" tooltipPlace="top" onClick={changeRuGrz} />
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
            labelText="Integer"
            style={{ width: "100%" }}
          />
          <div className={styles.buttonsWrapper}>
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
            labelText="Decimal"
            style={{ width: "100%" }}
          />
          <div className={styles.buttonsWrapper}>
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
            style={{ width: "56px" }}
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
