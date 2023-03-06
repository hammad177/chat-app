import React from "react";
import { Box, Stack, Text, Heading, Divider } from "native-base";
import JoinRoomForm from "../components/JoinRoomForm";
import LoginNavigateButtons from "../components/LoginNavigateButtons";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Box
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
      bgColor={"gray.100"}
    >
      <Stack marginBottom={"20px"}>
        <Heading fontWeight={"bold"} fontSize="5xl" color="#379">
          Chat App
        </Heading>
        <Text fontSize={"md"} color="blueGray.500">
          Join room and communicate with your friends
        </Text>
      </Stack>
      <LoginForm />
      {/* <JoinRoomForm />
      <Divider my={"15px"} w="80%" maxW="350px" />
      <LoginNavigateButtons /> */}
    </Box>
  );
};

export default Login;
