import { NavLink } from "react-router";
import styles from "./styles.module.scss";

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="utilities/" className={styles.navLink}>
        Date Converter
      </NavLink>
      <NavLink to="utilities/jsonConverter" className={styles.navLink}>
        JSON Converter
      </NavLink>
      <NavLink to="utilities/jsonDiff" className={styles.navLink}>
        JSON Difference
      </NavLink>
    </nav>
  );
};
