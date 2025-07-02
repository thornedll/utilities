import { App } from "../App";
import {
  DateConverter,
  JsonQuery,
  JsonConverter,
  JsonDiff,
  CronParser,
  ImageConverter,
  RandomGenerators,
  UrlConverter,
  NotFound,
} from "../components/pages";

export const routes = [
  {
    path: "*",
    Component: App,
    children: [
      {
        path: "utilities",
        Component: DateConverter,
        visibleName: "Date Converter",
        icon: "clock",
      },
      {
        path: "utilities/json-query",
        Component: JsonQuery,
        visibleName: "JSON Query",
        icon: "braces-asterisk",
      },
      {
        path: "utilities/json-converter",
        Component: JsonConverter,
        visibleName: "JSON Converter",
        icon: "json",
      },
      {
        path: "utilities/json-diff",
        Component: JsonDiff,
        visibleName: "JSON Difference",
        icon: "file-diff",
      },
      {
        path: "utilities/cron-parser",
        Component: CronParser,
        visibleName: "Cron Parser",
        icon: "calendar",
      },
      {
        path: "utilities/image-converter",
        Component: ImageConverter,
        visibleName: "Image Converter",
        icon: "file-image",
      },
      {
        path: "utilities/random-generators",
        Component: RandomGenerators,
        visibleName: "Random Generators",
        icon: "dice",
      },
      {
        path: "utilities/url-converter",
        Component: UrlConverter,
        visibleName: "URL Converter",
        icon: "link",
      },
      { path: "*", Component: NotFound },
    ],
  },
];
