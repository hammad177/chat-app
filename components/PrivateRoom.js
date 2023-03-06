import React from "react";
import JoinRoomForm from "./JoinRoomForm";
import HOCJoinRoom from "./HOCJoinRoom";

const PrivateRoom = (props) => {
  return <JoinRoomForm {...props} />;
};

export default HOCJoinRoom(PrivateRoom, false);
