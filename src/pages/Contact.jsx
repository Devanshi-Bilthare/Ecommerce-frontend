import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import { IoHome, IoMail } from 'react-icons/io5'
import { IoMdCall } from 'react-icons/io'
import { PiTimerFill } from 'react-icons/pi'
import CustomInput from '../components/CustomInput'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { createEnquiry } from '../features/contact/contactSlice'

let contactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is required"),
  mobile: Yup.number().required("Mobile is required"),
  comment: Yup.string().required("Comment is required"),
});

const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name:"",
      email: "",
      mobile:"",
      comment:""
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createEnquiry(values));
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.contact
  );
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    } else {
      navigate("");
    }
  }, [isLoading, isError, isSuccess]);

  return (
    <div className='px-[5%] py-10 bg-[#F5F5F7]'>
      <BreadCrumb title='Contact'/>
      
        <iframe className='w-full h-[400px]' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29319.99937279767!2d77.34636271282585!3d23.279452555620104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c67c17bb8f853%3A0xd813d253620bd949!2sLalghati%2C%20Bhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1722515001904!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        <div className='w-full my-10 bg-white flex flex-col md:flex-row py-5 justify-between'>
          <form action="" onSubmit={formik.handleSubmit} className='w-full md:w-[40%] flex flex-col px-5 gap-5'>
            <h2 className='text-2xl font-semibold'>Contact</h2>
            <CustomInput 
              type="text" 
              placeholder='Enter Your Name' 
              name='name'
              onCh={formik.handleChange("name")}
              val={formik.values.name}
            />
             <div className="text-red-400 ms-2 mt-2 text-sm">
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>
            <CustomInput 
              type="email" 
              placeholder='Enter Your Email' 
              name="email" 
              onCh={formik.handleChange("email")}
              val={formik.values.email}
            />
             <div className="text-red-400 ms-2 mt-2 text-sm">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
            <CustomInput 
              type="text"
               placeholder='Enter Your Number' 
               name="mobile"
               onCh={formik.handleChange("mobile")}
               val={formik.values.mobile}
            />
             <div className="text-red-400 ms-2 mt-2 text-sm">
            {formik.touched.mobile && formik.errors.mobile ? (
              <div>{formik.errors.mobile}</div>
            ) : null}
          </div>
            <textarea 
              className='w-full h-[150px] border p-2 text-xl outline-none rounded-xl' 
              placeholder='Comment' 
              name="comment"
              onChange={formik.handleChange("comment")}
              value={formik.values.comment}
            ></textarea>
             <div className="text-red-400 ms-2 mt-2 text-sm">
            {formik.touched.comment && formik.errors.comment ? (
              <div>{formik.errors.comment}</div>
            ) : null}
          </div>
            <button type='submit' className='uppercase bg-[#232F3E] text-white px-7 py-4 rounded-[30px]'>Submit</button>
          </form>
          <div className='w-full md:w-[40%] mt-10 md:mt-0 flex flex-col px-5 gap-5 text-gray-500'>
            <h2 className='text-2xl font-semibold text-black'>Get In Touch With Us</h2>
            <div className='flex gap-2 items-center'>
              <IoHome />
              <p className='text-sm'>33 New Mangomerry Street 750 san Fransico CA USA 94532</p>
            </div>
            <div className='flex gap-2 items-center'>
              <IoMdCall/>
              <p className='text-sm '>(+91) 7654323456</p>
            </div>
            <div className='flex gap-2 items-center'>
              <IoMail />
              <p className='text-sm '>check@checkgmail.com</p>
            </div>
            <div className='flex gap-2 items-center'>
            <PiTimerFill />
              <p className='text-sm'>Monday - Friday 10AM - 8PM</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Contact