import { NavLink } from "react-router-dom";
// import styles from "./NavPage.module.css";
import styles from "./PageNava.module.css";
import Logo from "./Logo";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">products</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            login
          </NavLink>
        </li>
        {/* <a href="/pricing">pricing</a> */}
        {/* <li>
          <NavLink to="*"></NavLink>
        </li> */}
      </ul>
    </nav>
  );
}

export default PageNav;
