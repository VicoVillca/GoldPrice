import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
import Cookies from "universal-cookie";
// pages
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import LandingPage from "views/examples/LandingPage.js";
// others

const root = ReactDOM.createRoot(document.getElementById("root"));
const cookies = new Cookies();
root.render(
  <BrowserRouter>
    <Switch>
      {/*cookies.get("user") !== undefined ? (
        <>
          {cookies.get("user") === "SuperUsuarioPepe" ? (
            <>
              <Route path="/" render={(props) => <ProfilePage {...props} />} />
            </>
          ) : (
            <>
              <Route path="/" render={(props) => <RegisterPage {...props} />} />
            </>
          )}
        </>
      ) : (
        <>
          <Route path="/" render={(props) => <ProfilePage {...props} />} />
          <Route
            path="/landing-page"
            render={(props) => <LandingPage {...props} />}
          />
        </>
      )*/}

      <Route path="/" render={(props) => <ProfilePage {...props} />} />
      <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />

      <Route path="/login" render={(props) => <RegisterPage {...props} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);
