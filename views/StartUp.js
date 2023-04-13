import React, { useContext } from "react";
import { Box, Stack, Text, Heading, HStack, IconButton } from "native-base";
import LogoutIcon from "react-native-vector-icons/AntDesign";
import RegisterUser from "../components/RegisterUser";
import RoomContainer from "../components/RoomContainer";
import GlobalStateContext from "../context/GlobalStateContext";
import { logout } from "../context/GlobalStateAction";

const StartUp = () => {
  const {
    state: { isSignIn },
    dispatch,
  } = useContext(GlobalStateContext);

  return (
    <Box
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
      bgColor={"gray.100"}
      position="relative"
    >
      <Stack marginBottom={"20px"}>
        <Heading fontWeight={"bold"} fontSize="5xl" color="#379">
          Chat App
        </Heading>
        <Text fontSize={"md"} color="blueGray.500">
          Join room and communicate with your friends
        </Text>
      </Stack>

      {!isSignIn ? (
        // sign up and login components
        <RegisterUser />
      ) : (
        // join room options
        <>
          <HStack
            position="absolute"
            w="100%"
            top="8%"
            justifyContent="flex-end"
            pr="10%"
          >
            <IconButton
              backgroundColor="#111"
              variant="solid"
              onPress={() => logout(dispatch)}
              _icon={{
                as: <LogoutIcon name="logout" />,
                name: "logout",
              }}
            />
          </HStack>
          <RoomContainer />
        </>
      )}
    </Box>
  );
};

export default StartUp;
