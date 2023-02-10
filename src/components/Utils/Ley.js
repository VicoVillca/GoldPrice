import React from "react";

// reactstrap components
import { Row, Table } from "reactstrap";

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
      <Table responsive className="text-center ">
        <thead>
          <tr>
            <th>#</th>
            <th>ESTADO</th>
            <th>COMPRA</th>
            {/**<th>VENTA</th>*/}
          </tr>
        </thead>
        <tbody>
          {(function (rows, i, len) {
            while (--i >= len) {
              rows.push(
                <tr key={i}>
                  <th scope="row">{i}</th>
                  <td>
                    <small>fundido</small>
                  </td>
                  <td>{compra(i)-10}</td>
                  {/**<td>{venta(row.ley)}</td>*/}
                </tr>
              );
            }
            return rows;
          })([], 100, 10)}
        </tbody>
      </Table>
    </Row>
  );
}

export default Joyas;
