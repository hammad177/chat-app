import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const HOCJoinRoom = (OriginalComponent, isPublic) => {
  function NewComponent() {
    // form initial state
    const publicValues = { room_code: "" };
    const privateValues = { ...publicValues, password: "" };

    const validationSchema = (TypePublic) => {
      const shape = {
        room_code: yup.string().required("enter valid room code"),
      };

      if (!TypePublic)
        shape.password = yup.string().required("enter room password");

      return yup.object().shape(shape);
    };

    const onSubmit = (value, { resetForm }) => {
      console.log(value);
    };

    const { handleChange, setFieldValue, handleSubmit, values, errors } =
      useFormik({
        initialValues: isPublic ? publicValues : privateValues,
        validationSchema: validationSchema(isPublic),
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
        isPublic={isPublic}
        setFieldValue={setFieldValue}
      />
    );
  }
  return NewComponent;
};

export default HOCJoinRoom;
