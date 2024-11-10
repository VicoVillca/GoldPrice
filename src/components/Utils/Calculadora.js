import React, { useState } from "react";
import { Row, Col, Button, Input, FormGroup, Label, Table } from "reactstrap";

function Calculadora({ precio }) {
  // Estados para los datos del usuario y resultados
  const [pesoJoya, setPesoJoya] = useState(0); // Peso de la joya
  const [pesoPiedra, setPesoPiedra] = useState(0); // Peso de la piedra
  const [resultado, setResultado] = useState([]); // Estado para almacenar los resultados
  const [precioOro, setPrecioOro] = useState(Math.ceil(precio * 0.75));
  // Función para calcular el costo total de inversión
  const handlePrecioChange = (e) => {
    const nuevoPrecio = parseFloat(e.target.value);
    if (!isNaN(nuevoPrecio) && nuevoPrecio > 0) {
      setPrecioOro(nuevoPrecio); // Actualiza el precio del oro
    }
  };

  function redondear(valor) {
    return Math.round((valor+ Number.EPSILON) * 10) / 10;
  }
  const calcularInversion = () => {
    if (!precio || pesoJoya <= 0 || pesoPiedra < 0) {
      alert("Por favor, ingrese todos los datos correctamente.");
      return;
    }
    const merma = redondear((pesoJoya - pesoPiedra)/10); // Ejemplo de cálculo para merma (2% de la inversión)

    // Agregamos los resultados a la tabla con las columnas de cantidad, descripción, valor y costo total
    setResultado([
      {
        cantidad: pesoJoya+" gramos",
        descripcion: "El peso total de la joya que tenemos que realizar",
        valor: "",
        costoTotal: "",
      },
      {
        cantidad: "-"+pesoPiedra+" gramos",
        descripcion: "Peso de la piedra",
        valor: "",
        costoTotal: "",
      },
      {
        cantidad: "+"+(merma)+" gramos",
        descripcion: "Merma para el trabajo",
        valor: "",
        costoTotal: "",
      },
      {
        cantidad: redondear(pesoJoya-pesoPiedra+merma)+" gramos",
        descripcion: "Oro necesario para trabajar",
        valor: "",
        costoTotal: "",
      },
      {
        cantidad: "1 grm de oro = "+precioOro+" Bs.",
        descripcion: "Inversion solo en oro",
        valor: redondear(pesoJoya-pesoPiedra+merma)+" * "+precioOro,
        costoTotal: "+"+redondear((pesoJoya-pesoPiedra+merma)*precioOro)+"Bs.",
      },
      {
        cantidad: "25 Bs por gramo",
        descripcion: "Mano de obra por gramo trabajado",
        valor: redondear(pesoJoya-pesoPiedra)+" * 25",
        costoTotal: "+"+redondear((pesoJoya-pesoPiedra)*25)+"Bs.",
      },

      {
        cantidad: "",
        descripcion: "",
        valor: "TOTAL=",
        costoTotal: redondear((pesoJoya-pesoPiedra+merma)*precioOro + ((pesoJoya-pesoPiedra)*25))+"Bs.",
      },
    ]);
  };

  return (
    <Row className="justify-content-center">
      <Col md="12">
      <h6>Calculadora de Costo de Inversión</h6>
      <div
      style={{
        backgroundColor: '#A8D5BA',  // Verde claro
        color: '#333',                // Color del texto oscuro para buen contraste
        padding: '15px',              // Relleno alrededor del mensaje
        borderRadius: '5px',          // Bordes redondeados
        textAlign: 'center',          // Centra el texto
        maxWidth: '400px',            // Ancho máximo
        margin: '20px auto',          // Centrado horizontal y espacio desde arriba
        fontSize: '12px',             // Tamaño de la fuente
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'  // Sombra para un mejor efecto
      }}
    >
      <strong>¡Recomendación!</strong> Para tener ganacias te recomendamos cobrar el precio del gramo mayor a <strong>{redondear(precioOro*1.1)+25}</strong> Bs.
    </div>
        <FormGroup>
            <Label for="precioOro">Precio del Oro en Bolivianos</Label>
            <Input
              type="number"
              id="precioOro"
              value={precioOro}
              onChange={handlePrecioChange}
              min="0"
              placeholder="Ingrese el precio del oro"
            />
          </FormGroup>
          <br/>
        {/* Formulario para ingresar los datos */}
        <FormGroup>
          <Label for="pesoJoya">Peso de la Joya (gramos)</Label>
          <Input
            type="number"
            id="pesoJoya"
            value={pesoJoya}
            onChange={(e) => setPesoJoya(e.target.value)}
            placeholder="Ingrese el peso de la joya"
          />
        </FormGroup>
        <br/>
        <FormGroup>
          <Label for="pesoPiedra">Peso de la Piedra (gramos)</Label>
          {pesoPiedra}
          <Input
            type="number"
            id="pesoPiedra"
            value={pesoPiedra}
            onChange={(e) => setPesoPiedra(e.target.value)}
            placeholder="Ingrese el peso de la piedra"
          />
        </FormGroup>
        <br/>
        <Button style={{ textAlign: 'center', width: '100%', }} color="primary" onClick={calcularInversion}>
          Calcular Inversión
        </Button>

        {/* Tabla con los resultados como un recibo */}
        {resultado.length > 0 && (
          <Table responsive className="mt-4 table-bordered">
            <thead>
              <tr>
               
                <th>Descripción</th>
                <th>Valor</th>
                <th>Costo Total</th>
              </tr>
            </thead>
            <tbody>
              {resultado.map((row, index) => (
                <tr key={index}>
                  <td>
                    {(row.cantidad !== "" &&row.descripcion !== "" ) 
                        ? <div>{row.descripcion} <br/>
                        <div style={{ textAlign: 'right' }}>
                        <strong>{row.cantidad}</strong>
                      </div>
                       </div> 
                        : row.descripcion}

                  </td>
                  <td style={{ textAlign: 'center',fontWeight: index === resultado.length - 1 ? 'bold' : 'normal' }}>{row.valor}</td>
                  <td style={{
                textAlign: 'right',
                fontWeight: index === resultado.length - 1 ? 'bold' : 'normal',  // Aplica negrita al último elemento
              }} >{row.costoTotal}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default Calculadora;
