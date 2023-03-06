import React from "react";
import JoinRoomForm from "./JoinRoomForm";
import HOCJoinRoom from "./HOCJoinRoom";

const PublicRoom = (props) => {
  return <JoinRoomForm {...props} />;
};

export default HOCJoinRoom(PublicRoom, true);
