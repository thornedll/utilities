import { FC, useState } from "react";
import { Button, TextInput } from "../UI";
import { BtnType, CronDetails } from "../../ts/types/types";
import {
  copy,
  cronDateReducer,
  cronTimeReducer,
  parseCronDetail,
} from "../../utils";
import { cronValueTypes, hints } from "../../constants";
import styles from "./styles.module.scss";

export const CronParser: FC = () => {
  const [btnType, setBtnType] = useState<BtnType>("copy");
  const [cron, setCron] = useState<string>("");
  const [cronError, setCronError] = useState<string | null>(null);
  const [cronDescription, setCronDescription] = useState<string>("");
  const [cronDetails, setCronDetails] = useState<CronDetails | null>(null);

  const changeCron = (cron: string): void => {
    setCron(cron);
  };
  const changeCronDescription = (cronDescription: string): void => {
    setCronDescription(cronDescription);
  };
  const changeCronDetails = (cronDetails: CronDetails | null): void => {
    setCronDetails(cronDetails);
  };

  const parseCron = (cron: string): void => {
    const cronValues = cron.split(" ");
    if (cronValues.length > 4 && cronValues.length < 8) {
      if (
        /^(((\d*)|(\*)|(\*\/\d*)) ){4,6}((\d*)|(\*)|(\*\/\d*))$/gi.test(cron)
      ) {
        cronError && setCronError(null);
        const newCronDetails = cronValues.map((value, index) => {
          return parseCronDetail(value, cronValueTypes[index]);
        });
        changeCronDetails(newCronDetails);
        const time = cronValues.slice(0, 3).reduce(cronTimeReducer, "");
        const date = cronValues.slice(3).reduce(cronDateReducer, "");
        changeCronDescription(
          time.charAt(0).toUpperCase() +
            time.slice(1) +
            (date.slice(-2) === ", " ? date.slice(0, -2) : date)
        );
      } else {
        setCronError(hints.CronParser.FormatCronError);
        changeCronDescription("");
        changeCronDetails(null);
      }
    } else {
      setCronError(hints.CronParser.EnterCronError);
      changeCronDescription("");
      changeCronDetails(null);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <h2>Cron Parser</h2>
      <h3 className={styles["mt-12"]}>{hints.CronParser.ParseHeader}</h3>
      <div className={styles.optionsWrapper}>
        <div style={{ position: "relative" }}>
          <TextInput
            placeholder={hints.CronParser.EnterCron}
            value={cron}
            style={{ width: "200px" }}
            handleChange={changeCron}
          />
          {cron && (
            <div className={styles.buttonsWrapper}>
              <Button type="delete" onClick={() => changeCron("")} />
            </div>
          )}
        </div>
        <Button
          text="Set example"
          type="primary"
          subType={["outline"]}
          onClick={() => changeCron("0 0 21 */3 * 1")}
        />
        {cronError && <div className={styles.error}>{cronError}</div>}
      </div>
      <div className={styles.optionsWrapper}>
        <Button
          text={hints.Global.ParseFile}
          disabled={!cron}
          type="primary"
          subType={["icon"]}
          onClick={() => parseCron(cron)}
        />
      </div>
      <h3 className={styles["mt-12"]}>{hints.CronParser.DescriptionHeader}</h3>
      <div className={styles.optionsWrapper}>
        <div style={{ position: "relative", width: "100%" }}>
          <TextInput
            value={cronDescription}
            disabled
            style={{ width: "100%" }}
          />
          <div className={styles.buttonsWrapper}>
            <Button
              type={btnType}
              disabled={!cronDescription}
              onClick={() => copy(cronDescription, setBtnType)}
            />
          </div>
        </div>
      </div>
      <div className={styles.resultWrapper}>
        <div className={styles.results}>
          <h3 className={styles["mt-12"]}>{hints.CronParser.DetailsHeader}</h3>
          <table className={styles["mt-12"]}>
            <tbody>
              {cronDetails &&
                Object.keys(cronDetails[0]).map((key, index) => (
                  <tr
                    key={index}
                    style={index === 0 ? { fontWeight: 600 } : {}}
                  >
                    {cronDetails.map((detail, index) => (
                      <td key={index}>{detail[key]}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
