import { createContext, useContext, useState, useEffect } from "react";
const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [currentCity, setcurrentCity] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setisLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setisLoading(false);
      }
    };
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setisLoading(true);
      const response = await fetch(`${BASE_URL}/cities ${id}`);
      const data = await response.json();
      setcurrentCity(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setisLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setisLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();
      // setcurrentCity(data)
      // below a line setCities is when you want to add a new city and hen immediately show it in the list without refetching from the server .acually sync UI and Remote state
      setCities((cities) => [...cities, data]);
      console.log(data);
    } catch (error) {
      console.error("Error adding cities:", error);
    } finally {
      setisLoading(false);
    }
  }

  async function DeleteCity(id) {
    try {
      setisLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        // here id will be recieved from the CityItem component
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id)); // filter out the deleted city
    } catch (error) {
      console.error("Error deleting cities:", error);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        DeleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function Usecities() {
  const context = useContext(CitiesContext);
  return context;
}
export { CitiesProvider, Usecities };
