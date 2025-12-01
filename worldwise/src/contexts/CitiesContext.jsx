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

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
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
