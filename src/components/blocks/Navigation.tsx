import { FC } from "react";
import { NavLink, useLocation } from "react-router";
import classNames from "classnames/bind";
import { NavigationProps } from "../../ts/interfaces/interfaces";
import { Button, SVGSprite } from "../UI";
import { navigation } from "../../constants";
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
          {navigation.map((link, i) => (
            <li className={styles.navLinkContainer} key={i}>
              <NavLink
                to={link.url}
                className={cx({
                  navLink: true,
                  navLinkActive: "/" + link.url === location.pathname,
                  "gap-0": !isNavigationVisible,
                })}
              >
                <SVGSprite
                  id={link.icon}
                  className={cx({
                    "m-auto": !isNavigationVisible,
                  })}
                />
                <span
                  className={cx({
                    navLinkTextHidden: !isNavigationVisible,
                    navLinkText: isNavigationVisible,
                  })}
                >
                  {link.visibleName}
                </span>
              </NavLink>
            </li>
          ))}
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
