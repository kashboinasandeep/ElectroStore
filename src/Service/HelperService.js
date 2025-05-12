export const BASE_URL = `http://localhost:9091`;
export const PRODUCT_PAGE_SIZE=5;

export const getProductImageUrl =(productId)=>{
return `${BASE_URL}/products/image/${productId}`;
}
