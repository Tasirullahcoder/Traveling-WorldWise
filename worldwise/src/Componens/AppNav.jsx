import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
import CityList from "./CityList";
function AppNav() {
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/app/cities">Cities</NavLink>
          </li>
          <li>
            <NavLink to="/app/countries">Countries</NavLink>
          </li>

          {/* <li>
          <NavLink to="/app/form">Add new place</NavLink>
        </li> */}
        </ul>
      </nav>
    </>
  );
}

export default AppNav;
