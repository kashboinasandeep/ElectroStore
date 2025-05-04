import {
  Col,
  Container,
  Row,
  Button,
  Card,
  Table,
  Badge,
  Modal,
  Form,
  Spinner,
  Alert,
  InputGroup,
} from "react-bootstrap";
import UserProfileView from "./UserProfileView";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext";
import { getUser, updateUser, updateUserProfilePicture } from "../../Service/UserService";
import { toast } from "react-toastify";
import defaultImage from "../../assets/default_profile.jpg";

const Profile = () => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);

  // Modal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShowModal = () => setShow(true);

  //state for handle image
  const [image, setImage] = useState({
    placeholder: defaultImage,
    file:null
  });

  //updateLoading action
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    getUserDataFromServer();
  }, []);

  // Getting user details from backend using userId
  const getUserDataFromServer = async () => {
    try {
      const userId = userContext.userData.user.userId;
      const data = await getUser(userId);
      setUser(data);
    } catch (error) {
      console.log(error);
      toast.info("Error while fetching data from server");
    }
  };

  // update the fields of userdata
  const updateFieldHandler = (event, property) => {
    setUser({
      ...user,
      [property]: event.target.value,
    });
  };

  // save changes after updating userData
  const updateUserSData = () => {
    console.log("updating userData");

    //validation during updating user data
    if (user.name === undefined || user.name.trim() === "") {
      toast.error("username is required!!");
      return;
    }

    if (user.about === undefined || user.about.trim() === "") {
      toast.error("About is Required!!");
    }

    //fetching the data from backend updateUser(user)
    setUpdateLoading(true);
    updateUser(user)
      .then((updatedUser) => {
        console.log(updatedUser);
        toast.success("userDetails updated successfully");

        //update image
        if(image.file==null){
          setUpdateLoading(false);
          handleClose();
          return;
        }

        //update profile
        updateUserProfilePicture(image.file,user.userId)
        .then(data=>{
          console.log(data);
          toast.success(data.message)
          handleClose();
          
        })
        .catch(error=>{
          console.log(error);
          toast.error("Image is not uploaded")
        })
        .finally(()=>{
          setUpdateLoading(false);
        })
        // handleClose();
      })

      .catch((error) => {
        console.log(error);
        toast.error("error while updating userData");
        setUpdateLoading(false);
      })
   
  };


   //handle  change of profile 
   const handleProfileImageChange = (event)=>{
    console.log(event.target.files[0]);
    if(event.target.files[0].type==='image/png' || event.target.files[0].type==="image/jpeg"){
      //preview image
      const reader = new FileReader();
      reader.onload=(r)=>{
        setImage({
          placeholder:r.target.result,
          file:event.target.files[0]
        })
        console.log(r.target.result);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    else{
      toast.error("Invalid File!!!");
      image.file=null;
    }
   }

   //clear image
   const clearImage =(event) =>{[[]]
    setImage({
      placeholder:defaultImage,
      file:null
    })
   }










  // Update and view modal
  const updateViewModal = () => {
    const { name, email, gender, about, roles = [] } = user || {};

    return (
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card
            className="border-0 shadow-sm"
            style={{ borderRadius: "30px", maxWidth: "600px", width: "100%" }}
          >
            <Card.Body>
              <Table responsive hover  >
                <tbody>
                  <tr>
                    <td className="fw-bold py-2">Profile Image</td>

                    {/* image tag for imag preview */}

                    <td className="py-2">
                      <Container className="text-center mb-3">
                        {/* image tag for preview iamge for profile */}
                        <img
                        style={{objectFit:'cover'}}
                          height={200}
                          width={200}
                          src={image.placeholder}
                          alt="Profile"
                        />
                      </Container>
                      <InputGroup> 
                       <Form.Control type="file" onChange={handleProfileImageChange}></Form.Control>
                        <Button onClick={clearImage} variant="outline-secondary">clear</Button>
                      </InputGroup>
                      <p className="text-muted">
                        Choose Square Shaped File Image For Better Ui.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold py-2">Name</td>
                    <td className="py-2">
                      <Form.Control
                        type="text"
                        value={name}
                        onChange={(event) => updateFieldHandler(event, "name")}
                      ></Form.Control>
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold py-2">Email</td>
                    <td className="py-2">{email}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold py-2">New Password</td>
                    <td className="py-2">
                      <Form.Control
                        type="password"
                        placeholder="Enter new Password Here"
                        onChange={(event) =>
                          updateFieldHandler(event, "password")
                        }
                      ></Form.Control>
                      <p className="mt-2 text-muted">
                        Leave the field for same Password
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold py-2">Gender</td>
                    <td className="py-2">{gender}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold py-2">About</td>
                    <td className="py-2">
                      <Form.Control
                        as={"textarea"}
                        rows={8}
                        value={about}
                        onChange={(event) => updateFieldHandler(event, "about")}
                      ></Form.Control>
                    </td>
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
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          {/* close button */}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          {/* savechanges button */}

          <Button
            variant="primary"
            onClick={updateUserSData}
            disabled={updateLoading}
          >
            <Spinner
              animation="border"
              size="sm"
              hidden={!updateLoading}
              className="me-2"
            />
            <span hidden={!updateLoading}>updating</span>
            <span hidden={updateLoading}> Save Changes</span>
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col
            md={{
              span: 7,
              offset: 3,
            }}
          >
            {user ? (
              <>
                <UserProfileView
                  user={user}
                  handleShowModal={handleShowModal}
                />
                {updateViewModal()}
              </>
            ) : (
              <h1>Data is not loaded</h1>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
