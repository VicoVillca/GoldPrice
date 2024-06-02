import React from "react";

// reactstrap components
import { Row, Table,Col } from "reactstrap";

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
        <Col className="ml-auto mr-auto " md="12">
        <Table responsive className="text-center ">
        <thead>
          <tr>
            <th>#</th>
            <th>ESTADO</th>
            <th>COMPRA</th>
            {<th>VENTA</th>}
          </tr>
        </thead>
        <tbody>
          {(function (rows, i, len) {
            console.log(i +" "+len);
            while ((i-=5) >= len) {
              rows.push(
                <tr key={i}>
                  <th scope="row">{(i/10).toFixed(1)}</th>
                  <td>
                    <small>fundido</small>
                  </td>
                  <td>{compra(i/10)-10}</td>
                  {<td>{venta(i/10)}</td>}
                </tr>
              );
            }
            return rows;
          })([], 1000, 100)}
        </tbody>
      </Table>
        </Col>
      
    </Row>
  );
}

export default Joyas;
