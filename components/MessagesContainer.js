import React, { useState } from "react";
import { Box, HStack, Spinner } from "native-base";
import { FlashList } from "@shopify/flash-list";
import Messages from "./Messages";

const messages = [1, 0, 1, 1, 0, 0, 1];

const MessagesContainer = () => {
  const [loadList, setLoadList] = useState(true);

  return (
    <Box flex="1">
      <FlashList
        data={messages}
        keyExtractor={(_, i) => i}
        renderItem={Messages}
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
