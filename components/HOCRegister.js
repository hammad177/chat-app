import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const HOCRegister = (OriginalComponent, type) => {
  function NewComponent() {
    // form initial state
    const LoginValues = {
      email: "",
      password: "",
    };
    const SignUpValue = {
      ...LoginValues,
      display_name: "",
    };

    const validationSchema = (validationType) => {
      if (validationType === "LOGIN") {
        return yup.object().shape({
          email: yup
            .string()
            .email("enter valid email address")
            .required("email is required field"),
          password: yup.string().required("password is required field"),
        });
      }
      return yup.object().shape({
        email: yup
          .string()
          .email("enter valid email address")
          .required("email is required field"),
        display_name: yup.string().required("enter your display name"),
        password: yup
          .string()
          .min(6, "min length 6")
          .max(20, "max length 20")
          .required("password is required field"),
      });
    };

    const onSubmit = (value, { resetForm }) => {
      console.log(`type: ${type}`, value);
    };

    const { handleChange, handleSubmit, values, errors } = useFormik({
      initialValues: type === "LOGIN" ? LoginValues : SignUpValue,
      validationSchema: validationSchema(type),
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit,
    });

    return (
      <OriginalComponent
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        errors={errors}
        type={type}
      />
    );
  }
  return NewComponent;
};

export default HOCRegister;
