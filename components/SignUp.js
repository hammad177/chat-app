import React from "react";
import HOCRegister from "./HOCRegister";
import RegisterForm from "./RegisterForm";

const SignUp = (props) => {
  return <RegisterForm {...props} />;
};

export default HOCRegister(SignUp, "SIGNUP");
