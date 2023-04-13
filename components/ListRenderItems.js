import React from "react";
import { Text, VStack, Badge, Pressable } from "native-base";

const ListRenderItems = (item, handelModal) => {
  return (
    <Pressable
      borderRadius="md"
      borderColor="gray.300"
      borderWidth="1"
      borderStyle="solid"
      marginBottom="15px"
      paddingX="10px"
      paddingY="5px"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      onPress={() => handelModal(item)}
    >
      <VStack>
        <Text fontSize="2xl" color="gray.700">
          {item?.room_name}
        </Text>
        <Text>created by: {item?.email}</Text>
      </VStack>
      {item?.is_public ? (
        <Badge colorScheme="info">Public</Badge>
      ) : (
        <Badge colorScheme="danger">Private</Badge>
      )}
    </Pressable>
  );
};

export default ListRenderItems;
