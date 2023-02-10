import React, { useEffect, useState, useCallback } from "react";

import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
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
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import Joyas from "components/Utils/Joyas";
import Pepa from "components/Utils/Pepa";
import Ley from "components/Utils/Ley";

import axios from "axios";
import HOST from "variables/general.js";
const baseUrl = process.env.REACT_APP_URL_BACK_END + "/prueba";
const header = HOST.headerPublic();

function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("1");
  const [precioOnzaDol, setPrecioOnzaDol] = useState(0);
  const [precioOnzaAux, setPrecioOnzaAux] = useState(0);
  const [precioGrBol, setPrecioGrBol] = useState(0);
  const [fecha, setFecha] = useState('');
  const [modal, setModal] = useState(false);
  const [manualmente, setManualmente] = useState(false);

  const actionModal = () => setModal(!modal);
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const handleChange = (event) => {
    console.log(event.target.value);
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
    console.log("precio manuelamente");
    console.log("nro = " + nro);
    setPrecioOnzaDol(nro);
    setPrecioGrBol(nro * 6.97 * 0.03215);
    setPrecioOnzaAux("");
    setModal(false);
  };
  const getAllPrecioAgain = useCallback(async () => {
    setModal(true);
    console.log("Obtenemso Precio");
    setPrecioOnzaDol(0);
    console.log(baseUrl);
    await axios
      .get(baseUrl, JSON.stringify({}), header)
      .then((response) => {
        console.log(response);
        setModal(false);
        setPrecioOnzaDol(parseFloat(response?.data?.compra));
        setPrecioGrBol(parseFloat(response?.data?.compra) * 6.97 * 0.03215);
        setFecha(response?.data?.fecha);
        
      })
      .catch((error) => {
        console.log("error en cath");
        console.log(error);
        setPrecioOnzaDol(-1);
        setManualmente(false);
      });
  }, []);

  useEffect(() => {
    getAllPrecioAgain();
  }, [getAllPrecioAgain]);
  return (
    <>
      <ExamplesNavbar />
      <ProfilePageHeader />

      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("assets/img/imgloginedit.png")}
              />
              
                  <Button
                    className=" ml-1"
                    color="info"
                    type="button"
                    outline
                    onClick={() => getAllPrecioAgain()}
                  >
                    ONZA:_
                    {precioOnzaDol > 0 ? precioOnzaDol : "0"}$
                    
                  </Button>
                  <span className="note">{fecha}</span>
                
                {/*<h6 className="card-category">Precio del oro</h6>*/}
            </div>
          </div>
          {precioOnzaDol > 0 && !modal ? (
            <>
              <div className="nav-tabs-navigation">
                <div className="nav-tabs-wrapper">
                  <Nav role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        En joya
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "2" ? "active" : ""}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        En pepa
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "3" ? "active" : ""}
                        onClick={() => {
                          toggle("3");
                        }}
                      >
                        Por Ley
                      </NavLink>
                    </NavItem>
                    
                  </Nav>
                </div>
              </div>
              {/* Tab panes */}

              <TabContent className="following" activeTab={activeTab}>
                <TabPane tabId="1" id="follows">
                  {/** Cotizacion de joyas */}
                  <div className="p-1">
                    <Joyas precio={precioGrBol} />
                  </div>
                </TabPane>
                <TabPane className="text-center" tabId="2" id="following">
                  {/** Cotizacion de pepa */}
                  <Pepa precio={precioGrBol} />
                </TabPane>
                <TabPane className="text-center" tabId="3" id="following">
                  {/** Cotizacion por ley */}
                  <div className="p-1">
                    <Ley precio={precioGrBol} />
                  </div>
                </TabPane>
              </TabContent>
            </>
          ) : (
            <></>
          )}
        </Container>
      </div>
      <DemoFooter />
      {/**  agregamos el modal de la paguina*/}
      <Modal isOpen={modal} toggle={actionModal}>
        <div className="modal-body">
          <Row>
            <Col sm="12">
              {manualmente ? (
                <>
                  <br />
                  <br />
                  <Col sm="12">
                    <FormGroup className="">
                      <Input
                        className="form-control"
                        onChange={handleChange}
                        defaultValue={undefined}
                        value={precioOnzaAux || ""}
                        type="number"
                      />
                    </FormGroup>
                    <div className="form-control-feedback">
                      Pueden buscar en kitco.com
                    </div>
                  </Col>
                </>
              ) : (
                <>
                  {precioOnzaDol === 0 ? (
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
                          <h6 className=" col-centered">
                            consultando precio....
                          </h6>
                          <br />
                          <Button
                            className="btn-round mr-1"
                            color="success"
                            type="button"
                            onClick={() => setManualmente(true)}
                          >
                            Colocar Manualmente
                          </Button>
                        </CardSubtitle>
                      </center>
                    </div>
                  ) : (
                    <>
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
                            onClick={getAllPrecioAgain}
                          >
                            Intentar Otra ves
                          </Button>
                          <Button
                            className="btn-round mr-1"
                            color="success"
                            type="button"
                            onClick={() => setManualmente(true)}
                          >
                            Colocar Manualmente
                          </Button>
                        </center>
                      </div>
                    </>
                  )}
                </>
              )}
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          {manualmente ? (
            <>
              <Button
                type="button"
                className="btn-round mr-1"
                color="default"
                outline
                onClick={() => {
                  setManualmente(false);
                  setPrecioOnzaAux("");
                }}
              >
                cancelar
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
            </>
          ) : (
            <></>
          )}
        </div>
      </Modal>
    </>
  );
}

export default ProfilePage;
