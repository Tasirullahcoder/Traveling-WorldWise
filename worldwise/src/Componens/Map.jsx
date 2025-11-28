import React from "react";
import styles from "./Map.module.css";
import { useSearchParams } from "react-router-dom";
import Form from "./Form";
import { useNavigate } from "react-router-dom";

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      Map position: {lat}, {lng}
      <button onClick={() => setSearchParams({ lat: 40, lng: 50 })}>
        change Position
      </button>
      {/* <Form /> */}
    </div>
  );
}

export default Map;
