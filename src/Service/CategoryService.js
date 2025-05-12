import {privateAxios} from './AxiosService'

// Add category
export const addCategory = (category) => {
  return privateAxios.post(`/categories`, category).then((response) => response.data);
};

// Get all categories
export const getCategories = (currentPage=0,pageSize=10) => {
  return privateAxios.get(`/categories?pageNumber=${currentPage}&&pageSize=${pageSize}`).then((response) => response.data);
};

//delete category
export const deleteCategory= (categoryId)=>{
return privateAxios.delete(`/categories/${categoryId}`,categoryId).then((response)=>response.data);
};

// update category
export const serverCategoryUpdate=(category)=>{
return privateAxios.put(`/categories/${category.categoryId}`,category).then((response)=>response.data);
}
