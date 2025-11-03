import AppNav from "../Componens/AppNav";
import SideBar from "../Componens/SideBar";
// import Map from "../Componens/Map";
import styles from "../Pages/AppLayout.module.css";
function AppLayout() {
  return (
    <div className={styles.app}>
      {/* <Map /> */}
      {/* <p>App</p> */}
      {/* <AppNav /> */}
      <SideBar />
    </div>
  );
}

export default AppLayout;
