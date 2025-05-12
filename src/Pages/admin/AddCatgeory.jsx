import { useState } from "react";
import { Button, Card, CardBody, Container, Form, FormGroup, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { addCategory } from "../../Service/CategoryService";

const AddCategory = () => {

    const[category,setCategory] =useState({
        title:'',
        description:'',
        coverImage:''
    });

    const [loading,setLoading]=useState(false);

    // change fields of AddCategory
    const handleFieldChange =(event,property)=>{
        event.preventDefault();
        setCategory({
            ...category,
            [property]:event.target.value
        })
    }

    //submitFormData
    const handleFormSubmit = (event)=>{
        event.preventDefault()
        console.log(category);


        //1.category Title validation
        if(category.title===undefined || category.title.trim()===''){
            toast.error("category title is required!!!");
            return;
        }   

          //2.category Description validation
          if(category.description===undefined || category.description.trim()===''){
            toast.error("category description is required!!!");
            return;
          }

        // //   3.category coverImage validation
        //     if(category.coverImage===undefined || category.coverImage.trim()===''){
        //         toast.error("category coverImage URL is required!!!");
        //         return;
        //     }


            //call server api
            setLoading(true);
            addCategory(category)
            .then((data)=>{
                //success
                toast.success("category added successfully!!!");
                console.log(data);
                setCategory({
                  title:'',
                  description:'',
                  coverImage:''
                })
            })
            .catch(error=>{
                toast.error("error in adding category");
                console.log(error);
            })
            .finally(()=>{
              setLoading(false);
            });


    }

    const clearForm = (event)=>{
      event.preventDefault();
      setCategory({
        title:'',
        description:'',
        coverImage:''
      });
    };


  return (
    <>
      <Container fluid>
        <Card className="border border-0 shadow">
            {/* {JSON.stringify(category)} */}
          <CardBody>
            <h5>Add Category Here</h5>

            {/* Form */}
            <Form onSubmit={handleFormSubmit}>
              <FormGroup  className="mt-3">
                <Form.Label className="w-100 text-start">Category Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Here" 
                onChange={(event)=>handleFieldChange(event,'title')}
                value={category.title}
                />
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label className="w-100 text-start">Category Description</Form.Label>
                <Form.Control as="textarea" rows={8} placeholder="Enter Here"
                onChange={(event)=>handleFieldChange(event,'description')}
                value={category.description}
                />
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label className="w-100 text-start">Category Cover Image URL</Form.Label>
                <Form.Control type="text" placeholder="Enter Here" 
                onChange={(event)=>handleFieldChange(event,'coverImage')}
                value={category.coverImage}
                />
              </FormGroup>

              <Container className="mt-3">

              {/* Add Category button */}
                <Button type="submit" variant="success" size="md" disabled={loading}>
                  <Spinner
                    animation={'border'}
                    size={'sm'}
                    className="me-2"
                    hidden={!loading}
                  />
                  <span hidden={!loading}>Please Wait</span>
                 <span hidden={loading}> Add Category</span>
                  
                  </Button>

                  {/* Clear button */}
                <Button className="ms-2" variant="danger" size="md" onClick={clearForm}>Clear</Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default AddCategory;
