import React from "react";
import { Box, Spinner } from "native-base";

const Loading = () => {
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      bgColor={"gray.300"}
    >
      <Spinner size="lg" />
    </Box>
  );
};

export default Loading;
