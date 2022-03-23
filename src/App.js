import React, { useEffect } from "react";
import "./App.css";
import Home from "./Screens/Home/Home";
import NavBar from "./Screens/NavBar/NavBar";
import AboutUs from "./Screens/AboutUs/AboutUs";
import Simulator from "./Screens/Simulator/Simulator";
import Shop from "./Screens/Shop/Shop";
import Cart from "./Screens/Cart/Cart";
import SingleProduct from "./Screens/SingleProduct/SingleProduct";
import Footer from "./Screens/Footer/Footer";
import Login from "./Screens/Login/LoginScreen";
// import AdminPanel from "./Screens/Admin/Components/Dashboard/Dashboard";
import CarouselSettings from "./Screens/Admin/Components/Carousel/CarouselSettings";
import ClientsSettings from "./Screens/Admin/Components/Clients/ClientsSettings";
import ProductsSettings from "./Screens/Admin/Components/Products/ProductsSettings";
import CategoriesSettings from "./Screens/Admin/Components/Categories/Categories";
import AboutUsSettings from "./Screens/Admin/Components/AboutUs/AboutUs";
import NotFound from "./Screens/NotFound/NotFound";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./Auth";
import { privateRoutes } from "./Utils/Commons";

const url = window.location.pathname;
function App() {
  let isPrivateRoute = privateRoutes.includes(url);
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <AuthProvider>
      <Router>
        {!isPrivateRoute && <NavBar />}
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home" component={Home} />
          <Route exact path="/aboutUs" component={AboutUs} />
          <Route exact path="/simulator" component={Simulator} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/singleProduct/:id" component={SingleProduct} />
          <Route exact path="/admin" component={Login} />
          {/* <PrivateRoute exact path="/admin/dashboard" component={AdminPanel} /> */}
          <PrivateRoute
            exact
            path="/admin/carouselSettings"
            component={CarouselSettings}
          />
          <PrivateRoute
            exact
            path="/admin/clientsSettings"
            component={ClientsSettings}
          />
          <PrivateRoute
            exact
            path="/admin/productsSettings"
            component={ProductsSettings}
          />
          <PrivateRoute
            exact
            path="/admin/categoriesSettings"
            component={CategoriesSettings}
          />
          <PrivateRoute
            exact
            path="/admin/aboutUsSettings"
            component={AboutUsSettings}
          />
          <Route exact path="/*" component={NotFound} />
        </Switch>
        {!isPrivateRoute && <Footer />}
      </Router>
    </AuthProvider>
  );
}

export default App;
