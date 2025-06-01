import { FC, useState } from "react";
import { Button, TextInput } from "../UI";
import { BtnType, CronDetails } from "../../ts/types/types";
import { copy } from "../../utils";
import { hints } from "../../constants";
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
  const changeCronDetails = (cronDetails: CronDetails): void => {
    setCronDetails(cronDetails);
  };

  const parseCron = (cron: string): void => {
    const cronValues = cron.split(" ");
    if (cronValues.length > 4 && cronValues.length < 8) {
      cronError && setCronError(null);
      const cronDetails = {
        second: cronValues[0],
        minute: cronValues[1],
        hour: cronValues[2],
        dayOfMonth: cronValues[3],
        month: cronValues[4],
        dayOfWeek: cronValues[5],
        year: cronValues[6],
      };
      changeCronDetails(cronDetails);
      changeCronDescription(
        `At ${cronDetails.hour}:${cronDetails.minute}:${cronDetails.second}, on day ${cronDetails.dayOfMonth} of the month, every ${cronDetails.month} months`
      );
    } else {
      setCronError(hints.CronParser.EnterCronError);
      changeCronDescription("");
    }
  };
  console.log(cronDetails);

  return (
    <div className={styles.pageWrapper}>
      <h2>Cron Parser</h2>
      <h4 className={styles["mt-12"]}>{hints.CronParser.ParseHeader}</h4>
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
      <h4 className={styles["mt-12"]}>{hints.CronParser.DescriptionHeader}</h4>
      <div className={styles.optionsWrapper}>
        <div style={{ position: "relative" }}>
          <TextInput
            value={cronDescription}
            disabled
            style={{ width: "400px" }}
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
      <h4 className={styles["mt-12"]}>{hints.CronParser.DetailsHeader}</h4>
    </div>
  );
};
