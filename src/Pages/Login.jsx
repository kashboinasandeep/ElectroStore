import React, { useContext, useState } from "react";
import {
  Alert,
  AlertHeading,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import E_Logo from "../assets/E_Logo.jpeg";
import Base from "../Components/Base";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../Service/UserService";
import UserContext from "../Context/UserContext";

const Login = () => {
  const redirect = useNavigate();
  const userContext = useContext(UserContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    errorData: "null",
    isError: false,
  });

  const [loading, setLoading] = useState(false);




  //reset the login data
  const reset = () => {
    setData({
      email: "",
      password: "",
    });
    setError({
      errorData: "null",
      isError: false,
    });

  


  };

  const handleChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

  // submit form
  const submitForm = (event) => {
    event.preventDefault();

    if (data.email === undefined || data.email.trim() === "") {
      toast.error("Email Required !!");
      return;
    }

    if (data.password === undefined || data.password.trim() === "") {
      toast.error("Password Required !!");
      return;
    }

    setLoading(true);

    loginUser(data)
      .then((data) => {
        console.log(data);
        toast.success("Login Successfull");
        setError({
          errorData: null,
          isError: false,
        });

        // Correct call to context method (assumes login method exists and works correctly)
        userContext.login(data);

        redirect("/users/home");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error(
          error?.response?.data?.message || "Something went wrong!"
        );
        setError({
          errorData: error,
          isError: true,
        });
        setLoading(false);
      });
  };

  const loginForm = () => {
    return (
      <Container fluid>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card
              className=" border-0 shadow p-4"
              style={{ position: "relative", top: -50 }}
            >
              <CardBody>
                <Container className="text-center">
                  <img
                    src={E_Logo}
                    alt="Electro Store"
                    height={100}
                    width={100}
                    className="mb-3"
                  />
                </Container>

                <h3 className="text-center mb-4 text-uppercase">
                  Store Login
                </h3>

                <Alert
                  className="mt-3"
                  variant="danger"
                  show={error.isError}
                  dismissible
                  onClose={() =>
                    setError({
                      isError: false,
                      errorData: null,
                    })
                  }
                >
                  <AlertHeading>Hey there</AlertHeading>
                  <p>
                    {error.errorData?.response?.data?.message ||
                      "Login failed. Check password and try again!"}
                  </p>
                </Alert>

                <Form onSubmit={submitForm} noValidate>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label className="w-100 text-start">Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter here"
                      onChange={(event) => handleChange(event, "email")}
                      value={data.email}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label className="w-100 text-start">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter here"
                      onChange={(event) => handleChange(event, "password")}
                      value={data.password}
                    />
                  </Form.Group>

                  <Container className="text-center">
                    <p>
                      If not registered!{" "}
                      <NavLink to="/register" style={{ textDecoration: "none" }}>
                        Click Here
                      </NavLink>
                    </p>
                  </Container>

                  <Container className="text-center mb-2">
                    <Button
                      className=""
                      type="submit"
                      variant="success"
                      disabled={loading}
                    >
                      <Spinner
                        animation="border"
                        size="sm"
                        className="me-2"
                        hidden={!loading}
                      />

                      <span hidden={!loading}>Wait...</span>
                      <span hidden={loading}>Log in</span>
                    </Button>
                    <Button
                      className="ms-3"
                      variant="danger"
                      onClick={reset}
                      disabled={loading}
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <>
      <Base title="Electro Store / Login" description={null}>
        {loginForm()}
      </Base>
    </>
  );
};

export default Login;
