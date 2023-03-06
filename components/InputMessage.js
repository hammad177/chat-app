import { Box, Input } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

const InputMessage = () => {
  return (
    <Box
      mx="20px"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      py="15px"
      maxH="100px"
    >
      <Input
        w="90%"
        selectionColor={"#379"}
        size={"lg"}
        placeholder="type ..."
        multiline
        borderRadius="30px"
        h="100%"
        px="18px"
      />
      <Ionicons color="#4669b2" size={25} name="ios-send" />
    </Box>
  );
};

export default InputMessage;
