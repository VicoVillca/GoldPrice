/*!

=========================================================
* Paper Kit React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// core components

function Joyas() {
  return (
    <Row>
      <Col className="ml-auto mr-auto" md="12">
        <ul className="list-unstyled">
          <li>
            <Row className="text-center">
              <Col className="ml-auto mr-auto" lg="1" md="1" xs="1">
                <h6 className="text-center">Klt</h6>
              </Col>
              <Col className="ml-auto mr-auto" lg="7" md="7" xs="7">
                <h6 className="text-center">ESTADO</h6>
              </Col>
              <Col className="ml-auto mr-auto" lg="2" md="2" xs="2">
                <h6 className="text-center">
                  <small>COMPRA</small>
                </h6>
              </Col>
              <Col className="ml-auto mr-auto" lg="2" md="2" xs="2">
                <h6 className="text-center">
                  <small>VENTA</small>
                </h6>
              </Col>
            </Row>
          </li>
          <hr />
          <li>
            <Row>
              <Col className="ml-auto mr-auto" lg="1" md="1" xs="1">
                <h6 className="text-center">18 </h6>
              </Col>
              <Col className="ml-auto mr-auto" lg="7" md="7" xs="7">
                <h6 className="text-center">
                  <small>(fundido)</small>
                </h6>
              </Col>
              <Col className="ml-auto mr-auto" lg="2" md="2" xs="2">
                <h6 className="text-center">250</h6>
              </Col>
              <Col className="ml-auto mr-auto" lg="2" md="2" xs="2">
                <h6 className="text-center">250</h6>
              </Col>
            </Row>
          </li>
          <hr />
        </ul>
      </Col>
    </Row>
  );
}

export default Joyas;
