// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Usecities } from "../contexts/CitiesContext.jsx";
import { useNavigate } from "react-router-dom";
function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const { createCity, isLoading } = Usecities();
  const [cityName, setCityName] = useState("");
  const [Country, setCountry] = useState("");
  // const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [IsLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [emoji, setemoji] = useState();
  const [GeoCodingError, setGeoCodingError] = useState();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeoCoding(true);
          setGeoCodingError(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data);
          if (!data.countryCode) {
            throw new Error("that does not seem to be a city.somewhere else");
          }
          setCityName(data.city || data.locality || "");

          setCountry(data.countryName);
          setemoji(convertToEmoji(data.countryCode));
        } catch (err) {
          // setGeoCodingError(err.message);
          console.error(err);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );
  if (IsLoadingGeoCoding) return <Spinner />;
  // if (GeoCodingError) return <Message message={GeoCodingError} />;
  if (!lat && !lng)
    return <Message message="Start by clicking on the map to select a city" />;
  const Formhandler = (e) => {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country: Country,
      emoji,
      date,
      notes,
      position: {
        lat: Number(lat),
        lng: Number(lng),
      },
    };
    console.log({ lat: lat, lng: lng });
    createCity(newCity); // add a new city when we add a new city then call createCity function from context
    navigate("/app/cities"); //redirect o list after adding a city
  };
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={Formhandler}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
