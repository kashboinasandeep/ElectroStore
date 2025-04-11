import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const CustomNavbar  = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg='dark' variant='dark'>

      <Container>
        
            <Navbar.Brand as={NavLink} to="/">
            <img src="/assets/E_Logo.jpeg" alt="ElectroStroe"  height={35} width={35}  className='me-2'/>
            <span className='text-center'>  ElectroStore</span>
            </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          
          <Nav className="m-auto">
            <Nav.Link as={NavLink} to="/service">Features</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>

            <NavDropdown title="Categories" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Mobile Phones</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Smart TVS
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Laptops</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                More
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/contact ">Contact Us</Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={NavLink} to="/cart">cart( 40 )</Nav.Link>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="/register">Signup</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;