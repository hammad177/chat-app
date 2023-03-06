import React from "react";
import { HStack, Text } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";

const MessageTopbar = () => {
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
        Room Title Room
      </Text>
      <AntDesign name="logout" size={26} color="#043e7d" />
    </HStack>
  );
};

export default MessageTopbar;
