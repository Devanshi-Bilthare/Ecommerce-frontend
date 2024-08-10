import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";


const register = async (userData)=>{
    const response = await axios.post(`${base_url}user/register`,userData)
    if(response.data){
        localStorage.setItem('customer',JSON.stringify(response.data))
    }
    return response.data
}

const login = async (userData)=>{
    const response = await axios.post(`${base_url}user/login`,userData)
    if(response.data){
        localStorage.setItem('customer',JSON.stringify(response.data))
    }
    return response.data
}

const updateUser = async (userData)=>{
    const response = await axios.put(`${base_url}user/edit`,userData,config)
    if(response.data){
        localStorage.setItem('customer',JSON.stringify(response.data))
    }
    return response.data
}
const forgotPasswordToken = async (userData)=>{
    const response = await axios.post(`${base_url}user/forgot-password-token`,userData)
    return response.data
}

const resetPasswordToken = async (userData)=>{
    const response = await axios.put(`${base_url}user/reset-password/${userData.token}`,{password:userData.password})
    return response.data
}


const getUserWishList = async()=>{
    const response = await axios.get(`${base_url}user/wishlist`,config)
    return response?.data
}

const addToCart = async(cartData)=>{
    const response = await axios.post(`${base_url}user/cart`,cartData,config)
    return response?.data
}

const getUserCart = async()=>{
    const response = await axios.get(`${base_url}user/cart`,config)
    return response?.data
}

const removeFromCart = async(id)=>{
    const response = await axios.delete(`${base_url}user/delete-product-cart/${id}`,config
)
    return response?.data
}


const updateCartWithQuantity = async(data)=>{
    const response = await axios.post(`${base_url}user/update-product-cart/`,{id:data.id,newQuantity:data.quantity},config
)
    return response?.data
}

const createOrder = async(data)=>{
    const response = await axios.post(`${base_url}user/cart/create-order`,data,config
)
    return response?.data
}

const getMyOrders = async()=>{
    const response = await axios.get(`${base_url}user/getmyorders`,config
)
    return response?.data
}


const userService = {register,login,getUserWishList,addToCart,getUserCart,removeFromCart,updateCartWithQuantity,createOrder,getMyOrders,updateUser,forgotPasswordToken,resetPasswordToken }

export default userService
