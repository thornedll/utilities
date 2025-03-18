import { NavLink } from "react-router";
import styles from "./styles.module.scss";

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.navLink}>
        Date Converter
      </NavLink>
      <NavLink to="/jsonConverter" className={styles.navLink}>
        JSON Converter
      </NavLink>
      <NavLink to="/jsonDiff" className={styles.navLink}>
        JSON Diff
      </NavLink>
    </nav>
  );
};
