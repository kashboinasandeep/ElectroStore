import { useState } from "react";
import { Button, Card, CardBody, Container, Form, FormGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { addCategory } from "../../Service/ProductService";

const AddCategory = () => {

    const[category,setCategory] =useState({
        title:'',
        description:'',
        coverImage:''
    });

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
            addCategory(category)
            .then((data)=>{
                //success
                toast.success("category added successfully!!!");
                console.log(data);
            })
            .catch(error=>{
                toast.error("error in adding category");
                console.log(error);
            })


    }


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
                <Button type="submit" variant="success" size="md">Add Category</Button>
                <Button className="ms-2" variant="danger" size="md">Clear</Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default AddCategory;
