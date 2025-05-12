// product  related api calls

import { privateAxios } from "./AxiosService"

//create Product WithOut Category
export const createProductWithOutCategory=(product)=>{
    return privateAxios.post(`/products`,product).then((response)=>response.data);
};


//create Product InCategory
export const createProductInCategory=(product,categoryId)=>{
return privateAxios.post(`/categories/${categoryId}/products`,product).then((response)=>response.data);
};

//add product image
export const addProductImage=(file,productId)=>{
    const formData = new FormData();
    formData.append('productImage',file);
    return privateAxios.post(`/products/image/${productId}`,formData).then((response)=>response.data);
}

//get products
export const getAllProducts = (pageNumber = 0, pageSize = 10, sortBy = 'addedDate', sortDir = 'asc') => {
  return privateAxios.get(
    `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
  ).then((response) => response.data);
};
                // or
                
/* export const getAllProducts = (pageNumber = 0, pageSize = 10, sortBy = 'addedDate', sortDir = 'asc') => {
  return privateAxios.get("/products", {
    params: {
      pageNumber,
      pageSize,
      sortBy,
      sortDir
    }
  }).then(response => response.data);
};*/


//delete product
export const  deleteProduct=(productId)=>{
  return privateAxios.delete(`/products/${productId}`).then((response)=>response.data);
}