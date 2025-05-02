import { FC } from "react";
import { NavLink, useLocation } from "react-router";
import classNames from "classnames/bind";
import { navigation } from "../../constants";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const Navigation: FC = () => {
  const location = useLocation();

  return (
    <div className={styles.header}>
      <h1>Utilities</h1>
      <nav className={styles.nav}>
        {navigation.map((link, i) => (
          <div className={styles.navLinkContainer} key={i}>
            <NavLink
              to={link.url}
              className={cx({
                navLink: true,
                navLinkActive: "/" + link.url === location.pathname,
              })}
            >
              {link.visibleName}
            </NavLink>
          </div>
        ))}
      </nav>
    </div>
  );
};
