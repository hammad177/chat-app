import React from "react";
import HOCRegister from "./HOCRegister";
import RegisterForm from "./RegisterForm";

const Login = (props) => {
  return <RegisterForm {...props} />;
};

export default HOCRegister(Login, "LOGIN");
