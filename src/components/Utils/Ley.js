
import React from "react";

// reactstrap components
import {  Row, Col } from "reactstrap";

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
