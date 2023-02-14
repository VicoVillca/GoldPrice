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
function LandingPage() {
  const [fileImagen, setFileImagen] = useState(null);
  const [img, setImg] = useState(null);
  const [modalFoto, setModalFoto] = useState(false);
  const [fotos, setFotos] = useState([
    { id: 1, url: "https://www.infobae.com/new-resizer/8ZpJmbwdi7ijDrKh4B5hwE7MIdM=/768x432/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/NNC7TA7K2NG5HM2REZSAE244XE.jpg" },
    { id: 2, url: "https://www.infobae.com/new-resizer/tBB4_GTdhQEx-7b_D1NUqKLV3-U=/768x432/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/ZJYVFFOJ5BCKXGLVRWKWEMOQEA.jpg" },
    { id: 3, url: "https://www.infobae.com/new-resizer/rBeOiTj9fTrd4GnZlj-3SAMeCH4=/768x432/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/W7EMLRABYVDCJKVYVRHZ6FHBCU.jpg" },
    { id: 4, url: "https://www.infobae.com/new-resizer/GmziY3Fl-K3RNF5YmhPmgiYF-3A=/768x432/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/UXDOAPTHSRBW7J3O2RVMY33F54.jpg" },
    { id: 5, url: "https://www.infobae.com/new-resizer/CwW5XNmR49vSHLa-J0bPgTD_A8I=/768x432/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/5VUZTRAU3VAJLHDVPZPIPFUJUA.jpg" },
    { id: 6, url: "https://www.infobae.com/new-resizer/qNvxBibVHQ6CYz4F176ycihAj0I=/768x432/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/RECHHO4KL5CBDBM532GHBWUQ4U.jpg" },
  ]);
  const actionModalFoto = () => {
    setModalFoto(!modalFoto);
    setImg(null);
    setFileImagen(null);
  };

  const handleSubmitImage = () => {
    //e.preventDefault();
    console.log("Subirmos Imagen");
    UploadFile(fileImagen);
    actionModalFoto();
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
              "url(" + require("assets/img/ilya-yakover.jpg") + ")",
          }}
        >
          <Navbar expand="lg">
            <Container>
              <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
                Oro de Tipuani
              </NavbarBrand>
              <div className="navbar navbar-toggler-right burger-menu"></div>
              <Button color="info" onClick={() => actionModalFoto()}>
                Subir Foto +
              </Button>
            </Container>
          </Navbar>
        </div>
      </div>
      <Container>
        <br />
        
        <Example/>
        <div id="images">
          <Container>
            <Row>
              {
                fotos.map((row, index) => (
                  <Col md="3" sm="3" key={index}>
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={row.url}
                />
                <div className="img-details">
                  <div className="author">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive"
                      src={"https://cdn-icons-png.flaticon.com/512/3687/3687412.png"}
                      onClick={()=>{
                        console.log("eliminamos");
                        console.log(row.id);
                      }}
                      />
                      
                  </div>
                </div>
              </Col>
                ))
              }
              
              
            </Row>
          </Container>
        </div>
      </Container>

      <DemoFooter />

      {/** modal fotos */}
      <Modal isOpen={modalFoto} toggle={actionModalFoto} fullscreen="true">
        <ModalHeader>Subir Foto</ModalHeader>
        <ModalBody>
          <center>
            {img == null ? (
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    setFileImagen(e.target.files[0]);
                    setImg(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                accept="image/*"
              />
            ) : (
              <img alt="..." className="img-rounded img-responsive" src={img} />
            )}
          </center>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            className="btn-round mr-1"
            color="default"
            outline
            onClick={() => {
              actionModalFoto();
            }}
          >
            cancelar
          </Button>
          <Button
            className="btn-round ml-1"
            color="success"
            type="button"
            disabled={fileImagen == null ? true : false}
            onClick={() => handleSubmitImage()}
          >
            guardar Foto
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default LandingPage;
