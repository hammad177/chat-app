import React, { useContext } from "react";
import { HStack, Text } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import { leaveRoom } from "../context/GlobalStateAction";
import GlobalStateContext from "../context/GlobalStateContext";

const MessageTopbar = () => {
  const {
    dispatch,
    state: {
      room: { name },
    },
  } = useContext(GlobalStateContext);
  return (
    <HStack
      borderBottomColor="#ddd"
      borderBottomStyle="solid"
      borderBottomWidth="1"
      mx="20px"
      h="60px"
      px="10px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text fontSize="2xl" color="#4669b2" isTruncated>
        {name}
      </Text>
      <AntDesign
        name="logout"
        size={26}
        color="#043e7d"
        onPress={() => leaveRoom(dispatch)}
      />
    </HStack>
  );
};

export default MessageTopbar;
