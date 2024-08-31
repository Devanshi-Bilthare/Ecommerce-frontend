import React, { useEffect, useState } from 'react'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/breadcrumbs";
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import CustomInput from './CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import {config} from '../utils/config'
import { createOrder } from '../features/user/userSlice';


let shippingSchema = Yup.object().shape({
  firstName: Yup.string().required("FirstName is required"),
  lastName: Yup.string().required("LastName is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  other: Yup.string(),
  pincode: Yup.number().required("PinCode is required"),
  country: Yup.string().required("country is required"),
 
});

const CheckOutDetails = () => {
  const dispatch = useDispatch()
  const cartState = useSelector(state => state.auth.userCart)
  const [cartTotal,setCartTotal] = useState(null)
  const [productDetail,setProductDetail] = useState([])

  useEffect(()=>{
    let tot = 0
    let items= []
    for(let idx = 0;idx < cartState?.length;idx++){
      tot += cartState[idx]?.price * cartState[idx]?.quantity
      items.push({
        product:cartState[idx]?.productId._id,
        quantity:cartState[idx]?.quantity,
        color:cartState[idx]?.color._id,
        price:cartState[idx]?.price
      })
    }
    
    setProductDetail(items)
    setCartTotal(tot)
  },[cartState])
  
  
  const formik = useFormik({
    initialValues: {
      firstName:"",
      lastName:"",
      address:"",
      city:"",
      state:"",
      other:"",
      country:"",
      pincode:""
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      checkOutHandler(values)
        
    },
  });
  const loadScript = (src)=>{
    return new Promise((resolve)=>{
      const script = document.createElement("script")
      script.src = src
      script.onload = ()=>{
        resolve(true)
      }
      script.onerror = () =>{
        resolve(false)
      }

      document.body.appendChild(script)
    })
  }

  const checkOutHandler = async (shippingInfo)=>{
    const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if(!response){
      alert("razorPay SDK failed to load")
      return
    }

    const result = await axios.post('https://ecommerce-backend-4-m3na.onrender.com/api/user/order/checkout',{amount:cartTotal},config)
    if(!result){
      alert("something went wrong")
      return 
    }

    const {amount,id:order_id,currency} = result.data.order
    console.log(amount)
    const options = {
      key: "rzp_test_gpCBVNamBYgZkc", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Digitic",
      description: "Test Transaction",
     
      order_id: order_id,
      handler: async function (response) {
          const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              // razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post("https://ecommerce-backend-4-m3na.onrender.com/api/user/order/paymentVerification", data,config);  

            console.log(shippingInfo)

            dispatch(createOrder({
              totalPrice:cartTotal,
              totalPriceAfterDiscount:cartTotal,
              orderItems: productDetail,
              shippingInfo,
              paymentInfo:{
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
              },
            }));
        },

      prefill: {
          name: "Digitic",
          email: "digitic@example.com",
          contact: "9999999999",
      },
      notes: {
          address: "digitic Corporate Office",
      },
      theme: {
          color: "#61dafb",
      },
  };

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }
  // console.log(paymentInfo)

  return (
    <div className='w-full md:w-[50%] bg-white border-2 py-10 px-5'>
        <h2 className='text-3xl font-medium text-black'>Digitic</h2>
        <Breadcrumbs className='mt-5'>
            <BreadcrumbItem>Cart</BreadcrumbItem>
            <BreadcrumbItem>Information</BreadcrumbItem>
            <BreadcrumbItem>Shipping</BreadcrumbItem>
            <BreadcrumbItem>Payment</BreadcrumbItem>
        </Breadcrumbs>
        <h2 className='text-2xl mt-5 text-black'>Contact Information</h2>
        <p className='text-xl mt-2 text-gray-400'>devanshibilthare54@gmail.com</p>
        <h2 className='text-2xl mt-5 text-black'>Shipping Address</h2>
        <form action="" onSubmit={formik.handleSubmit}  className='mb-10'>
          <select className='w-full p-3 text-xl outline-none border rounded-xl px-5 mt-5'>
            <option>Saved Address</option>
          </select>
          <select className='w-full p-3 text-xl outline-none border rounded-xl px-5 mt-5' name='country'
              onChange={formik.handleChange("country")}
              value={formik.values.country}>
            <option value="India">India</option>
            <option value="China" >China</option>
          </select>
          <div className="text-red-400 ms-2 mt-2 text-sm">
            {formik.touched.country && formik.errors.country ? (
              <div>{formik.errors.country}</div>
            ) : null}
          </div>
          <div className='flex gap-2'>
            <CustomInput type="text" placeholder='First Name'  name='firstName'
              onCh={formik.handleChange("firstName")}
              val={formik.values.firstName}  />
               <div className="text-red-400 ms-2 mt-2 text-sm">
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
          </div>
            <CustomInput type="text" placeholder='Last Name' name='lastName'
              onCh={formik.handleChange("lastName")}
              val={formik.values.lastName} />
               <div className="text-red-400 ms-2 mt-2 text-sm">
            {formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
            ) : null}
          </div>
          </div>
          <CustomInput type="text" placeholder='Address' name='address'
              onCh={formik.handleChange("address")}
              val={formik.values.address} />
               <div className="text-red-400 ms-2 mt-2 text-sm">
            {formik.touched.address && formik.errors.address ? (
              <div>{formik.errors.address}</div>
            ) : null}
          </div>
          <CustomInput type="text" placeholder='Apartment City, etc,(optional'  name='other'
              onCh={formik.handleChange("other")}
              val={formik.values.other}/>
               <div className="text-red-400 ms-2 mt-2 text-sm">
            {formik.touched.other && formik.errors.other ? (
              <div>{formik.errors.other}</div>
            ) : null}
          </div>
          <div className='flex gap-2'>
            <CustomInput type="text" placeholder='city' name='city'
              onCh={formik.handleChange("city")}
              val={formik.values.city}  />
               <div className="text-red-400 ms-2 mt-2 text-sm">
            {formik.touched.city && formik.errors.city ? (
              <div>{formik.errors.city}</div>
            ) : null}
          </div>
            <select className='w-full p-3 text-xl outline-none border rounded-xl px-5 mt-5' name='state'
              onChange={formik.handleChange("state")}
              value={formik.values.state} >
            <option value="State">State</option>
            <option value="MP">MP</option>
            </select>
            <div className="text-red-400 ms-2 mt-2 text-sm">
            {formik.touched.state && formik.errors.state ? (
              <div>{formik.errors.state}</div>
            ) : null}
          </div>
            <CustomInput type="text" placeholder='Zip Code' name='pincode'
              onCh={formik.handleChange("pincode")}
              val={formik.values.pincode} />
               <div className="text-red-400 ms-2 mt-2 text-sm">
            {formik.touched.pincode && formik.errors.pincode ? (
              <div>{formik.errors.pincode}</div>
            ) : null}
          </div>
          </div>

          <div className='flex justify-between md:items-center mt-10 flex-col md:flex-row gap-5 md:gap-0 items-start'>
            <Link to='/cart' className='flex gap-2 items-center text-xl'> <MdOutlineArrowBackIos /> Return To Cart </Link>
            {/* <Link to='' className='uppercase hover:bg-amber-500 bg-[#232F3E] text-white px-7 py-4 rounded-[30px]'>Continue To Shiping</Link> */}
            <button className='uppercase hover:bg-amber-500 bg-[#232F3E] text-white px-7 py-4 rounded-[30px]' type='submit'>Buy Now</button>
          </div>
        </form>
    </div>
  )
}

export default CheckOutDetails