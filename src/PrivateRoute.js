import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  //const { currentUser } = useContext(AuthContext);

  const currentUser = sessionStorage.getItem("user");

  const redirectToHome = () => {
    window.location.pathname = "/";
  };

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? <RouteComponent {...routeProps} /> : redirectToHome()
      }
    ></Route>
  );
};

export default PrivateRoute;
