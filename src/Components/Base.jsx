import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom"; 
import Footer from "./Footer";

const Base = ({
  title = "page title",
  description = "This is dynamic page",
  buttonEnabled = false,
  buttonText = "Shop Now",
  buttonType = "primary",
  children
}) => {
  let styleContainer = {
    height: "250px"
  };

  return (
    <>
      <div>
        <Container
          fluid
          className="text-center bg-dark p-5 text-white d-flex justify-content-center align-items-center"
          style={styleContainer}
        >
          <div>
            <h1>{title}</h1>
            <p>{description && description}</p>
            {buttonEnabled && (
              <Button as={NavLink} to="/" variant={buttonType}>
                {buttonText}
              </Button>
            )}
          </div>
        </Container>
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Base;
