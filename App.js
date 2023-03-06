import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import Root from "./Root";
import SocketProvider from "./context/SocketProvider";
import GlobalStateProvider from "./context/GlobalStateProvider";

export default function App() {
  return (
    <>
      <StatusBar translucent={true} animated={true} style="auto" />
      <GlobalStateProvider>
        <NativeBaseProvider>
          <SocketProvider>
            <Root />
          </SocketProvider>
        </NativeBaseProvider>
      </GlobalStateProvider>
    </>
  );
}
