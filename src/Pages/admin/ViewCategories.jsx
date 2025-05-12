import { useEffect, useState } from "react";
import CategoryView from "../../Components/users/CategoryView";
import { deleteCategory, getCategories, serverCategoryUpdate } from "../../Service/CategoryService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Container, Spinner, Modal, Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import image from "../../assets/sunset_image.jpeg";
import '../../Components/Css/ViewCategory.css';
import InfiniteScroll from "react-infinite-scroll-component";

const ViewCategories = () => {
  const [categories, setCategories] = useState({
    content: []
  });

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [currentPage,setCurrentPage]=useState(0);

  // Modal state for view
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //modal state for update
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  //initial page loading purpose
  useEffect(() => {
    setLoading(true);
    getCategories(0,6)
      .then(data => {
        console.log(data);
        setCategories(data);
      })
      .catch(error => {
        console.log(error);
        toast.error("Error in loading categories from server!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //currentpage loading purpose  useEffect
  useEffect(()=>{
    if(currentPage>0){
      getCategories(currentPage,6)
      .then(data => {
        console.log(data);
        setCategories({
          content:[...categories.content,...data.content],
          lastPage:data.lastPage,
          pageNumber:data.pageNumber,
          pageSize:data.pageSize,
          totalElements:data.totalElements,
          totalPages:data.totalPages
        });
      })
      .catch(error => {
        console.log(error);
        toast.error("Error in loading categories from server!");
      })
     
    }
  },[currentPage])

  // Delete category
  const deleteCategoryMain = (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(categoryId)
          .then(data => {
            Swal.fire({
              title: "Deleted!",
              text: "Your category has been deleted.",
              icon: "success"
            });

            const newArray = categories.content.filter((c) => {
              return c.categoryId !== categoryId;
            });

            setCategories({
              ...categories,
              content: newArray
            });
          })
          .catch(error => {
            console.log(error);
            toast.error("Category not deleted. Check the server!");
          });
      }
    });
  };

  // View category
  const handleView = (category) => {
    setSelectedCategory(category);
    handleShow();
  };

  // Update category
  const handleUpdate = (category) => {
    // alert("Update button clicked for " + category.title);
    setSelectedCategory(category);
    handleShowUpdate();
  };


  //loadNextPage function
  const loadNextPage =()=>{
    console.log("loading next page")
    setCurrentPage(currentPage+1);
  }

  //update  category serverApi call
  const updateCategoryClicked=(event)=>{
    event.preventDefault()

    // validation for categoryTitle
    if(selectedCategory.title===undefined||selectedCategory.title.trim()===''){
      toast.error("title is required");
      return
    }

    // calling server Api
    setLoading(true);
    serverCategoryUpdate(selectedCategory)
    .then(data=>{
      console.log(data);
      toast.success('category updated!!!');

      const newCategories=categories.content.map(cat=>{
        if(cat.categoryId===selectedCategory.categoryId){
          cat.title=data.title
          cat.description=data.description
          cat.coverImage=data.coverImage
        }

        return cat;
      })
      setCategories({
        ...categories,
        content:newCategories
      })

      handleCloseUpdate();
    })
    .catch(error=>{
      console.log(error);
      toast.error('category not updated check server!!!')
    })
    .finally(()=>{
      setLoading(false);
    })

  }

  // Modal View
  const modalView = () => {
    return (
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <img
              src={selectedCategory.coverImage ? selectedCategory.coverImage : image }
              alt="Category"
            
              className={
                selectedCategory.coverImage
                  ? "category-image"
                  : "category-image default-image"
              }

            />
          </Container>
          <div className="mt-3">{selectedCategory.description}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };


  //model Update
   // Modal View
   const modalUpdate = () => {
    return (
      <Modal show={showUpdate} onHide={handleCloseUpdate} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* title */}
            <FormGroup>
                <Form.Label className="fw-bold">Title</Form.Label>
                <Form.Control type="text" placeholder="Enter here"
                value={selectedCategory.title}
                onChange={(event)=>{
                  setSelectedCategory({
                    ...selectedCategory,
                    title:event.target.value
                  })
                }}
                ></Form.Control>
            </FormGroup>

            {/* description */}
            <FormGroup className="mt-3">
                <Form.Label className="fw-bold">Description</Form.Label>
                <Form.Control as={'textarea'} rows={6} placeholder="Enter here"
                value={selectedCategory.description}
                onChange={(event)=>setSelectedCategory({
                  ...selectedCategory,
                  description:event.target.value
                })}
                ></Form.Control>
            </FormGroup>

                {/* coverImage */}
            <FormGroup className="mt-3">

                <Container>
                <img src={selectedCategory.coverImage?selectedCategory.coverImage:image
                } alt="error"
                className={
                  selectedCategory.coverImage
                    ? "category-image"
                    : "category-image default-image"
                }
                />
                </Container>
                <Form.Label className="fw-bold">Category CoverImage URL</Form.Label>
                <Form.Control type="text" placeholder="Enter here"
                value={selectedCategory.coverImage}
                onChange={(event)=>setSelectedCategory({
                  ...selectedCategory,
                  coverImage:event.target.value
                })}
                ></Form.Control>  
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* close button */}
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Close
          </Button>

          {/* save button*/}
          <Button variant="success" onClick={updateCategoryClicked}>
            save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div>
      {/* Loader */}
      <Container className="text-center p-3" hidden={!loading}>
        <Spinner animation="border" variant="success" />
        <div>
          <h3>Loading...</h3>
        </div>
      </Container>

      {
        categories.content.length > 0 ? (
          <>
           <InfiniteScroll
           dataLength={categories.content.length}
          next={loadNextPage}
          hasMore={!categories.lastPage}
          loader={<h2 className="p-2 text-center">loading...</h2>}    
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }       
           >

            
           {
            categories.content.map((category) => (
              <CategoryView
                viewCat={handleView}
                updateCat={handleUpdate}
                category={category}
                deleteCat={deleteCategoryMain}
                key={category.categoryId}
              />
            ))
            }
           </InfiniteScroll>
          </>
        ) : <h5 className="text-center">No Category In Database</h5>
      }

      {/* Modal View */}
      {selectedCategory ? modalView() : ""}
      
      {/* model Update */}
      {selectedCategory ? modalUpdate() : ""}
    </div>
  );
};

export default ViewCategories;
