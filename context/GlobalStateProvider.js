import React, { useReducer } from "react";
import GlobalStateContext from "./GlobalStateContext";
import reducer from "./GlobalStateReducer";
import { initialState } from "./InitialState";

const GlobalStateProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
