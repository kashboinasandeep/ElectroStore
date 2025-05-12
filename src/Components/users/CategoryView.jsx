import { Button, Card, CardBody, Col, Row,Container } from "react-bootstrap";
import image from "../../assets/sunset_image.jpeg";

const CategoryView = ({category,deleteCat,viewCat,updateCat}) => {
  const imageStyle = {
    height: "100px",
    width: "100px",
    objectFit: "cover",
  };

  //delete catergory
  const deleteCategory=(categoryId)=>{
    deleteCat(categoryId);
  }

  return (
    <>
      <div className="mb-3">
        <Card className=" border-bottom shadow-sm">
          <CardBody>
            <Row className="align-items-center">
              {/* image purpose */}
              <Col md={2} className="text-center">

              {/* two conditions are used in images */}
                <img
                  src={(category.coverImage?
                    (category.coverImage.startsWith("http")?category.coverImage:image) 
                    :image)}
                  className="rounded-circle"
                  alt="default_image"
                  style={imageStyle}
                />
              </Col>

              <Col md={8}>
                <h5>{category.title}</h5>
                <p>
                 {category.description}
                </p>
              </Col>

              {/* column for buttons */}
              <Col md={2} >
              <Container className="d-grid gap-2">
              <Button variant="success" size="sm" className="mb-2" 
              onClick={(event)=>viewCat(category)}>
                  View
                </Button>
                <Button variant="danger" size="sm" className="mb-2"
                onClick={(event)=>deleteCategory(category.categoryId)}
                >
                  Delete
                </Button>
                <Button variant="warning" size="sm"
                onClick={(event)=>updateCat(category)}
                >
                  Update
                </Button>
              </Container>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default CategoryView;
