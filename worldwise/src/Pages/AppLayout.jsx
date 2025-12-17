import AppNav from "../Componens/AppNav";
import SideBar from "../Componens/SideBar";
import Map from "../Componens/Map";
import User from "../Componens/User";
// import Map from "../Componens/Map";
import styles from "../Pages/AppLayout.module.css";
function AppLayout() {
  return (
    <div className={styles.app}>
      <User />
      {/* <p>App</p> */}
      {/* <AppNav /> */}
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
