import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserHistory } from "history";
import { StrictMode } from "react";
import {
  BrowserRouter,
  HashRouter,
  Router,
  Routes,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

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
const hist = createBrowserHistory();
const cookies = new Cookies();
root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={(props) => <ProfilePage {...props} />} />
      <Route
        path="/nucleo-icons"
        render={(props) => <ProfilePage {...props} />}
      />
      <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      />
      <Route
        path="/register-page"
        render={(props) => <RegisterPage {...props} />}
      />
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>
);
