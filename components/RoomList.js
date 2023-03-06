import React, { useContext, useEffect, useState } from "react";
import { Box, HStack, Spinner, Text } from "native-base";
import { FlashList } from "@shopify/flash-list";
import ListRenderItems from "./ListRenderItems";
import { getAllRooms } from "../context/GlobalStateAction";
import GlobalStateContext from "../context/GlobalStateContext";

const RoomList = () => {
  const { state, dispatch } = useContext(GlobalStateContext);
  const [isRefresh, setIsRefresh] = useState(false);
  const [loadList, setLoadList] = useState(true);
  const onRefresh = async () => {
    setIsRefresh(true);
    await getAllRooms(dispatch);
    setIsRefresh(false);
  };

  useEffect(() => {
    getAllRooms(dispatch);
  }, []);

  return (
    <Box h="90%" mt="20px">
      {loadList && (
        <HStack position="absolute" top="40%" w="100%" justifyContent="center">
          <Spinner size="lg" />
        </HStack>
      )}
      {!state?.roomsList?.length && !loadList ? (
        <HStack position="absolute" top="40%" w="100%" justifyContent="center">
          <Text fontSize="lg">No Room Found</Text>
        </HStack>
      ) : null}
      <FlashList
        data={state?.roomsList}
        renderItem={({ item }) => ListRenderItems(item)}
        keyExtractor={(item) => item._id}
        estimatedItemSize={20}
        scrollEnabled={true}
        onRefresh={onRefresh}
        refreshing={isRefresh}
        onLoad={() => setLoadList(false)}
      />
    </Box>
  );
};

export default RoomList;
