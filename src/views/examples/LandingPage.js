import React, { useEffect, useState, useCallback } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { UploadFile } from "variables/firebase";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

import Example from "views/index-sections/example";
import SectionCarousel from "views/index-sections/SectionCarousel";
function LandingPage() {
  const [fileImagen, setFileImagen] = useState(null);
  const [modalFoto, setModalFoto] = useState(false);
  const actionModalFoto = () => setModalFoto(!modalFoto);

  const handleSubmitImage = (e) => {
    e.preventDefault();
    console.log("Subirmos Imagen");
    UploadFile(fileImagen);
    setFileImagen(null);
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });
  return (
    <>
      
      <div id="navbar">
          <div
            className="navigation-example"
            style={{
              backgroundImage:
                "url(" + require("assets/img/ilya-yakover.jpg") + ")"
            }}
          >
        <Navbar  expand="lg">
          <Container>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              Oro de Tipuani
            </NavbarBrand>
            <div className="navbar navbar-toggler-right burger-menu">
            <Button color="info">Subir Foto +</Button>
            </div>
          </Container>
        </Navbar>
        </div>
        </div>
        <Container>
          <br/>
        <div id="images">
          <Container>
            <Row>
              
              <Col md="3" sm="3">
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/uriel-soberanes.jpg")}
                />
                <div className="img-details">
                  <div className="author">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive"
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
                    />
                  </div>
                </div>
              </Col>
              <Col md="3" sm="3">
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/uriel-soberanes.jpg")}
                />
                <div className="img-details">
                  <div className="author">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive"
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
                    />
                  </div>
                </div>
              </Col>
              <Col md="3" sm="3">
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/uriel-soberanes.jpg")}
                />
                <div className="img-details">
                  <div className="author">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive"
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>

      <DemoFooter />

      {/** modal fotos */}
      <Modal isOpen={modalFoto} toggle={actionModalFoto} fullscreen="true">
        <ModalHeader >Modal title</ModalHeader>
        <ModalBody>
          <Example />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" >
            Do Something
          </Button>{" "}
          <Button color="secondary" >
            Cancel
          </Button>
          <form onSubmit={handleSubmitImage}>
            <input
              type="file"
              onChange={(e) => setFileImagen(e.target.files[0])}
            />
            <Button
              type="submit"
              color="primary"
              disabled={fileImagen == null ? true : false}
            >
              subir imagen
            </Button>
          </form>
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
            onClick={() => console.log("Holap")}
          >
            guardar
          </Button>
        </ModalFooter>
      </Modal>

    </>
  );
}

export default LandingPage;
