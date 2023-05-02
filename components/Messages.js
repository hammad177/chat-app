import React from "react";
import { Text, View, Avatar, HStack, Pressable } from "native-base";
import dayjs from "dayjs";

const Messages = ({ item, userId, handleActionModal }) => {
  const isCurrentUser = userId === item?.sent_by;
  const openModal = (item) => {
    if (isCurrentUser) {
      handleActionModal({
        room_code: item?.sent_to,
        message_id: item?._id,
        message: item?.message,
      });
    }
  };
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
          minW="90px"
          position="relative"
          mx="5px"
          disabled={item?.is_deleted}
          opacity={item?.is_deleted ? 0.8 : 1}
          onLongPress={() => openModal(item)}
        >
          {item?.is_edit ? (
            <Text
              color={isCurrentUser ? "#FFD" : "#444"}
              position="absolute"
              top="5px"
              left="15px"
              fontSize="11px"
            >
              edited
            </Text>
          ) : null}
          <Text
            color={isCurrentUser ? "#FFD" : "#444"}
            pb="10px"
            pt={item?.is_edit ? "10px" : "0px"}
          >
            {!item?.is_deleted ? item?.message : "this message is deleted"}
          </Text>
          <Text
            color={isCurrentUser ? "#FFD" : "#444"}
            position="absolute"
            bottom="3px"
            right="20px"
            fontSize="11px"
          >
            {dayjs(item?.sent_at).format("hh:mm a")}
          </Text>
        </Pressable>
      </HStack>
    </View>
  );
};

export default Messages;
