import React, { useContext, useState } from "react";
import { Box, HStack, Spinner } from "native-base";
import { FlashList } from "@shopify/flash-list";
import Messages from "./Messages";
import GlobalStateContext from "../context/GlobalStateContext";

const MessagesContainer = () => {
  const [loadList, setLoadList] = useState(true);
  const {
    state: {
      room: { messages },
      userId,
    },
  } = useContext(GlobalStateContext);

  return (
    <Box flex="1">
      <FlashList
        data={messages}
        keyExtractor={(_, i) => i}
        renderItem={({ item }) => Messages({ item, userId })}
        estimatedItemSize={30}
        scrollEnabled={true}
        inverted={true}
        onLoad={() => setLoadList(false)}
      />
      {loadList && (
        <HStack position="absolute" top="40%" w="100%" justifyContent="center">
          <Spinner size="lg" />
        </HStack>
      )}
    </Box>
  );
};

export default MessagesContainer;
