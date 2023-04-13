import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { login, signUp } from "../context/GlobalStateAction";
import GlobalStateContext from "../context/GlobalStateContext";

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
    const { dispatch } = useContext(GlobalStateContext);

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

    const onSubmit = async (value, { resetForm }) => {
      if (type === "LOGIN") return login(dispatch, value, resetForm);
      if (type === "SIGNUP") return signUp(dispatch, value, resetForm);
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
