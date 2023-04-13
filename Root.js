import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ToastMessages from "./components/ToastMessages";
import GlobalStateContext from "./context/GlobalStateContext";
import { reloadPrevState } from "./context/GlobalStateAction";
import MyStack from "./stack/MyStack";
import MessageStack from "./stack/MessageStack";
import SplashScreen from "./components/SplashScreen";
import Loading from "./components/Loading";

const Root = () => {
  const {
    dispatch,
    state: { isSignIn, isUserInRoom, isLoading },
  } = useContext(GlobalStateContext);
  useEffect(() => {
    reloadPrevState(dispatch);
  }, []);

  if (isSignIn === null && isUserInRoom === null) return <SplashScreen />;

  return (
    <>
      {isLoading ? <Loading /> : null}
      <NavigationContainer>
        {isUserInRoom ? <MessageStack /> : <MyStack />}
      </NavigationContainer>
      <ToastMessages />
    </>
  );
};

export default Root;
