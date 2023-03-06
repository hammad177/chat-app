import { Box } from "native-base";
import { StatusBar } from "react-native";
import React from "react";
import MessageTopbar from "../components/MessageTopbar";
import MessagesContainer from "../components/MessagesContainer";
import InputMessage from "../components/InputMessage";

const MessagesScreen = () => {
  return (
    <Box flex="1" mt={StatusBar.currentHeight}>
      <MessageTopbar />
      <Box flex="1" justifyContent="flex-end">
        <MessagesContainer />
        <InputMessage />
      </Box>
    </Box>
  );
};

export default MessagesScreen;
