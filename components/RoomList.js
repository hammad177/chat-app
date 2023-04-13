import React, { useContext, useEffect, useState, useCallback } from "react";
import { Box, HStack, Spinner, Text } from "native-base";
import { FlashList } from "@shopify/flash-list";
import ListRenderItems from "./ListRenderItems";
import { getAllRooms } from "../context/GlobalStateAction";
import GlobalStateContext from "../context/GlobalStateContext";
import JoinRoomModal from "../components/JoinRoomModal";

const modalInitState = { open: false, data: null };

const RoomList = () => {
  const { state, dispatch } = useContext(GlobalStateContext);
  const [isRefresh, setIsRefresh] = useState(false);
  const [loadList, setLoadList] = useState(true);
  const [modal, setModal] = useState(modalInitState);
  const onRefresh = async () => {
    setIsRefresh(true);
    await getAllRooms(dispatch);
    setIsRefresh(false);
  };
  const handelModal = useCallback((val) => {
    if (!val) return setModal(modalInitState);
    return setModal({ open: true, data: val });
  }, []);

  useEffect(() => {
    getAllRooms(dispatch);
  }, []);

  const renderItem = ({ item }) => ListRenderItems(item, handelModal);
  const keyExtractor = (item) => item._id.toString();
  return (
    <Box h="90%" mt="20px">
      {!state?.roomsList?.length && loadList ? (
        <HStack position="absolute" top="40%" w="100%" justifyContent="center">
          <Spinner size="lg" />
        </HStack>
      ) : (
        <>
          {!state?.roomsList?.length && !loadList ? (
            <HStack
              position="absolute"
              top="40%"
              w="100%"
              justifyContent="center"
            >
              <Text fontSize="lg">No Room Found</Text>
            </HStack>
          ) : (
            <>
              <FlashList
                data={state?.roomsList}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                estimatedItemSize={20}
                scrollEnabled={true}
                onRefresh={onRefresh}
                refreshing={isRefresh}
                onLoad={() => setLoadList(false)}
              />
              <JoinRoomModal modal={modal} handelModal={handelModal} />
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default RoomList;
