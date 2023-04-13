import React from "react";
import { Box, Spinner } from "native-base";

const Loading = () => {
  return (
    <Box
      w="100%"
      h="100%"
      zIndex="1"
      alignItems="center"
      justifyContent="center"
      bgColor={"#00000030"}
      position="absolute"
    >
      <Spinner size="lg" />
    </Box>
  );
};

export default Loading;
