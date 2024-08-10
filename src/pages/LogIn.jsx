import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "../features/user/userSlice";

let userSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess]);
  
  return (
    <>
      <BreadCrumb title="Login" />
      <div className="w-full py-20 px-[5%] flex justify-center items-center bg-[#F5F5F7]">
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="w-full md:w-[40vw] p-5 bg-white rounded-xl"
        >
          <h2 className="text-3xl font-semibold text-center">Login</h2>
          <CustomInput
            type="email"
            placeholder="Email"
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
            type="password"
            placeholder="Password"
            name="password"
            onCh={formik.handleChange("password")}
            val={formik.values.password}
            classname="mb-5"
          />
          <div className="text-red-400 ms-2 my-2 text-sm">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <Link
            to="/forgot-password"
            className="ms-2 text-blue-400 font-medium"
          >
            Forgot your password?
          </Link>
          <div className="flex gap-2 justify-center my-5">
            <button className="uppercase bg-[#232F3E] hover:bg-amber-500 text-white px-7 py-3 rounded-[30px]">
              Login
            </button>
            <Link
              to="/signup"
              className="uppercase hover:bg-amber-500 bg-[#232F3E] text-white px-7 py-3 rounded-[30px]"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogIn;
