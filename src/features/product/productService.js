import axios from "axios";
import { base_url } from "../../utils/base_url";
import {config} from '../../utils/config'

const getAllProducts = async (data)=>{
    console.log(data)
    const response = await axios.get(`${base_url}product?${data?.brand?`brand=${data?.brand}&&`:""}${data?.tag?`tags=${data?.tag}&&`:""}${data?.category?`category=${data?.category}&&`:""}${data?.minPrice?`price[gte]=${data?.minPrice}&&`:""}${data?.maxPrice?`price[lte]=${data?.maxPrice}&&`:""}${data?.sort?`sort=${data?.sort}&&`:""}`)
    return response.data
}

const getSingleProduct = async (id)=>{
    const response = await axios.get(`${base_url}product/${id}`)
    return response.data
}

const addToWishList = async (prodId)=>{
    const response = await axios.put(`${base_url}product/wishlist`,{prodId},config)
    return response.data
}

const rateProduct = async (data)=>{
    const response = await axios.put(`${base_url}product/rating`,{data},config)
    return response.data
}


const productService = {getAllProducts,addToWishList,getSingleProduct,rateProduct}

export default productService
