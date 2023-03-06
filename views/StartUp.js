import React from "react";
import { Box, Stack, Text, Heading } from "native-base";
import RegisterUser from "../components/RegisterUser";
import RoomContainer from "../components/RoomContainer";

const StartUp = () => {
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
      {/* sign up and login components */}
      {/* <RegisterUser /> */}

      {/* join room options */}
      <RoomContainer />
    </Box>
  );
};

export default StartUp;
