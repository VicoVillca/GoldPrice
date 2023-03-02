import React, { useState } from "react";

// reactstrap components
import { Row, Table,Col } from "reactstrap";

// core components

function Joyas(prop) {
  const [joyas] = useState([
    { klt: "22", estado: "chafa", ley: (22/24)-0.03 },
    { klt: "20", estado: "chafa", ley: (20/24)-0.03 },
    { klt: "18", estado: "fundido", ley: 0.75 },
    { klt: "18", estado: "chafa", ley: 0.72 },
    { klt: "18", estado: "cadena", ley: 0.65 },
    { klt: "14", estado: "chafa", ley: 0.65 },
    { klt: "10", estado: "chafa", ley: 0.45 },
  ]);
  const compra = (n) => {
    //descontamso el 6% para ganancias
    return Math.ceil(prop.precio * n * 0.94);
  };
  /*const venta = (n) => {
    //sin el descuento de ganancias
    return Math.ceil(prop.precio * n);
  };*/

  return (
    <Row>
      <Col className="ml-auto mr-auto ms-auto" md="12">
      <Table responsive className="text-center ">
        <thead>
          <tr>
            <th>KLTS</th>
            <th>ESTADO</th>
            <th>COMPRA</th>
            {/**<th>VENTA</th>*/}
          </tr>
        </thead>
        <tbody>
          {joyas.map((row, index) => (
            <tr key={index}>
              <th scope="row">{row.klt}</th>
              <td>
                <small>({row.estado})</small>
              </td>
              <td>{compra(row.ley)-10}</td>
              {/**<td>{venta(row.ley)}</td>*/}
            </tr>
          ))}
        </tbody>
      </Table>
      </Col>
      
    </Row>
  );
}

export default Joyas;
