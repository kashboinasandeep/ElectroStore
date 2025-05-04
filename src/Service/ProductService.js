// product  related api calls
import {privateAxios} from './AxiosService'


//add category
export const addCategory =(category)=>{
    return privateAxios.post(`/categories`,category).then((response=>response.data))
}