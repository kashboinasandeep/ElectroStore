import Button from 'react-bootstrap/Button';
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { BsFillPencilFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { deleteProduct } from "../../Service/ProductService";



const SingleProductView = ({ product, index ,updateProductList,openProductViewModal}) => {
  const formatDate = (time) => {
    return new Date(time).toLocaleDateString();
  };


 



  const getBackgroundForProduct = () => {
    // live+stock=success=>green
    if (product.live && product.stock) {
      return "table-success";
    }
    //no-live=>danger=>red
    else if (!product.live) {
      return "table-danger";
    }
    //no-stock=>yellow=>warning
    else if (!product.stock) {
      return "table-warning";
    } else {
    }
  };

  const deleteProductLocal = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //call api
        deleteProduct(product.productId)
          .then((data) => {
            console.log(data);
            toast.success("product deleted");
            updateProductList(productId);
          })
          .catch((error) => {
            console.log(error);
            toast.error("error in deleting product");
          });
      }
    });
  };

  

  return (
    <tr className={getBackgroundForProduct()}>
      <td className="px-3 small">{index + 1}</td>
      <td className="px-3 small">{product.title}</td>
      <td className="px-3 small">{product.quantity}</td>
      <td className="px-3 small">₹{product.price}</td>
      <td className="px-3 small">₹{product.discountedPrice}</td>
      <td className="px-3 small">{product.live ? "True" : "False"}</td>
      <td className="px-3 small">{product.stock ? "True" : "False"}</td>
      <td className="px-3 small">{product.category?.title || "N/A"}</td>
      <td className="px-3 small">{formatDate(product.addedDate)}</td>
      <td className="px-3 small">
        <div className="d-flex justify-content-end gap-2">
          {/* view button */}
          <Button onClick={(event)=>openProductViewModal(event,product)} variant="success" size="sm">
            <GrView />
          </Button>

          {/* updateButton */}
          <Button variant="warning" size="sm">
            <BsFillPencilFill />
          </Button>

          {/* deleteButton */}
          <Button variant="danger" onClick={(event)=>deleteProductLocal(product.productId)} size="sm">
            <MdDelete />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default SingleProductView;
