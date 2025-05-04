import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner
} from "react-bootstrap";
import Base from "../Components/Base";
import E_Logo from "../assets/E_Logo.jpeg";
import { useState } from "react";
import { registerUser } from "../Service/UserService";
import { toast } from "react-toastify";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    about: "",
  });

  const [errorData, setErrorData] = useState({
    isError: false,
    errorData : null
  });
  

  const handleChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

  const[loading,setLoading]=useState(false);

  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      about: "",
    });
    setErrorData({
      errorData:null,
      isError:false
    })
   

  };

  const submitForm = (event) => {
    event.preventDefault();

    if (data.password !== data.confirmPassword) {
      setErrorData("Passwords do not match");
     
      return;
    }

    if(data.password==undefined || data.password.trim() == ''){
      toast.error('password is required');
    }

    if(data.confirmPassword==undefined || data.confirmPassword.trim() == ''){
      toast.error('confirmPassword is required');
    }

    if(data.name==undefined || data.name.trim() == ''){
      toast.error('name is required');
    }

  
    //all right
    //call api
    setLoading(true)
    registerUser(data)
      .then((userData) => {
        console.log(userData);
        toast.success("User registered successfully");
        resetData();
      })
      .catch((error) => {
        console.log(error);
        setErrorData({
          isError:true,
          errorData:error
        })
        toast.error("Error in creating user! Try again");
      })
      .finally(()=>{
        setLoading(false)
      })
  };

  return (
    <>
      <Base
        title="Electro Store / Sign Up"
        description="Fill the form and register with Us. Enjoy the Services"
      >
        <Container fluid>
          <Row>
            <Col sm={{ span: 6, offset: 3 }}>
              <Card
                className="my-3 border-0 shadow p-4"
                style={{ position: "relative", top: -60 }}
              >
                <Card.Body>
                  <Container className="text-center">
                    <img
                      src={E_Logo}
                      alt="Electro Store"
                      height={100}
                      width={100}
                    />
                  </Container>
                  <h3 className="text-center mb-4 text-uppercase">
                    Store Signup Here
                  </h3>
                  <Form onSubmit={submitForm}>
                    <Form.Group className="mb-2" controlId="formName">
                      <Form.Label className="w-100 text-start">Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        value={data.name}
                        onChange={(event) => handleChange(event, "name")}
                        isInvalid={errorData.errorData?.response?.data?.name}
                      />
                      <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formEmail">
                      <Form.Label className="w-100 text-start">Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={data.email}
                        onChange={(event) => handleChange(event, "email")}
                        isInvalid={errorData.errorData?.response?.data?.email}
                      />
                       <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formPassword">
                      <Form.Label className="w-100 text-start">Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={data.password}
                        onChange={(event) => handleChange(event, "password")}
                           isInvalid={errorData.errorData?.response?.data?.password}
                      />
                       <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formConfirmPassword">
                      <Form.Label className="w-100 text-start">Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Confirm password"
                        value={data.confirmPassword}
                        onChange={(event) =>
                          handleChange(event, "confirmPassword")
                        }
                  
                      />
                      
                    </Form.Group>

                    <Form.Group className="mb-2 w-100 text-start">
                      <Form.Label >Gender</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          label="Male"
                          type="radio"
                          name="gender"
                          value="male"
                          checked={data.gender === "male"}
                          onChange={(event) => handleChange(event, "gender")}
                        />
                        <Form.Check
                          inline
                          label="Female"
                          type="radio"
                          name="gender"
                          value="female"
                          checked={data.gender === "female"}
                          onChange={(event) => handleChange(event, "gender")}
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formTextarea">
                      <Form.Label className="w-100 text-start">Write About Yourself</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Write Here"
                        value={data.about}
                        onChange={(event) => handleChange(event, "about")}
                        isInvalid={errorData.errorData?.response?.data?.about}
                      />
                       <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.about}</Form.Control.Feedback>
                    </Form.Group>

                    <Container fluid>
                      <p className="text-center">
                        Already Registered?{" "}
                        <a href="/login" className="text-decoration-none">
                          Login
                        </a>
                      </p>
                    </Container>

                    <Container className="text-center mb-2">
                    <Button
                        type="submit"
                        className="text-uppercase"
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
                        <span hidden={loading}>Register</span>
                      </Button>



                      <Button
                        type="button"
                        className="text-uppercase ms-3"
                        variant="danger"
                        onClick={resetData}
                      >
                        Reset
                      </Button>
                    </Container>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Base>
    </>
  );
};

export default Register;
