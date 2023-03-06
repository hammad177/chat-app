import React, { useRef } from "react";
import {
  Button,
  FormControl,
  Input,
  Stack,
  Text,
  HStack,
  Pressable,
} from "native-base";
import { useFormik } from "formik";
import * as yup from "yup";

const LoginForm = () => {
  const PasswordRef = useRef();
  const NameRef = useRef();
  // form initial state
  const initialValues = {
    email: "",
    display_name: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("enter valid email address")
      .required("email is required field"),
    display_name: yup.string().when("is_login", {
      is: false,
      then: yup.string().required("enter room password"),
    }),
    password: yup
      .string()
      .min(6, "min length 6")
      .max(20, "max length 20")
      .required("password is required field"),
    is_login: yup.boolean(),
  });

  const onSubmit = (value, { resetForm }) => {};

  const { handleChange, setFieldValue, handleSubmit, values, errors } =
    useFormik({
      initialValues,
      validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit,
    });

  const changeRoom = (val) => setFieldValue("is_login", val);
  return (
    <Stack space={5} w="80%" maxW={"350px"} mx="auto">
      <HStack>
        <Pressable
          w="50%"
          backgroundColor={values?.is_login ? "#5984de" : "blueGray.200"}
          alignItems="center"
          py="10px"
          borderRadius="sm"
          onPress={() => changeRoom(true)}
        >
          <Text
            fontSize="xl"
            color={values?.is_login ? "#fff" : "blueGray.500"}
          >
            LOGIN
          </Text>
        </Pressable>
        <Pressable
          w="50%"
          backgroundColor={!values?.is_login ? "#5984de" : "blueGray.200"}
          alignItems="center"
          py="10px"
          borderRadius="sm"
          onPress={() => changeRoom(false)}
        >
          <Text
            fontSize="xl"
            color={!values?.is_login ? "#fff" : "blueGray.500"}
          >
            SIGNUP
          </Text>
        </Pressable>
      </HStack>
      <FormControl isInvalid={errors.email}>
        <Input
          selectionColor={"#379"}
          onChangeText={handleChange("email")}
          value={values.email}
          size={"lg"}
          placeholder="johndoe@gamil.com"
          returnKeyType={"next"}
          keyboardType={"email-address"}
          blurOnSubmit={false}
          onSubmitEditing={() =>
            values.is_login
              ? PasswordRef.current.focus()
              : NameRef.current.focus()
          }
        />
      </FormControl>
      {!values?.is_login ? (
        <FormControl isInvalid={errors.display_name}>
          <Input
            ref={NameRef}
            selectionColor={"#379"}
            onChangeText={handleChange("email")}
            value={values.email}
            size={"lg"}
            placeholder="john doe"
            returnKeyType={"next"}
            blurOnSubmit={false}
            onSubmitEditing={() => PasswordRef.current.focus()}
          />
        </FormControl>
      ) : null}
      <FormControl isInvalid={errors.password}>
        <Input
          ref={PasswordRef}
          selectionColor={"#379"}
          size={"lg"}
          placeholder="********"
          onChangeText={handleChange("password")}
          secureTextEntry={true}
          value={values.password}
        />
      </FormControl>
      <Button
        size={"lg"}
        isLoading={false}
        isLoadingText="Joining ..."
        onPress={handleSubmit}
      >
        <Text color={"#fff"} fontWeight="bold" fontSize={"lg"}>
          {values.is_login ? "Log In" : "Sign Up"}
        </Text>
      </Button>
    </Stack>
  );
};

export default LoginForm;
