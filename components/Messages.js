import React from "react";
import { Text, View, Avatar, HStack, Pressable } from "native-base";
import dayjs from "dayjs";

const Messages = ({ item, userId }) => {
  const isCurrentUser = userId !== item?.sent_by;
  return (
    <View
      alignItems={isCurrentUser ? "flex-end" : "flex-start"}
      px="20px"
      mt="10px"
    >
      <HStack
        alignItems={isCurrentUser ? "flex-start" : "flex-end"}
        flexDirection={isCurrentUser ? "row-reverse" : "row"}
      >
        <Avatar bg="blue.500" size="sm" my="5px">
          HS
        </Avatar>
        <Pressable
          backgroundColor={isCurrentUser ? "#5d7dc8" : "#C3E3FF"}
          px="20px"
          py="10px"
          borderRadius="20px"
          borderTopRightRadius={isCurrentUser ? "none" : "20px"}
          borderBottomLeftRadius={isCurrentUser ? "20px" : "none"}
          maxW="70%"
          minW="80px"
          position="relative"
          mx="5px"
        >
          <Text color={isCurrentUser ? "#FFD" : "#444"} pb="10px">
            {item?.message}
          </Text>
          <Text
            color={isCurrentUser ? "#FFD" : "#444"}
            position="absolute"
            bottom="3px"
            right="20px"
            fontSize="11px"
          >
            {dayjs(item.sent_at).format("hh:mm a")}
          </Text>
        </Pressable>
      </HStack>
    </View>
  );
};

export default Messages;
