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
      <ExamplesNavbar />
      <ProfilePageHeader />

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
        <Container className="tim-container">
          <Row>
            {nombre.length > 0 ? (
              <div id="typography">
                <div className="title">
                  <h3>Lista de Diseños</h3>
                </div>
                <div className="typography-line">
                  <h1>
                    <span className="title">Diseño 1</span>
                    <div className="nombre1">{nombre}</div>
                  </h1>
                </div>
                <div className="typography-line">
                  <h1>
                    <span className="title">Diseño 2</span>
                    <div className="nombre2">{nombre}</div>
                  </h1>
                </div>
                <div className="typography-line">
                  <h1>
                    <span className="title">Diseño 3</span>
                    <div className="nombre3">{nombre}</div>
                  </h1>
                </div>
                <div className="typography-line">
                  <h1>
                    <span className="title">Diseño 4</span>
                    <div className="nombre4">{nombre}</div>
                  </h1>
                </div>
                <div className="typography-line">
                  <h1>
                    <span className="title">Diseño 5</span>
                    <div className="nombre5">{nombre}</div>
                  </h1>
                </div>
                <div className="typography-line">
                  <h1>
                    <span className="title">Diseño 6</span>
                    <div className="nombre6">{nombre}</div>
                  </h1>
                </div>
                <div className="typography-line">
                  <h1>
                    <span className="title">Diseño 7</span>
                    <div className="nombre7">{nombre}</div>
                  </h1>
                </div>
                <div className="typography-line">
                  <h1>
                    <span className="title">Diseño 8</span>
                    <div className="nombre8">{nombre}</div>
                  </h1>
                </div>
                <div className="typography-line">
                  <h1>
                    <span className="title">Diseño 9</span>
                    <div className="nombre9">{nombre}</div>
                  </h1>
                </div>
                <div className="typography-line">
                  <h1>
                    <span className="title">Diseño 10</span>
                    <div className="nombre10">{nombre}</div>
                  </h1>
                </div>
              </div>
            ) : (
              ""
            )}
          </Row>
        </Container>
      </div>
      <center>
        <DemoFooter />
      </center>
    </>
  );
}

export default Dijes;
