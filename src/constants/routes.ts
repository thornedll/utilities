import { App } from "../App";
import {
  DateConverter,
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
        path: "",
        Component: DateConverter,
        visibleName: "Date Converter",
        icon: "clock",
      },
      {
        path: "json-converter",
        Component: JsonConverter,
        visibleName: "JSON Converter",
        icon: "json",
      },
      {
        path: "json-diff",
        Component: JsonDiff,
        visibleName: "JSON Difference",
        icon: "file-diff",
      },
      {
        path: "cron-parser",
        Component: CronParser,
        visibleName: "Cron Parser",
        icon: "calendar",
      },
      {
        path: "image-converter",
        Component: ImageConverter,
        visibleName: "Image Converter",
        icon: "file-image",
      },
      {
        path: "random-generators",
        Component: RandomGenerators,
        visibleName: "Random Generators",
        icon: "dice",
      },
      {
        path: "url-converter",
        Component: UrlConverter,
        visibleName: "URL Converter",
        icon: "link",
      },
      { path: "*", Component: NotFound },
    ],
  },
];
