import React, { useContext } from "react";
import { Heading, HStack, IconButton, Text } from "native-base";
import { ToastAndroid } from "react-native";
import ClipboardIcon from "react-native-vector-icons/FontAwesome5";
import * as Clipboard from "expo-clipboard";
import GlobalStateContext from "../context/GlobalStateContext";

const RoomCodeClipboard = () => {
  const { state } = useContext(GlobalStateContext);
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(state?.newRoomCode);
    ToastAndroid.show(
      "copy to clipboard",
      ToastAndroid.BOTTOM,
      ToastAndroid.SHORT
    );
  };
  return (
    <>
      {state?.newRoomCode && (
        <>
          <Heading mt="20px" color="#379">
            Room Code
          </Heading>
          <HStack
            borderColor="#aaa"
            borderWidth="1"
            borderStyle="solid"
            rounded="md"
            w="85%"
            maxW="350px"
            mt="10px"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text px="15px" fontSize="md" color="#444" w="85%" isTruncated>
              {state?.newRoomCode}
            </Text>
            <IconButton
              size="lg"
              variant="ghost"
              pr="5px"
              onPress={copyToClipboard}
              _icon={{
                as: <ClipboardIcon name="clipboard" />,
                name: "clipboard",
              }}
            />
          </HStack>
        </>
      )}
    </>
  );
};

export default RoomCodeClipboard;
