import { FC } from "react";
import { Route, Routes } from "react-router";
import {
  DateConverter,
  JsonConverter,
  JsonDiff,
  CronParser,
  RandomGenerators,
  ImageConverter,
} from "./components/pages";
import { Header, Navigation } from "./components/blocks";

export const App: FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <Navigation />
      <div style={{ width: "100%" }}>
        <Header />
        <Routes>
          <Route path="utilities/" element={<DateConverter />}></Route>
          <Route
            path="utilities/json-converter"
            element={<JsonConverter />}
          ></Route>
          <Route path="utilities/json-diff" element={<JsonDiff />}></Route>
          <Route path="utilities/cron-parser" element={<CronParser />}></Route>
          <Route
            path="utilities/image-converter"
            element={<ImageConverter />}
          ></Route>
          <Route
            path="utilities/random-generators"
            element={<RandomGenerators />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
};
