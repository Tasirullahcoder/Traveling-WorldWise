import { Link } from "react-router-dom";
import style from "./CityItem.module.css";
function CityItem({ city }) {
  // Converts emoji flag 🇵🇹 → country code "pt"
  function emojiToCountryCode(emoji) {
    // Convert emoji unicode points into country letters
    const codePoints = [...emoji].map((char) =>
      String.fromCharCode(char.codePointAt(0) - 127397)
    );
    return codePoints.join("").toLowerCase(); // "pt"
  }
  ////////////////////////

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      //   weekday: "long",
    }).format(new Date(date));

  console.log(city);
  const { cityName, emoji, date, id } = city;

  const countryCode = emojiToCountryCode(emoji);
  return (
    <>
      <li>
        {/* <Link to={`/app/cities/${id}`} className={style.cityItem}> */}
        <Link to={`${id}`} className={style.cityItem}>
          <img
            src={`https://flagcdn.com/w40/${countryCode}.png`}
            alt={`${cityName} flag`}
            className={style.flag}
          />
          <h3 className={style.name}>{cityName}</h3>
          <time className={style.date}>{formatDate(date)}</time>
          <button className={style.deleteBtn}>&times;</button>
        </Link>
      </li>
    </>
  );
}

export default CityItem;
