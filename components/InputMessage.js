import { Box, Input, IconButton, Spinner } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useContext, useRef, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { addMessage } from "../context/GlobalStateAction";
import GlobalStateContext from "../context/GlobalStateContext";

const InputMessage = () => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messageRef = useRef();
  const socket = useContext(SocketContext);
  const {
    dispatch,
    state: {
      room: { code },
      userId,
    },
  } = useContext(GlobalStateContext);

  const sendMessage = () => {
    setIsSending(true);
    if (message !== "") {
      messageRef.current.clear();
      const response = {
        room_code: code,
        message,
        sent_by: userId,
        sent_to: code,
        sent_at: new Date().toISOString(),
      };
      addMessage(dispatch, response);
      socket.emit("send-message", response);
    }
    setIsSending(false);
  };

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
        ref={messageRef}
        w="90%"
        selectionColor={"#379"}
        size={"lg"}
        placeholder="type ..."
        multiline
        borderRadius="30px"
        h="100%"
        px="18px"
        onChangeText={(text) => setMessage(text)}
      />
      <IconButton
        variant="solid"
        onPress={sendMessage}
        background="#4669b2"
        borderRadius="full"
        size="md"
        _icon={{
          as: isSending ? (
            <Spinner color="#fff" />
          ) : (
            <Ionicons name="ios-send" />
          ),
          name: "ios-send",
        }}
      />
    </Box>
  );
};

export default InputMessage;
