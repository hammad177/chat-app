import React, { useContext, useEffect, useState, useCallback } from "react";
import { Box, HStack, Spinner } from "native-base";
import { FlashList } from "@shopify/flash-list";
import Messages from "./Messages";
import GlobalStateContext from "../context/GlobalStateContext";
import { setInitMessages } from "../context/GlobalStateAction";
import ActionModal from "./ActionModal";

const modalInitState = {
  open: false,
  room_code: "",
  message_id: "",
};

const MessagesContainer = () => {
  const [loadList, setLoadList] = useState(true);
  const [actionModal, setActionModal] = useState(modalInitState);
  const {
    state: {
      room: { messages, code },
      userId,
    },
    dispatch,
  } = useContext(GlobalStateContext);

  const handleActionModal = useCallback((value) => {
    if (!value) return setActionModal(modalInitState);
    setActionModal({ open: true, ...value });
  }, []);

  useEffect(() => {
    setInitMessages(dispatch, code);
  }, []);
  return (
    <Box flex="1">
      {loadList && (
        <HStack position="absolute" top="40%" w="100%" justifyContent="center">
          <Spinner size="lg" />
        </HStack>
      )}

      <FlashList
        data={messages}
        keyExtractor={(_, i) => i}
        renderItem={({ item }) => Messages({ item, userId, handleActionModal })}
        estimatedItemSize={50}
        scrollEnabled={true}
        inverted={true}
        onLoad={() => setLoadList(false)}
      />
      <ActionModal
        actionModal={actionModal}
        handleActionModal={handleActionModal}
      />
    </Box>
  );
};

export default MessagesContainer;
