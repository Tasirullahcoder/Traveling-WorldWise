import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./Pages/Product.jsx";
import HomePage from "./Pages/HomePage";
import Pricing from "./Pages/Pricing";
import PageNotFound from "./Pages/PageNotFound.jsx";
import PageNav from "./Componens/PageNav.jsx";
import AppLayout from "./Pages/AppLayout.jsx";
import Login from "./Pages/Login.jsx";
import CityList from "./Componens/CityList.jsx";
import CountryList from "./Componens/CountryList.jsx";
import City from "./Componens/City.jsx";
import Form from "./Componens/Form.jsx";
import { Navigate } from "react-router-dom";
const BASE_URL = "http://localhost:9000";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setisLoading] = useState(true);
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

  return (
    <div>
      <BrowserRouter>
        {/* <PageNav /> */}
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<Form />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
