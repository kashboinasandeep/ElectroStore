import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  FormLabel,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { getAllProducts } from "../../Service/ProductService";
import { toast } from "react-toastify";
import SingleProductView from "../../Components/admin/SingleProductView";
import { getProductImageUrl, PRODUCT_PAGE_SIZE } from "../../Service/HelperService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import defaultImage from "../../assets/default_profile.jpg"

const ViewProducts = () => {
  const [products, setProducts] = useState(undefined);
  const [currentProduct, setCurrentProduct] = useState(undefined);

  //modal view
  const [show, setShow] = useState(false);
  const closeProductViewModal = () => setShow(false);
  const openProductViewModal = (event,product)=>{
    console.log(product);
    setCurrentProduct(product);
    setShow(true);
  }
  

  const getProducts = (
    pageNumber = 0,
    pageSize = 5,
    sortBy = "addedDate",
    sortDir = "desc"
  ) => {
    getAllProducts(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);
        setProducts({ ...data });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading products");
      });
  };

  useEffect(() => {
    getProducts(0, PRODUCT_PAGE_SIZE, "addedDate", "desc");
  }, []);

  const updateProductList = (productId) => {
    const newArray = products.content.filter((p) => p.productId != productId);
    setProducts({
      ...products,
      content: newArray,
    });
  };

  //model view
  const viewProductModalView = () => {
    return currentProduct &&  (
      <>
    
        <Modal animation={false} show={show} onHide={closeProductViewModal}>
          <Modal.Header closeButton>
            <Modal.Title>{currentProduct.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {/* product pictuire */}
           <Container className="text-center" >
             <img 
             style={{
              height:'350px' ,
              width:'350px',
            }}
             src={currentProduct.coverImage?getProductImageUrl(currentProduct.productId):defaultImage} alt="" />
           </Container>

            {/* description */}
          <div  className="p-3 border border-1" dangerouslySetInnerHTML={{__html:currentProduct.description}}>

          </div>

         


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeProductViewModal}>
              Close
            </Button>
            <Button variant="primary" onClick={closeProductViewModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const productsView = () => {
    return (
      <Container>
        <Card className="shadow-sm">
          <CardBody>
            <h5 className="mb-3">View Products</h5>

            <FormGroup className="mb-3">
              <FormLabel className="fw-bold w-100 text-start">
                Search Product
              </FormLabel>
              <Form.Control type="text" placeholder="Search here" />
            </FormGroup>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#SN</th>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Discounted</th>
                  <th>Live</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.content?.map((product, index) => (
                  <SingleProductView
                    key={product.productId}
                    product={product}
                    index={index}
                    updateProductList={updateProductList}
                    openProductViewModal={openProductViewModal}
                  />
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-end">
              <Pagination>
                {/* First Button */}
                <Pagination.First
                  onClick={() => {
                    if (!products.first) {
                      getProducts(0, PRODUCT_PAGE_SIZE, "addedDate", "desc");
                    }
                  }}
                />

                {/* Previous Button */}
                <Pagination.Prev
                  onClick={() => {
                    if (products.lastPage - 1) return;
                    getProducts(
                      products.pageNumber - 1,
                      PRODUCT_PAGE_SIZE,
                      "addedDate",
                      "desc"
                    );
                  }}
                />

                {/* Page Numbers */}
                {products &&
                  [...Array(products.totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={products.pageNumber === index}
                      onClick={() =>
                        getProducts(
                          index,
                          PRODUCT_PAGE_SIZE,
                          "addedDate",
                          "desc"
                        )
                      }
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}

                {/* Next Button */}
                <Pagination.Next
                  onClick={() => {
                    if (products.lastPage) return;
                    getProducts(
                      products.pageNumber + 1,
                      PRODUCT_PAGE_SIZE,
                      "addedDate",
                      "desc"
                    );
                  }}
                />

                {/* Last Button */}
                <Pagination.Last
                  onClick={() => {
                    if (!products.last) {
                      getProducts(
                        products.totalPages - 1,
                        PRODUCT_PAGE_SIZE,
                        "addedDate",
                        "desc"
                      );
                    }
                  }}
                />
              </Pagination>
            </div>
          </CardBody>
        </Card>
      </Container>
    );
  };

  return (
   <>
    <Container fluid >
      <Row>
        <Col>
        {products ? productsView() : "Loading products..."}
        </Col>
      </Row>
    </Container>
    
    {
      viewProductModalView()
    }
   
   </>
   
  );
};

export default ViewProducts;
