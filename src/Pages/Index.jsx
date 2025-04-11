import { Button } from "react-bootstrap";
import Base from "../Components/Base";
import { toast } from "react-toastify";
import axios from "axios";

const Index = () => {

  function toastMsg(){
    toast.success('success message',{
      // position:'bottom-center'
    })
  };

  const ServerData=()=>{
    toast.success("fetching started Backend Api");
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then((response)=>{
      console.log(response.data);
      toast.success('data fetched successfully');
    })
    .catch((error)=>{
      toast.error("error taken place");
      console.log(error);
    })
  }
  return (
    <>
      <Base
        title={"Shop What You Need "}
        description={"we porvide trending and best prices what you need"}
        buttonEnabled={true}
        buttonText="Start Shopping"
        buttonType="primary"
        buttonLink="/"
      >
        <h1>This is Home page...</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          officiis incidunt itaque ratione sint placeat, aliquid expedita est
          id? Incidunt minima tempora qui voluptas similique?
        </p>
        <Button onClick={toastMsg}>Toast Message</Button>
        <Button onClick={ServerData}>FetchiBackendApi</Button>
      </Base>
    </>
  );
};
export default Index;
