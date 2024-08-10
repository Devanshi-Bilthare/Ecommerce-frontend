import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";
import { toast } from "react-toastify";


const getCustomerFromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')):null

export const registerUser = createAsyncThunk('auth/user-register',async(user,thunkApi)=>{
    try{
        return await userService.register(user)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const loginUser = createAsyncThunk('auth/user-login',async(user,thunkApi)=>{
    try{
        return await userService.login(user)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const updateUser = createAsyncThunk('auth/user-update',async(user,thunkApi)=>{
    try{
        return await userService.updateUser(user)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const forgotPasswordToken = createAsyncThunk('auth/forgot-password-token',async(user,thunkApi)=>{
    try{
        return await userService.forgotPasswordToken(user)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const resetPasswordToken = createAsyncThunk('auth/reset-password-token',async(user,thunkApi)=>{
    try{
        return await userService.resetPasswordToken(user)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const getUserWishList = createAsyncThunk('auth/user-wishlist',async(thunkApi)=>{
    try{
        return await userService.getUserWishList()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const addToCart = createAsyncThunk('auth/add-cart',async(cartData,thunkApi)=>{
    try{
        return await userService.addToCart(cartData)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const getUserCart = createAsyncThunk('auth/get-cart',async(thunkApi)=>{
    try{
        return await userService.getUserCart()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const removeFromCart = createAsyncThunk('auth/delete-form-cart',async(id,thunkApi)=>{
    try{
        return await userService.removeFromCart(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const updateCartWithQuantity = createAsyncThunk('auth/update-cart',async(data,thunkApi)=>{
    try{
        return await userService.updateCartWithQuantity(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const createOrder = createAsyncThunk('auth/create-order',async(data,thunkApi)=>{
    try{
        return await userService.createOrder(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const getMyOrders = createAsyncThunk('auth/get-my-order',async(thunkApi)=>{
    try{
        return await userService.getMyOrders()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})


const initialState = {
    user:getCustomerFromLocalStorage,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')
export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.createdUser = action.payload
            if(state.isSuccess == true){
                toast.info("User Created")
            }
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.user = null
            if(state.isError == true){
                toast.error(action.error)
            }
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            if(state.isSuccess == true){
                localStorage.setItem("token",action.payload.token)
                toast.info("User logedIN")
            }
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.user = null
            if(state.isError){
                toast.error(action.payload.response.data.message)
            }
        })
        .addCase(updateUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            if(state.isSuccess == true){
                localStorage.setItem("token",action.payload.refreshToken)
                toast.info("User Updated Successfully")
            }
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.user = null
            if(state.isError == true){
                toast.error(action.error)
            }
        })

        .addCase(forgotPasswordToken.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(forgotPasswordToken.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.token = action.payload
            toast.info("Mail Sent Successfully")
        })
        .addCase(forgotPasswordToken.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.token = null
            if(state.isError == true){
                toast.error(action.error)
            }
        })
        .addCase(resetPasswordToken.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(resetPasswordToken.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.pass = action.payload
            toast.info("Password reset Successfully")
        })
        .addCase(resetPasswordToken.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.pass = null
            if(state.isError == true){
                toast.error(action.error)
            }
        })
        .addCase(getUserWishList.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getUserWishList.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.userWishList = action.payload
        })
        .addCase(getUserWishList.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.userWishList = null
        })
        .addCase(addToCart.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.cartData = action.payload
            if(state.isSuccess){
                toast.success("Product Added to cart")
            }

        })
        .addCase(addToCart.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.cartData = null
        })
        .addCase(getUserCart.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getUserCart.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.userCart = action.payload
        })
        .addCase(getUserCart.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.getUserCart = null
        })
        .addCase(removeFromCart.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(removeFromCart.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.deletedCartProduct = action.payload
            if(state.isSuccess){
                toast.success('Product removed from cart')
            }
        })
        .addCase(removeFromCart.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.deletedCartProduct = null
        })
        .addCase(updateCartWithQuantity.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateCartWithQuantity.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.updatedCartProduct = action.payload
        })
        .addCase(updateCartWithQuantity.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.updatedCartProduct = null
        })
        .addCase(createOrder.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createOrder.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.orderDetails = action.payload
        })
        .addCase(createOrder.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.orderDetails = null
        })
        .addCase(getMyOrders.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getMyOrders.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.myOrders = action.payload
        })
        .addCase(getMyOrders.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.myOrders = null
        })
        .addCase(resetState,()=> initialState)
    }
})

export default authSlice.reducer