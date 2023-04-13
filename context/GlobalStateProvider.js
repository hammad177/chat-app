import React, { useReducer } from "react";
import GlobalStateContext from "./GlobalStateContext";
import reducer from "./GlobalStateReducer";

const initialState = {
  roomsList: [],
  isLoading: false,
  isSubmitting: false,
  newRoomCode: "",
  userId: "",
  isSignIn: null,
  isUserInRoom: null,
  room: {
    code: "",
    name: "",
    users: [],
    messages: [],
  },
};

const GlobalStateProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
