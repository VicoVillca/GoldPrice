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

// reactstrap components
// core components
import Joyas from "components/Utils/Joyas";
import Pepa from "components/Utils/Pepa";
import Ley from "components/Utils/Ley";
//icons

import IconButton from "@mui/material/IconButton";
import ReplayIcon from "@mui/icons-material/Replay";
import SettingsIcon from "@mui/icons-material/Settings";
import TimelineIcon from "@mui/icons-material/Timeline";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import axios from "axios";
import HOST from "variables/general.js";
const baseUrl = process.env.REACT_APP_URL_BACK_END + "/prueba";
const header = HOST.headerPublic();

function ProfilePage() {
  const [precioOnzaDol, setPrecioOnzaDol] = useState(0);
  const [precioOnzaAux, setPrecioOnzaAux] = useState(0);
  const [precioGrBol, setPrecioGrBol] = useState(0);

  const [modal, setModal] = useState(false);
  const [modalGrafico, setModalGrafico] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalError, setModalError] = useState(false);

  const precioDolar = 8.5;
  const actionModal = () => setModal(!modal);
  const actionModalGrafico = () => setModalGrafico(!modalGrafico);
  const actionModalEditar = () => setModalEditar(!modalEditar);
  const actionModalError = () => setModalError(!modalError);
  const handleChange = (event) => {
    setPrecioOnzaAux(event.target.value);
  };
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  const precioManualmente = (nro) => {
    setPrecioOnzaDol(nro);
    setPrecioGrBol(nro * precioDolar * 0.03215);
    setPrecioOnzaAux("");
    setModalEditar(false);
  };
  const getAllPrecioAgain = useCallback(async () => {
    setModal(true);
    setPrecioOnzaDol(0);
    //console.log(baseUrl);
    await axios
      .get(baseUrl, JSON.stringify({}), header)
      .then((response) => {
        console.log(response);
        console.log(response.data.success);
        try {
          // Parsear la respuesta JSON
          console.log("Antesd e la respuesta");
        console.log(response.data.success);
          // Verificar si la respuesta es exitosa
          if (response.data.success) {
            console.log("Respuesta exitosa");
            // Si la respuesta es exitosa, mostrar el array
            const array = response.data.data.array;
            console.log("Array:", array);
            setModal(false);
            setPrecioOnzaDol(parseFloat(array[0].replace(',', '')));
            //setPrecioGrBol(parseFloat(array[1].replace(',', '')) * 6.97 * 0.03215);
            setPrecioGrBol(parseFloat(array[1].replace(',', '')) * precioDolar * 0.03215);
          } else {
            // Si la respuesta no es exitosa, mostrar un mensaje de error
            console.log("Mensaje de error:", response.data.message);
          }
        } catch (error) {
          // Manejar cualquier error que ocurra durante el análisis JSON
          console.error("Error al analizar la respuesta JSON:", error.message);
        }




      })
      .catch((error) => {
        setModal(false);
        setModalError(true);
        setPrecioOnzaDol(-1);
      });
  }, []);

  useEffect(() => {
    console.log("Holap zzz");
    getAllPrecioAgain();
  }, [getAllPrecioAgain]);
  return (
    <>
      <div className="section  profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("assets/img/imgloginedit.png")}
              />
              <Button color="info" type="button">
                Onza:
                {" $ " +
                  parseFloat(precioOnzaDol)
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
              </Button>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                onClick={() => setModalGrafico(true)}
              >
                <TimelineIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                onClick={() => {
                  getAllPrecioAgain();
                }}
              >
                <ReplayIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                onClick={() => {
                  setModalEditar(true);
                }}
              >
                <SettingsIcon />
              </IconButton>
            </div>
          </div>
        </Container>
        {precioGrBol > 0 ? (
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
        ) : (
          <></>
        )}
      </div>

      {/**  agregamos el modal de la paguina*/}
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
                      style={{
                        height: "3rem",
                        width: "3rem",
                      }}
                    />
                    <h6 className=" col-centered">consultando precio....</h6>
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
      {/** Modal editar */}
      <Modal isOpen={modalEditar} toggle={actionModalEditar}>
        <div className="modal-head">
          <h4>
            <center>Editar Onza Manualmente</center>
          </h4>
        </div>
        <div className="modal-body">
          <Col sm="12">
            <FormGroup className="">
              <Input
                className="form-control"
                onChange={handleChange}
                defaultValue={undefined}
                value={precioOnzaAux || ""}
                type="number"
                placeholder="Onza en dolares"
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
            onClick={() => {
              setModalEditar(false);
            }}
          >
            Cerrar
          </Button>
          <Button
            className="btn-round ml-1"
            color="success"
            type="button"
            disabled={precioOnzaAux > 0 ? false : true}
            onClick={() => precioManualmente(precioOnzaAux)}
          >
            Continuar
          </Button>
        </div>
      </Modal>

      {/** Modal abrir graficos */}
      <Modal isOpen={modalGrafico} toggle={actionModalGrafico}>
        <div className="modal-head">
          <h4>
            <center>Grafico de la Onza</center>
          </h4>
        </div>
        <div className="modal-body center">
          {" "}
          <img
            src="https://www.kitco.com/kcastcharts/live/gold/438_235/au_24h_usd_oz.gif"
            alt="grafico"
            className="img-rounded img-responsive"
          />
        </div>
        <div className="modal-footer">
          <Button
            type="button"
            className="btn-round mr-1"
            color="primary"
            onClick={() => {
              setModalGrafico(false);
            }}
          >
            Continuar <ArrowForwardIosIcon />
          </Button>
        </div>
      </Modal>
      {/** Modal Error */}
      <Modal isOpen={modalError} toggle={actionModalError}>
        <div className="modal-body">
          <div className="author">
            <center>
              <i
                className="fa fa-times-circle  fa-5x text-danger m-3"
                color="primary"
                style={{
                  height: "3rem",
                  width: "3rem",
                }}
              />
              <br />
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
                Intentar Otra ves
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
