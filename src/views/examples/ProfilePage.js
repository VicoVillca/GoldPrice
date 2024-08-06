import React, { useEffect, useState, useCallback } from "react";

import {
  Button,
  Container,
  CardSubtitle,
  Spinner,
  Modal,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";

// Core Components
import Joyas from "components/Utils/Joyas";
import Pepa from "components/Utils/Pepa";
import Ley from "components/Utils/Ley";

// Icons
import IconButton from "@mui/material/IconButton";
import ReplayIcon from "@mui/icons-material/Replay";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditIcon from "@mui/icons-material/Edit";

// Other
import axios from "axios";
import HOST from "variables/general.js";
import { getDolar } from "variables/api";

const baseUrl = process.env.REACT_APP_URL_BACK_END + "/prueba";
const header = HOST.headerPublic();


function ProfilePage() {
 // State
const [precioOnzaDol, setPrecioOnzaDol] = useState(0);
const [precioOnzaAux, setPrecioOnzaAux] = useState(0);
const [precioDolarAux, setPrecioDolarAux] = useState(0);
const [precioGrBol, setPrecioGrBol] = useState(0);
const [data, setData] = useState({ dolar: null, id: '' });

const [modal, setModal] = useState(false);
const [modalDolar, setModalDolar] = useState(false);
const [modalEditar, setModalEditar] = useState(false);
const [modalError, setModalError] = useState(false);

// Handlers
const actionModal = () => setModal(!modal);
const actionModalDolar = () => setModalDolar(!modalDolar);
const actionModalEditar = () => setModalEditar(!modalEditar);
const actionModalError = () => setModalError(!modalError);

const handleChange = (event) => {
  setPrecioOnzaAux(event.target.value);
};
const handleChangeDolar = (event) => {
  setPrecioDolarAux(event.target.value);
};

const precioManualmente = (nro) => {
  setPrecioOnzaDol(nro);
  setPrecioGrBol(nro * data.dolar * 0.03215);
  setPrecioOnzaAux("");
  setModalEditar(false);
};

const dolarManualmente = (nro) => {
  console.log("Hlaasd");
  setData(prevData => ({
    ...prevData,
    dolar: nro,
  }));
  setPrecioGrBol(precioOnzaDol * nro * 0.03215);
  setPrecioDolarAux("");
  setModalDolar(false);
};

// Fetch Data
const getAllPrecioAgain = useCallback(async () => {
  setModal(true);
  setPrecioOnzaDol(0);

  try {
    const p = await getDolar();
    setData(p[0]);
    const response = await axios.get(baseUrl, JSON.stringify({}), header);
    if (response.data.success) {
      const array = response.data.data.array;
      setModal(false);
      setPrecioOnzaDol(parseFloat(array[0].replace(',', '')));
      setPrecioGrBol(parseFloat(array[1].replace(',', '')) * p[0].dolar * 0.03215);
    } else {
      console.log("Mensaje de error:", response.data.message);
    }
  } catch (error) {
    console.error("Error al obtener o analizar la respuesta JSON:", error.message);
    setModal(false);
    setModalError(true);
    setPrecioOnzaDol(-1);
  }
}, []);

// Effects
useEffect(() => {
  getAllPrecioAgain();
}, [getAllPrecioAgain]);

// Side Effects
React.useEffect(() => {
  document.documentElement.classList.remove("nav-open");
  document.body.classList.add("landing-page");

  return () => {
    document.body.classList.remove("landing-page");
  };
}, []);

return (
  <>
    {/* Main Content */}
    <div className="section profile-content">
      <Container>
        <div className="owner">
          <div className="avatar">
            <img
              alt="Profile Avatar"
              className="img-circle img-no-padding img-responsive"
              src={require("assets/img/imgloginedit.png")}
            />
            <Button color="info" type="button">
              Onz ={" "}
              {parseFloat(precioOnzaDol)
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                + " $"}
            </Button>
            <Button color="success" type="button">
              1 $ ={" "}
              {parseFloat(data.dolar)
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                + " bs"}
            </Button>
            <IconButton
              color="primary"
              aria-label="open graph"
              component="label"
              onClick={() => setModalDolar(true)}
            >
              <AttachMoneyIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="refresh"
              component="label"
              onClick={getAllPrecioAgain}
            >
              <ReplayIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="edit"
              component="label"
              onClick={() => setModalEditar(true)}
            >
              <EditIcon />
            </IconButton>
          </div>
        </div>
      </Container>

      {/* Conditional Rendering */}
      {precioGrBol > 0 && (
        <>
          <Container>
            <div className="title">
              <h3>Oro en joyas</h3>
            </div>
            <div id="buttons">
              <Joyas precio={precioGrBol} />
            </div>
          </Container>

          <Container>
            <div className="title">
              <h3>Oro en pepa</h3>
            </div>
            <div id="buttons">
              <Pepa precio={precioGrBol} />
            </div>
          </Container>

          <Container>
            <div className="title">
              <h3>Oro por ley</h3>
            </div>
            <div id="buttons">
              <Ley precio={precioGrBol} />
            </div>
          </Container>
        </>
      )}
    </div>

    {/* Modal for Loading Price */}
    <Modal isOpen={modal} toggle={actionModal}>
      <div className="modal-head">
        <h4>
          <center>Precio de la Onza</center>
        </h4>
      </div>
      <div className="modal-body">
        <Row>
          <Col sm="12">
            <div className="author">
              <center>
                <CardSubtitle>
                  <Spinner
                    className="m-3"
                    color="primary"
                    style={{ height: "3rem", width: "3rem" }}
                  />
                  <h6 className="col-centered">consultando precio....</h6>
                </CardSubtitle>
              </center>
            </div>
          </Col>
        </Row>
      </div>
      <div className="modal-footer">
        <Button
          type="button"
          className="btn-round mr-1"
          color="default"
          outline
          onClick={() => {
            setModal(false);
            setPrecioOnzaAux("");
          }}
        >
          cancelar
        </Button>
        <Button
          className="btn-round mr-1"
          color="success"
          type="button"
          onClick={() => {
            setModal(false);
            setModalEditar(true);
          }}
        >
          Colocar Manualmente
        </Button>
      </div>
    </Modal>

    {/* Modal for Editing Price Manually */}
    <Modal isOpen={modalEditar} toggle={actionModalEditar}>
      <div className="modal-head">
        <h4>
          <center>Editar Onza Manualmente</center>
        </h4>
      </div>
      <div className="modal-body">
        <Col sm="12">
          <FormGroup>
            <Input
              className="form-control"
              onChange={handleChange}
              value={precioOnzaAux || ""}
              type="number"
              placeholder="Precio de la Onza en dolares"
            />
          </FormGroup>
          <div className="form-control-feedback">
            Pueden buscar en kitco.com
          </div>
        </Col>
      </div>
      <div className="modal-footer">
        <Button
          type="button"
          className="btn-round mr-1"
          color="default"
          outline
          onClick={() => setModalEditar(false)}
        >
          Cerrar
        </Button>
        <Button
          className="btn-round ml-1"
          color="success"
          type="button"
          disabled={precioOnzaAux <= 0}
          onClick={() => precioManualmente(precioOnzaAux)}
        >
          Continuar
        </Button>
      </div>
    </Modal>

    {/* Modal for Opening Graph */}
    <Modal isOpen={modalDolar} toggle={actionModalDolar}>
      <div className="modal-head">
        <h4>
          <center>Editar Dolar manualmente</center>
        </h4>
      </div>
      <div className="modal-body">
      <Col sm="12">
          <FormGroup>
            <Input
              className="form-control"
              onChange={handleChangeDolar}
              value={precioDolarAux || ""}
              type="number"
              placeholder="Precio del dolar en bolivianos"
            />
          </FormGroup>
          <div className="form-control-feedback">
            Modificar dependiendo el estado actual en la sociedad
          </div>
        </Col>
      </div>
      <div className="modal-footer">
      <Button
          type="button"
          className="btn-round mr-1"
          color="default"
          outline
          onClick={() => setModalDolar(false)}
        >
          Cerrar
        </Button>
        <Button
          className="btn-round ml-1"
          color="success"
          type="button"
          disabled={precioDolarAux <= 0}
          onClick={() => dolarManualmente(precioDolarAux)}
        >
          Continuar
        </Button>
      </div>
    </Modal>

    {/* Modal for Error */}
    <Modal isOpen={modalError} toggle={actionModalError}>
      <div className="modal-body">
        <div className="author">
          <center>
            <i
              className="fa fa-times-circle fa-5x text-danger m-3"
              style={{ height: "3rem", width: "3rem" }}
            />
            <br />
            <Container>Error al Obtener el precio!!</Container>
            <br />
            <Button
              className="btn-round mr-1"
              color="info"
              outline
              type="button"
              onClick={() => {
                setModalError(false);
                getAllPrecioAgain();
              }}
            >
              Intentar Otra vez
            </Button>
            <Button
              className="btn-round mr-1"
              color="success"
              type="button"
              onClick={() => {
                setModalError(false);
                setModalEditar(true);
              }}
            >
              Colocar Manualmente
            </Button>
          </center>
        </div>
      </div>
    </Modal>
  </>
);

}

export default ProfilePage;
