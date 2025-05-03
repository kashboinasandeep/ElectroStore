import { useContext } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import { Button, Card, CardBody, Row, Col, Container } from "react-bootstrap";

const Dashboard = () => {
  const userContext = useContext(UserContext);

  const dashboardView = () => (
    <div>
      {/* <h1>This is User's Dashboard page!</h1> */}
      <Outlet />
    </div>
  );

  const notLoggedInView = () => (
    <Container>
      <Row>
        <Col
          md={{
            span: 8,
            offset: 2,
          }}
        >
          <Card className="border-0 shadow mt-3">
            <CardBody className="text-center">
              <h3>Not logged in !!!</h3>
              <p>Please Login and View Page</p>
              <Button variant="success" as={NavLink} to="/login">
                Login Now
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  return (
    <>
      {/* {userContext?.isLogin ? dashboardView() : <Navigate to="/login"/>} */}
          {userContext?.isLogin ? dashboardView() :notLoggedInView()}
    </>
  );
};

export default Dashboard;
