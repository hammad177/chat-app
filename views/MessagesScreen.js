import { Box } from "native-base";
import { StatusBar } from "react-native";
import React, { useContext, useEffect } from "react";
import MessageTopbar from "../components/MessageTopbar";
import MessagesContainer from "../components/MessagesContainer";
import InputMessage from "../components/InputMessage";
import { SocketContext } from "../context/SocketContext";
import GlobalStateContext from "../context/GlobalStateContext";
import { addMessage } from "../context/GlobalStateAction";

const MessagesScreen = () => {
  const socket = useContext(SocketContext);
  const {
    dispatch,
    state: {
      room: { code },
    },
  } = useContext(GlobalStateContext);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join-room", { room_code: code });
    });
    socket.on("receive-message", (response) => {
      addMessage(dispatch, response);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

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
