import React, { useEffect, useState, useCallback } from "react";
import "assets/css/dijes.css";
import { FormGroup, Input, Container, Row, Col } from "reactstrap";
// reactstrap components
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Dijes() {
  const [nombre, setNombre] = useState("Maria");

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <>
      <div className="section  profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("assets/img/imgloginedit.png")}
              />

              <Row>
                <Col sm="12">
                  <FormGroup className="has-success">
                    <Input
                      placeholder="Nombre"
                      type="text"
                      value={nombre}
                      onChange={(e) => {
                        setNombre(
                          capitalizeFirst(
                            e.target.value.replace(/[^a-z]/gi, "")
                          )
                        );
                      }}
                    />
                    <div className="form-control-feedback">
                      Escriba un nombre aqui
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>

      <div className="section section-buttons">
        <Container>
          <div className="title">
            <h2>Lista de diseños</h2>
          </div>
          <div id="buttons">
            <div className="title">
              <h3>
                Modelo 1 <br />
                <div className="nombre1">{nombre}</div>
              </h3>
              <h3>
                Modelo 2 <br />
                <div className="nombre2">{nombre}</div>
              </h3>
              <h3>
                Modelo 3 <br />
                <div className="nombre3">{nombre}</div>
              </h3>
              <h3>
                Modelo 4 <br />
                <div className="nombre4">{nombre}</div>
              </h3>
              <h3>
                Modelo 5 <br />
                <div className="nombre5">{nombre}</div>
              </h3>
              <h3>
                Modelo 6 <br />
                <div className="nombre6">{nombre}</div>
              </h3>
              <h3>
                Modelo 7 <br />
                <div className="nombre7">{nombre}</div>
              </h3>
              <h3>
                Modelo 8 <br />
                <div className="nombre8">{nombre}</div>
              </h3>
              <h3>
                Modelo 9 <br />
                <div className="nombre9">{nombre}</div>
              </h3>
              <h3>
                Modelo 10 <br />
                <div className="nombre10">{nombre}</div>
              </h3>
            </div>
            
          </div>
        </Container>
      </div>
    </>
  );
}

export default Dijes;
