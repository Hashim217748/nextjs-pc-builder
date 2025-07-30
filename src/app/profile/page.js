"use client";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Link from "next/link";
import ErrorMessage from "../Components/ErrorMessage";
import { useState } from "react";
export default function myForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    email: yup.string().email().required().label("Email"),
    password: yup.string().label("Password"),
  });
  return (
    <div className="flex justify-center min-h-screen w-full bg-main"></div>
  );
}
