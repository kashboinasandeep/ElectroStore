import { Card, Container,CardBody, Row, Col, Form, FormCheck, Button } from "react-bootstrap";
import Base from "../Components/Base";
import E_Logo from "../assets/E_Logo.jpeg"
import { useState } from "react";
const Register = ()=>{

    const registerForm = ()=>{
        const[data,setData] = useState({
            name:'',
            email:'',
            password:'',
            confirmPassword:'',
            gender:'',
            about:''
        });

        const handleChange=(event,property)=>{
            console.log(event);
            console.log(property);
            setData({
                ...data,
                // name:event.target.value  only for single entity to apply all entities like name,email make dynamic[property]
                [property]:event.target.value
            })
        }
        return(
           
      <Container fluid >
        <Row>
            {JSON.stringify(data)}

            <Col sm={{span:6,offset:3}} >
            <Card>
                <CardBody className="my-3 border-0 shadow p-4" >
                    <Container className="text-center">
                    <img src={E_Logo} alt="Electro Store " height={100} width={100} />
                    </Container>
                    <h3 className="text-center mb-4 text-uppercase">Store Signup Here</h3>
                    <Form>

                    {/* username */}
                    <Form.Group className="mb-2" controlId="formName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Enter Username"
                    onChange={(event)=>handleChange(event,'name')}
                    
                    ></Form.Control>
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-2" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email"
                    onChange={(event)=>handleChange(event,'email')}
                    ></Form.Control>
                    </Form.Group>

                    {/* password */}
                    <Form.Group className="mb-2" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"
                    onChange={(event)=>handleChange(event,'password')}
                    ></Form.Control>
                    </Form.Group>

                    {/* Confirmpassword */}
                    <Form.Group className="mb-2" controlId="formConfirmPassword">
                    <Form.Label>ConfirmPassword</Form.Label>
                    <Form.Control type="password" placeholder="Enter Confirm password"
                    onChange={(event)=>handleChange(event,'confirmPassword')}
                    ></Form.Control>
                    </Form.Group>

                    {/* gender */}
                    <Form.Group className="mb-2" formControl='formGender'>
                        <Form.Label>Gender </Form.Label>
                        <div>
                    {/* Male */}
                    <Form.Check        
                    inline
                    label="Male"
                    type="radio"
                    name="gender"
                    id={`gender`}
                    value={'male'}
                    onChange={(event)=>handleChange(event,'gender')}
                    />

                    {/* FeMale */}
                    <Form.Check
                    inline
                    label="FeMale"
                    type="radio"
                    name="gender"
                    id={`gender`} 
                    value={'female'}
                    onChange={(event)=>handleChange(event,'gender')}

                    />
                        </div>
                    </Form.Group>

                   {/* textarea  */}
                    <Form.Group className="mb-2" controlId="formTextarea">
                    <Form.Label>Write About Yourself</Form.Label>
                    <Form.Control as={'textarea'}  rows="4"  placeholder="Write Here"
                    onChange={(event)=>handleChange(event,'about')}
                    ></Form.Control>
                    </Form.Group>
                    </Form>

                    <Container fluid>
                        <p className="text-center">Already Register! <a href="/login" className="text-decoration-none">Login</a></p>
                    </Container>

                    <Container className="text-center mb-2">
                    <Button className="text-uppercase" variant="success">Register</Button>
                    <Button className="text-uppercase ms-3" variant="danger">Reset</Button>
                    </Container>

                </CardBody>
            </Card>
            
            </Col>
        </Row>
      </Container>

        )
    }

    return(
        <>
        <Base
        title="Electro Store / Sign Up"
        description="Fill the form and register with Us. Enjoy the Services">
        {/* calling the registerForm */}
        {registerForm()}
       
        </Base>
        </>
    )
}
export default Register;