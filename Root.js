import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ToastMessages from "./components/ToastMessages";
import GlobalStateContext from "./context/GlobalStateContext";
import { forceLogout, reloadPrevState } from "./context/GlobalStateAction";
import MyStack from "./stack/MyStack";
import MessageStack from "./stack/MessageStack";
import SplashScreen from "./components/SplashScreen";
import Loading from "./components/Loading";
import { SocketContext } from "./context/SocketContext";

const Root = () => {
  const {
    dispatch,
    state: { isSignIn, isUserInRoom, isLoading },
  } = useContext(GlobalStateContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    reloadPrevState(dispatch);

    socket.on("verify-token", async ({ access_token }) => {
      await forceLogout(dispatch, access_token, socket);
    });
    socket.on("error", async (message) => {
      ToastMessages.show({ message: "failed to proceed", status: "error" });
    });

    return () => {
      socket.disconnect();
    };
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
