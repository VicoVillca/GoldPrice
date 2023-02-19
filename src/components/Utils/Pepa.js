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
  NavItem,
  NavLink,

} from "reactstrap";
import { Link } from "react-router-dom";
import { createItem, getItems, deleteItem } from "variables/api";

function Pepa(prop) {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [ley, setLey] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const [modalDelete, setModalDelete] = useState(false);
  const actionModal = useCallback(() => setModal(!modal), [setModal, modal]);
  const actionModalUpdate = () => setModalUpdate(!modalUpdate);

  const actionModalDelete = () => setModalDelete(!modalDelete);
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

  const openModalDelete = (e) => {
    console.log("eliminamos de la lista");
    console.log(e.id);
    setId(e.id);
    setLey(e.ley);
    setNombre(e.nombre);
    actionModalDelete();
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
  }, [nombre, ley, actionModal]);

  const borrar = useCallback(async () => {
    console.log("borramos " + id);
    deleteItem(id);
    const p = await getItems();
    setPepa(p);
    actionModalDelete();
  }, [nombre, ley, id, actionModalDelete, setPepa]);

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
                <a target="_self" href={"landing-page/"+row.id}>
                  <i className="fa fa-picture-o" />
                </a>
                <a target="_self" onClick={() => openModalUpdate(row)}>
                  <i className="fa fa-pencil text-info" />
                </a>
                <a
                  target="_self"
                  onClick={() => {
                    openModalDelete(row);
                  }}
                >
                  <i className="fa fa fa-trash text-danger" />
                </a>
              </td>
              {/**<td>{venta(row.ley)}</td>*/}
            </tr>
          ))}
        </tbody>
      </Table>
      <Container>
        <Row>
          <Col sm={8}><a href="/landing-page/123123">hola wewee</a><NavLink to="/index" tag={Link}>
                <i className="nc-icon nc-layout-11" /> Components
              </NavLink>
              <NavItem>
              <NavLink
                href="/joyas"
                target="_blank"
              >
                 precio de Joyas
              </NavLink>
            </NavItem></Col>
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
