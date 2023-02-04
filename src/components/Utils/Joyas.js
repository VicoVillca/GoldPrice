
import React, { useState } from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

// core components

function Joyas(prop) {
  const [joyas] = useState([
    { klt: "18", estado: "fundido", ley: 0.75 },
    { klt: "18", estado: "chafa", ley: 0.71 },
    { klt: "14", estado: "chafa", ley: 0.51 },
    { klt: "10", estado: "chafa", ley: 0.4 },
  ]);
  const compra = (n) => {
    //descontamso el 6% para ganancias
    return Math.ceil(prop.precio * n * 0.94);
  };
  const venta = (n) => {
    return Math.ceil(prop.precio * n);
  };

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
            {joyas.map((row, index) => (
              <Row key={index}>
                <Col className="ml-auto mr-auto" lg="1" md="1" xs="1">
                  <h6 className="text-center">{row.klt} </h6>
                </Col>
                <Col className="ml-auto mr-auto" lg="7" md="7" xs="7">
                  <h6 className="text-center">
                    <small>({row.estado})</small>
                  </h6>
                </Col>
                <Col className="ml-auto mr-auto" lg="2" md="2" xs="2">
                  <h6 className="text-center">{compra(row.ley)}</h6>
                </Col>
                <Col className="ml-auto mr-auto" lg="2" md="2" xs="2">
                  <h6 className="text-center">{venta(row.ley)}</h6>
                </Col>
              </Row>
            ))}
          </li>
          <hr />
        </ul>
      </Col>
    </Row>
  );
}

export default Joyas;
