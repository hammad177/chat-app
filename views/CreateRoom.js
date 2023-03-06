import React from "react";
import { Box, Heading } from "native-base";
import NewRoomForm from "../components/NewRoomForm";
import RoomCodeClipboard from "../components/RoomCodeClipboard";

const CreateRoom = () => {
  return (
    <Box flex={1} alignItems="center" pt="40px">
      <Heading fontSize="3xl" color="#379">
        Create Your Room
      </Heading>
      <NewRoomForm />
      <RoomCodeClipboard />
    </Box>
  );
};

export default CreateRoom;
