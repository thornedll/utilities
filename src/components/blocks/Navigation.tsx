import { FC } from "react";
import { NavLink, useLocation } from "react-router";
import classNames from "classnames/bind";
import { NavigationProps } from "../../ts/interfaces/interfaces";
import { Button, SVGSprite } from "../UI";
import { routes } from "../../constants/routes";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const Navigation: FC<NavigationProps> = ({
  isNavigationVisible,
  handleNavigationVisibility,
}) => {
  const location = useLocation();

  return (
    <div
      className={cx({ navigation: 1, navigationHidden: !isNavigationVisible })}
    >
      <nav>
        <ul>
          {routes[0].children.map(
            (route, i) =>
              route.path !== "*" && (
                <li className={styles.navLinkContainer} key={i}>
                  <NavLink
                    to={"/" + route.path}
                    className={cx({
                      navLink: true,
                      navLinkActive: "/" + route.path === location.pathname,
                      "gap-0": !isNavigationVisible,
                    })}
                  >
                    {route.icon && <SVGSprite id={route.icon} />}
                    <span
                      className={cx({
                        navLinkTextHidden: !isNavigationVisible,
                        navLinkText: isNavigationVisible,
                      })}
                    >
                      {route.visibleName}
                    </span>
                  </NavLink>
                </li>
              )
          )}
        </ul>
      </nav>
      <div className={styles.navigationSwitchWrapper}>
        <Button
          type={isNavigationVisible ? "bar-left" : "bar-right"}
          isTooltip={false}
          onClick={handleNavigationVisibility}
        />
      </div>
    </div>
  );
};
