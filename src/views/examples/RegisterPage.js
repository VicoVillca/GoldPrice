
import React  from "react";


// reactstrap components
import { Button, Card,  Input, Container, Row, Col } from "reactstrap";



function RegisterPage() {
  //const [user, setUser] = useState(false);
  //const [password, setPassword] = useState(false);
  document.documentElement.classList.remove("nav-open");

  const handleSubmit = async (event) => {

    event.preventDefault();
    console.log(event.currentTarget);
    const data = new FormData(event.currentTarget);
    console.log(data.get("User"));
    
    /*try {
      const response = await axios.post(
        baseUrl,
        JSON.stringify({
          username: data.get("username"),
          password: data.get("password"),
        }),
        header
      );
      console.log(response);
      cookies.set("token", response?.data?.token, { path: "/" });
      cookies.set("rol", response?.data?.rol, { path: "/" });
      cookies.set("username", data.get("username"));
      
      history.go(0);
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Nombre de usuario o contraseña incorrectos!", {
        variant: "error",
      });
    }*/
    ///otra forma de login weeee

    /*await axios
      .post(
        baseUrl,
        JSON.stringify({
          username: data.get("username"),
          password: data.get("password"),
        }),
        header
      )
      .then((response) => {
        //showNotificationSuccess('success','Grupo guardado con exito');

        cookies.set("token", response?.data?.token, { path: "/" });
        cookies.set("rol", response?.data?.rol, { path: "/" });
        cookies.set("username", data.get("username"));

        history.go(0);
      })
      .catch((error) => {
        //alert(error+"");
        if (
          error.response?.data.message ===
          "Pongase en contacto con el administrador"
        ) {
          enqueueSnackbar("Acceso desabilitado!", {
            variant: "error",
          });
          enqueueSnackbar(error.response?.data.message + "!", {
            variant: "info",
          });
        } else {
          enqueueSnackbar(error.response?.data.message + "!", {
            variant: "error",
          });
        }
      });*/
  };

  return (
    <>
      
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Welcome</h3>
                <div className="social-line text-center">
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="facebook"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-facebook-square" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="google"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-google-plus" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon"
                    color="twitter"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-twitter" />
                  </Button>
                </div>
                <form  onSubmit={handleSubmit} className="register-form">
                  <label>User</label>
                  <Input placeholder="User" type="text" name="User" />
                  <label>Password</label>
                  <Input placeholder="Password" type="password" name="Password" />
                  <Button block className="btn-round" color="danger">
                    Register
                  </Button>
                </form>
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot password?
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by Creative Tim
          </h6>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
