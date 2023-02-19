import React from "react";
import ReactDOM from "react-dom/client";
//import { createBrowserHistory } from "history";
import { StrictMode } from "react";
import {
  BrowserRouter,
  HashRouter,
  Router,
  Routes,
  Route,
  Redirect,
  Switch,
  Link,
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
//const hist = createBrowserHistory();
const cookies = new Cookies();
//util
{
  /*<BrowserRouter>
    <Switch>
    <Route  exact  path="/" render={(props) => <ProfilePage {...props} />} />
      <Route exact 
        path="/register-page"
        render={(props) => <RegisterPage {...props} />}
      />
      
      <Route exact 
        path="/index/nucleo-icons"
        render={(props) => <ProfilePage {...props} />}
      />
      <Route exact 
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route exact 
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      />

      <Redirect to="/" />
    </Switch>
</BrowserRouter>






  <React.StrictMode>
    <HashRouter>
      <Router history={hist}>
        <Switch>
          <Route exact path="/">
            <ProfilePage />
          </Route>
          <Route path="/fotos/:id">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </HashRouter>
  </React.StrictMode>
*/
}
root.render(
  <BrowserRouter basename="/GoldPrice">
    
    <Routes>
      <Route path="/" element={<ProfilePage />}></Route>
      <Route path="/login" element={<RegisterPage />} />
      <Route path="/chafa" element={<RegisterPage />} />
      <Route path="/pepa" element={<RegisterPage />} />
      <Route path="/ley" element={<RegisterPage />} />
      <Route path="/fotos/:id" element={<LandingPage />} />
      <Route
        path="*"
        element={
          <main>
            <p>There's nothing here!</p>
          </main>
        }
      ></Route>
    </Routes>
  </BrowserRouter>
);
