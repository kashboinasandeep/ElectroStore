import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  InputGroup,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
  addProductImage,
  createProductInCategory,
  createProductWithOutCategory,
} from "../../Service/ProductService";
import { getCategories } from "../../Service/CategoryService";
import { Editor } from "@tinymce/tinymce-react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    discountedPrice: "",
    quantity: "",
    live: false,
    stock: true,
    image: undefined,
    imagePreview: undefined,
  });


  //Clear Form data
  const clearForm = () => {
   
    editorRef.current.setContent("");
     setProduct({
      title: "",
      description: "",
      price: "",
      discountedPrice: "",
      quantity: "",
      live: false,
      stock: true,
      image: undefined,
      imagePreview: undefined,
    });
  };

  const [categories, setCategories] = useState(undefined);
  const [selectedCategoryId, setSelectedCategoryId] = useState("none");

  const editorRef = useRef();

  useEffect(() => {
    getCategories(0, 1000)
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error in loading the categories");
      });
  }, []);

  const handleFileChange = (event) => {
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      const reader = new FileReader();
      reader.onload = (r) => {
        setProduct({
          ...product,
          imagePreview: r.target.result,
          image: event.target.files[0],
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid File!!!");
      setProduct({
        ...product,
        image: undefined,
        imagePreview: undefined,
      });
    }
  };

  

  const submitAddProductForm = (event) => {
    event.preventDefault();

    if (product.title.trim() === "") {
      toast.error("Title is required!!!");
      return;
    }

    if (product.description.trim() === "") {
      toast.error("Description is required!!!");
      return;
    }

    const price = parseFloat(product.price);
    const discountedPrice = parseFloat(product.discountedPrice);
    const quantity = parseInt(product.quantity);

    if (isNaN(price) || price <= 0) {
      toast.error("Invalid Price!!!");
      return;
    }

    if (
      isNaN(discountedPrice) ||
      discountedPrice <= 0 ||
      discountedPrice >= price
    ) {
      toast.error("Invalid discounted price");
      return;
    }

    if (isNaN(quantity) || quantity <= 0) {
      toast.error("Invalid Quantity");
      return;
    }

    const productData = {
      ...product,
      price,
      discountedPrice,
      quantity,
    };

    const productCreationFunc =
      selectedCategoryId === "none"
        ? createProductWithOutCategory
        : (p) => createProductInCategory(p, selectedCategoryId);

    productCreationFunc(productData)
      .then((data) => {
        toast.success("Product is created.");

        if (!product.image) {
          clearForm();
          return;
        }

        addProductImage(product.image, data.productId)
          .then(() => {
            toast.success("Image uploaded successfully!");
            clearForm();
          })
          .catch((error) => {
            console.error(error);
            toast.error("Error uploading image");
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error creating product. Check product details.");
      });
  };

  return (
    <Card className="shadow-sm">
      <CardBody>
        <h5>Add Product Here</h5>
        <Form onSubmit={submitAddProductForm}>
          <FormGroup className="mt-3">
            <FormLabel className="w-100 text-start fw-bold">Product Title</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter here"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup className="mt-3">
            <FormLabel className="w-100 text-start fw-bold">Product Description</FormLabel>
            <Editor
              apiKey="bja3joguj3agy7pwb6it7k2fflleovdroxuq1lv8zcmt2rlp"
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 380,
                menubar: true,
                plugins: [
                  "advlist", "autolink", "lists", "link", "image", "charmap", "print",
                  "preview", "anchor", "searchreplace", "visualblocks", "code",
                  "fullscreen", "insertdatetime", "media", "table", "paste", "help", "wordcount"
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={() =>
                setProduct({ ...product, description: editorRef.current.getContent() })
              }
            />
          </FormGroup>

          <Row>
            <Col>
              <FormGroup className="mt-3">
                <FormLabel className="w-100 text-start fw-bold">Product Price</FormLabel>
                <FormControl
                  type="number"
                  placeholder="Enter here"
                  value={isNaN(product.price) ? "" : product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="mt-3">
                <FormLabel className="w-100 text-start fw-bold">Discounted Price</FormLabel>
                <FormControl
                  type="number"
                  placeholder="Enter here"
                  value={isNaN(product.discountedPrice) ? "" : product.discountedPrice}
                  onChange={(e) =>
                    setProduct({ ...product, discountedPrice: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup className="mt-3">
            <FormLabel className="w-100 text-start fw-bold">Product Quantity</FormLabel>
            <FormControl
              type="number"
              placeholder="Enter here"
              value={isNaN(product.quantity) ? "" : product.quantity}
              onChange={(e) =>
                setProduct({ ...product, quantity: e.target.value })
              }
            />
          </FormGroup>

          <Row className="mt-3 px-1 w-100 text-start">
            <Col>
              <Form.Check
                type="switch"
                label="Live"
                checked={product.live}
                onChange={() =>
                  setProduct({ ...product, live: !product.live })
                }
              />
            </Col>
            <Col>
              <Form.Check
                type="switch"
                label="Stock"
                checked={product.stock}
                onChange={() =>
                  setProduct({ ...product, stock: !product.stock })
                }
              />
            </Col>
          </Row>

          <FormGroup className="mt-3">
            <Container hidden={!product.imagePreview} className="text-center py-4 border border-2">
              <p className="text-muted">Image Preview</p>
              <img
                className="img-fluid"
                style={{ maxHeight: "250px" }}
                src={product.imagePreview}
                alt="preview"
              />
            </Container>
            <FormLabel className="w-100 text-start fw-bold">Select Product Image</FormLabel>
            <InputGroup>
              <FormControl type="file" onChange={handleFileChange} />
              <Button
                variant="outline-secondary"
                onClick={() =>
                  setProduct({ ...product, image: undefined, imagePreview: undefined })
                }
              >
                Clear
              </Button>
            </InputGroup>
          </FormGroup>

          <FormGroup className="mt-3">
            <FormLabel>Select Category</FormLabel>
            <FormSelect
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              value={selectedCategoryId}
            >
              <option value="none">None</option>
              {categories &&
                categories.content.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.title}
                  </option>
                ))}
            </FormSelect>
          </FormGroup>

          <Container className="mt-3 text-center">
            <Button type="submit" variant="success" size="sm">
              Add Product
            </Button>
            <Button className="ms-1" variant="danger" size="sm" onClick={clearForm}>
              Clear Data
            </Button>
          </Container>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AddProduct;
