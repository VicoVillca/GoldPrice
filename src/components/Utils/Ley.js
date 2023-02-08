import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

// core components

function Joyas(prop) {
  const compra = (n) => {
    //descontamso el 6% para ganancias
    return Math.ceil(prop.precio * (n / 100) * 0.94);
  };
  const venta = (n) => {
    //sin el descuento de ganancias
    return Math.ceil(prop.precio * (n / 100));
  };
  return (
    <Row>
      <Col className="ml-auto mr-auto" md="12">
        <ul className="list-unstyled">
          <li>
            <Row className="text-center p-2 bg-light">
              <Col className="ml-auto mr-auto" lg="1" md="1" xs="1">
                <h6>Klt</h6>
              </Col>
              <Col className="ml-auto mr-auto" lg="7" md="7" xs="7">
                <h6>ESTADO</h6>
              </Col>
              <Col className="ml-auto mr-auto" lg="2" md="2" xs="2">
                <h6>
                  <small>COMPRA</small>
                </h6>
              </Col>
              <Col className="ml-auto mr-auto" lg="2" md="2" xs="2">
                <h6>
                  <small>VENTA</small>
                </h6>
              </Col>
            </Row>
          </li>

          <li>
            {(function (rows, i, len) {
              while (--i >= len) {
                rows.push(
                  <Row key={i} className="text-center p-2 ">
                    <Col className="ml-auto mr-auto" lg="1" md="1" xs="1">
                      <h6>{i} </h6>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="7" md="7" xs="7">
                      <h6>
                        <small>(fundido)</small>
                      </h6>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="2" md="2" xs="2">
                      <h6>{compra(i)}</h6>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="2" md="2" xs="2">
                      <h6>{venta(i)}</h6>
                    </Col>
                  </Row>
                );
              }
              return rows;
            })([], 100, 1)}
          </li>
          <hr />
        </ul>
      </Col>
    </Row>
  );
}

export default Joyas;
