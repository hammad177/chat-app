import React, { useContext, useEffect, useState } from "react";
import { Box, HStack, Spinner, View } from "native-base";
import { FlashList } from "@shopify/flash-list";
import Messages from "./Messages";
import GlobalStateContext from "../context/GlobalStateContext";
import { setInitMessages } from "../context/GlobalStateAction";

const MessagesContainer = () => {
  const [loadList, setLoadList] = useState(true);
  const {
    state: {
      room: { messages, code },
      userId,
    },
    dispatch,
  } = useContext(GlobalStateContext);

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
        renderItem={({ item }) => Messages({ item, userId })}
        estimatedItemSize={30}
        scrollEnabled={true}
        inverted={true}
        onLoad={() => setLoadList(false)}
      />
    </Box>
  );
};

export default MessagesContainer;
