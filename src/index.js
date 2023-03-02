import React from "react";
import ReactDOM from "react-dom/client";
//import { createBrowserHistory } from "history";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
//import Cookies from "universal-cookie";
// pages
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import LandingPage from "views/examples/LandingPage.js";
import Dijes from "views/examples/Dijes";
// others

const root = ReactDOM.createRoot(document.getElementById("root"));
//const hist = createBrowserHistory();
//const cookies = new Cookies();
//util

root.render(
  <BrowserRouter basename="/GoldPrice">
    
    <Routes>
      <Route path="/" element={<ProfilePage />}></Route>
      <Route path="/login" element={<RegisterPage />} />
      <Route path="/chafa" element={<RegisterPage />} />
      <Route path="/pepa" element={<RegisterPage />} />
      <Route path="/ley" element={<RegisterPage />} />
      <Route path="/dijes" element={<Dijes />} />
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
