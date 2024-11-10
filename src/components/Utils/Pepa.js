import React, { useEffect, useState, useCallback } from "react";

// reactstrap components
import {
  Button,
  Row,
  Col,
  Table,
  Modal,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  ButtonToolbar,
  ButtonGroup,
} from "reactstrap";

// core components
import { createItem, getItems, deleteItem } from "variables/api";

function Pepa(prop) {
  // State variables
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [ley, setLey] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [pepa, setPepa] = useState([]);

  // Toggle modals
  const actionModal = useCallback(() => setModal(!modal), [modal]);
  const actionModalUpdate = () => setModalUpdate(!modalUpdate);
  const actionModalDelete = () => setModalDelete(!modalDelete);

  // Calculations
  const compra = (n) => Math.ceil(prop.precio * n * 0.98);

  // Open modals with data
  const openModalUpdate = (e) => {
    setNombre(e.nombre);
    setLey(e.ley);
    actionModalUpdate();
  };

  const openModalDelete = (e) => {
    setId(e.id);
    setNombre(e.nombre);
    setLey(e.ley);
    actionModalDelete();
  };

  // API calls
  const guardar = useCallback(async () => {
    await createItem({ nombre, ley });
    const items = await getItems();
    setPepa(items);
    actionModal();
  }, [nombre, ley, actionModal]);

  const borrar = useCallback(async () => {
    await deleteItem(id);
    const items = await getItems();
    setPepa(items);
    setModalDelete(false);
  }, [id]);

  const getAll = useCallback(async () => {
    const items = await getItems();
    setPepa(items);
  }, []);

  // Fetch items on component mount
  useEffect(() => {
    getAll();
  }, [getAll]);
  return (
    <Row>
      <Col className="ml-auto mr-auto " md="12">
        <Table responsive className="text-center">
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
                <td>{compra(row.ley)}</td>
                <td>
                  {/*<Link to={"/fotos/" + row.id}>
                    <i className="fa fa-picture-o" />
            </Link>*/}

                  <ButtonToolbar >
                    <ButtonGroup >
                      
                      <Button
                        className="btn-round mr-1"
                        color="info"
                        type="button"
                        onClick={() => openModalUpdate(row)}
                      >
                        <i className="fa fa-pencil " />
                      </Button>
                      <Button
                        className="btn-round mr-1"
                        color="danger"
                        type="button"
                        onClick={() => openModalDelete(row)}
                      >
                        <i className="fa fa fa-trash" />
                      </Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </td>
                {/**<td>{venta(row.ley)}</td>*/}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">
                <Button
                  className="btn-round mr-1"
                  color="success"
                  type="button"
                  onClick={() => actionModal()}
                >
                  Agregar Nuevo +
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Col>

      {/** modal nuevo */}
      <Modal isOpen={modal} toggle={actionModal}>
        <ModalHeader>Agregar Nuevo Elemento</ModalHeader>
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
      {/** modal confirmacion para eliminar */}
      <Modal isOpen={modalDelete} toggle={actionModalDelete}>
        <div className="modal-header">
          <h6>Eliminar</h6>
        </div>

        <div className="modal-body">
          <Row>
            <Col sm="12">
              <h6>
                Esta seguro que quiere eliminar la siguiente informatión de la
                lista?
              </h6>
            </Col>

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
                    disabled={true}
                  />
                </Col>
              </FormGroup>
              <br />
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  ley
                </Label>
                <Col sm={10}>
                  <Input
                    id="exampleEmail"
                    name="nombre"
                    value={ley}
                    disabled={true}
                  />
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
            onClick={() => actionModalDelete()}
          >
            cancelar
          </Button>
          <Button
            className="btn-round ml-1"
            color="danger"
            type="button"
            onClick={() => {
              borrar();
            }}
          >
            eliminar
          </Button>
        </div>
      </Modal>
    </Row>
  );
}

export default Pepa;
