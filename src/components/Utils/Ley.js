import React from "react";

// reactstrap components
import { Row, Table, Col } from "reactstrap";

function Joyas(prop) {
  // Calculate purchase price with a 6% profit margin deducted
  const compra = (n) => Math.ceil(prop.precio * (n / 100) * 0.94);

  // Calculate sale price without the profit margin deduction
  const venta = (n) => Math.ceil(prop.precio * (n / 100));

  // Generate rows for the table
  const generateRows = (rows, start, end) => {
    let i = start;
    while ((i -= 5) >= end) {
      rows.push(
        <tr key={i}>
          <th scope="row">{(i / 10).toFixed(1)}</th>
          <td><small>fundido</small></td>
          <td>{compra(i / 10) - 10}</td>
          <td>{venta(i / 10)}</td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <Row>
      <Col className="ml-auto mr-auto" md="12">
        <Table responsive className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>ESTADO</th>
              <th>COMPRA</th>
              <th>VENTA</th>
            </tr>
          </thead>
          <tbody>
            {generateRows([], 1000, 100)}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default Joyas;
