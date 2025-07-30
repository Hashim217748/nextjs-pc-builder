"use client";
import { Formik } from "formik";
import * as yup from "yup";
import Screen from "../Components/Screen";
import Image from "next/image";
import axios from "axios";
import User from "../../../user";
import Link from "next/link";
import { useState } from "react";
import ErrorMessage from "../Components/ErrorMessage";
import { ErrorOutline } from "@mui/icons-material";

export default function myForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = yup.object().shape({
    email: yup.string().email().required().label("Email"),
    password: yup.string().min(4).label("Password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  return (
    <div className="flex justify-center min-h-screen w-full bg-main">
      <Formik
        onSubmit={async (values) => {
          try {
            const { confirmPassword, ...filteredValues } = values;
            const response = await axios.post("/api/SignUp", filteredValues);
            localStorage.setItem("token", response.data.token);
            window.location.replace("/Builder");
          } catch (error) {
            if (error.response && error.response.status === 401) {
              setErrorMessage(error.response.data.error);
            }
          }
        }}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ values, handleSubmit, handleChange, errors }) => (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-200 max-h-max pb-20 m-5 rounded-3xl w-2/3 px-20 flex justify-center flex-col font-funnel font-semibold"
          >
            {/* <Image
              alt="logo"
              className="mt-0 justify-center align-middle text-center m-auto h-42 w-auto mb-0"
              src={require("@/app/assets/logo.png")}
            ></Image> */}
            <span className="text-5xl font-extrabold text-center m-4 mt-10 mb-20">
              SignUp
            </span>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <input
              onChange={handleChange}
              className="p-2 m-1 rounded-2xl"
              name="email"
              type="text"
              value={values.email}
              placeholder="Email"
            />
            <span className="text-red-600 mb-5 font-bold">{errors.email}</span>
            <input
              onChange={handleChange}
              value={values.password}
              className="p-2  m-1 rounded-2xl"
              name="password" // Add the name attribute
              type="password"
              placeholder="Password"
            />
            <span className="text-red-600 mb-5 font-bold">
              {errors.password}
            </span>
            <input
              onChange={handleChange}
              value={values.confirmPassword}
              className="p-2 m-1  rounded-2xl"
              name="confirmPassword" // Add the name attribute
              type="password"
              placeholder="Confirm Password"
            />
            <span className="text-red-600 mb-2 font-bold">
              {errors.confirmPassword}
            </span>

            <button
              type="submit"
              className="p-2 mt-5 bg-secondary  rounded-2xl hover:text-white"
            >
              Submit
            </button>
            <span className="text-center mt-5 mb-0 font-funnel text-xl font-bold">
              Already have an Account?{" "}
              <Link className="text-blue-600 hover:underline" href="/Login">
                Login
              </Link>
            </span>
          </form>
        )}
      </Formik>
    </div>
  );
}
