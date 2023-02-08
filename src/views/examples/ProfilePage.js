import React, { useEffect, useState, useCallback } from "react";

// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  CardTitle,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  CustomInput,
} from "reactstrap";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import Joyas from "components/Utils/Joyas";
import Pepa from "components/Utils/Pepa";
import Ley from "components/Utils/Ley";

function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("1");
  const [precioOnzaDol, setPrecioOnzaDol] = useState(0);
  const [precioGrBol, setPrecioGrBol] = useState(0);
  const [modal, setModal] = useState(false);

  const actionModal = () => setModal(!modal);
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  const getAllPrecio = useCallback(async () => {
    const valor_Onza = -1;
    setPrecioOnzaDol(valor_Onza);
    setPrecioGrBol(valor_Onza * 6.97 * 0.03215);
    console.log("Obtenemso Precio");
    /*await axios
      .get(baseUrl, JSON.stringify({}), header)
      .then((response) => {
        console.log(response?.data?.olimpiadas);
        setResultado(response?.data?.olimpiadas);
        setResultado2(response?.data?.olimpiadas);
      })
      .catch((error) => {
        //alert(error+"");
        setResultado([]);
        setResultado2([]);
        enqueueSnackbar(error + "", { variant: "error" });
      });*/
  }, []);

  const getAllPrecioAgain = useCallback(async () => {
    setPrecioOnzaDol(0);
    const valor_Onza = 1871;
    setPrecioOnzaDol(valor_Onza);
    setPrecioGrBol(valor_Onza * 6.97 * 0.03215);
    console.log("Obtenemso Precio");
    /*await axios
      .get(baseUrl, JSON.stringify({}), header)
      .then((response) => {
        console.log(response?.data?.olimpiadas);
        setResultado(response?.data?.olimpiadas);
        setResultado2(response?.data?.olimpiadas);
      })
      .catch((error) => {
        //alert(error+"");
        setResultado([]);
        setResultado2([]);
        enqueueSnackbar(error + "", { variant: "error" });
      });*/
  }, []);

  useEffect(() => {
    console.log("hola chiquitas");
    getAllPrecio();
  }, [getAllPrecio]);
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
            </div>
            {precioOnzaDol === 0 ? (
              <div className="author">
                <CardTitle>
                  <Spinner />
                </CardTitle>
                <h6 className="card-category">consultando precio...</h6>
              </div>
            ) : (
              <>
                {precioOnzaDol > 0 ? (
                  <div className="author">
                    <CardTitle tag="h1">
                      <b>
                        {precioOnzaDol}$
                        <Button
                          className="btn-just-icon ml-1"
                          color="info"
                          type="button"

                          
                          onClick={actionModal}
                        >
                          <i className="fa fa-refresh" />
                        </Button>
                      </b>
                    </CardTitle>
                    <h6 className="card-category">Precio del oro</h6>
                  </div>
                ) : (
                  <div className="author">
                    <h6 className="card-category">
                      Error al consultar la onza....
                    </h6>
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
                    >
                      Colocar Manualmente
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
          {precioOnzaDol > 0 ? (
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
        <div className="modal-header">
          <h5 className="modal-title text-center" id="exampleModalLabel">
            Precio del oro en kitco.com
          </h5>
        </div>
        <div className="modal-body">
          <Row>
            <Col sm="12">
              <FormGroup className="has-danger">
                <Input
                  className="form-control-danger"
                  defaultValue=""
                  id="inputDanger1"
                  type="text"
                />
                <div className="form-control-feedback">
                  Pueden buscar en kitco.com
                </div>
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          <Button
            className="btn-round mr-1"
            color="default"
            outline
            type="button"
            onClick={actionModal}
          >
            cancelar
          </Button>

          <Button className="btn-round ml-1" color="info" type="button">
            GUARDAR
            <i className="fa fa-heart mr-1" />
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ProfilePage;
