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
import { CitiesProvider } from "./contexts/CitiesContext.jsx";

function App() {
  return (
    <div>
      <CitiesProvider>
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
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </div>
  );
}

export default App;
