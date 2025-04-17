import { NavLink } from "react-router";
import styles from "./styles.module.scss";

const navigation = [
  {
    url: "utilities/",
    visibleName: "Date Converter",
  },
  {
    url: "utilities/jsonConverter",
    visibleName: "JSON Converter",
  },
  {
    url: "utilities/jsonDiff",
    visibleName: "JSON Difference",
  },
];

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      {navigation.map((link, i) => (
        <div className={styles.navLinkContainer} key={i}>
          <NavLink to={link.url} className={styles.navLink}>
            {link.visibleName}
          </NavLink>
        </div>
      ))}
    </nav>
  );
};
