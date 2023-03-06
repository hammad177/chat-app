import React, { useState, useRef, useContext } from "react";
import {
  Text,
  Button,
  Input,
  Stack,
  FormControl,
  WarningOutlineIcon,
  HStack,
  Switch,
} from "native-base";
import { useFormik } from "formik";
import * as yup from "yup";
import GlobalStateContext from "../context/GlobalStateContext";
import { createRoom } from "../context/GlobalStateAction";

const NewRoomForm = () => {
  const PasswordRef = useRef();
  const { state, dispatch } = useContext(GlobalStateContext);
  // initial form state
  const initialValues = {
    room_name: "",
    is_public: true,
    password: "",
  };
  // form validation schema
  const validationSchema = yup.object().shape({
    room_name: yup
      .string()
      .min(4, "min length 4")
      .max(12, "max length 12")
      .required("room name is required"),
    password: yup.string().when("is_public", {
      is: false,
      then: yup
        .string()
        .min(6, "min length 6")
        .max(20, "max length 20")
        .required("password is required for private room"),
    }),
    is_public: yup.boolean(),
  });
  // submit form
  const onSubmit = async (value, { resetForm }) => {
    // await createRoom(dispatch, value, resetForm);
    console.log(value);
  };

  // init formik hook
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  // handle room privacy toggle field
  const handleRoomPrivacy = () => setFieldValue("is_public", !values.is_public);

  return (
    <Stack space={5} w="85%" maxW="350px" mt="20px">
      <FormControl isInvalid={touched.room_name && errors.room_name}>
        <Input
          selectionColor={"#379"}
          size={"lg"}
          placeholder="Enter room name ..."
          onChangeText={handleChange("room_name")}
          onBlur={handleBlur("room_name")}
          value={values.room_name}
          returnKeyType={values.is_public ? "done" : "next"}
          blurOnSubmit={values.is_public ? true : false}
          onSubmitEditing={() =>
            !values.is_public && PasswordRef.current.focus()
          }
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errors.room_name}
        </FormControl.ErrorMessage>
      </FormControl>
      {!values.is_public && (
        <FormControl isInvalid={touched.password && errors.password}>
          <Input
            ref={PasswordRef}
            selectionColor={"#379"}
            size={"lg"}
            secureTextEntry={true}
            autoCapitalize={"none"}
            placeholder="Enter Room Password ..."
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.password}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
      <HStack alignItems="center" justifyContent="space-between" px="10px">
        <Text fontSize="md" color="blueGray.600">
          Public Room ?
        </Text>
        <Switch
          size="md"
          isChecked={values.is_public}
          onToggle={handleRoomPrivacy}
        />
      </HStack>
      <Button
        size={"lg"}
        isLoading={state.isLoading}
        isLoadingText="Creating ..."
        onPress={handleSubmit}
      >
        <Text color={"#fff"} fontWeight="bold" fontSize={"lg"}>
          Create
        </Text>
      </Button>
    </Stack>
  );
};

export default NewRoomForm;
