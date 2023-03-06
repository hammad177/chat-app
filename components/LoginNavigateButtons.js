import React from "react";
import { VStack, Button, Text } from "native-base";
import { useLinkTo } from "@react-navigation/native";

const LoginNavigateButtons = () => {
  const LinkTo = useLinkTo();

  return (
    <VStack space={3} w="80%" maxW="350px">
      <Button
        backgroundColor="#043e7d"
        size="lg"
        onPress={() => LinkTo("/create-room")}
      >
        <Text fontSize="lg" color="#fff" fontWeight="bold">
          Create New Room
        </Text>
      </Button>
      <Button
        backgroundColor="#4669b2"
        size="lg"
        onPress={() => LinkTo("/search-room")}
      >
        <Text fontSize="lg" color="#fff" fontWeight="bold">
          Search Rooms
        </Text>
      </Button>
    </VStack>
  );
};

export default LoginNavigateButtons;
