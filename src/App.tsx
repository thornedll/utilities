import { FC, useState } from "react";
import { useRoutes } from "react-router";
import { Header, Navigation } from "./components/blocks";
import { routes } from "./constants/routes";
import { NotFound } from "./components/pages";

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
        {useRoutes(
          routes[0].children.map((route) => ({
            path: route.path,
            Component: route.Component,
            errorElement: <NotFound />,
          }))
        )}
      </div>
    </div>
  );
};
