import { Card, CardBody, Table, Badge, Container, Button } from "react-bootstrap";
import profileImage from "../../assets/default_profile.jpg";
import {BASE_URL} from "./../../Service/HelperService"
import { useContext } from "react";
import UserContext from "../../Context/UserContext";
const UserProfileView = ({ user = null,handleShowModal}) => {
  if (!user) return null;

  const { name, email, gender, about, roles } = user;

  const{userData,isLogin} = useContext(UserContext)

  const profileStyle = {
    height: "200px",
    width: "200px",
    borderRadius: "50%",
    objectFit:"cover"
  };


  return (
    <Card className="m-3 border-0 shadow-sm">
      <CardBody>
        <Container className="text-center">
          <img src={user.imageName?BASE_URL+'/users/image/'+user.userId+'?'+new Date().getTime():profileImage} alt="Profile" style={profileStyle} />
          <h2 className="text-uppercase fw-bold text-primary mt-3">{name}</h2>
        </Container>

        <div className="d-flex justify-content-center mt-4">
          <Card
            className="border-0 shadow-sm"
            style={{
              borderRadius: "30px",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <CardBody>
              <Table responsive borderless className="text-center">
                <tbody>
                  <tr>
                    <td className="fw-bold py-2">Name</td>
                    <td className="py-2">{name}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold py-2">Email</td>
                    <td className="py-2">{email}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold py-2">Gender</td>
                    <td className="py-2">{gender}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold py-2">About</td>
                    <td className="py-2">{about}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold py-2">Roles</td>
                    <td className="py-2">
                      {roles.map((role, index) => (
                        <Badge key={index} bg="info" className="me-2">
                          {role.name}
                        </Badge>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
                      {
                        (isLogin && userData.user.userId==user.userId)?(
                          <Container className="text-center mt-3">

                          {/* update button */}
                          <Button 
                          variant="success" 
                          size="lg"
                          onClick={handleShowModal}
                          >
                          Update</Button>
              
              
                          {/* orders button */}
                          <Button className="ms-3" 
                          variant="warning" 
                          size="lg">
                          Order</Button>
                        
                      </Container>
                        )
                        :''
                      }
     
      </CardBody>
    </Card>
  );
};

export default UserProfileView;
