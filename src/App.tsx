import { FC, useState } from "react";
import { Route, Routes } from "react-router";
import {
  DateConverter,
  JsonConverter,
  JsonDiff,
  CronParser,
  RandomGenerators,
  ImageConverter,
  UrlConverter,
} from "./components/pages";
import { Header, Navigation } from "./components/blocks";

export const App: FC = () => {
  const [isNavigationVisible, setIsNavigationVisible] = useState<boolean>(true);

  const handleNavigationVisibility = () => {
    setIsNavigationVisible(!isNavigationVisible);
  };

  return (
    <div style={{ display: "flex" }}>
      <Navigation
        isNavigationVisible={isNavigationVisible}
        handleNavigationVisibility={handleNavigationVisibility}
      />
      <div
        style={{
          width: `${
            isNavigationVisible ? "calc(100% - 250px)" : "calc(100% - 80px)"
          }`,
          transition: "width 0.2s",
        }}
      >
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
          <Route
            path="utilities/url-converter"
            element={<UrlConverter />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
};
