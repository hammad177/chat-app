import React, { useContext, useRef } from "react";
import { Button, FormControl, Input, Stack, Text } from "native-base";
import GlobalStateContext from "../context/GlobalStateContext";

const RegisterForm = ({ handleChange, handleSubmit, values, errors, type }) => {
  const PasswordRef = useRef();
  const NameRef = useRef();
  const isLogin = type === "LOGIN" ? true : false;
  const {
    state: { isSubmitting },
  } = useContext(GlobalStateContext);

  return (
    <Stack space={5} w="100%">
      <FormControl isInvalid={errors?.email}>
        <Input
          selectionColor={"#379"}
          onChangeText={handleChange("email")}
          value={values?.email}
          size={"lg"}
          placeholder="johndoe@gamil.com"
          returnKeyType={"next"}
          keyboardType={"email-address"}
          blurOnSubmit={false}
          onSubmitEditing={() =>
            isLogin ? PasswordRef.current.focus() : NameRef.current.focus()
          }
        />
      </FormControl>
      {!isLogin ? (
        <FormControl isInvalid={errors?.display_name}>
          <Input
            ref={NameRef}
            selectionColor={"#379"}
            onChangeText={handleChange("display_name")}
            value={values?.display_name}
            size={"lg"}
            placeholder="john doe"
            returnKeyType={"next"}
            blurOnSubmit={false}
            onSubmitEditing={() => PasswordRef.current.focus()}
          />
        </FormControl>
      ) : null}
      <FormControl isInvalid={errors?.password}>
        <Input
          ref={PasswordRef}
          selectionColor={"#379"}
          size={"lg"}
          placeholder="********"
          onChangeText={handleChange("password")}
          secureTextEntry={true}
          value={values?.password}
        />
      </FormControl>
      <Button
        size={"lg"}
        isLoading={isSubmitting}
        isLoadingText={isLogin ? "Logging In ..." : "Signing Up ..."}
        onPress={handleSubmit}
      >
        <Text color={"#fff"} fontWeight="bold" fontSize={"lg"}>
          {isLogin ? "Log In" : "Sign Up"}
        </Text>
      </Button>
    </Stack>
  );
};

export default React.memo(RegisterForm);
