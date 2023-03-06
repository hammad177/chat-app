import React, { useState } from "react";
import { HStack, Text, Stack, Pressable } from "native-base";
import SignUp from "./SignUp";
import Login from "./Login";

const RegisterUser = () => {
  const [type, setType] = useState("LOGIN");

  return (
    <Stack space={5} w="80%" maxW={"350px"} mx="auto">
      <HStack>
        <Pressable
          w="50%"
          backgroundColor={type === "LOGIN" ? "#5984de" : "blueGray.200"}
          alignItems="center"
          py="10px"
          borderRadius="sm"
          onPress={() => setType("LOGIN")}
        >
          <Text
            fontSize="xl"
            color={type === "LOGIN" ? "#fff" : "blueGray.500"}
          >
            LOGIN
          </Text>
        </Pressable>
        <Pressable
          w="50%"
          backgroundColor={type === "SIGNUP" ? "#5984de" : "blueGray.200"}
          alignItems="center"
          py="10px"
          borderRadius="sm"
          onPress={() => setType("SIGNUP")}
        >
          <Text
            fontSize="xl"
            color={type === "SIGNUP" ? "#fff" : "blueGray.500"}
          >
            SIGNUP
          </Text>
        </Pressable>
      </HStack>
      {type === "LOGIN" ? <Login /> : <SignUp />}
    </Stack>
  );
};

export default RegisterUser;
