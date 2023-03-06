import React from "react";
import { Text, View, Avatar, HStack, Pressable } from "native-base";

const Messages = ({ item }) => {
  return (
    <View alignItems={item ? "flex-end" : "flex-start"} px="20px" mt="10px">
      <HStack
        alignItems={item ? "flex-start" : "flex-end"}
        flexDirection={item ? "row-reverse" : "row"}
      >
        <Avatar bg="blue.500" size="sm" my="5px">
          HS
        </Avatar>
        <Pressable
          backgroundColor={item ? "#5d7dc8" : "#C3E3FF"}
          px="20px"
          py="10px"
          borderRadius="full"
          borderTopRightRadius={item ? "none" : "full"}
          borderBottomLeftRadius={item ? "full" : "none"}
          maxW="70%"
          minW="80px"
          position="relative"
          mx="5px"
        >
          <Text color={item ? "#FFD" : "#444"} pb="10px">
            ?
          </Text>
          <Text
            color={item ? "#FFD" : "#444"}
            position="absolute"
            bottom="3px"
            right="20px"
            fontSize="11px"
          >
            10:24 PM
          </Text>
        </Pressable>
      </HStack>
    </View>
  );
};

export default Messages;
