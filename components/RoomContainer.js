import React, { useState } from "react";
import {
  Divider,
  VStack,
  Button,
  Text,
  Pressable,
  HStack,
  Stack,
} from "native-base";
import { useLinkTo } from "@react-navigation/native";
import PrivateRoom from "./PrivateRoom";
import PublicRoom from "./PublicRoom";

const RoomContainer = () => {
  const LinkTo = useLinkTo();
  const [isPublic, setIsPublic] = useState(true);

  return (
    <>
      <Stack space={5} w="80%" maxW={"350px"} mx="auto">
        <HStack>
          <Pressable
            w="50%"
            backgroundColor={isPublic ? "#5984de" : "blueGray.200"}
            alignItems="center"
            py="10px"
            borderRadius="sm"
            onPress={() => setIsPublic(true)}
          >
            <Text fontSize="xl" color={isPublic ? "#fff" : "blueGray.500"}>
              PUBLIC
            </Text>
          </Pressable>
          <Pressable
            w="50%"
            backgroundColor={!isPublic ? "#5984de" : "blueGray.200"}
            alignItems="center"
            py="10px"
            borderRadius="sm"
            onPress={() => setIsPublic(false)}
          >
            <Text fontSize="xl" color={!isPublic ? "#fff" : "blueGray.500"}>
              PRIVATE
            </Text>
          </Pressable>
        </HStack>
        {isPublic ? <PublicRoom /> : <PrivateRoom />}
      </Stack>
      <Divider my={"15px"} w="80%" maxW="350px" />
      <VStack space={4} w="80%" maxW="350px">
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
    </>
  );
};

export default RoomContainer;
