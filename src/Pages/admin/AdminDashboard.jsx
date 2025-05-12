import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../Auth/HelperAuth";
import { useContext } from "react";
import UserContext from "../../Context/UserContext";
import { Col, Container, Row } from "react-bootstrap";
import SideMenu from "../../Components/admin/SideMenu";

const AdminDashboard = ()=>{

    const userContext = useContext(UserContext);

    const dashboardView = ()=>{
        return(
            <div>
                <Container fluid className="p-5"  >
                    <Row>

                    {/* side menu */}
                    <Col md={{
                        span:2
                    }}
                    className=""
                    >
                    <SideMenu />
                    </Col>

                
                       
                    {/* content area */}
                    <Col md={10} className="ps-3 pt-2" >
                   
                   <Outlet />
                    </Col>

                    </Row>
                </Container>
            </div>
        )
    }

    return(
        <>
      {(isAdminUser())? dashboardView(): <Navigate to="/users/home" />}
        </>
    )
}
export default AdminDashboard;