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
  NotFound,
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
          <Route path="/" element={<DateConverter />}></Route>
          <Route path="/json-converter" element={<JsonConverter />}></Route>
          <Route path="/json-diff" element={<JsonDiff />}></Route>
          <Route path="/cron-parser" element={<CronParser />}></Route>
          <Route path="/image-converter" element={<ImageConverter />}></Route>
          <Route
            path="/random-generators"
            element={<RandomGenerators />}
          ></Route>
          <Route path="/url-converter" element={<UrlConverter />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};
