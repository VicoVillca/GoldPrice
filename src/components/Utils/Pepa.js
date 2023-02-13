import React, { useEffect, useState, useCallback } from "react";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  Table,
  Modal,
  FormGroup,
  Label,
  Input,
  ModalHeader,
} from "reactstrap";

import { createItem, getItems, deleteItem } from "variables/api";
import SectionCarousel from "views/index-sections/SectionCarousel";
import Example from "views/index-sections/example";
function Pepa(prop) {
  const [nombre, setNombre] = useState(null);
  const [ley, setLey] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalFoto, setModalFoto] = useState(false);
  const actionModal = () => setModal(!modal);
  const actionModalUpdate = () => setModalUpdate(!modalUpdate);
  const actionModalFoto = () => setModalFoto(!modalFoto);
  const [pepa, setPepa] = useState([]);
  const compra = (n) => {
    //descontamso el 6% para ganancias
    return Math.ceil(prop.precio * n * 0.94);
  };
  const openModalUpdate = (e) => {
    console.log("Abrimos modal para editar");
    console.log(e);
    actionModalUpdate();
    setNombre(e.nombre);
    setLey(e.ley);
  };
  const openModalFoto = (e) => {
    console.log("mostramos la foto");
    console.log(e.id);
    setNombre(e.nombre);
    setLey(e.ley);
    actionModalFoto();
  };
  const guardar = useCallback(async () => {
    console.log("guardamos");
    createItem({
      nombre: nombre,
      ley: ley,
    });
    const p = await getItems();
    setPepa(p);
    actionModal();
  }, [nombre, ley]);

  const getAll = useCallback(async () => {
    console.log("Papus");
    const p = await getItems();
    setPepa(p);
    console.log("GetAllPrecios");
  }, []);
  // core components
  useEffect(() => {
    getAll();
  }, [getAll]);
  return (
    <Row>
      <Table responsive className="text-center ">
        <thead>
          <tr>
            <th>LUGAR</th>
            <th>LEY</th>
            <th>COMPRA</th>
            <th>ACCIONES</th>
            {/**<th>VENTA</th>*/}
          </tr>
        </thead>
        <tbody>
          {pepa.map((row, index) => (
            <tr key={index}>
              <th scope="row">{row.nombre}</th>

              <td>
                <small>{row.ley}</small>
              </td>
              <td>{compra(row.ley) - 10}</td>
              <td>
                <i
                  className="fa fa-picture-o fa-2x"
                  onClick={() => openModalFoto(row)}
                />
                {"  - "}
                <i
                  className="fa fa-pencil text-info fa-2x"
                  onClick={() => openModalUpdate(row)}
                />
                {"  - "}
                <i
                  className="fa fa fa-trash text-danger fa-2x"
                  onClick={() => {
                    deleteItem(row.id);
                    getAll();
                  }}
                />
              </td>
              {/**<td>{venta(row.ley)}</td>*/}
            </tr>
          ))}
        </tbody>
      </Table>
      <Container>
        <Row>
          <Col sm={8}></Col>
          <Col sm={4}>
            <Button
              className="btn-round mr-1"
              color="success"
              type="button"
              onClick={() => actionModal()}
            >
              Agregar Nuevo +
            </Button>
          </Col>
        </Row>
      </Container>
      {/** modal nuevo */}
      <Modal isOpen={modal} toggle={actionModal}>
        <ModalHeader>Agregar Nuevo</ModalHeader>
        <div className="modal-body">
          <Row>
            <Col sm="12">
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Nombre
                </Label>
                <Col sm={10}>
                  <Input
                    id="exampleEmail"
                    name="nombre"
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Orijen del material"
                    type="nombre"
                  />
                </Col>
              </FormGroup>
              <br />
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  calidad
                </Label>
                <Col sm={10}>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    onChange={(e) => setLey(e.target.value)}
                  >
                    {(function (rows, i, len) {
                      while (--i >= len) {
                        rows.push(
                          <option key={i} value={i / 1000}>
                            {i / 1000}
                          </option>
                        );
                      }
                      return rows;
                    })([], 1000, 10)}
                  </Input>
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          <Button
            type="button"
            className="btn-round mr-1"
            color="default"
            outline
            onClick={() => actionModal()}
          >
            cancelar
          </Button>
          <Button
            className="btn-round ml-1"
            color="success"
            type="button"
            onClick={() => guardar()}
          >
            Continuar
          </Button>
        </div>
      </Modal>
      {/** modal editar */}
      <Modal isOpen={modalUpdate} toggle={actionModalUpdate}>
        <ModalHeader>Modificar</ModalHeader>
        <div className="modal-body">
          <Row>
            <Col sm="12">
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Nombre
                </Label>
                <Col sm={10}>
                  <Input
                    id="exampleEmail"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Orijen del material"
                    type="nombre"
                  />
                </Col>
              </FormGroup>
              <br />
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  calidad
                </Label>
                <Col sm={10}>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    value={ley}
                    onChange={(e) => setLey(e.target.value)}
                  >
                    {(function (rows, i, len) {
                      while (--i >= len) {
                        rows.push(
                          <option key={i} value={i / 1000}>
                            {i / 1000}
                          </option>
                        );
                      }
                      return rows;
                    })([], 1000, 10)}
                  </Input>
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          <Button
            type="button"
            className="btn-round mr-1"
            color="default"
            outline
            onClick={() => actionModalUpdate()}
          >
            cancelar
          </Button>
          <Button
            className="btn-round ml-1"
            color="success"
            type="button"
            onClick={() => guardar()}
          >
            guardar
          </Button>
        </div>
      </Modal>
      {/** modal fotos */}
      <Modal isOpen={modalFoto} toggle={actionModalFoto}>
       
        <Example/>
        <div className="modal-footer">
          <Button
            type="button"
            className="btn-round mr-1"
            color="default"
            outline
            onClick={() => actionModalFoto()}
          >
            cancelar
          </Button>
          <Button
            className="btn-round ml-1"
            color="success"
            type="button"
            onClick={() => guardar()}
          >
            guardar
          </Button>
        </div>
      </Modal>
    </Row>
  );
}

export default Pepa;
